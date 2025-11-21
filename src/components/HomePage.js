"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroTrailer from "@/components/HeroTrailer";
import TrendingCarousel from "@/components/TrendingCarousel";
import PopularCarousel from "@/components/PopularCarousel";
import MovieCollection from "@/components/MovieCollection";

export default function HomePage({ movies, genres }) {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Navbar onSearch={(word) => setKeyword(word)} />
      <HeroTrailer />
      <TrendingCarousel />
      <PopularCarousel />
      <MovieCollection movies={movies} genres={genres} keyword={keyword} />
    </>
  );
}
