"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

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
    ]
  );

  const handleClick = (index, movieId) => {
    // scroll embla to clicked card (optional)
    emblaApi?.scrollTo(index);
    // dispatch event for HeroTrailer
    window.dispatchEvent(
      new CustomEvent("hero:jump", { detail: { index, movieId } })
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
            {trending.map((movie, i) => (
              <div
                className="relative embla__slide flex-shrink-0 ml-4"
                style={{ width: 180 }}
                key={movie._id || i}
                onClick={() => handleClick(i, movie._id)}
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    className="w-full h-28 object-cover"
                    src={`/api/proxy-image?url=${encodeURIComponent(
                      movie.bannerImage
                    )}`}
                    onError={(e) => {
                      e.target.src = "/images/no-photo.png";
                    }}
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
