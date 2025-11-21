"use client";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
          Jazflix login
        </h1>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg font-semibold text-sm">
            <Link href="/admin">Login</Link>
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          {"Continue "}
          <Link href="/" className="text-red-500 hover:underline">
            Watching!
          </Link>
        </p>
      </div>
    </div>
  );
}
