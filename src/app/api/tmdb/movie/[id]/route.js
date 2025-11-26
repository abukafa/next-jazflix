export async function GET(_, { params }) {
  const { id } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  const data = await res.json();
  return Response.json(data);
}
