import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profilePicture: { type: String, default: "images/user/user.png" },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Media" }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
