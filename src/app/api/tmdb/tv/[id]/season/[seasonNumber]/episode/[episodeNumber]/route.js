import { NextResponse } from "next/server";
import { getTvEpisodeDetails } from "@/lib/tmdb";

export async function GET(request, { params }) {
  try {
    const { id, seasonNumber, episodeNumber } = await params;
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "";
    const data = await getTvEpisodeDetails(
      id,
      parseInt(seasonNumber, 10),
      parseInt(episodeNumber, 10),
      title
    );
    if (!data) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in episode details route:", err);
    return NextResponse.json(
      { error: "Failed to fetch episode details" },
      { status: 500 }
    );
  }
}
