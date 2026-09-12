import { getMovieDetails } from "@/lib/tmdb";

export async function GET(_, props) {
  try {
    const { id } = await props.params;
    const movie = await getMovieDetails(id);
    return Response.json(movie);
  } catch (error) {
    console.error("Error fetching TMDB movie:", error);
    return Response.json(
      { message: "Failed to fetch movie from TMDB" },
      { status: 500 }
    );
  }
}
