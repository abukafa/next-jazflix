"use client";
import { useState } from "react";

export default function MovieCollection({ genres, movies, keyword }) {
  const [genre, setGenre] = useState("All");

  const filtered = movies
    .filter((m) => genre === "All" || m.genre === genre)
    .filter((m) => m.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <section className="w-full px-4 mt-10" id="movies">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Collections</h2>

        <div className="flex gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className="px-3 py-1 bg-white/10 rounded-full text-sm cursor-pointer"
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
        {filtered.map((m, i) => (
          <div
            key={i}
            className="rounded overflow-hidden hover:scale-105 cursor-pointer transition"
          >
            <img src={m.thumb} className="h-full object-cover rounded-xl" />
            <div className="text-white text-sm mt-2">{m.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
