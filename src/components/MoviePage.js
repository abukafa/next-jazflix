"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const MovieDetail = dynamic(() => import("@/components/MovieDetail"), {
  ssr: false,
});
const MovieCollection = dynamic(() => import("@/components/MovieCollection"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function MoviePage({ genres, movies, movie }) {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Navbar onSearch={(word) => setKeyword(word)} />
      <div className="h-20" />
      <MovieDetail movie={movie} />
      <MovieCollection
        movies={movies || []}
        genres={genres || []}
        keyword={keyword}
      />
      <Footer />
    </>
  );
}
