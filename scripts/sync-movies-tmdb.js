import { connectDB } from "../src/lib/db.js";
import Movie from "../src/models/Movie.js";
import mongoose from "mongoose";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  process.env.TMDB_KEY ||
  process.env.NEXT_PUBLIC_TMDB_KEY ||
  process.env.NEXT_PUBLIC_TMDB_BEARER ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2MzYmNkZmRiOGMyNzMzNWE1ZTJmYTIyZWY2Yzc3OSIsIm5iZiI6MTcxMTE3NzAzOS45MjksInN1YiI6IjY1ZmU3ZDRmMWIxZjNjMDE3Yzk4ZTFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PlR_trKl9bLOsh2sp32-XOlXbBzjMB2zDL1MnXN5dk";

function getHeaders() {
  if (TMDB_TOKEN.startsWith("eyJ")) {
    return { Authorization: `Bearer ${TMDB_TOKEN}` };
  }
  return {};
}

async function tmdbFetch(endpoint) {
  let url = `${TMDB_BASE_URL}${endpoint}`;
  if (!TMDB_TOKEN.startsWith("eyJ")) {
    url += `${url.includes("?") ? "&" : "?"}api_key=${TMDB_TOKEN}`;
  }
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    throw new Error(`TMDB error ${res.status} on ${endpoint}`);
  }
  return res.json();
}

async function searchTmdb(query, year) {
  if (!query) return null;
  // Try with year first
  if (year) {
    const data = await tmdbFetch(
      `/search/movie?query=${encodeURIComponent(query)}&year=${year}&language=en-US`
    );
    if (data.results && data.results.length > 0) return data.results[0];
  }

  // Fallback without year
  const data = await tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&language=en-US`
  );
  if (data.results && data.results.length > 0) return data.results[0];

  return null;
}

function getTrailerUrl(videos) {
  if (!videos || !videos.results || videos.results.length === 0) return null;
  const trailer =
    videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
    ) ||
    videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos.results.find((v) => v.site === "YouTube");
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

async function syncMovies() {
  console.log("=== Starting TMDB Synchronization for MongoDB Movies ===");
  try {
    await connectDB();
    const movies = await Movie.find().lean();
    console.log(`Found ${movies.length} movies in MongoDB.`);

    let successCount = 0;
    let unmatchedCount = 0;
    let errorCount = 0;
    const unmatchedList = [];

    for (let i = 0; i < movies.length; i++) {
      const m = movies[i];
      const progress = `[${i + 1}/${movies.length}]`;
      const titleToSearch = m.originalTitle || m.title;

      try {
        let tmdbId = m.movieId;

        if (!tmdbId) {
          // Search TMDB
          let match = await searchTmdb(m.originalTitle, m.releaseYear);
          if (!match && m.title && m.title !== m.originalTitle) {
            match = await searchTmdb(m.title, m.releaseYear);
          }
          if (match) {
            tmdbId = match.id;
          }
        }

        if (!tmdbId) {
          console.warn(`${progress} ⚠️ UNMATCHED: "${m.title}" (Original: "${m.originalTitle}")`);
          unmatchedCount++;
          unmatchedList.push({ id: m._id, title: m.title, originalTitle: m.originalTitle });
          continue;
        }

        // Fetch full movie details from TMDB
        const details = await tmdbFetch(
          `/movie/${tmdbId}?append_to_response=videos,credits,release_dates&language=en-US`
        );

        const trailerUrl = getTrailerUrl(details.videos);
        const director =
          details.credits?.crew?.find((c) => c.job === "Director")?.name || null;
        const actors = details.credits?.cast?.slice(0, 5).map((a) => a.name) || [];
        const usRelease = details.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
        const ageRating =
          usRelease?.release_dates?.find((d) => d.certification)?.certification ||
          m.ageRating ||
          "PG-13";

        const updateData = {
          movieId: details.id,
          imdbId: details.imdb_id || m.imdbId || null,
          title: m.title || details.title,
          originalTitle: details.original_title || m.originalTitle,
          description: details.overview || m.description,
          plot: details.overview ? [details.overview] : m.plot,
          releaseYear: details.release_date
            ? parseInt(details.release_date.split("-")[0], 10)
            : m.releaseYear,
          duration: details.runtime ? `${details.runtime} min` : m.duration,
          rating: details.vote_average
            ? Number(details.vote_average).toFixed(1)
            : m.rating,
          ageRating,
          posterImage: details.poster_path
            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
            : (m.posterImage && m.posterImage.startsWith("https://image.tmdb.org") ? m.posterImage : "/images/no-photo.png"),
          bannerImage: details.backdrop_path
            ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
            : (m.bannerImage && m.bannerImage.startsWith("https://image.tmdb.org") ? m.bannerImage : "/images/hero-image.png"),
          trailerUrl: trailerUrl || m.trailerUrl,
          genres: details.genres?.length
            ? details.genres.map((g) => g.name)
            : m.genres,
        };

        if (director) {
          updateData.director = [director];
        }
        if (actors.length > 0) {
          updateData.actors = actors;
        }

        await Movie.findByIdAndUpdate(m._id, updateData);
        successCount++;
        console.log(
          `${progress} ✅ SYNCED: "${m.title}" -> TMDB ID: ${details.id} ("${details.title}")`
        );
      } catch (err) {
        console.error(`${progress} ❌ ERROR on "${m.title}":`, err.message);
        errorCount++;
      }

      // Small throttle to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    console.log("\n=== Synchronization Summary ===");
    console.log(`Total Movies     : ${movies.length}`);
    console.log(`Successfully Synced: ${successCount}`);
    console.log(`Unmatched        : ${unmatchedCount}`);
    console.log(`Errors           : ${errorCount}`);

    if (unmatchedList.length > 0) {
      console.log("\nUnmatched Movies List:");
      unmatchedList.forEach((item) =>
        console.log(` - ID: ${item.id} | Title: "${item.title}" | Original: "${item.originalTitle}"`)
      );
    }
  } catch (error) {
    console.error("Migration Fatal Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

syncMovies();
