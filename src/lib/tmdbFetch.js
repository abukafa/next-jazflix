// ---------- Helper TMDB fetch utility ----------
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_KEY || null;
const TMDB_FALLBACK_BEARER =
  process.env.NEXT_PUBLIC_TMDB_BEARER ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2MzYmNkZmRiOGMyNzMzNWE1ZTJmYTIyZWY2Yzc3OSIsIm5iZiI6MTcxMTE3NzAzOS45MjksInN1YiI6IjY1ZmU3ZDRmMWIxZjNjMDE3Yzk4ZTFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PlR_trKl9bLOsh2sp32-XOlXbBzjMB2zDL1MnXN5dk";

async function tmdbFetch(path) {
  const base = "https://api.themoviedb.org/3";
  if (TMDB_KEY) {
    // use api_key param
    const url = `${base}${path}${
      path.includes("?") ? "&" : "?"
    }api_key=${TMDB_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("TMDB fetch failed");
    return res.json();
  }

  // fallback to bearer (v4 token)
  const url = `${base}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TMDB_FALLBACK_BEARER}` },
  });
  if (!res.ok) throw new Error("TMDB fetch failed");
  return res.json();
}
