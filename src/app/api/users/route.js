import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 });
  return Response.json(users);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const movie = await User.create(data);
  return Response.json(movie, { status: 201 });
}
