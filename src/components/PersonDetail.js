"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PersonDetail({ person }) {
  const [showFullBio, setShowFullBio] = useState(false);
  const [activeTab, setActiveTab] = useState("acting"); // 'acting' or 'crew'

  if (!person) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 text-white">
        <i className="fa-solid fa-user-slash text-5xl text-zinc-600 mb-4" />
        <h2 className="text-2xl font-bold">Data Profil Tidak Ditemukan</h2>
        <Link
          href="/people"
          className="mt-4 px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition"
        >
          Kembali ke Daftar Tokoh
        </Link>
      </div>
    );
  }

  // Calculate age if birthday is provided
  const calculateAge = (birthDateStr, deathDateStr) => {
    if (!birthDateStr) return null;
    const birth = new Date(birthDateStr);
    const end = deathDateStr ? new Date(deathDateStr) : new Date();
    let age = end.getFullYear() - birth.getFullYear();
    const m = end.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(person.birthday, person.deathday);
  const hasCrew = person.crewCredits && person.crewCredits.length > 0;
  const hasActing = person.castCredits && person.castCredits.length > 0;

  const currentCredits = activeTab === "acting" ? person.castCredits : person.crewCredits;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20 text-white">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px]" />
        <Link href="/people" className="hover:text-white transition">
          Tokoh & Kru
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px]" />
        <span className="text-zinc-200 truncate">{person.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Portrait & Personal Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Portrait Photo */}
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            <Image
              src={person.profileImage || "/images/no-photo.png"}
              alt={person.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Personal Info Box */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
              <i className="fa-solid fa-id-card text-red-500" />
              <span>Informasi Pribadi</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-zinc-500 block uppercase tracking-wider font-semibold">
                  Profesi Utama
                </span>
                <span className="text-zinc-200 font-medium text-sm">
                  {person.department || "Acting"}
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block uppercase tracking-wider font-semibold">
                  Jenis Kelamin
                </span>
                <span className="text-zinc-200 font-medium text-sm">
                  {person.gender}
                </span>
              </div>

              {person.birthday && (
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider font-semibold">
                    Tanggal Lahir
                  </span>
                  <span className="text-zinc-200 font-medium text-sm">
                    {person.birthday} {age !== null && `(${age} tahun)`}
                  </span>
                </div>
              )}

              {person.deathday && (
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider font-semibold">
                    Meninggal Dunia
                  </span>
                  <span className="text-zinc-200 font-medium text-sm">
                    {person.deathday}
                  </span>
                </div>
              )}

              {person.placeOfBirth && (
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider font-semibold">
                    Tempat Lahir
                  </span>
                  <span className="text-zinc-200 font-medium text-sm">
                    {person.placeOfBirth}
                  </span>
                </div>
              )}

              <div>
                <span className="text-zinc-500 block uppercase tracking-wider font-semibold">
                  Total Karya
                </span>
                <span className="text-zinc-200 font-medium text-sm">
                  {(person.castCredits?.length || 0) + (person.crewCredits?.length || 0)} Judul
                </span>
              </div>

              {person.alsoKnownAs && person.alsoKnownAs.length > 0 && (
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider font-semibold mb-1">
                    Nama Lain
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {person.alsoKnownAs.slice(0, 5).map((aka, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px]"
                      >
                        {aka}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              {(person.imdbId || person.homepage) && (
                <div className="pt-2 border-t border-zinc-800 flex items-center gap-3">
                  {person.imdbId && (
                    <a
                      href={`https://www.imdb.com/name/${person.imdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition"
                    >
                      <span>IMDb</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                    </a>
                  )}
                  {person.homepage && (
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs flex items-center gap-1.5 transition"
                    >
                      <i className="fa-solid fa-globe" />
                      <span>Website Resmi</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Top Works, Filmography */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Title */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {person.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-md bg-red-600/90 text-white text-xs font-bold">
                {person.department || "Tokoh Perfilman"}
              </span>
              {person.placeOfBirth && (
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot text-zinc-500" />
                  {person.placeOfBirth}
                </span>
              )}
            </div>
          </div>

          {/* Biography */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <i className="fa-solid fa-book-open text-red-500" />
              <span>Biografi</span>
            </h2>
            {person.biography ? (
              <div>
                <p
                  className={`text-zinc-300 text-sm leading-relaxed whitespace-pre-line ${
                    !showFullBio ? "line-clamp-6" : ""
                  }`}
                >
                  {person.biography}
                </p>
                {person.biography.length > 400 && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-3 text-red-500 hover:text-red-400 font-bold text-xs flex items-center gap-1 cursor-pointer transition"
                  >
                    <span>{showFullBio ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}</span>
                    <i
                      className={`fa-solid fa-chevron-${showFullBio ? "up" : "down"} text-[10px]`}
                    />
                  </button>
                )}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm italic">
                Belum ada biografi resmi yang terdaftar untuk {person.name}.
              </p>
            )}
          </div>

          {/* Top Works ("Karya Terpopuler") */}
          {person.topWorks && person.topWorks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-fire text-amber-500" />
                  <span>Karya Terpopuler</span>
                </h2>
                <span className="text-xs text-zinc-400">
                  {person.topWorks.length} karya terbaik
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {person.topWorks.slice(0, 5).map((w) => {
                  const href = w.mediaType === "tv" ? `/tv/${w.id}` : `/movie/${w.id}`;
                  return (
                    <Link
                      key={`${w.mediaType}-${w.id}`}
                      href={href}
                      className="group flex flex-col justify-between rounded-xl overflow-hidden bg-zinc-900/90 border border-zinc-800 hover:border-red-500/60 transition duration-200 hover:scale-105"
                    >
                      <div className="aspect-[4/6] relative bg-zinc-950 overflow-hidden">
                        <Image
                          src={w.posterImage || "/images/no-photo.png"}
                          alt={w.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                        {w.rating && w.rating !== "N/A" && (
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-yellow-400 text-[10px] font-bold flex items-center gap-0.5">
                            <i className="fa-solid fa-star text-[8px]" />
                            <span>{w.rating}</span>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-semibold uppercase text-zinc-300">
                          {w.mediaType}
                        </div>
                      </div>

                      <div className="p-2.5">
                        <h4 className="font-bold text-xs text-white group-hover:text-red-400 transition line-clamp-1">
                          {w.title}
                        </h4>
                        {w.character && (
                          <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                            sebagai {w.character}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filmography Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-clapperboard text-red-500" />
                <span>Filmografi Lengkap</span>
              </h2>

              {/* Tabs for Acting vs Crew */}
              <div className="flex items-center gap-2">
                {hasActing && (
                  <button
                    onClick={() => setActiveTab("acting")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeTab === "acting"
                        ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Pemeran ({person.castCredits?.length || 0})
                  </button>
                )}
                {hasCrew && (
                  <button
                    onClick={() => setActiveTab("crew")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeTab === "crew"
                        ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Kru ({person.crewCredits?.length || 0})
                  </button>
                )}
              </div>
            </div>

            {/* List of Credits */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {currentCredits && currentCredits.length > 0 ? (
                currentCredits.map((c, idx) => {
                  const href = c.mediaType === "tv" ? `/tv/${c.id}` : `/movie/${c.id}`;
                  return (
                    <Link
                      key={`${c.mediaType}-${c.id}-${idx}`}
                      href={href}
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-zinc-700 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-zinc-500 w-12 text-right">
                          {c.releaseYear || "-"}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-red-400 transition">
                              {c.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 uppercase">
                              {c.mediaType}
                            </span>
                          </div>
                          {(c.character || c.job) && (
                            <p className="text-xs text-zinc-400 mt-0.5">
                              {c.character ? `sebagai ${c.character}` : c.job}
                            </p>
                          )}
                        </div>
                      </div>

                      {c.rating && c.rating !== "N/A" && (
                        <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                          <i className="fa-solid fa-star text-[10px]" />
                          <span>{c.rating}</span>
                        </div>
                      )}
                    </Link>
                  );
                })
              ) : (
                <p className="text-zinc-500 text-xs py-8 text-center">
                  Tidak ada catatan karya yang tersedia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
