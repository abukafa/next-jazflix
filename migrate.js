import { connectDB } from "./src/lib/db.js";
import User from "./src/models/User.js";
import mongoose from "mongoose";

async function migrate() {
  try {
    await connectDB();
    const result = await User.updateMany({}, {
      $set: {
        role: "superadmin",
        isApproved: true
      }
    });
    console.log("Migration successful:", result);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    mongoose.disconnect();
  }
}

migrate();
