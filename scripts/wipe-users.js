import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Load .env.local manually if not in process.env
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const [key, ...values] = trimmed.split("=");
          if (key && values.length > 0) {
            process.env[key.trim()] = values.join("=").trim();
          }
        }
      });
    }
  } catch (e) {
    console.error("Error reading .env.local:", e);
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env.local!");
  process.exit(1);
}

async function wipeUsers() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully.");

    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    const countBefore = await usersCollection.countDocuments();
    console.log(`Current users in database: ${countBefore}`);

    if (countBefore > 0) {
      const result = await usersCollection.deleteMany({});
      console.log(`Successfully deleted ${result.deletedCount} users from database.`);
    } else {
      console.log("No users found to delete. Collection is already empty.");
    }

    const countAfter = await usersCollection.countDocuments();
    console.log(`Remaining users count: ${countAfter}`);
    console.log("Wipe completed successfully.");
  } catch (error) {
    console.error("Error during wipe:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
}

wipeUsers();
