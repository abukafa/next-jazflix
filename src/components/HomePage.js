"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroTrailer from "@/components/HeroTrailer";
import TrendingCarousel from "@/components/TrendingCarousel";
import PopularCarousel from "@/components/PopularCarousel";
import MovieCollection from "@/components/MovieCollection";
import Footer from "@/components/Footer";

export default function HomePage({ movies, genres, trending, populars }) {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Navbar onSearch={(word) => setKeyword(word)} />
      <HeroTrailer trending={trending} />
      <TrendingCarousel trending={trending} />
      <PopularCarousel populars={populars} />
      <MovieCollection movies={movies} genres={genres} keyword={keyword} />
      <Footer />
    </>
  );
}
