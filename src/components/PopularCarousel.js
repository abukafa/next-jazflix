"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function PopularCarousel() {
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
          <div className="embla__container flex gap-4">
            <div
              className="embla__slide flex-shrink-0 ml-4"
              style={{ width: 360 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://thecollision.org/wp-content/uploads/2025/06/how-to-train.png"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">
                  How to Train your Dragon
                </span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Animation</span>
                </div>
              </div>
            </div>

            <div className="embla__slide flex-shrink-0" style={{ width: 360 }}>
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://assets-in.bmscdn.com/discovery-catalog/events/et00457257-gpzfvryxft-landscape.jpg"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">Indra</span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Thriller</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 360 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://oppal.co.id/wp-content/uploads/2025/03/LANDSCAPE-OFFICIAL-POSTER-1.jpg"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">Komang</span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Drama</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 360 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5f6cf1a893e35255d4d7e89d/9219340b-843a-45f0-9ce8-5aa746c65ed5/DIE_ALONE_KEY+ART_LANDSCAPE_3840x2160.png"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">Die Alone</span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Horror</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 360 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://4kwallpapers.com/images/wallpapers/predator-badlands-3840x2160-22254.jpg"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">Badlands</span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 360 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtwnC_xBDT_J3hJmdax8PHmPvCcU0kdb-eXw&s"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">F1 - Brad Pit</span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Action</span>
                </div>
              </div>
            </div>

            <div
              className="relative embla__slide flex-shrink-0"
              style={{ width: 360 }}
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://i0.wp.com/breakingscenemedia.com/wp-content/uploads/2025/07/superman-poster-2025-trailer.webp?fit=1000%2C550&ssl=1"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-b-xl text-bold text-sm mt-2">
                <span className="text-bold text-gray-300">Superman</span>
                <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
                  ⭐ 8.7/10
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Science Fiction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
