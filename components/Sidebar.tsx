"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTheme } from "@/context/ThemeContext";

type MenuItem = {
  name: string;
  href: string;
  icon: ReactNode;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const cn = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(" ");

const isRouteActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    name: "Materi",
    href: "/materi",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    name: "Tugas",
    href: "/tugas",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    name: "Kalender",
    href: "/kalender",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    name: "Galeri",
    href: "/galeri",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
  {
    name: "Mahasiswa",
    href: "/mahasiswa",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const isDark = theme === "dark";
  const textMuted = isDark ? "text-gray-300" : "text-gray-400";
  const textDefault = isDark ? "text-gray-200" : "text-gray-300";

  return (
    <>
      {/* Overlay backdrop - shown when sidebar is open on mobile only */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        aria-label="Sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex min-h-screen flex-col transform transition-all duration-300 ease-in-out md:static",
          isOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:w-0 md:overflow-hidden md:pointer-events-none",
          isDark
            ? "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-b from-gray-800 via-gray-800 to-gray-700 text-white",
        )}
      >
        <button
          aria-label="Close menu"
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-white/10 md:hidden"
          onClick={onClose}
          type="button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-lg">TINFC-2025-01</h2>
              <p className={cn("text-xs", textMuted)}>Kelas Digital</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = isRouteActive(pathname, item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                        : cn(textDefault, "hover:bg-white/10 hover:text-white"),
                    )}
                  >
                    <span
                      className={cn(
                        isActive ? "text-white" : textMuted,
                        "transition-colors group-hover:text-white",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    {isActive ? (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4">
          <button
            onClick={toggleTheme}
            type="button"
            className={cn(
              "flex w-full items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-white/10",
              textDefault,
            )}
          >
            <div className="flex items-center gap-3">
              {isDark ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
              <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
            </div>
            <div
              className={cn(
                "h-6 w-10 rounded-full p-1 transition-colors",
                isDark ? "bg-blue-500" : "bg-gray-500",
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 transform rounded-full bg-white shadow-md transition-transform",
                  isDark ? "translate-x-4" : "",
                )}
              />
            </div>
          </button>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className={cn("mb-2 text-xs", textMuted)}>Semester Genap</p>
            <p className="text-sm font-semibold text-white">2026</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-gray-800"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-800"></div>
                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-gray-800"></div>
              </div>
              <span className={cn("text-xs", textMuted)}>Online</span>
            </div>
          </div>
        </div>
      </aside>

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
        className={cn(
          "fixed left-0 top-1/2 z-50 hidden h-16 w-8 -translate-y-1/2 items-center justify-center rounded-r-lg shadow-lg transition-all duration-300 ease-in-out md:flex",
          isOpen ? "left-64" : "left-0",
          isDark
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-700 text-white hover:bg-gray-600",
        )}
        onClick={toggleSidebar}
        type="button"
      >
        <svg
          className={cn(
            "h-5 w-5 transition-transform duration-300",
            isOpen ? "" : "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    </>
  );
}
