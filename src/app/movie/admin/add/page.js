import Navbar from "@/components/Navbar";
import AddMovieForm from "@/components/AddMovieForm";

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  return res.json();
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
