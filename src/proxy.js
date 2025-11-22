import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(req) {
  const url = new URL(req.url);

  // hanya proteksi /admin
  if (url.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
