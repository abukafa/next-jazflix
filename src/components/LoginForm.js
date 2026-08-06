"use client";
import { useState } from "react";
import Link from "next/link";
import InstallPWA from "./InstallPWA";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/register";
    const body = isLogin ? { email, password } : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
        window.location.href = "/movie/admin";
      } else {
        alert(data.message);
        if (!isLogin) setIsLogin(true); // switch ke login setelah berhasil daftar
      }
    } else {
      alert(data.error || data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <InstallPWA />
      <div className="w-full max-w-sm bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
          {isLogin ? "Jazflix Login" : "Jazflix Register"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-300">Name</label>
              <input
                type="text"
                required
                className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg font-semibold text-sm cursor-pointer mt-2"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs my-5">
          {isLogin ? "Not registered? " : "Already registered? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 text-bold hover:underline cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </button>
          {" or continue "}
          <Link href="/" className="text-red-500 text-bold hover:underline">
            Watching!
          </Link>
        </p>
      </div>
    </div>
  );
}
