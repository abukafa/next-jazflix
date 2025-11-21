"use client";

export default function AddMovieForm() {
  return (
    <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl shadow-xl backdrop-blur-sm mb-20">
      <h1 className="text-2xl font-bold mb-6 text-red-500">Add New Movie</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="text-sm text-gray-300">Title</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Year</label>
          <input
            type="number"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Runtime (ex: 120 min)</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">
            Genre (comma separated)
          </label>
          <input
            type="text"
            placeholder="Action, Drama"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Director</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Actors</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Country</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Rating (ex: 8.5)</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Poster URL</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">YouTube Trailer URL</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-300">Plot (max 250 chars)</label>

          <textarea
            id="desc"
            maxLength="250"
            rows="2"
            className="w-full mt-1 px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-sm focus:border-red-500 focus:outline-none overflow-hidden"
          ></textarea>

          <p id="descCounter" className="text-right text-xs text-gray-400 mt-1">
            0/250
          </p>
        </div>

        <div className="col-span-2">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm">
            Save Movie
          </button>
        </div>
      </form>
    </div>
  );
}
