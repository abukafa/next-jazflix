import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  const headerToken = req.headers.get("Authorization");
  const cookiesToken = req.cookies.get("token")?.value;

  const user = verifyToken(headerToken) || verifyToken(cookiesToken);

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ user });
}
