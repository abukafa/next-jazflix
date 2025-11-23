"use client";
import { useState, useEffect, useRef } from "react";

export default function SmartInputMultiple({
  label,
  type = "local",
  source = [],
  value = [],
  onChange,
}) {
  const [query, setQuery] = useState("");
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

      if (type === "tmdb-person") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/person?query=${query}`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        const data = await res.json();
        items = (data.results || []).map((p) => p.name);
      } else {
        items = source.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        );
      }

      items = items.filter((s) => !value.includes(s));

      setSuggestions(items.slice(0, 6));
      setHighlight(items.length > 0 ? 0 : -1);
    };

    const delay = setTimeout(load, 250);
    return () => clearTimeout(delay);
  }, [query, type]);

  const add = (val) => {
    if (!value.includes(val)) onChange([...value, val]);
    setQuery("");
    setSuggestions([]);
    setHighlight(-1);
    inputRef.current?.focus();
  };

  const remove = (val) => {
    onChange(value.filter((v) => v !== val));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && suggestions[highlight]) add(suggestions[highlight]);
      else if (query.trim()) add(query.trim());
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

    if (e.key === "Backspace" && query === "" && value.length > 0) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className="w-full relative">
      <label className="text-sm text-gray-300">{label}</label>

      <div
        onClick={() => inputRef.current.focus()}
        className="flex flex-wrap items-center gap-2 w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm"
      >
        {value.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 bg-red-500 text-white px-2 rounded-md"
          >
            {item}
            <button onClick={() => remove(item)} className="text-xs">
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
          placeholder={value.length === 0 ? "Type…" : ""}
          className="flex-1 bg-transparent outline-none text-white"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-black/80 border border-gray-600 rounded-lg mt-1 max-h-52 overflow-y-auto z-50 text-sm">
          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => add(item)}
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
