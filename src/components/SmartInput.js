"use client";
import { useState, useEffect, useRef } from "react";

export default function SmartInput({
  label,
  value,
  onChange,
  type = "none", // tmdb-person | tmdb-movie | local | none
  multiple = false,
  source = [],
  limit = 8,
  className = "",
  placeholder = "Type...",
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const inputRef = useRef(null);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2MzYmNkZmRiOGMyNzMzNWE1ZTJmYTIyZWY2Yzc3OSIsIm5iZiI6MTcxMTE3NzAzOS45MjksInN1YiI6IjY1ZmU3ZDRmMWIxZjNjMDE3Yzk4ZTFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PlR_trKl9bLOsh2sp32-XOlXbBzjMB2zDL1MnXN5dk";

  // ==========================================
  // FETCH AUTOCOMPLETE (DINAMIS)
  // ==========================================
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setHighlight(-1);
      return;
    }

    const load = async () => {
      let results = [];

      // TMDB PERSON (actor / director)
      if (type === "tmdb-person") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/person?query=${query}`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        const data = await res.json();
        results = (data.results || []).map((p) => p.name);
      }

      // TMDB MOVIE TITLE
      else if (type === "tmdb-movie") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        const data = await res.json();
        results = (data.results || []).map((m) => m.title);
      }

      // LOCAL ARRAY
      else if (type === "local") {
        results = source.filter((v) =>
          v.toLowerCase().includes(query.toLowerCase())
        );
      }

      setSuggestions(results.slice(0, limit));
      setHighlight(results.length > 0 ? 0 : -1);
    };

    const delay = setTimeout(load, 250);
    return () => clearTimeout(delay);
  }, [query, type, source]);

  // ==========================================
  // ADD VALUE
  // ==========================================
  const addValue = (val) => {
    if (!val) return;

    if (multiple) {
      if (!value.includes(val)) {
        onChange([...value, val]);
      }
    } else {
      onChange(val);
    }

    setQuery("");
    setSuggestions([]);
    setHighlight(-1);
    inputRef.current?.focus();
  };

  // ==========================================
  // REMOVE TAG
  // ==========================================
  const removeValue = (val) => {
    if (multiple) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange("");
    }
  };

  // ==========================================
  // KEYBOARD CONTROL
  // ==========================================
  const handleKeyDown = (e) => {
    // ENTER → pilih
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && suggestions.length > 0) {
        addValue(suggestions[highlight]);
      } else if (query.trim()) {
        addValue(query.trim());
      }
      return;
    }

    // ARROW DOWN
    if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    }

    // ARROW UP
    if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    }

    // ESC → close
    if (e.key === "Escape") {
      setSuggestions([]);
      setHighlight(-1);
      return;
    }

    // BACKSPACE HAPUS TAG TERAKHIR
    if (multiple && e.key === "Backspace" && query === "" && value.length > 0) {
      removeValue(value[value.length - 1]);
    }
  };

  return (
    <div className="w-full relative mt-1">
      {label && <div className="mb-1 text-sm text-white/80">{label}</div>}

      {/* INPUT WRAPPER */}
      <div
        onClick={() => inputRef.current.focus()}
        className={`flex flex-wrap gap-2 items-center w-full px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm ${className}`}
      >
        {/* MULTIPLE MODE → BUBBLE TAG */}
        {multiple &&
          value.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1 bg-blue-600 text-white px-2 rounded-md"
            >
              {v}
              <button
                onClick={() => removeValue(v)}
                className="text-xs hover:text-red-200"
              >
                ✕
              </button>
            </span>
          ))}

        {/* SINGLE MODE → TAMPILKAN VALUE */}
        {!multiple && value && !query && (
          <span className="text-white">{value}</span>
        )}

        {/* INPUT */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            multiple
              ? value.length === 0
                ? placeholder
                : ""
              : value
              ? ""
              : placeholder
          }
          className="flex-1 bg-transparent outline-none text-white"
        />
      </div>

      {/* AUTOCOMPLETE LIST */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-black/80 border border-gray-600 rounded-lg mt-1 z-50 max-h-56 overflow-y-auto text-sm">
          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => addValue(item)}
              className={`px-3 py-2 cursor-pointer ${
                highlight === i ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
