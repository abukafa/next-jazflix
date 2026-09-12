import { NextResponse } from "next/server";
import { getTvShowDetails } from "@/lib/tmdb";

export async function GET(request, props) {
  try {
    const { id } = await props.params;
    const tv = await getTvShowDetails(id);
    if (!tv) {
      return NextResponse.json({ error: "TV show not found" }, { status: 404 });
    }
    return NextResponse.json(tv);
  } catch (err) {
    console.error("Error in /api/tmdb/tv/[id]:", err);
    return NextResponse.json({ error: "Failed to fetch TV details" }, { status: 500 });
  }
}
