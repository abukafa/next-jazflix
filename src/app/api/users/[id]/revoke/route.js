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

    if (user.role === "superadmin") {
      return Response.json({ message: "Superadmin tidak dapat diubah statusnya!" }, { status: 403 });
    }

    user.isApproved = false;
    user.role = "guest";
    
    await user.save();

    return Response.json({ message: "Akun dikembalikan ke status guest/pending" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
