export async function POST() {
  return Response.json(
    {
      message: "Registrasi otomatis terintegrasi dengan Jaz Academy SSO. Silakan langsung login dengan akun Jaz Academy Anda.",
      ssoUrl: "/api/auth/sso",
    },
    { status: 200 }
  );
}

export async function GET() {
  return Response.redirect(new URL("/api/auth/sso", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}

