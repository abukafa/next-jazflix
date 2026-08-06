"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SmartInputSingle = dynamic(
  () => import("@/components/SmartInputSingle"),
  { ssr: false },
);
const SmartInputMultiple = dynamic(
  () => import("@/components/SmartInputMultiple"),
  { ssr: false },
);

export default function EditMovieForm({ id, genres = [] }) {
  const [errors, setErrors] = useState({});
  const [movie, setMovie] = useState(null);

  const movieTags = [
    "Based on true story",
    "Car chase",
    "Coming of age",
    "Dark comedy",
    "Detective",
    "Dystopia",
    "Family friendly",
    "Gangster",
    "Heist",
    "High school",
    "Love triangle",
    "Mafia",
    "Post-apocalyptic",
    "Psychological",
    "Religious",
    "Robot AI",
    "Serial killer",
    "Slice of life",
    "Strong female lead",
    "Time travel",
  ];

  console.log("ID:", id);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then(setMovie);
  }, [id]);

  const update = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!movie.title) newErrors.title = true;
    if (!movie.originalTitle) newErrors.originalTitle = true;
    if (!movie.description) newErrors.description = true;
    if (!movie.genres || movie.genres.length === 0) {
      newErrors.genres = true;
    }
    if (!movie.releaseYear) newErrors.releaseYear = true;
    if (!movie.posterImage) newErrors.posterImage = true;
    if (!movie.bannerImage) newErrors.bannerImage = true;
    if (!movie.trailerUrl) newErrors.trailerUrl = true;
    if (!movie.videoUrl) newErrors.videoUrl = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    await fetch(`/api/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });

    window.location.href = "/movie/admin";
  };

  if (!movie) return <div className="text-center mt-20">Loading...</div>;

  const handleSelectMovie = async (title, tmdbData) => {
    if (!tmdbData) {
      setMovie((prev) => ({ ...prev, originalTitle: title }));
      return;
    }
    
    let fullDetails = null;
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbData.id}?append_to_response=credits,videos,release_dates`, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2MzYmNkZmRiOGMyNzMzNWE1ZTJmYTIyZWY2Yzc3OSIsIm5iZiI6MTcxMTE3NzAzOS45MjksInN1YiI6IjY1ZmU3ZDRmMWIxZjNjMDE3Yzk4ZTFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PlR_trKl9bLOsh2sp32-XOlXbBzjMB2zDL1MnXN5dk` }
      });
      fullDetails = await res.json();
    } catch (e) {
      console.error(e);
    }

    const rating = fullDetails?.vote_average ? fullDetails.vote_average.toFixed(1) : "";
    const duration = fullDetails?.runtime ? `${fullDetails.runtime} min` : "";
    const director = fullDetails?.credits?.crew?.find(c => c.job === "Director")?.name || "";
    const actors = fullDetails?.credits?.cast?.slice(0, 5).map(a => a.name) || [];
    const trailerUrl = fullDetails?.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube")?.key 
      ? `https://www.youtube.com/watch?v=${fullDetails.videos.results.find(v => v.type === "Trailer" && v.site === "YouTube").key}`
      : "";
    const usRelease = fullDetails?.release_dates?.results?.find(r => r.iso_3166_1 === "US");
    const ageRating = usRelease?.release_dates?.[0]?.certification || "";
    const genres = fullDetails?.genres?.map(g => g.name) || [];
    
    const shortTitle = (tmdbData.original_title || title).split(" ").slice(0, 2).join(" ");

    setMovie((prev) => ({
      ...prev,
      originalTitle: tmdbData.original_title || title,
      title: shortTitle || prev.title,
      description: (tmdbData.overview || "").substring(0, 100) + ((tmdbData.overview?.length > 100) ? "..." : "") || prev.description,
      plot: tmdbData.overview || prev.plot,
      releaseYear: tmdbData.release_date ? tmdbData.release_date.split("-")[0] : prev.releaseYear,
      posterImage: tmdbData.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` : prev.posterImage,
      bannerImage: tmdbData.backdrop_path ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}` : prev.bannerImage,
      rating: rating || prev.rating,
      duration: duration || prev.duration,
      director: director || prev.director,
      actors: actors.length > 0 ? actors : prev.actors,
      trailerUrl: trailerUrl || prev.trailerUrl,
      ageRating: ageRating || prev.ageRating,
      genres: genres.length > 0 ? genres : prev.genres,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-sm mb-20">
      <h1 className="text-2xl font-bold mb-6 text-red-500">Edit Movie</h1>

      <form onSubmit={update} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SmartInputSingle
            label="Original Title"
            type="tmdb-movie"
            value={movie.originalTitle || ""}
            onChange={(v, fullObj) => handleSelectMovie(v, fullObj)}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Title</label>
          <input
            type="text"
            value={movie.title || ""}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Description</label>
          <input
            type="text"
            value={movie.description || ""}
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
            value={movie.releaseYear || ""}
            onChange={(e) =>
              setMovie({ ...movie, releaseYear: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Runtime (ex: 120 min)</label>
          <input
            type="text"
            value={movie.duration || ""}
            onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Age Rating</label>
          <select
            value={movie.ageRating || ""}
            onChange={(e) =>
              setMovie((prev) => ({ ...prev, ageRating: e.target.value }))
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          >
            <option value="">Select Age Rating</option>
            <option value="G">G (General Audiences)</option>
            <option value="PG">PG (Parental Guidance Suggested)</option>
            <option value="PG-13">PG-13 (Parents Strongly Cautioned)</option>
            <option value="R">R (Restricted)</option>
            <option value="NC-17">NC-17 (Adults Only)</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-300">Rating (ex: 8.5)</label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="10"
            value={movie.rating || ""}
            onChange={(e) =>
              setMovie((prev) => ({ ...prev, rating: e.target.value }))
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Poster URL (Portrait)</label>
          <input
            type="text"
            value={movie.posterImage || ""}
            onChange={(e) =>
              setMovie({ ...movie, posterImage: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">
            Banner URL (Landscape)
          </label>
          <input
            type="text"
            value={movie.bannerImage || ""}
            onChange={(e) =>
              setMovie({ ...movie, bannerImage: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">YouTube Trailer URL</label>
          <input
            type="text"
            value={movie.trailerUrl || ""}
            onChange={(e) => setMovie({ ...movie, trailerUrl: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Video Movie URL</label>
          <input
            type="text"
            value={movie.videoUrl || ""}
            onChange={(e) => setMovie({ ...movie, videoUrl: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Category</label>
          <select
            value={movie.category || ""}
            onChange={(e) => setMovie({ ...movie, category: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm cursor-pointer"
          >
            <option value="Movies">Movies</option>
            <option value="Series">Series</option>
            <option value="Documentary">Documentary</option>
            <option value="Anime">Anime</option>
            <option value="Short Film">Short Film</option>
          </select>
        </div>

        <div className="flex gap-8 mt-6 ml-10">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={movie.isTrending}
              onChange={(e) =>
                setMovie({ ...movie, isTrending: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>Trending Movie</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={movie.isPopular}
              onChange={(e) =>
                setMovie({ ...movie, isPopular: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>Popular Movie</span>
          </label>
        </div>

        <div className="md:col-span-2">
          <SmartInputMultiple
            label="Genres"
            source={genres}
            value={movie.genres || []}
            onChange={(v) => setMovie((prev) => ({ ...prev, genres: v }))}
            className={
              errors.genres ? "border-red-500 animate-pulse" : "border-gray-600"
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Director (pisahkan dengan koma)</label>
          <input
            type="text"
            value={Array.isArray(movie.director) ? movie.director.join(", ") : movie.director || ""}
            onChange={(e) => setMovie({ ...movie, director: e.target.value.split(",").map(s => s.trim()) })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Actors (pisahkan dengan koma)</label>
          <input
            type="text"
            value={Array.isArray(movie.actors) ? movie.actors.join(", ") : movie.actors || ""}
            onChange={(e) => setMovie({ ...movie, actors: e.target.value.split(",").map(s => s.trim()) })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Tags</label>
          <SmartInputMultiple
            type="local"
            value={movie.tags || []}
            onChange={(v) => setMovie((prev) => ({ ...prev, tags: v }))}
            source={movieTags}
            placeholder="Select Tags"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Plot</label>
          <textarea
            id="desc"
            rows="5"
            value={movie.plot || ""}
            onChange={(e) => setMovie({ ...movie, plot: e.target.value })}
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none overflow-hidden"
          ></textarea>
        </div>

        <div className="md:col-span-2">
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
