"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Link from "next/link";

export default function PopularCarousel({ populars }) {
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
                      className="w-full h-60 object-cover"
                      alt="banner"
                      src={`/api/proxy-image?url=${encodeURIComponent(
                        movie.bannerImage
                      )}`}
                      onError={(e) => {
                        e.target.src = "/images/no-photo.png";
                      }}
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
