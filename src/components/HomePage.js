"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const HeroTrailer = dynamic(() => import("@/components/HeroTrailer"), {
  ssr: false,
});
const TrendingCarousel = dynamic(
  () => import("@/components/TrendingCarousel"),
  { ssr: false }
);
const PopularCarousel = dynamic(() => import("@/components/PopularCarousel"), {
  ssr: false,
});
const MovieCollection = dynamic(() => import("@/components/MovieCollection"), {
  ssr: false,
});

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
