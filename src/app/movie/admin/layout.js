import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/movie/login");
  }

  try {
    // Verifikasi token sederhana tanpa cek database untuk mempercepat response
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Jika perlu proteksi tambahan berdasarkan role, bisa ditambahkan di sini
    // Misalnya, jika role guest tapi somehow berhasil login, tolak akses:
    if (decoded.role === "guest") {
      redirect("/"); // atau kembalikan ke halaman login
    }
  } catch (error) {
    redirect("/movie/login");
  }

  return <>{children}</>;
}
