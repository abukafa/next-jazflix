"use client";
import { useState, useEffect, useRef } from "react";

export default function ActorsInput({ value = [], onChange, error }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const inputRef = useRef(null);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2MzYmNkZmRiOGMyNzMzNWE1ZTJmYTIyZWY2Yzc3OSIsIm5iZiI6MTcxMTE3NzAzOS45MjksInN1YiI6IjY1ZmU3ZDRmMWIxZjNjMDE3Yzk4ZTFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PlR_trKl9bLOsh2sp32-XOlXbBzjMB2zDL1MnXN5dk";

  // FETCH AUTOCOMPLETE
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setHighlight(-1);
      return;
    }

    const load = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${query}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );

      const data = await res.json();
      const names = (data.results || []).map((p) => p.name);
      setSuggestions(names.slice(0, 6));
      setHighlight(names.length > 0 ? 0 : -1);
    };

    const delay = setTimeout(load, 300);
    return () => clearTimeout(delay);
  }, [query]);

  // ADD TAG
  const add = (name) => {
    if (!name) return;
    if (!value.includes(name)) {
      onChange([...value, name]);
    }
    setQuery("");
    setSuggestions([]);
    setHighlight(-1);
    inputRef.current?.focus();
  };

  // REMOVE TAG
  const remove = (name) => {
    onChange(value.filter((v) => v !== name));
  };

  // KEYBOARD SUPPORT
  const handleKeyDown = (e) => {
    // ENTER → pilih
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && suggestions.length > 0) {
        add(suggestions[highlight]);
      } else if (query.trim()) {
        add(query.trim());
      }
      return;
    }

    // ARROW DOWN
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setHighlight((prev) => (prev + 1) % suggestions.length);
      }
    }

    // ARROW UP
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setHighlight(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length
        );
      }
    }

    // ESC → close dropdown
    if (e.key === "Escape") {
      setSuggestions([]);
      setHighlight(-1);
      return;
    }

    // BACKSPACE DELETE LAST TAG
    if (e.key === "Backspace" && query === "" && value.length > 0) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className="w-full relative mt-1">
      {/* INPUT WRAPPER */}
      <div
        onClick={() => inputRef.current.focus()}
        className="flex flex-wrap items-center gap-2 w-full px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
      >
        {value.map((actor) => (
          <span
            key={actor}
            className="flex items-center gap-1 bg-red-500 text-white px-2 rounded-md"
          >
            {actor}
            <button
              onClick={() => remove(actor)}
              className="text-xs hover:text-red-200"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? "Type actor name…" : ""}
          className="flex-1 bg-transparent outline-none text-white"
        />
      </div>

      {/* AUTOCOMPLETE */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-black/80 border border-gray-600 rounded-lg mt-1 max-h-52 overflow-y-auto z-50">
          {suggestions.map((name, i) => (
            <div
              key={i}
              onClick={() => add(name)}
              className={`px-3 py-2 cursor-pointer ${
                highlight === i ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
