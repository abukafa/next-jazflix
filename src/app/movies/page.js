export const revalidate = 60;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MoviesExplorer from "@/components/MoviesExplorer";
import { getMoviesPaginated, getMovieGenres } from "@/lib/tmdb";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export default async function MoviesPage() {
  let initialMovies = [];
  let genres = [];

  try {
    const [moviesData, genresData] = await Promise.all([
      getMoviesPaginated({ category: "popular", page: 1 }),
      getMovieGenres(),
    ]);
    initialMovies = moviesData.results || [];
    genres = genresData || [];

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

      initialMovies = initialMovies.map((m) => {
        const numId = Number(m.id || m.movieId);
        const isIdMatch = !isNaN(numId) && localMovieIdSet.has(numId);
        const isTitleMatch = m.title && localMovieTitles.has(m.title.trim().toLowerCase());
        return {
          ...m,
          hasVideo: Boolean(isIdMatch || isTitleMatch),
        };
      });
    } catch (dbErr) {
      console.error("Failed to load local movies for movies page:", dbErr);
    }
  } catch (err) {
    console.error("Failed to load initial movies page data:", err);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <MoviesExplorer initialMovies={initialMovies} genres={genres} initialCategory="popular" />
      <Footer />
    </div>
  );
}
