import Navbar from "@/components/Navbar";
import AddMovieForm from "@/components/AddMovieForm";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

async function getMovies() {
  await connectDB();
  const movies = await Movie.find().lean();
  return JSON.parse(JSON.stringify(movies));
}

export default async function AdminAdd() {
  const movies = await getMovies();
  const genres = [...new Set(movies.flatMap((m) => m.genres))];

  return (
    <>
      <Navbar />
      <div className="my-20" />
      <AddMovieForm genres={genres} />
    </>
  );
}
