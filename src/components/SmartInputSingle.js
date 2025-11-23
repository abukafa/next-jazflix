"use client";
import { useState, useEffect, useRef } from "react";

export default function SmartInputSingle({
  label,
  type = "local",
  source = [],
  value = "",
  onChange,
  className = "",
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const inputRef = useRef(null);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2MzYmNkZmRiOGMyNzMzNWE1ZTJmYTIyZWY2Yzc3OSIsIm5iZiI6MTcxMTE3NzAzOS45MjksInN1YiI6IjY1ZmU3ZDRmMWIxZjNjMDE3Yzk4ZTFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PlR_trKl9bLOsh2sp32-XOlXbBzjMB2zDL1MnXN5dk";

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setHighlight(-1);
      return;
    }

    const load = async () => {
      let items = [];

      if (type === "tmdb-movie") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        const data = await res.json();
        items = (data.results || []).map((m) => ({
          label: m.title,
          full: m,
        }));
      } else if (type === "tmdb-person") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/person?query=${query}`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        const data = await res.json();
        items = (data.results || []).map((p) => ({ label: p.name, full: p }));
      } else {
        items = source
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
          .map((s) => ({ label: s, full: s }));
      }

      setSuggestions(items.slice(0, 6));
      setHighlight(items.length > 0 ? 0 : -1);
    };

    const delay = setTimeout(load, 250);
    return () => clearTimeout(delay);
  }, [query, type]);

  const choose = (item) => {
    setQuery(item.label);
    onChange(item.label, item.full);
    setSuggestions([]);
    setHighlight(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && suggestions[highlight]) {
        choose(suggestions[highlight]);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length) setHighlight((h) => (h + 1) % suggestions.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length)
        setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    }

    if (e.key === "Escape") {
      setSuggestions([]);
      setHighlight(-1);
    }
  };

  return (
    <div className="w-full relative">
      <label className="text-sm text-gray-300">{label}</label>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`${className} w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm`}
      />

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-black/80 border border-gray-600 rounded-lg mt-1 max-h-52 overflow-y-auto z-50 text-sm">
          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => choose(item)}
              className={`px-3 py-2 cursor-pointer ${
                highlight === i ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
