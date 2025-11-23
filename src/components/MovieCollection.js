"use client";
import { useState } from "react";
import Link from "next/link";

export default function MovieCollection({ movies, genres, years, keyword }) {
  movies = movies || [];
  genres = genres || [];
  years = years || [];
  keyword = keyword || "";

  const [year, setYear] = useState("All");
  const [genre, setGenre] = useState("All");

  const filtered = movies
    .filter((m) => year === "All" || m.releaseYear == year)
    .filter((m) => genre === "All" || m.genres.includes(genre))
    .filter((m) => m.title.toLowerCase().includes(keyword.toLowerCase()))
    .sort((a, b) => b.releaseYear - a.releaseYear);

  return (
    <section className="w-full px-4 mt-10" id="movies">
      <div
        className={`flex items-center justify-between mb-6 ${
          Array.isArray(genres) && genres.length === 0 ? "hidden" : ""
        }`}
      >
        <h2 className="text-2xl font-bold">Collections</h2>

        <div>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-48 bg-black/70 text-white px-3 py-1 rounded-xl border border-gray-600 text-sm focus:outline-none cursor-pointer overflow-hidden mr-3"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-48 bg-black/70 text-white px-3 py-1 rounded-xl border border-gray-600 text-sm focus:outline-none cursor-pointer overflow-hidden"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
        {filtered.map((m, i) => (
          <div
            key={i}
            className="rounded overflow-hidden hover:scale-110 cursor-pointer transition"
          >
            <Link href={`/movie/${m._id}`}>
              <img
                src={m.posterImage}
                onError={(e) => {
                  e.target.src = "/images/no-photo.png";
                }}
                className="w-full aspect-[4/6] object-cover rounded-xl"
              />
            </Link>

            <div className="text-white text-sm mt-2">{m.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
