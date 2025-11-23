"use client";
import { useState, useRef, useEffect } from "react";

export default function TagsInput({
  value = [],
  onChange,
  placeholder = "Add tags…",
  suggestions = [],
}) {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [highlight, setHighlight] = useState(-1); // index highlight list

  // Filter suggestions
  useEffect(() => {
    if (!input) {
      setFiltered([]);
      setHighlight(-1);
      return;
    }

    const f = suggestions
      .filter(
        (item) =>
          item.toLowerCase().includes(input.toLowerCase()) &&
          !value.includes(item)
      )
      .slice(0, 5);

    setFiltered(f);
    setHighlight(f.length > 0 ? 0 : -1); // auto highlight item pertama
  }, [input, value, suggestions]);

  const addTag = (tag) => {
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
    setFiltered([]);
    setHighlight(-1);
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const onKeyDown = (e) => {
    // ENTER → pilih item autocomplete
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && filtered.length > 0) {
        addTag(filtered[highlight]);
      } else {
        addTag(input);
      }
    }

    // NAVIGASI ↓
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filtered.length > 0) {
        setHighlight((prev) => (prev + 1) % filtered.length);
      }
    }

    // NAVIGASI ↑
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filtered.length > 0) {
        setHighlight((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
    }

    // BACKSPACE → hapus tag terakhir jika input kosong
    if (e.key === "Backspace" && input === "") {
      e.preventDefault();
      if (value.length > 0) {
        const last = value[value.length - 1];
        removeTag(last);
      }
    }

    // ESC → tutup suggestion
    if (e.key === "Escape") {
      setFiltered([]);
      setHighlight(-1);
    }
  };

  return (
    <div className="relative w-full mt-1">
      <div className="flex flex-wrap items-center gap-2 w-full px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm">
        {/* BUBBLE TAG */}
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-red-500 text-white px-2 rounded-md"
          >
            {tag}
            <button
              className="text-xs hover:text-red-200"
              onClick={() => removeTag(tag)}
            >
              ✕
            </button>
          </span>
        ))}

        {/* INPUT */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={value.length === 0 ? "Type movie tags..." : ""}
          className="flex-1 bg-transparent outline-none text-white"
        />
      </div>

      {/* AUTOCOMPLETE LIST */}
      {filtered.length > 0 && (
        <ul className="absolute left-0 right-0 bg-black border border-gray-700 rounded-lg mt-1 z-50">
          {filtered.map((item, idx) => (
            <li
              key={item}
              onClick={() => addTag(item)}
              className={`px-3 py-2 cursor-pointer text-white ${
                highlight === idx ? "bg-white/10" : "hover:bg-white/20"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
