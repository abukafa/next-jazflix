"use client";
import { useEffect, useState } from "react";

export default function EditMovieForm({ id }) {
  const [movie, setMovie] = useState(null);

  console.log("ID:", id);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then(setMovie);
  }, [id]);

  const update = async (e) => {
    e.preventDefault();

    await fetch(`/api/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });

    window.location.href = "/movie/admin";
  };

  if (!movie) return "Loading...";
  console.log(id);

  return (
    <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-sm mb-20">
      <h1 className="text-2xl font-bold mb-6 text-red-500">Edit Movie</h1>

      <form onSubmit={update} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-300">Title</label>
          <input
            type="text"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Original Title</label>
          <input
            type="text"
            value={movie.originalTitle}
            onChange={(e) =>
              setMovie({ ...movie, originalTitle: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Description</label>
          <input
            type="text"
            value={movie.description}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Release Year</label>
          <input
            type="number"
            value={movie.rerleaseYear}
            onChange={(e) =>
              setMovie({ ...movie, rerleaseYear: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Runtime (ex: 120 min)</label>
          <input
            type="text"
            value={movie.duration}
            onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Age Rating</label>
          <input
            type="text"
            value={movie.ageRating}
            onChange={(e) => setMovie({ ...movie, ageRating: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Rating (ex: 8.5)</label>
          <input
            type="text"
            value={movie.rating}
            onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Poster URL (Portrait)</label>
          <input
            type="text"
            value={movie.posterImage}
            onChange={(e) =>
              setMovie({ ...movie, posterImage: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">
            Banner URL (Landscape)
          </label>
          <input
            type="text"
            value={movie.bannerImage}
            onChange={(e) =>
              setMovie({ ...movie, bannerImage: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">YouTube Trailer URL</label>
          <input
            type="text"
            value={movie.trailerUrl}
            onChange={(e) => setMovie({ ...movie, trailerUrl: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Video Movie URL</label>
          <input
            type="text"
            value={movie.videoUrl}
            onChange={(e) => setMovie({ ...movie, videoUrl: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">
            Genres (comma separated)
          </label>
          <input
            type="text"
            placeholder="Action, Drama"
            value={movie.genres}
            onChange={(e) => setMovie({ ...movie, genres: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Category</label>
          <input
            type="text"
            placeholder="Action, Drama"
            value={movie.category}
            onChange={(e) => setMovie({ ...movie, category: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="Action, Drama"
            value={movie.tags}
            onChange={(e) => setMovie({ ...movie, tags: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Director</label>
          <input
            type="text"
            value={movie.director}
            onChange={(e) => setMovie({ ...movie, director: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Actors</label>
          <input
            type="text"
            value={movie.actors}
            onChange={(e) => setMovie({ ...movie, actors: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Plot (max 250 chars)</label>

          <textarea
            id="desc"
            maxLength="250"
            rows="2"
            value={movie.plot}
            onChange={(e) => setMovie({ ...movie, plot: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none overflow-hidden"
          ></textarea>

          <p id="descCounter" className="text-right text-xs text-gray-400 mt-1">
            0/250
          </p>
        </div>

        <div className="ml-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            value={movie.isTrending}
            onChange={(e) => setMovie({ ...movie, isTrending: e.target.value })}
          />
          <span> Trending Movie</span>
        </div>

        <div className="ml-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            value={movie.isPopular}
            onChange={(e) => setMovie({ ...movie, isPopular: e.target.value })}
          />
          <span> Popular Movie</span>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer"
          >
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
}
