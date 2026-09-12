export const revalidate = 60;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TvExplorer from "@/components/TvExplorer";
import { getTvShowsPaginated, getTvGenres } from "@/lib/tmdb";
import { connectDB } from "@/lib/db";
import TvShow from "@/models/TvShow";

export default async function TvPage() {
  let initialTvShows = [];
  let genres = [];

  try {
    const [tvData, genresData] = await Promise.all([
      getTvShowsPaginated({ category: "popular", page: 1 }),
      getTvGenres(),
    ]);
    initialTvShows = tvData.results || [];
    genres = genresData || [];

    try {
      await connectDB();
      const localShows = await TvShow.find(
        { "episodes.videoUrl": { $exists: true, $ne: "" } },
        { tvId: 1, title: 1, episodes: 1 }
      ).lean();

      const localTvIdSet = new Set(
        localShows
          .filter((s) => s.tvId && s.episodes?.some((e) => e.videoUrl && e.videoUrl.trim()))
          .map((s) => Number(s.tvId))
      );
      const localTvTitles = new Set(
        localShows
          .filter((s) => s.title && s.episodes?.some((e) => e.videoUrl && e.videoUrl.trim()))
          .map((s) => s.title.trim().toLowerCase())
      );

      initialTvShows = initialTvShows.map((t) => {
        const numId = Number(t.id || t.tvId);
        const isIdMatch = !isNaN(numId) && localTvIdSet.has(numId);
        const isTitleMatch = t.title && localTvTitles.has(t.title.trim().toLowerCase());
        return {
          ...t,
          hasVideo: Boolean(isIdMatch || isTitleMatch),
        };
      });
    } catch (dbErr) {
      console.error("Failed to load local tv shows for tv page:", dbErr);
    }
  } catch (err) {
    console.error("Failed to load initial TV page data:", err);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <TvExplorer
        initialTvShows={initialTvShows}
        genres={genres}
        initialCategory="popular"
      />
      <Footer />
    </div>
  );
}
