import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get("returnTo") || "/";

  const idpUrl = (process.env.JAZACADEMY_IDP_URL || "http://localhost:8000").replace(/\/$/, "");
  const clientId = process.env.JAZACADEMY_CLIENT_ID || "5";
  const redirectUri =
    process.env.JAZACADEMY_REDIRECT_URI || "http://localhost:3000/api/auth/sso/callback";

  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = new URL(`${idpUrl}/oauth/authorize`);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "profile email");
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl.toString());

  // Store state and returnTo in cookie for verification
  response.cookies.set("jaz_oauth_state", state, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  response.cookies.set("jaz_oauth_return_to", returnTo, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return response;
}
