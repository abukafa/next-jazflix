import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import mongoose from "mongoose";

export async function GET(_, props) {
  try {
    await connectDB();

    const { id } = await props.params; // ← INI WAJIB

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid movie ID format" },
        { status: 400 }
      );
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return Response.json({ message: "Movie not found" }, { status: 404 });
    }

    return Response.json(movie);
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, props) {
  try {
    await connectDB();

    const { id } = await props.params;
    const data = await req.json();

    const movie = await Movie.findByIdAndUpdate(id, data, { new: true });

    if (!movie) {
      return Response.json({ message: "Movie not found" }, { status: 404 });
    }

    return Response.json(movie);
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_, props) {
  try {
    await connectDB();

    const { id } = await props.params;

    await Movie.findByIdAndDelete(id);

    return Response.json({ message: "Movie successfully deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
