import Navbar from "@/components/Navbar";
import TableMovies from "@/components/TableMovies";

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Admin() {
  const movies = await getMovies();
  const genres = [...new Set(movies.flatMap((m) => m.genres))];

  return (
    <>
      <Navbar />
      <div className="my-20" />
      <TableMovies movies={movies} genres={genres} />
    </>
  );
}
