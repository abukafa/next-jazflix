"use client";
import { useState } from "react";

export default function MultiSelect({
  placeholder = "Select",
  options = [],
  value = [],
  onChange,
  addClassName = "",
}) {
  const [open, setOpen] = useState(false);

  const toggle = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const removeTag = (tag) => {
    onChange(value.filter((v) => v !== tag));
  };

  return (
    <div className="relative w-full">
      {/* INPUT AREA WITH TAGS */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-full flex flex-wrap items-center gap-2 mt-1 px-3 py-2 bg-black/40 rounded-lg text-sm cursor-pointer border ${addClassName}`}
      >
        {value.length === 0 && (
          <span className="text-gray-500">{placeholder}</span>
        )}

        {/* TAG BUBBLES */}
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-red-500 text-white rounded-sm px-2 py-0.5 text-xs"
          >
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="ml-1 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-black/80 border border-gray-600 rounded-lg max-h-48 overflow-y-auto z-50 text-sm">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-3 py-2 cursor-pointer hover:bg-white/10 flex items-center gap-2 ${
                value.includes(opt) ? "bg-white/10" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={value.includes(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
