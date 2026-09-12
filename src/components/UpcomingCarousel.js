"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Link from "next/link";
import Image from "next/image";

export default function UpcomingCarousel({ upcoming = [] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, skipSnaps: true },
    [
      AutoScroll({
        speed: 0.5,
        direction: "backward",
        pauseOnHover: true,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ]
  );

  return (
    <div className="embla">
      <div
        className="embla__viewport overflow-hidden"
        style={{ width: "100%" }}
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {upcoming.map((movie, i) => {
            const mId = movie.id || movie.movieId || movie._id;
            const imgUrl = movie.bannerImage || movie.posterImage || "/images/no-photo.png";
            const genreStr = Array.isArray(movie.genres) ? movie.genres.slice(0, 3).join(", ") : "";

            return (
              <div
                key={mId || i}
                className="embla__slide flex-shrink-0 ml-4 cursor-pointer"
                style={{ width: 360 }}
              >
                <div className="rounded-xl overflow-hidden relative w-[360px] h-60 bg-zinc-900">
                  <Link href={`/movie/${mId}`}>
                    <Image
                      className="w-full h-60 object-cover hover:scale-105 transition duration-300"
                      alt={movie.title || "Upcoming Movie"}
                      src={imgUrl}
                      width={360}
                      height={240}
                    />
                  </Link>
                </div>
                <div className="rounded-b-xl text-bold text-sm mt-2">
                  <span className="text-bold text-gray-300">
                    {movie.title}{" "}
                  </span>
                  {genreStr && `- ${genreStr}`}
                  <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-star text-xs" />
                      <span>{movie.rating || "N/A"}/10</span>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-300">{movie.releaseYear || "Coming Soon"}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-300">{movie.ageRating || "PG"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
