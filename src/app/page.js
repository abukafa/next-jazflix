import Image from "next/image";
import HomePage from "@/components/HomePage";

async function getMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();
  const genres = ["All", ...new Set(movies.flatMap((m) => m.genres))];

  return <HomePage genres={genres} movies={movies} />;
}
