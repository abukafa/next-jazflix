"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ onSearch }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/movie/admin");
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/movie/login";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch current user
    const checkUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch (e) {
        // Not logged in or error
      }
    };
    checkUser();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isUserAdmin =
    currentUser?.role === "admin" || currentUser?.role === "superadmin";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-red-500 tracking-wider">
          <Link href="/">JAZFLIX</Link>
        </div>

        <div className="hidden md:flex gap-6 text-sm items-center">
          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link href="/#popular" className="hover:text-red-500 transition">
            Populars
          </Link>
          <Link href="/#movies" className="hover:text-red-500 transition">
            Movies
          </Link>

          {isUserAdmin && (
            <>
              <Link href="/movie/admin" className="hover:text-red-500 transition">
                Dashboard
              </Link>
              <Link href="/movie/admin/users" className="hover:text-red-500 transition">
                Manage Users
              </Link>
            </>
          )}

          {currentUser ? (
            <div className="flex items-center gap-3 pl-2 border-l border-zinc-700">
              <div className="flex items-center gap-2">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || "User"}
                    className="w-7 h-7 rounded-full object-cover border border-zinc-600"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#7367F0] flex items-center justify-center text-white text-xs font-bold">
                    {(currentUser.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs text-zinc-300 font-medium max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                {currentUser.role && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      currentUser.role === "superadmin"
                        ? "bg-red-950 text-red-300 border border-red-800"
                        : currentUser.role === "admin"
                        ? "bg-purple-950 text-purple-300 border border-purple-800"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {currentUser.role}
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-zinc-400 hover:text-red-400 cursor-pointer ml-1"
                title="Keluar"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/movie/login"
              className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md cursor-pointer ml-2"
            >
              Login
            </Link>
          )}
        </div>

        <div
          className="relative h-6 flex items-center"
          x-data="{ showSearch:false, keyword:'' }"
        >
          {!showSearch && (
            <button
              onMouseEnter={() => setShowSearch(true)}
              className="text-xl text-gray-300 hover:text-white transition absolute right-0 top-0"
            >
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>
            </button>
          )}

          {showSearch && (
            <input
              onMouseLeave={() => setShowSearch(false)}
              onClick={() =>
                document
                  .querySelector("#movies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                onSearch(e.target.value);
              }}
              className="absolute right-0 top-0 w-48 bg-black/70 text-white px-3 py-1 rounded-xl border border-gray-600 text-sm focus:outline-none"
              placeholder="Search movies..."
              type="text"
            />
          )}
        </div>
      </div>
    </div>
  );
}
