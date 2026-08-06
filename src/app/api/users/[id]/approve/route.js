import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { params } = context;
    const { id } = await params;

    const user = await User.findById(id);
    if (!user) {
      return Response.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    user.isApproved = true;
    if (user.role === "guest") {
      user.role = "admin";
    }
    await user.save();

    return Response.json({ message: "Akun disetujui" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
