export const revalidate = 60;
import HomePage from "@/components/HomePage";
import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/tmdb";

async function getLocalMovies() {
  await connectDB();
  const movies = await Movie.find().sort({ _id: -1 }).lean();
  return JSON.parse(JSON.stringify(movies));
}

export default async function Home() {
  const localMovies = await getLocalMovies();

  // Create a set of TMDB IDs and titles that have videoUrl in MongoDB
  const localMovieIdSet = new Set(
    localMovies
      .filter((m) => Boolean(m.videoUrl && m.videoUrl.trim() && (m.movieId || m.id)))
      .map((m) => Number(m.movieId || m.id))
      .filter((num) => !isNaN(num) && num > 0)
  );

  const localMovieTitles = new Set(
    localMovies
      .filter((m) => Boolean(m.videoUrl && m.videoUrl.trim() && m.title))
      .map((m) => m.title.trim().toLowerCase())
  );

  const attachHasVideo = (movieList = []) =>
    movieList.map((m) => {
      const numId = Number(m.id || m.movieId);
      const isIdMatch = !isNaN(numId) && localMovieIdSet.has(numId);
      const isTitleMatch = m.title && localMovieTitles.has(m.title.trim().toLowerCase());
      return {
        ...m,
        hasVideo: Boolean(isIdMatch || isTitleMatch || m.hasVideo),
      };
    });

  let nowPlaying = [];
  let popular = [];
  let topRated = [];
  let upcoming = [];

  try {
    const [nowPlayingRes, popularRes, topRatedRes, upcomingRes] =
      await Promise.all([
        getNowPlayingMovies(1),
        getPopularMovies(1),
        getTopRatedMovies(1),
        getUpcomingMovies(1),
      ]);
    nowPlaying = attachHasVideo(nowPlayingRes);
    popular = attachHasVideo(popularRes);
    topRated = attachHasVideo(topRatedRes);
    upcoming = attachHasVideo(upcomingRes);
  } catch (error) {
    console.error(
      "Failed to fetch TMDB movies for home page, falling back to local:",
      error
    );
    nowPlaying = attachHasVideo(localMovies.slice(0, 10));
    popular = attachHasVideo(localMovies.slice(10, 30));
    topRated = popular;
    upcoming = nowPlaying;
  }

  const genres = [
    "All",
    ...new Set(localMovies.flatMap((m) => m.genres || []).filter(Boolean)),
  ];
  const years = [
    "All",
    ...new Set(localMovies.map((m) => m.releaseYear).filter(Boolean)),
  ]
    .sort()
    .reverse();

  return (
    <HomePage
      movies={localMovies}
      genres={genres}
      years={years}
      trending={nowPlaying}
      populars={popular}
      topRated={topRated}
      upcoming={upcoming}
    />
  );
}
