"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

export default function PopularCarousel({ populars }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="px-6 mt-4">
      <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>

      <div className="embla">
        <div
          className="embla__viewport overflow-hidden"
          style={{ width: "100%" }}
          ref={emblaRef}
        >
          <div className="embla__container flex">
            {populars.map((movie, i) => (
              <div
                key={i}
                className="embla__slide flex-shrink-0 ml-4 cursor-pointer"
                style={{ width: 360 }}
              >
                <div className="rounded-xl overflow-hidden">
                  <Link href={`/movie/${movie._id}`}>
                    <img
                      src={movie.bannerImage}
                      className="w-full h-60 object-cover"
                    />
                  </Link>
                </div>
                <div className="rounded-b-xl text-bold text-sm mt-2">
                  <span className="text-bold text-gray-300">
                    {movie.title}{" "}
                  </span>
                  - {movie.genres.join(", ")}
                  <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                    ⭐ {movie.rating || 5}/10
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-300">{movie.ageRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
