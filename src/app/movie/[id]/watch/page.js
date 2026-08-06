import { connectDB } from "@/lib/db";
import Movie from "@/models/Movie";

export const revalidate = 60;

async function getMovie(id) {
  await connectDB();
  const movie = await Movie.findById(id).lean();
  return JSON.parse(JSON.stringify(movie));
}

function getDriveId(url) {
  const patterns = [
    /\/d\/([^/]+)/, // .../d/FILEID/...
    /id=([^&]+)/, // ...id=FILEID
    /\/file\/([^/?]+)/, // .../file/FILEID
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export default async function MovieWatch({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  // Jika tidak ada videoUrl
  if (!movie.videoUrl) {
    return <p className="text-center mt-5">Video URL tidak ditemukan.</p>;
  }

  // Jika format kurang benar
  if (!movie.videoUrl.includes("drive")) {
    return (
      <p className="text-center mt-5">Format URL Google Drive tidak valid.</p>
    );
  }

  let fileId = null;

  try {
    fileId = getDriveId(movie.videoUrl);
  } catch (err) {
    return (
      <p className="text-center mt-5">Gagal memproses URL Google Drive.</p>
    );
  }

  // Jika gagal extract ID
  if (!fileId) {
    return (
      <p className="text-center mt-5">File ID Google Drive tidak ditemukan.</p>
    );
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview?autoplay=1`}
        className="w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
