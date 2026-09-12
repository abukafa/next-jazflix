import Navbar from "@/components/Navbar";
import EditTvShowForm from "@/components/EditTvShowForm";
import { connectDB } from "@/lib/db";
import TvShow from "@/models/TvShow";
import mongoose from "mongoose";

async function getTvShow(id) {
  await connectDB();
  let tv = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    tv = await TvShow.findById(id).lean();
  }
  if (!tv && !isNaN(Number(id))) {
    tv = await TvShow.findOne({ tvId: Number(id) }).lean();
  }
  return tv ? JSON.parse(JSON.stringify(tv)) : null;
}

export default async function EditTvPage({ params }) {
  const { id } = await params;
  const tvShow = await getTvShow(id);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <EditTvShowForm initialTvShow={tvShow} />
    </div>
  );
}
