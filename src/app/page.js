import Image from "next/image";
import HomePage from "@/components/HomePage";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

async function getMovies() {
  await connectDB();
  const movies = await Movie.find().sort({ _id: -1 }).lean();
  return JSON.parse(JSON.stringify(movies));
}

export default async function Home() {
  const movies = await getMovies();
  const genres = ["All", ...new Set(movies.flatMap((m) => m.genres))];
  const years = ["All", ...new Set(movies.map((m) => m.releaseYear))]
    .sort()
    .reverse();
  const trending = movies.filter((m) => m.isTrending);
  const populars = movies.filter((m) => m.isPopular);

  return (
    <HomePage
      movies={movies}
      genres={genres}
      years={years}
      trending={trending}
      populars={populars}
    />
  );
}
