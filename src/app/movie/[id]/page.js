import MoviePage from "@/components/MoviePage";
export const revalidate = 60;
import { connectDB } from "@/lib/db";
import MovieModel from "@/models/Movie";

async function getMovies() {
  await connectDB();
  const movies = await MovieModel.find().sort({ _id: -1 }).lean();
  return JSON.parse(JSON.stringify(movies));
}

export default async function Movie({ params }) {
  const { id } = await Promise.resolve(params);
  const res = await getMovies();

  const movies = Array.isArray(res) ? res : res.movies;

  const movie = movies.find((m) => m._id === id);
  if (!movie) return <div>Movie not found</div>;

  const similars = movies.filter((m) =>
    m.genres.some((g) => movie.genres.includes(g))
  );

  return (
    <MoviePage movies={similars} genre={null} years={null} movie={movie} />
  );
}
