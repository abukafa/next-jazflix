import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  originalTitle: String,
  description: String,
  releaseYear: Number,
  duration: String,
  ageRating: String,
  rating: String,
  posterImage: String,
  bannerImage: String,
  videoUrl: String,
  trailerUrl: String,
  genres: [String],
  category: String,
  tags: [String],
  actors: [String],
  director: [String],
  isTrending: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
  plot: [String],
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
