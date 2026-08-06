import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "guest", enum: ["guest", "admin", "superadmin"] },
  profilePicture: String,
  favorites: [String],
  isApproved: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
