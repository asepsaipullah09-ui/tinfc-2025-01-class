"use client";

import { useState, useEffect, useMemo } from "react";
import FormMateri from "@/components/FormMateri";

interface Materi {
  id: number;
  judul: string;
  file: string;
}

export default function MateriPage() {
  const [materi, setMateri] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort states
  const [searchJudul, setSearchJudul] = useState("");
  const [sortOrder, setSortOrder] = useState<
    "terbaru" | "terlama" | "az" | "za"
  >("terbaru");

  useEffect(() => {
    fetchMateri();
  }, []);

  const fetchMateri = async () => {
    try {
      const res = await fetch("/api/materi", { cache: "no-store" });
      const data = await res.json();
      setMateri(data);
    } catch (error) {
      console.error("Failed to fetch materi:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort data
  const filteredMateri = useMemo(() => {
    // Ensure materi is always an array
    const materiArray = Array.isArray(materi) ? materi : [];
    let result = [...materiArray];

    // Filter by judul
    if (searchJudul) {
      result = result.filter((m) =>
        m.judul.toLowerCase().includes(searchJudul.toLowerCase()),
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortOrder) {
        case "az":
          return a.judul.localeCompare(b.judul);
        case "za":
          return b.judul.localeCompare(a.judul);
        case "terbaru":
        case "terlama":
        default:
          return 0;
      }
    });

    return result;
  }, [materi, searchJudul, sortOrder]);

  const clearFilters = () => {
    setSearchJudul("");
    setSortOrder("terbaru");
  };

  const hasActiveFilters = searchJudul || sortOrder !== "terbaru";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500 dark:border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-gray-400">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Materi Kuliah
        </h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1">
          Download materi perkuliahan
        </p>
      </div>

      <FormMateri onSuccess={fetchMateri} />

      {/* Filter Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Cari & Urutkan
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
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
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-1">
              Cari Judul Materi
            </label>
            <input
              type="text"
              value={searchJudul}
              onChange={(e) => setSearchJudul(e.target.value)}
              placeholder="Contoh: Algoritma..."
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-1">
              Urutkan
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
          </div>
        </div>

        {/* Filter Status */}
        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-400">
              Menampilkan{" "}
              <span className="font-bold">{filteredMateri.length}</span> dari{" "}
              <span className="font-bold">{materi.length}</span> data materi
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-gray-300">
                Judul Materi
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-gray-300">
                File
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredMateri.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="px-6 py-4 text-slate-800 dark:text-gray-200">
                  {m.judul}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`/uploads/${m.file}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {materi.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>Belum ada materi</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredMateri.map((m) => (
          <div
            key={m.id}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                  Judul
                </p>
                <p className="font-medium text-slate-800 dark:text-gray-200">
                  {m.judul}
                </p>
              </div>
              <a
                href={`/uploads/${m.file}`}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Download
              </a>
            </div>
          </div>
        ))}
        {materi.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>Belum ada materi</p>
          </div>
        )}
      </div>
    </div>
  );
}
