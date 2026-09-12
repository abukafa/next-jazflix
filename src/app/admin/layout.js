import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    // Verifikasi token sederhana tanpa cek database untuk mempercepat response
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Hanya perbolehkan role admin dan superadmin
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      redirect("/");
    }
  } catch (error) {
    redirect("/login");
  }

  return <>{children}</>;
}
