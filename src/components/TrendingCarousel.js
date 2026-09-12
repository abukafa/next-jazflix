"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import Image from "next/image";

export default function TrendingCarousel({ trending = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, skipSnaps: true },
    [
      AutoScroll({
        speed: 0.5,
        direction: "forward",
        pauseOnHover: true,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ],
  );

  const handleClick = (index, movieId) => {
    // scroll embla to clicked card (optional)
    emblaApi?.scrollTo(index);
    // dispatch event for HeroTrailer
    window.dispatchEvent(
      new CustomEvent("hero:jump", { detail: { index, movieId } }),
    );
  };

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
            {trending.map((movie, i) => {
              const mId = movie.id || movie.movieId || movie._id;
              const imgUrl =
                movie.bannerImage ||
                movie.posterImage ||
                "/images/no-photo.png";
              return (
                <div
                  className="relative embla__slide flex-shrink-0 ml-4"
                  style={{ width: 180 }}
                  key={mId || i}
                  onClick={() => handleClick(i, mId)}
                >
                  <div className="rounded-xl overflow-hidden relative w-[180px] h-28 bg-zinc-900 group">
                    <Image
                      className="w-full h-28 object-cover"
                      src={imgUrl}
                      alt={movie.title || "Movie banner"}
                      width={180}
                      height={112}
                    />
                    {movie.hasVideo && (
                      <div
                        className="absolute top-2 right-2 z-10 w-6 h-6 rounded-md bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-950/60 backdrop-blur-sm border border-red-400/40 pointer-events-none"
                        title="Tersedia untuk ditonton di Jazflix"
                      >
                        <i className="fa-solid fa-play text-[10px]" />
                      </div>
                    )}
                  </div>
                  <div className="meta-strip rounded-b-xl text-bold text-xs">
                    <span className="text-bold text-gray-300 truncate block">
                      {movie.title}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-[10px]" />
                        <span>{movie.rating || 5}/10</span>
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-300">
                        {movie.ageRating || "PG"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
