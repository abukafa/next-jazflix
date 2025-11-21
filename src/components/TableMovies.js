"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function TableMovies({ movies }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [trending, setTrending] = useState("");
  const [popular, setPopular] = useState("");

  const perPage = 5;

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    const g = genre.toLowerCase();

    return movies.filter((m) => {
      const matchSearch = m.title.toLowerCase().includes(s);
      const matchGenre = g === "" || m.genre.toLowerCase() === g;

      const matchTrending =
        trending === "" ||
        (trending === "yes" && m.isTrending) ||
        (trending === "no" && !m.isTrending);

      const matchPopular =
        popular === "" ||
        (popular === "yes" && m.isPopular) ||
        (popular === "no" && !m.isPopular);

      return matchSearch && matchGenre && matchTrending && matchPopular;
    });
  }, [search, genre, trending, popular, movies]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Movies</h2>

      {/* FILTER BAR */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm w-60"
        />

        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm"
        >
          <option value="">All Genres</option>
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
          <option>Romance</option>
        </select>

        <select
          value={trending}
          onChange={(e) => {
            setTrending(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm"
        >
          <option value="">Trending</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <select
          value={popular}
          onChange={(e) => {
            setPopular(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm"
        >
          <option value="">Popular</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <Link
          href="/movie/admin/add"
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        >
          + Add Movie
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white/5 rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-gray-300">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Trending</th>
              <th className="px-4 py-3">Popular</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((movie) => (
              <tr
                key={movie.id}
                className="border-t border-white/10 hover:bg-white/10"
              >
                <td className="px-4 py-3">{movie.title}</td>
                <td className="px-4 py-3">{movie.year}</td>
                <td className="px-4 py-3">{movie.genre}</td>
                <td className="px-4 py-3">{movie.rating}</td>
                <td className="px-4 py-3">{movie.isTrending ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{movie.isPopular ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right flex justify-end gap-3">
                  <Link
                    href="/movie/admin/:id"
                    className="text-red-500 text-xs"
                  >
                    Edit
                  </Link>
                  <button className="text-red-500 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 mt-4 text-xs">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="px-3 py-1 bg-black/40 border border-gray-700 rounded hover:bg-white/10"
        >
          Prev
        </button>

        <span className="text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className="px-3 py-1 bg-black/40 border border-gray-700 rounded hover:bg-white/10"
        >
          Next
        </button>
      </div>
    </div>
  );
}
