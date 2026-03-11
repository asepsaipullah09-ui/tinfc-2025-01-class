"use client";

import { useState, useEffect, useMemo } from "react";
import FormMahasiswa from "@/components/FormMahasiswa";
import DeleteMahasiswa from "@/components/DeleteMahasiswa";
import EditMahasiswa from "@/components/EditMahasiswa";

interface Mahasiswa {
  id: number;
  nama: string;
  nim: string;
  email: string;
}

export default function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filter states
  const [searchNama, setSearchNama] = useState("");
  const [searchNim, setSearchNim] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const res = await fetch("/api/mahasiswa", { cache: "no-store" });
      const data = await res.json();
      setMahasiswa(data);
    } catch (error) {
      console.error("Failed to fetch mahasiswa:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search inputs
  const filteredMahasiswa = useMemo(() => {
    const mahasiswaArray = Array.isArray(mahasiswa) ? mahasiswa : [];
    return mahasiswaArray.filter((m) => {
      const matchNama = m.nama.toLowerCase().includes(searchNama.toLowerCase());
      const matchNim = m.nim.toLowerCase().includes(searchNim.toLowerCase());
      const matchEmail = m.email
        .toLowerCase()
        .includes(searchEmail.toLowerCase());
      return matchNama && matchNim && matchEmail;
    });
  }, [mahasiswa, searchNama, searchNim, searchEmail]);

  const clearFilters = () => {
    setSearchNama("");
    setSearchNim("");
    setSearchEmail("");
  };

  const hasActiveFilters = searchNama || searchNim || searchEmail;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-gray-400">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Daftar Mahasiswa
          <span className="ml-2 text-sm font-normal text-slate-500 dark:text-gray-400">
            TINFC-2025-01
          </span>
        </h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1">
          Kelola data mahasiswa kelas
        </p>
      </div>

      <FormMahasiswa onSuccess={fetchMahasiswa} />

      {/* Filter Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Cari & Filter
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cari Email
            </label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Contoh: @gmail.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Status */}
        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Menampilkan{" "}
              <span className="font-bold">{filteredMahasiswa.length}</span> dari{" "}
              <span className="font-bold">{mahasiswa.length}</span> data
              mahasiswa
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
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMahasiswa.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800">{m.nama}</td>
                <td className="px-6 py-4 text-slate-600 font-mono">{m.nim}</td>
                <td className="px-6 py-4 text-slate-600">{m.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(m.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <DeleteMahasiswa id={m.id} onSuccess={fetchMahasiswa} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMahasiswa.length === 0 && hasActiveFilters && (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p>Tidak ada mahasiswa yang cocok dengan filter</p>
          </div>
        )}
        {filteredMahasiswa.length === 0 &&
          !hasActiveFilters &&
          mahasiswa.length === 0 && (
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p>Belum ada mahasiswa</p>
            </div>
          )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredMahasiswa.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Nama
                </p>
                <p className="font-medium text-slate-800">{m.nama}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  NIM
                </p>
                <p className="font-mono text-slate-600">{m.nim}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-slate-600">{m.email}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditingId(m.id)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Edit
                </button>
                <div className="flex-1">
                  <DeleteMahasiswa id={m.id} onSuccess={fetchMahasiswa} />
                </div>
              </div>
            </div>
          </div>
        ))}
        {mahasiswa.length === 0 && (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p>Belum ada mahasiswa</p>
          </div>
        )}
      </div>

      {editingId && (
        <EditMahasiswa
          id={mahasiswa.find((m) => m.id === editingId)?.id || 0}
          nama={mahasiswa.find((m) => m.id === editingId)?.nama || ""}
          nim={mahasiswa.find((m) => m.id === editingId)?.nim || ""}
          email={mahasiswa.find((m) => m.id === editingId)?.email || ""}
          onClose={() => setEditingId(null)}
          onSuccess={fetchMahasiswa}
        />
      )}
    </div>
  );
}
