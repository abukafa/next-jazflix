import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export async function GET() {
  await connectDB();
  const movies = await Movie.find().sort({ createdAt: -1 });
  return Response.json(movies);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const movie = await Movie.create(data);
  return Response.json(movie, { status: 201 });
}
