import { connectDB } from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(_, props) {
  try {
    await connectDB();

    const { id } = await props.params; // ← INI WAJIB

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);
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

    const user = await User.findByIdAndUpdate(id, data, { new: true });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_, props) {
  try {
    await connectDB();

    const { id } = await props.params;

    await User.findByIdAndDelete(id);

    return Response.json({ message: "User successfully deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
