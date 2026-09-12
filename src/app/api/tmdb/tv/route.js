import { NextResponse } from "next/server";
import { getTvShowsPaginated } from "@/lib/tmdb";
import { connectDB } from "@/lib/db";
import TvShow from "@/models/TvShow";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "popular";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const genre = searchParams.get("genre") || "";
    const query = searchParams.get("query") || "";

    const data = await getTvShowsPaginated({ category, page, genre, query });

    try {
      await connectDB();
      const localShows = await TvShow.find(
        { "episodes.videoUrl": { $exists: true, $ne: "" } },
        { tvId: 1, title: 1, episodes: 1 }
      ).lean();

      const localTvIdSet = new Set(
        localShows
          .filter((s) => s.tvId && s.episodes?.some((e) => e.videoUrl && e.videoUrl.trim()))
          .map((s) => Number(s.tvId))
      );
      const localTvTitles = new Set(
        localShows
          .filter((s) => s.title && s.episodes?.some((e) => e.videoUrl && e.videoUrl.trim()))
          .map((s) => s.title.trim().toLowerCase())
      );

      data.results = (data.results || []).map((t) => {
        const numId = Number(t.id || t.tvId);
        const isIdMatch = !isNaN(numId) && localTvIdSet.has(numId);
        const isTitleMatch = t.title && localTvTitles.has(t.title.trim().toLowerCase());
        return {
          ...t,
          hasVideo: Boolean(isIdMatch || isTitleMatch),
        };
      });
    } catch (dbErr) {
      console.error("Failed to check local TV videoUrl in API:", dbErr);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/tmdb/tv:", err);
    return NextResponse.json(
      { error: "Failed to fetch TV shows", results: [], page: 1, totalPages: 1 },
      { status: 500 }
    );
  }
}
