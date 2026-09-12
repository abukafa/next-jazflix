import mongoose from "mongoose";

const tvEpisodeSchema = new mongoose.Schema(
  {
    seasonNumber: { type: Number, required: true },
    episodeNumber: { type: Number, required: true },
    name: { type: String, default: "" },
    overview: { type: String, default: "" },
    stillImage: { type: String, default: "" },
    airDate: { type: String, default: "" },
    runtime: { type: String, default: "" },
    videoUrl: { type: String, default: "" }, // Video URL (Google Drive, MP4, HLS, embed, etc.)
  },
  { _id: false }
);

const tvShowSchema = new mongoose.Schema(
  {
    tvId: { type: Number, required: true, unique: true, index: true }, // TMDB TV ID
    title: { type: String, required: true },
    originalTitle: { type: String, default: "" },
    description: { type: String, default: "" },
    releaseYear: { type: Number, default: null },
    rating: { type: String, default: "N/A" },
    ageRating: { type: String, default: "TV-14" },
    posterImage: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    trailerUrl: { type: String, default: "" },
    genres: { type: [String], default: [] },
    numberOfSeasons: { type: Number, default: 1 },
    numberOfEpisodes: { type: Number, default: 0 },
    episodes: { type: [tvEpisodeSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TvShow || mongoose.model("TvShow", tvShowSchema);
