"use client";
import Link from "next/link";

const getYouTubeId = (url) => {
  const regExp = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function MovieDetail({ movie }) {
  let youTubeId = getYouTubeId(movie.trailerUrl);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-[350px] md:h-[500px] object-cover"
            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=0&mute=1&controls=1`}
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-3 text-xs text-yellow-400 font-semibold">
              ⭐ {movie.rating || 5}/10
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{movie.ageRating}</span>
            </div>

            <br />

            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <span className="text-white font-semibold">Original: </span>
                {movie.originalTitle}
              </p>
              <p>
                <span className="text-white font-semibold">Genre: </span>
                {movie.genres.join(", ")}
              </p>
              <p>
                <span className="text-white font-semibold">Category: </span>
                {movie.category}
              </p>
              <p>
                <span className="text-white font-semibold">Runtime: </span>
                {movie.duration}
              </p>
              <p>
                <span className="text-white font-semibold">Year: </span>
                {movie.releaseYear}
              </p>
              <p>
                <span className="text-white font-semibold">Director: </span>
                {movie.director?.join(", ")}
              </p>
              <p>
                <span className="text-white font-semibold">Actors:</span>
                {movie.actors?.join(", ")}
              </p>
              <p>
                <span className="text-white font-semibold">Plot: </span>
                {movie.description}.
                <span className="hidden lg:inline"> {movie.plot}</span>
              </p>
            </div>
          </div>

          <Link href={`/movie/${movie._id}/watch`}>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm mt-4 cursor-pointer">
              <i className="fa-solid fa-play"></i> Play Movie
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
