"use client";
import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-800/80 py-6 px-8 rounded-2xl shadow-xl backdrop-blur-md mb-4 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm">Install App</span>
        <span className="text-gray-300 text-xs">
          For your better experience
        </span>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition"
      >
        Install
      </button>
    </div>
  );
}
