"use client";
import Link from "next/link";
import Swiper from "swiper";
import { useEffect, useRef } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const getYouTubeId = (url) => {
  const regExp = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url?.match(regExp);
  return match ? match[1] : null;
};

export default function HeroTrailer({ trending = [] }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // init swiper once
    swiperRef.current = new Swiper(".myHero", {
      modules: [Pagination, Autoplay],
      effect: "slide",
      loop: true,
      speed: 600,
      autoplay: { delay: 15000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
    });

    // listen custom event to jump
    const handler = (e) => {
      const { index, movieId } = e.detail || {};
      if (typeof index === "number" && swiperRef.current) {
        // use slideToLoop so looped slides map correctly
        swiperRef.current.slideToLoop(index);
        return;
      }
      if (movieId && Array.isArray(trending)) {
        const idx = trending.findIndex((m) => m._id === movieId);
        if (idx >= 0) swiperRef.current.slideToLoop(idx);
      }
    };

    window.addEventListener("hero:jump", handler);

    return () => {
      window.removeEventListener("hero:jump", handler);
      try {
        swiperRef.current?.destroy?.();
      } catch (err) {}
    };
  }, [trending]);

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
              <div className="relative w-full h-screen overflow-hidden">
                <img
                  alt="banner"
                  src={movie.bannerImage}
                  className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 md:hidden"
                  onError={(e) => {
                    e.target.src = "/images/no-photo.png";
                  }}
                />
                <iframe
                  className="absolute top-1/2 left-1/2 w-[360%] xl:w-[140%] h-[360%] xl:h-[140%] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                  src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${id}`}
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>

              <div className="absolute z-20 left-10 md:left-20 top-1/3 -translate-y-1/2 max-w-lg space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {movie.title}
                </h1>
                <h3 className="text-lg md:text-xl font-bold leading-tight">
                  {movie.originalTitle}
                </h3>
                <div className="flex items-center gap-3">
                  {movie.genres?.map((genre, i) => (
                    <span
                      key={i}
                      className="px-2 pb-1 text-xs rounded-md bg-gray-800"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  {movie.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ {movie.rating || 5}/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">{movie.releaseYear}</span>
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

      <div
        className="swiper-pagination absolute !bottom-36 left-0 w-full z-[9999]"
        id="popular"
      ></div>
    </div>
  );
}
