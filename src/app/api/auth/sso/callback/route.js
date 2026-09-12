import { NextResponse } from "next/server";
import { upsertJazAcademyUser, signToken } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (error || !code) {
    console.error("SSO Callback error from IDP:", error, errorDescription);
    return NextResponse.redirect(
      new URL(`/movie/login?error=${encodeURIComponent(errorDescription || error || "Akses ditolak")}`, baseUrl)
    );
  }

  const idpUrl = (process.env.JAZACADEMY_IDP_URL || "http://localhost:8000").replace(/\/$/, "");
  const clientId = process.env.JAZACADEMY_CLIENT_ID || "5";
  const clientSecret = process.env.JAZACADEMY_CLIENT_SECRET;
  const redirectUri =
    process.env.JAZACADEMY_REDIRECT_URI || "http://localhost:3000/api/auth/sso/callback";

  try {
    // 1. Exchange authorization code for access_token
    const tokenResponse = await fetch(`${idpUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.text();
      console.error("Token exchange failed:", tokenResponse.status, errBody);
      return NextResponse.redirect(
        new URL("/movie/login?error=Gagal+menukar+kode+otorisasi", baseUrl)
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/movie/login?error=Access+token+tidak+ditemukan", baseUrl)
      );
    }

    // 2. Fetch UserInfo from JazAcademy
    const userinfoResponse = await fetch(`${idpUrl}/api/oauth/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!userinfoResponse.ok) {
      console.error("Failed to fetch userinfo:", userinfoResponse.status);
      return NextResponse.redirect(
        new URL("/movie/login?error=Gagal+mengambil+data+profil", baseUrl)
      );
    }

    const ssoUser = await userinfoResponse.json();

    // 3. Upsert into JazFlix MongoDB
    const user = await upsertJazAcademyUser(ssoUser);

    // 4. Generate JazFlix JWT Token
    const jazflixToken = signToken(user);

    // 5. Determine destination URL
    const returnToCookie = request.cookies.get("jaz_oauth_return_to")?.value;
    let targetPath = returnToCookie && returnToCookie !== "/movie/login" ? returnToCookie : null;

    if (!targetPath) {
      if (user.role === "admin" || user.role === "superadmin") {
        targetPath = "/movie/admin";
      } else {
        targetPath = "/";
      }
    }

    const response = NextResponse.redirect(new URL(targetPath, baseUrl));

    // Set cookie token for session
    response.cookies.set("token", jazflixToken, {
      path: "/",
      httpOnly: false, // Accessible by client scripts & components if needed
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    // Clean up temporary cookies
    response.cookies.delete("jaz_oauth_state");
    response.cookies.delete("jaz_oauth_return_to");

    return response;
  } catch (err) {
    console.error("Unexpected error in SSO callback:", err);
    return NextResponse.redirect(
      new URL("/movie/login?error=Terjadi+kesalahan+sistem+saat+login", baseUrl)
    );
  }
}
