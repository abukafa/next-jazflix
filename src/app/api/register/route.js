import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return Response.json({ error: "Email sudah terdaftar" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Periksa apakah ini pengguna pertama
  const totalUsers = await User.countDocuments();
  const isApproved = totalUsers === 0;
  const role = totalUsers === 0 ? "superadmin" : "guest";

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isApproved,
  });

  if (isApproved) {
    // Jika langsung diapprove (user pertama), berikan token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return Response.json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
      message: "Registrasi berhasil, Anda login sebagai superadmin"
    });
  } else {
    // Jika menunggu approval
    return Response.json({
      message: "Registrasi berhasil. Akun Anda sedang menunggu persetujuan dari Admin Utama."
    }, { status: 201 });
  }
}
