"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function TrendingCarousel({ trending }) {
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
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      className="mt-10 absolute left-0 right-0 mx-auto w-full px-0 cursor-pointer"
      style={{ bottom: 20, zIndex: 30 }}
    >
      <div className="embla">
        <div
          className="embla__viewport overflow-hidden"
          style={{ width: "100%" }}
          ref={emblaRef}
        >
          <div className="embla__container flex">
            {trending.map((movie, i) => (
              <div
                className="relative embla__slide flex-shrink-0 ml-4"
                style={{ width: 180 }}
                key={i}
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={movie.bannerImage}
                    className="w-full h-28 object-cover"
                  />
                </div>
                <div className="meta-strip rounded-b-xl text-bold text-xs">
                  <span className="text-bold text-gray-300">{movie.title}</span>
                  <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
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
