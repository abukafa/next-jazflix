"use client";
import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";

export default function HeroTrailer() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      new Swiper(".myHero", {
        effect: "slide",
        loop: true,
        speed: 600,
        autoplay: { delay: 6000, disableOnInteraction: false },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  }, []);

  return (
    <div className="swiper myHero relative w-full h-screen overflow-hidden">
      <div className="swiper-wrapper">
        <div className="swiper-slide relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube.com/embed/60h6lpnSgck?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&loop=1&playlist=60h6lpnSgck"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>

          <div className="absolute z-20 left-20 top-1/3 -translate-y-1/2 max-w-lg space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Movie Title Here
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Plot singkat film berada di sini, satu atau dua kalimat saja.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              eos aliquid sequi voluptatibus ea incidunt repellat iste beatae
              exercitationem deleniti.
            </p>
            <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
              ⭐ 8.7/10
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">Action</span>
            </div>
            <br />
            <a
              href="detail.html"
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              <i className="fa-solid fa-play"></i> Play
            </a>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20 z-10"></div>
        </div>

        <div className="swiper-slide relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube.com/embed/0hc8yz5-d5Y?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&loop=1&playlist=0hc8yz5-d5Y"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>

          <div className="absolute z-20 left-20 top-1/3 -translate-y-1/2 max-w-lg space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Movie Title Here
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
              quam amet eveniet ratione cumque aut necessitatibus cum. Hic odio
              est rem. Nobis ex, optio soluta inventore sapiente quia hic ipsum.
            </p>
            <div className="flex items-center gap-3 text-sm text-yellow-400 font-semibold">
              ⭐ 8.7/10
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">Action</span>
            </div>
            <br />
            <a
              href="detail.html"
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              <i className="fa-solid fa-play"></i> Play
            </a>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20 z-10"></div>
        </div>
      </div>
      <div
        className="swiper-pagination !bottom-52 z-[999] relative"
        id="popular"
      ></div>
    </div>
  );
}
