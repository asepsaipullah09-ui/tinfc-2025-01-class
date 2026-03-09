"use client";

import { useState, useEffect, useMemo } from "react";
import FormTugas from "@/components/FormTugas";

interface Tugas {
  id: number;
  nama: string;
  nim: string;
  judul: string;
  file: string;
}

export default function TugasPage() {
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchNama, setSearchNama] = useState("");
  const [searchNim, setSearchNim] = useState("");
  const [searchJudul, setSearchJudul] = useState("");

  useEffect(() => {
    fetchTugas();
  }, []);

  const fetchTugas = async () => {
    try {
      const res = await fetch("/api/tugas", { cache: "no-store" });
      const data = await res.json();
      setTugas(data);
    } catch (error) {
      console.error("Failed to fetch tugas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search inputs
  const filteredTugas = useMemo(() => {
    // Ensure tugas is always an array
    const tugasArray = Array.isArray(tugas) ? tugas : [];
    return tugasArray.filter((t) => {
      const matchNama = t.nama.toLowerCase().includes(searchNama.toLowerCase());
      const matchNim = t.nim.toLowerCase().includes(searchNim.toLowerCase());
      const matchJudul = t.judul
        .toLowerCase()
        .includes(searchJudul.toLowerCase());
      return matchNama && matchNim && matchJudul;
    });
  }, [tugas, searchNama, searchNim, searchJudul]);

  const clearFilters = () => {
    setSearchNama("");
    setSearchNim("");
    setSearchJudul("");
  };

  const hasActiveFilters = searchNama || searchNim || searchJudul;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Upload Tugas Mahasiswa
        </h1>
        <p className="text-slate-500 mt-1">Kumpulkan tugas perkuliahan</p>
      </div>

      <FormTugas onSuccess={fetchTugas} />

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Cari & Filter
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cari Nama
            </label>
            <input
              type="text"
              value={searchNama}
              onChange={(e) => setSearchNama(e.target.value)}
              placeholder="Contoh: Ahmad..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cari NIM
            </label>
            <input
              type="text"
              value={searchNim}
              onChange={(e) => setSearchNim(e.target.value)}
              placeholder="Contoh: 2324..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cari Judul Tugas
            </label>
            <input
              type="text"
              value={searchJudul}
              onChange={(e) => setSearchJudul(e.target.value)}
              placeholder="Contoh: Algoritma..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Status */}
        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              Menampilkan{" "}
              <span className="font-bold">{filteredTugas.length}</span> dari{" "}
              <span className="font-bold">{tugas.length}</span> data tugas
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Nama
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                NIM
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Judul Tugas
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                File
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTugas.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800">{t.nama}</td>
                <td className="px-6 py-4 text-slate-600 font-mono">{t.nim}</td>
                <td className="px-6 py-4 text-slate-800">{t.judul}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/uploads/tugas/${t.file}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
        {tugas.length === 0 && (
          <div className="text-center py-12 text-slate-500">
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
            <p>Belum ada tugas yang dikumpulkan</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredTugas.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Nama
                </p>
                <p className="font-medium text-slate-800">{t.nama}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  NIM
                </p>
                <p className="font-mono text-slate-600">{t.nim}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Judul
                </p>
                <p className="text-slate-800">{t.judul}</p>
              </div>
              <div className="pt-2">
                <a
                  href={`/uploads/tugas/${t.file}`}
                  target="_blank"
                  className="block w-full bg-purple-500 hover:bg-purple-600 text-white text-center py-2 rounded-lg text-sm font-medium"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
        {tugas.length === 0 && (
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
            <p>Belum ada tugas yang dikumpulkan</p>
          </div>
        )}
      </div>
    </div>
  );
}
