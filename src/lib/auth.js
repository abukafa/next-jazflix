import jwt from "jsonwebtoken";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export function signToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      jazacademyId: user.jazacademyId,
      name: user.name,
      email: user.email,
      role: user.role,
      memberType: user.memberType,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Upserts a user from JazAcademy SSO UserInfo payload.
 * Automatically handles registration or login, role assignment, and profile syncing.
 */
export async function upsertJazAcademyUser(ssoUser) {
  await connectDB();

  const normalizedEmail = (ssoUser.email || "").toLowerCase().trim();
  const jazId = Number(ssoUser.id || ssoUser.sub);

  // Search existing user by jazacademyId or email
  let user = await User.findOne({
    $or: [{ jazacademyId: jazId }, { email: normalizedEmail }],
  });

  const totalUsers = await User.countDocuments();

  // Role resolution
  let role = "member";
  if (totalUsers === 0) {
    // The very first user to authenticate becomes superadmin
    role = "superadmin";
  } else if (user) {
    role = user.role;
    // If JazAcademy user is Admin (role > 0 or member_type === 'Admin'), elevate if member
    if (
      (ssoUser.role > 0 || ssoUser.member_type === "Admin") &&
      (role === "member" || role === "guest")
    ) {
      role = "admin";
    }
  } else {
    // New user
    if (ssoUser.role > 0 || ssoUser.member_type === "Admin") {
      role = "admin";
    } else {
      role = "member";
    }
  }

  const userData = {
    jazacademyId: jazId,
    name: ssoUser.name || ssoUser.username || "Jaz Academy User",
    username: ssoUser.username || (normalizedEmail ? normalizedEmail.split("@")[0] : `user_${jazId}`),
    email: normalizedEmail,
    avatar: ssoUser.avatar || null,
    memberType: ssoUser.member_type || "Member",
    bio: ssoUser.bio || "",
    skills: Array.isArray(ssoUser.skills) ? ssoUser.skills : [],
    provider: "jazacademy",
    isApproved: true,
    role,
  };

  if (user) {
    // Update existing user profile
    Object.assign(user, userData);
    await user.save();
  } else {
    // Create new user
    user = await User.create(userData);
  }

  return user;
}

