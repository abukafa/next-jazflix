import Navbar from "@/components/Navbar";
import EditMovieForm from "@/components/EditMovieForm";

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function AdminEdit({ params }) {
  const { id } = await Promise.resolve(params);
  const movies = await getMovies();
  const genres = [...new Set(movies.flatMap((m) => m.genres))];

  return (
    <>
      <Navbar />
      <div className="my-20" />
      <EditMovieForm id={id} genres={genres} />
    </>
  );
}
