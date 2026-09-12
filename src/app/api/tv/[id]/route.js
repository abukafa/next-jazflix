import { connectDB } from "@/lib/db";
import TvShow from "@/models/TvShow";
import mongoose from "mongoose";

export async function GET(_, props) {
  try {
    await connectDB();
    const { id } = await props.params;

    let tv = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      tv = await TvShow.findById(id).lean();
    }
    if (!tv && !isNaN(Number(id))) {
      tv = await TvShow.findOne({ tvId: Number(id) }).lean();
    }

    if (!tv) {
      return Response.json({ message: "TV Show not found" }, { status: 404 });
    }

    return Response.json(tv);
  } catch (error) {
    console.error("GET /api/tv/[id] Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, props) {
  try {
    await connectDB();
    const { id } = await props.params;
    const data = await req.json();

    let tv = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      tv = await TvShow.findByIdAndUpdate(id, { $set: data }, { new: true });
    }
    if (!tv && !isNaN(Number(id))) {
      tv = await TvShow.findOneAndUpdate({ tvId: Number(id) }, { $set: data }, { new: true });
    }

    if (!tv) {
      return Response.json({ message: "TV Show not found" }, { status: 404 });
    }

    return Response.json(tv);
  } catch (error) {
    console.error("PUT /api/tv/[id] Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_, props) {
  try {
    await connectDB();
    const { id } = await props.params;

    let tv = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      tv = await TvShow.findByIdAndDelete(id);
    }
    if (!tv && !isNaN(Number(id))) {
      tv = await TvShow.findOneAndDelete({ tvId: Number(id) });
    }

    return Response.json({ message: "TV Show successfully deleted" });
  } catch (error) {
    console.error("DELETE /api/tv/[id] Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
