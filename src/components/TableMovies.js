"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const remove = async (id) => {
  if (!confirm("Yakin mau hapus data ini?")) return;
  await fetch(`/api/movies/${id}`, { method: "DELETE" });
  window.location.reload();
};

export default function TableMovies({ movies = [], genres = [], years = [] }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [trending, setTrending] = useState("");
  const [popular, setPopular] = useState("");

  const perPage = 10;

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    const sRaw = search.trim();
    const s = sRaw.toLowerCase();

    let list = movies.filter((m) => {
      // normalize fields
      const title = (m.title || "").toString().toLowerCase();
      const original = (m.originalTitle || m.original_title || "")
        .toString()
        .toLowerCase();
      const movieYear = m.releaseYear || m.year || "";
      const genresField = m.genres || m.tags || "";

      // text matching: title OR original OR numeric year
      const textMatch = s === "" || title.includes(s) || original.includes(s);

      const yearMatch = year === "" || !year || movieYear == year;

      // genre matching (support array or comma string)
      const genreMatch =
        genre === "" ||
        (Array.isArray(genresField)
          ? genresField.includes(genre)
          : genresField
              .toString()
              .toLowerCase()
              .split(",")
              .map((g) => g.trim())
              .includes(genre.toString().toLowerCase()));

      const matchTrending =
        trending === "" ||
        (trending === "yes" && Boolean(m.isTrending)) ||
        (trending === "no" && !Boolean(m.isTrending));

      const matchPopular =
        popular === "" ||
        (popular === "yes" && Boolean(m.isPopular)) ||
        (popular === "no" && !Boolean(m.isPopular));

      // combine: text OR year must match, and all other filters must match
      return (
        textMatch && yearMatch && genreMatch && matchTrending && matchPopular
      );
    });

    // tambahkan SORT
    if (sortBy) {
      list = [...list].sort((a, b) => {
        const A = a[sortBy];
        const B = b[sortBy];

        if (A < B) return sortDir === "asc" ? -1 : 1;
        if (A > B) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [search, year, genre, trending, popular, movies, sortBy, sortDir]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (Math.min(page, totalPages) - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  // helpers
  const gotoPage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

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
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm"
        >
          <option value="">All Years</option>
          {years.map((y, i) => (
            <option key={i} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm"
        >
          <option value="">All Genres</option>
          {genres.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
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
          <thead className="bg-white/5 text-left text-gray-300 cursor-pointer">
            <tr>
              <th className="px-4 py-3">Poster</th>
              <th className="px-4 py-3" onClick={() => handleSort("title")}>
                Title
              </th>
              <th
                className="px-4 py-3"
                onClick={() => handleSort("releaseYear")}
              >
                Year
              </th>
              <th className="px-4 py-3" onClick={() => handleSort("genres")}>
                Genres
              </th>
              <th className="px-4 py-3" onClick={() => handleSort("rating")}>
                Rating
              </th>
              <th
                className="px-4 py-3"
                onClick={() => handleSort("isTrending")}
              >
                Trending
              </th>
              <th className="px-4 py-3" onClick={() => handleSort("isPopular")}>
                Popular
              </th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((movie) => (
              <tr
                key={movie._id}
                className="border-t border-white/10 hover:bg-white/10"
              >
                <td className="px-4 py-3">
                  <img
                    src={movie.bannerImage}
                    onError={(e) => {
                      e.target.src = "/images/no-photo.png";
                    }}
                    className="w-20 aspect-[4/3] object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-3">{movie.originalTitle}</td>
                <td className="px-4 py-3">{movie.releaseYear}</td>
                <td>
                  {Array.isArray(movie.genres) ? movie.genres.join(", ") : "-"}
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  {`⭐ ${movie.rating || 5}/10`}
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  {movie.isTrending && <i className="fa fa-check"></i>}
                </td>
                <td className="px-4 py-3">
                  {movie.isPopular && <i className="fa fa-check"></i>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/movie/admin/${movie._id}`}
                    className="text-yellow-500 text-lg mr-4"
                  >
                    <i className="fa fa-edit" />
                  </Link>
                  <button
                    onClick={() => remove(movie._id)}
                    className="text-red-500 text-lg cursor-pointer"
                  >
                    <i className="fa fa-trash" />
                  </button>
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
