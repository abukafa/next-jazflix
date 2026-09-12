import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { params } = context;
    const { id } = await params;
    const { role } = await req.json();

    const allowedRoles = ["superadmin", "admin", "member", "guest"];
    if (!allowedRoles.includes(role)) {
      return Response.json({ message: "Role tidak valid" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return Response.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    user.role = role;
    await user.save();

    return Response.json({ message: `Role berhasil diperbarui menjadi ${role}`, user });
  } catch (error) {
    return Response.json({ message: "Terjadi kesalahan saat memperbarui role" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { params } = context;
    const { id } = await params;

    const user = await User.findById(id);
    if (!user) {
      return Response.json({ message: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    if (user.role === "superadmin") {
      return Response.json({ message: "Superadmin tidak dapat dihapus!" }, { status: 403 });
    }

    await User.findByIdAndDelete(id);

    return Response.json({ message: "Pengguna dihapus" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}

