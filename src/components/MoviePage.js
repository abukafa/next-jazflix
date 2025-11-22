"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MovieDetail from "@/components/MovieDetail";
import MovieCollection from "@/components/MovieCollection";
import Footer from "@/components/Footer";

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
