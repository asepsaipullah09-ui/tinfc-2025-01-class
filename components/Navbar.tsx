"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useSession } from "next-auth/react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const { data: session } = useSession();

  const getPageTitle = () => {
    const paths = pathname.split("/").filter((path) => path !== "");
    if (paths.length === 0) return "Beranda";
    const currentPath = paths[paths.length - 1];
    return currentPath
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-gray-700 dark:text-gray-200 shadow-sm border-b border-gray-200/80 dark:border-slate-700/80">
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-gray-800 dark:text-white text-base leading-tight">TINFC-2025-01</h1>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-none">Portal Kelas Digital</p>
            </div>
          </div>

          {/* Center: Page title (mobile) */}
          <div className="md:hidden flex-1 text-center px-2">
            <h2 className="font-semibold text-gray-800 dark:text-white text-sm truncate">{getPageTitle()}</h2>
          </div>

          {/* Center: Current page title (hidden on small) */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari materi, tugas..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-700 border border-transparent rounded-xl text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-700 dark:text-gray-200 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-gray-300 dark:focus:border-slate-500 transition-all"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Toggle dark mode"
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            >
              {isDark ? (
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full ring-2 ring-white dark:ring-slate-800" />
            </button>

            {/* Auth Controls */}
            {session ? (
              <Link href="/profile" className="flex items-center" title="Profil">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md text-white text-xs sm:text-sm font-bold">
                  {session?.user?.name?.charAt(0).toUpperCase() ?? "T"}
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-medium bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50 rounded-xl hover:bg-white dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all text-gray-700 dark:text-gray-200"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-400/30 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search - Compact */}
        <form onSubmit={handleSearch} className="md:hidden mt-2.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi, tugas..."
              className="w-full pl-9 pr-3 py-1.5 bg-gray-100 dark:bg-slate-700 border-0 rounded-lg text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>
      </div>
    </nav>
  );
}