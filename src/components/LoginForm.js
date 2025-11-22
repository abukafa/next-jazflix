"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.token) {
      document.cookie = `token=${data.token}; path=/`; // simpan token di cookie
      window.location.href = "/movie/admin";
    } else alert(data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
          Jazflix login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg font-semibold text-sm cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          {"Continue "}
          <Link href="/" className="text-red-500 text-bold hover:underline">
            Watching!
          </Link>
        </p>
      </div>
    </div>
  );
}
