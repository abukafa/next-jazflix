import mongoose, { Schema } from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  originalTitle: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number },
  duration: { type: String },
  ageRating: { type: String },
  rating: { type: String },
  posterImage: { type: String, required: true },
  bannerImage: { type: String },
  videoUrl: { type: String },
  trailerUrl: { type: String },
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  actors: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  director: [String],
  // For movies
  isTrending: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
