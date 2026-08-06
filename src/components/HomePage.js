"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroTrailer from "@/components/HeroTrailer";
import TrendingCarousel from "@/components/TrendingCarousel";
import PopularCarousel from "@/components/PopularCarousel";
import MovieCollection from "@/components/MovieCollection";

export default function HomePage({
  movies,
  genres,
  years,
  trending,
  populars,
}) {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Navbar onSearch={(word) => setKeyword(word)} />
      <HeroTrailer trending={trending} />
      <TrendingCarousel trending={trending} />
      <PopularCarousel populars={populars} />
      <MovieCollection
        movies={movies}
        genres={genres}
        years={years}
        keyword={keyword}
      />
      <Footer />
    </>
  );
}
