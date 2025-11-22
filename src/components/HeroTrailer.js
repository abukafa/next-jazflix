"use client";
import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import Link from "next/link";

const getYouTubeId = (url) => {
  const regExp = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function HeroTrailer({ trending }) {
  useEffect(() => {
    new Swiper(".myHero", {
      effect: "slide",
      loop: true,
      speed: 600,
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }, []);

  return (
    <div className="swiper myHero relative w-full h-screen overflow-hidden">
      <div className="swiper-wrapper">
        {trending.map((movie) => {
          const id = getYouTubeId(movie.trailerUrl);

          return (
            <div
              className="swiper-slide relative overflow-hidden"
              key={movie._id}
            >
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] -translate-x-1/2 -translate-y-1/2"
                  src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${id}`}
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>

              <div className="absolute z-20 left-20 top-1/3 -translate-y-1/2 max-w-lg space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {movie.title}
                </h1>
                <p className="text-gray-300 text-sm md:text-base">
                  {movie.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ {movie.rating || 5}/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">{movie.ageRating}</span>
                </div>
                <br />
                <Link
                  href={`/movie/${movie._id}`}
                  className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
                >
                  <i className="fa-solid fa-play"></i> Play
                </Link>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10 z-10"></div>
            </div>
          );
        })}
      </div>

      <div className="swiper-pagination !bottom-52 z-[999] relative"></div>
    </div>
  );
}
