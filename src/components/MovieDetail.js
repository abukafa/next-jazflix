"use client";
import Link from "next/link";

export default function MovieDetail() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-[350px] md:h-[500px] object-cover"
            src="https://www.youtube.com/embed/zHhR3daI3bY?autoplay=0&mute=1&controls=1"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Man Vs Baby</h1>
            <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
              ⭐ 8.7/10
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">13+</span>
            </div>

            <br />

            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <span className="text-white font-semibold">Original:</span> Man
                Vs Baby
              </p>
              <p>
                <span className="text-white font-semibold">Genre:</span> Action,
                Drama, Comedy
              </p>
              <p>
                <span className="text-white font-semibold">Category:</span>{" "}
                Movie
              </p>
              <p>
                <span className="text-white font-semibold">Runtime:</span> 1h
                56min
              </p>
              <p>
                <span className="text-white font-semibold">Year:</span> 2025
              </p>
              <p>
                <span className="text-white font-semibold">Director: </span>
                David Kerr
              </p>
              <p>
                <span className="text-white font-semibold">Actors:</span> Rowan
                Atkinson, William Davies
              </p>
              <p>
                <span className="text-white font-semibold">Plot:</span> Setelah
                kekacauan di seri Man vs Bee, Trevor Bingley sekarang menjadi
                penjaga sekolah. Tapi saat Natal, dia punya tugas baru menjaga
                penthouse mewah dan secara tak terduga harus merawat bayi
                <span className="hidden lg:inline">
                  {" "}
                  (Bayi Yesus dari adegan nativity) di tengah kekacauan liburan.
                </span>
              </p>
            </div>
          </div>

          <Link href="/movie/:id/watch">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm mt-4 cursor-pointer">
              <i className="fa-solid fa-play"></i> Play Movie
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
