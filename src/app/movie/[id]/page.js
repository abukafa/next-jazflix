import MoviePage from "@/components/MoviePage";

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  return res.json();
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
