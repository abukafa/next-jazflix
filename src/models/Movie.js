import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movieId: { type: Number, index: true, unique: true, sparse: true }, // TMDB movie ID
    imdbId: { type: String, sparse: true },
    title: { type: String, required: true },
    originalTitle: String,
    description: String,
    releaseYear: Number,
    duration: String,
    ageRating: String,
    rating: String,
    posterImage: String,
    bannerImage: String,
    videoUrl: { type: String, required: true },
    trailerUrl: String,
    genres: [String],
    category: { type: String, default: "Movies" },
    tags: [String],
    actors: [String],
    director: [String],
    plot: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
