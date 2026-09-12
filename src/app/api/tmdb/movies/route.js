import { NextResponse } from "next/server";
import { getMoviesPaginated } from "@/lib/tmdb";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "popular";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const genre = searchParams.get("genre") || "";
    const query = searchParams.get("query") || "";

    const data = await getMoviesPaginated({ category, page, genre, query });

    try {
      await connectDB();
      const localMovies = await Movie.find(
        { videoUrl: { $exists: true, $ne: "" } },
        { movieId: 1, title: 1 }
      ).lean();

      const localMovieIdSet = new Set(
        localMovies
          .filter((m) => m.movieId)
          .map((m) => Number(m.movieId))
      );
      const localMovieTitles = new Set(
        localMovies
          .filter((m) => m.title)
          .map((m) => m.title.trim().toLowerCase())
      );

      data.results = (data.results || []).map((m) => {
        const numId = Number(m.id || m.movieId);
        const isIdMatch = !isNaN(numId) && localMovieIdSet.has(numId);
        const isTitleMatch = m.title && localMovieTitles.has(m.title.trim().toLowerCase());
        return {
          ...m,
          hasVideo: Boolean(isIdMatch || isTitleMatch),
        };
      });
    } catch (dbErr) {
      console.error("Failed to check local movie videoUrl in API:", dbErr);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/tmdb/movies:", err);
    return NextResponse.json(
      { error: "Failed to fetch movies", results: [], page: 1, totalPages: 1 },
      { status: 500 }
    );
  }
}
