"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function TrendingCarousel() {
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
      className="mt-10 absolute left-0 right-0 mx-auto w-full px-0"
      style={{ bottom: 20, zIndex: 30 }}
    >
      <div className="embla">
        <div
          className="embla__viewport overflow-hidden"
          style={{ width: "100%" }}
          ref={emblaRef}
        >
          <div className="embla__container flex gap-4">
            <div
              className="relative embla__slide flex-shrink-0 ml-4"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://i.ebayimg.com/images/g/-xEAAOSwN-lnaXUB/s-l1200.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Man of Steel</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/236x/61/f5/0d/61f50d942b871bf23bc3fd4c89ac72a7.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Humane</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://i0.wp.com/breakingscenemedia.com/wp-content/uploads/2025/07/superman-poster-2025-trailer.webp?fit=1000%2C550&ssl=1"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Superman</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://m.media-amazon.com/images/I/71NQeo87TwL._AC_UF894,1000_QL80_.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Hit the Wanes</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Animation</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://venkatarangan.com/wp-content/uploads/2025/02/dragon-movie.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Dragon</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">India</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://3dvf.com/wp-content/uploads/2025/04/minecraft-movie-special-effect-x-2.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Minecraft</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ztq5hBiGdLge8bUtnRZgr6PJCFDg7oXneg&s"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">28 Years Later</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Drama</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ztq5hBiGdLge8bUtnRZgr6PJCFDg7oXneg&s"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">28 Years Later</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Drama</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://www.zekefilm.org/wp-content/uploads/2025/06/BallerinaMain-1400x600.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Dun</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Sci Fi</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/236x/e5/77/fb/e577fb687701c1a7514231d0cdd1a66a.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">No Title</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 180 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://i.ebayimg.com/images/g/68sAAOSwQwFnB0f2/s-l1200.jpg"
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="meta-strip rounded-b-xl text-bold text-xs">
                <span className="text-bold text-gray-300">Wicked</span>
                <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Animation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
