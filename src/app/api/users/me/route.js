import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  let token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    token = req.cookies.get("token")?.value;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const dbUser = await User.findById(decoded.id).lean();
    return Response.json({ user: dbUser || decoded });
  } catch (e) {
    return Response.json({ user: decoded });
  }
}

