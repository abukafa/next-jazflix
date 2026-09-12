import { NextResponse } from "next/server";
import { getTvSeasonEpisodes } from "@/lib/tmdb";

export async function GET(request, { params }) {
  try {
    const { id, seasonNumber } = await params;
    const data = await getTvSeasonEpisodes(id, parseInt(seasonNumber, 10));
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in season episodes route:", err);
    return NextResponse.json({ error: "Failed to fetch season episodes" }, { status: 500 });
  }
}
