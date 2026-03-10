"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

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
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const isDark = theme === "dark";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const textDefault = isDark ? "text-gray-300" : "text-gray-600";

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Overlay backdrop - shown when sidebar is open */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      <aside
        aria-label="Sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex min-h-screen flex-col transform transition-all duration-300 ease-in-out",
          isOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full",
          // White/dark background
          isDark ? "bg-slate-800 text-gray-200 border-slate-700" : "bg-white text-gray-700 border-gray-200",
          "shadow-lg",
        )}
      >
        {/* Close button in top-right */}
        <button
          aria-label="Close menu"
          className={cn(
            "absolute right-4 top-4 rounded-lg p-2 transition-colors",
            isDark ? "hover:bg-slate-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
          )}
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

        <div className={cn("border-b p-5 mt-8", isDark ? "border-slate-700" : "border-gray-200")}>
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
              <h2 className="font-bold text-lg text-gray-800 dark:text-white">TINFC-2025-01</h2>
              <p className={cn("text-xs", textMuted)}>Kelas Digital</p>
            </div>
          </div>
        </div>

        {/* Decorative ornament line */}
        <div className={cn("h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2", isDark && "via-gray-600")} />

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
                        : cn(textDefault, isDark ? "hover:bg-slate-700 hover:text-white" : "hover:bg-gray-100 hover:text-gray-800"),
                    )}
                  >
                    <span
                      className={cn(
                        isActive ? "text-white" : textMuted,
                        "transition-colors",
                        !isActive && (isDark ? "group-hover:text-white" : "group-hover:text-gray-700"),
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

        {/* Decorative ornament line */}
        <div className={cn("h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent", isDark && "via-gray-600")} />

        <div className={cn("space-y-2 border-t p-4", isDark ? "border-slate-700" : "border-gray-200")}>
          <button
            onClick={toggleTheme}
            type="button"
            className={cn(
              "flex w-full items-center justify-between rounded-xl px-4 py-3 transition-colors",
              isDark ? "hover:bg-slate-700" : "hover:bg-gray-100",
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
                isDark ? "bg-blue-500" : "bg-gray-400",
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

        {/* User Info & Logout */}
        <div className={cn("border-t p-4", isDark ? "border-slate-700" : "border-gray-200")}>
          {session?.user ? (
            <>
              <div className={cn("rounded-xl p-4 border mb-3", isDark ? "bg-slate-700/50 border-slate-600" : "bg-gray-50 border-gray-100")}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {session.user.role || "Mahasiswa"}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                type="button"
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 transition-colors font-medium",
                  isDark 
                    ? "bg-red-900/50 hover:bg-red-900 text-red-400" 
                    : "bg-red-50 hover:bg-red-100 text-red-600"
                )}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Keluar</span>
              </button>
            </>
          ) : (
            <div className={cn("rounded-xl p-4 border", isDark ? "bg-slate-700/50 border-slate-600" : "bg-gray-50 border-gray-100")}>
              <p className={cn("mb-2 text-xs", textMuted)}>Semester Genap</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">2026</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white dark:border-slate-800"></div>
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white dark:border-slate-800"></div>
                </div>
                <span className={cn("text-xs", textMuted)}>Online</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}