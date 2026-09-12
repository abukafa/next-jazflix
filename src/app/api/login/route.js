export async function POST() {
  return Response.json(
    {
      error: "Autentikasi sekarang menggunakan SSO Jaz Academy. Silakan login melalui tombol 'Login via Jaz Academy'.",
      ssoUrl: "/api/auth/sso",
    },
    { status: 400 }
  );
}

export async function GET() {
  return Response.redirect(new URL("/api/auth/sso", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}

