"use client";
import { useState } from "react";

export default function AddMovieForm() {
  const [movie, setMovie] = useState({
    title: "",
    originalTitle: "",
    description: "",
    rerleaseYear: "",
    duration: "",
    ageRating: "",
    rating: "",
    posterImage: "",
    bannerImage: "",
    trailerUrl: "",
    videoUrl: "",
    genres: "",
    category: "",
    tags: "",
    director: "",
    actors: "",
    plot: "",
    isTrending: false,
    isPopular: false,
  });

  const save = async (e) => {
    e.preventDefault();
    await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });
    window.location.href = "/movie/admin";
  };

  const setVal = (key, val) => setMovie({ ...movie, [key]: val });

  return (
    <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-sm mb-20">
      <h1 className="text-2xl font-bold mb-6 text-red-500">Add New Movie</h1>

      <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-300">Title</label>
          <input
            type="text"
            value={movie.title}
            onChange={(e) => setVal("title", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Original Title</label>
          <input
            type="text"
            value={movie.originalTitle}
            onChange={(e) => setVal("originalTitle", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Description</label>
          <input
            type="text"
            value={movie.description}
            onChange={(e) => setVal("description", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Release Year</label>
          <input
            type="number"
            value={movie.rerleaseYear}
            onChange={(e) => setVal("rerleaseYear", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Runtime</label>
          <input
            type="text"
            value={movie.duration}
            onChange={(e) => setVal("duration", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Age Rating</label>
          <input
            type="text"
            value={movie.ageRating}
            onChange={(e) => setVal("ageRating", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Rating</label>
          <input
            type="text"
            value={movie.rating}
            onChange={(e) => setVal("rating", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Poster URL</label>
          <input
            type="text"
            value={movie.posterImage}
            onChange={(e) => setVal("posterImage", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Banner URL</label>
          <input
            type="text"
            value={movie.bannerImage}
            onChange={(e) => setVal("bannerImage", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">YouTube Trailer URL</label>
          <input
            type="text"
            value={movie.trailerUrl}
            onChange={(e) => setVal("trailerUrl", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Video Movie URL</label>
          <input
            type="text"
            value={movie.videoUrl}
            onChange={(e) => setVal("videoUrl", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Genres</label>
          <input
            type="text"
            value={movie.genres}
            onChange={(e) => setVal("genres", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Category</label>
          <input
            type="text"
            value={movie.category}
            onChange={(e) => setVal("category", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Tags</label>
          <input
            type="text"
            value={movie.tags}
            onChange={(e) => setVal("tags", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Director</label>
          <input
            type="text"
            value={movie.director}
            onChange={(e) => setVal("director", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Actors</label>
          <input
            type="text"
            value={movie.actors}
            onChange={(e) => setVal("actors", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Plot</label>
          <textarea
            maxLength="250"
            value={movie.plot}
            onChange={(e) => setVal("plot", e.target.value)}
            rows="2"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="ml-4">
          <input
            type="checkbox"
            checked={movie.isTrending}
            onChange={(e) => setVal("isTrending", e.target.checked)}
            className="w-4 h-4"
          />
          <span> Trending Movie</span>
        </div>

        <div className="ml-4">
          <input
            type="checkbox"
            checked={movie.isPopular}
            onChange={(e) => setVal("isPopular", e.target.checked)}
            className="w-4 h-4"
          />
          <span> Popular Movie</span>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
          >
            Save Movie
          </button>
        </div>
      </form>
    </div>
  );
}
