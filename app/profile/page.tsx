"use client";

import { useState, useEffect } from "react";

interface Mahasiswa {
  id: number;
  nama: string;
  nim: string;
  email: string;
}

const STORAGE_KEY = "tinfc_mahasiswa_session";

export default function ProfilePage() {
  const [nim, setNim] = useState("");
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  // Check localStorage on page load
  useEffect(() => {
    const storedNim = localStorage.getItem(STORAGE_KEY);
    if (storedNim) {
      setNim(storedNim);
      fetchProfile(storedNim);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (nimValue: string) => {
    setSearchLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/mahasiswa?nim=${nimValue}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setMahasiswa(data[0]);
        // Store NIM in localStorage
        localStorage.setItem(STORAGE_KEY, nimValue);
      } else {
        setError("Data mahasiswa tidak ditemukan");
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nim.trim()) {
      setError("Masukkan NIM terlebih dahulu");
      return;
    }

    setLoading(true);
    await fetchProfile(nim);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMahasiswa(null);
    setNim("");
    setError("");
  };

  // Loading state on initial load
  if (loading && !mahasiswa) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-800">Profil Mahasiswa</h1>
        <p className="text-slate-500 mt-1">Cari profil Anda dengan NIM</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Masukkan NIM Anda..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-sm hover:shadow"
          >
            {loading ? "Mencari..." : "Cari Profil"}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Profile Card */}
      {mahasiswa && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {mahasiswa.nama.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{mahasiswa.nama}</h2>
                <p className="text-blue-200 font-mono text-lg">{mahasiswa.nim}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-slate-400 uppercase tracking-wide">Nama Lengkap</p>
                <p className="text-lg font-medium text-slate-800">{mahasiswa.nama}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-slate-400 uppercase tracking-wide">NIM</p>
                <p className="text-lg font-mono text-slate-800">{mahasiswa.nim}</p>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <p className="text-sm text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-lg text-slate-800">{mahasiswa.email}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Kelas TINFC-2025-01
                </span>
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  Aktif
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar / Ganti Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!mahasiswa && !loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Cari Profil Anda</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Masukkan NIM Anda pada kolom pencarian di atas untuk melihat profil akademik Anda.
          </p>
        </div>
      )}
    </div>
  );
}