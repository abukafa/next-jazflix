"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-red-500">Jazflix</div>

        <div className="hidden md:flex gap-6 text-sm">
          <Link href="/" className="hover:text-red-500">
            Home
          </Link>
          <Link href="#popular" className="hover:text-red-500">
            Populars
          </Link>
          <Link href="#movies" className="hover:text-red-500">
            Movies
          </Link>
          <Link href="/movie/admin" className="hover:text-red-500">
            Admin
          </Link>
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
