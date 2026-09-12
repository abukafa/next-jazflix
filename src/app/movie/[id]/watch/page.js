import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";
import mongoose from "mongoose";
import Link from "next/link";

export const revalidate = 60;

async function getMovie(id) {
  await connectDB();
  const isNumeric = !isNaN(Number(id));
  const isMongoId = mongoose.Types.ObjectId.isValid(id);

  let movie = null;
  if (isNumeric) {
    movie = await Movie.findOne({ movieId: Number(id) }).lean();
  }
  if (!movie && isMongoId) {
    movie = await Movie.findById(id).lean();
  }
  return movie ? JSON.parse(JSON.stringify(movie)) : null;
}

function getDriveId(url) {
  const patterns = [
    /\/d\/([^/]+)/, // .../d/FILEID/...
    /id=([^&]+)/, // ...id=FILEID
    /\/file\/([^/?]+)/, // .../file/FILEID
  ];
  for (const p of patterns) {
    const match = url?.match(p);
    if (match) return match[1];
  }
  return null;
}

export default async function MovieWatch({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <p className="text-xl font-semibold mb-4 text-center">
          Data film tidak ditemukan di database Jazflix.
        </p>
        <Link
          href={`/movie/${id}`}
          className="px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition"
        >
          Kembali ke Detail Film
        </Link>
      </div>
    );
  }

  // Jika tidak ada videoUrl
  if (!movie.videoUrl) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <p className="text-xl font-semibold mb-4 text-center">
          Link video belum tersedia untuk film ini.
        </p>
        <Link
          href={`/movie/${id}`}
          className="px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition"
        >
          Kembali ke Detail Film
        </Link>
      </div>
    );
  }

  // Cek apakah Google Drive
  let embedUrl = movie.videoUrl;
  if (movie.videoUrl.includes("drive.google.com") || movie.videoUrl.includes("docs.google.com")) {
    const fileId = getDriveId(movie.videoUrl);
    if (fileId) {
      embedUrl = `https://drive.google.com/file/d/${fileId}/preview?autoplay=1`;
    }
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div className="absolute top-4 left-4 z-50">
        <Link
          href={`/movie/${id}`}
          className="px-4 py-2 bg-black/70 hover:bg-black/90 text-white rounded-lg text-sm backdrop-blur-md flex items-center gap-2 border border-white/20 transition"
        >
          <i className="fa-solid fa-arrow-left"></i> Kembali
        </Link>
      </div>
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
