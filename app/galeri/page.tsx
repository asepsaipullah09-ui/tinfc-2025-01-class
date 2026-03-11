"use client";

import { useState, useEffect, useMemo } from "react";

interface GaleriItem {
  id: number;
  judul: string;
  file_path: string;
  created_at: string;
}

export default function GaleriPage() {
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GaleriItem | null>(null);

  // Filter states
  const [searchJudul, setSearchJudul] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await fetch("/api/galeri");
      const data = await res.json();
      setGaleri(data);
    } catch (error) {
      console.error("Failed to fetch galeri:", error);
    }
  };

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    const galeriArray = Array.isArray(galeri) ? galeri : [];
    galeriArray.forEach((item) => {
      const year = new Date(item.created_at).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort().reverse();
  }, [galeri]);

  // Filter data
  const filteredGaleri = useMemo(() => {
    const galeriArray = Array.isArray(galeri) ? galeri : [];
    return galeriArray.filter((item) => {
      const matchJudul = item.judul.toLowerCase().includes(searchJudul.toLowerCase());
      const itemYear = new Date(item.created_at).getFullYear().toString();
      const matchTahun = filterTahun === "" || itemYear === filterTahun;
      return matchJudul && matchTahun;
    });
  }, [galeri, searchJudul, filterTahun]);

  const clearFilters = () => {
    setSearchJudul("");
    setFilterTahun("");
  };

  const hasActiveFilters = searchJudul || filterTahun;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !judul) {
      alert("Mohon isi judul dan pilih foto!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("file", file);
    try {
      const res = await fetch("/api/galeri", { method: "POST", body: formData });
      if (res.ok) {
        setJudul("");
        setFile(null);
        setPreviewUrl(null);
        fetchGaleri();
      } else {
        alert("Gagal mengupload foto");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal mengupload foto");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;
    try {
      const res = await fetch("/api/galeri", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchGaleri();
      } else {
        alert("Gagal menghapus foto");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Gagal menghapus foto");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Galeri Kelas</h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1">Dokumentasi kegiatan dan foto kelas TINFC-2025-01</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Upload Foto Kegiatan</h2>
        </div>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-gray-300 mb-2">Judul Foto</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Presentasi AI Kelompok 3"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-gray-300 mb-2">Pilih Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/40 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/60 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Mengupload...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Foto
                </>
              )}
            </button>
          </div>

          {/* Right: preview */}
          <div className="flex items-center justify-center">
            {previewUrl ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-blue-300 dark:border-blue-800 shadow-md">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-700/50">
                <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-slate-400 dark:text-slate-500">Preview foto akan muncul di sini</p>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Dokumentasi / Gallery */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Dokumentasi Kelas</h2>
              <p className="text-sm text-slate-500 dark:text-gray-400">{galeri.length} foto tersedia</p>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Hapus Filter
            </button>
          )}
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700">
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-gray-300 mb-1.5">Cari Judul</label>
            <input
              type="text"
              value={searchJudul}
              onChange={(e) => setSearchJudul(e.target.value)}
              placeholder="Cari foto..."
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-gray-300 mb-1.5">Filter Tahun</label>
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Semua Tahun</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Status */}
        {hasActiveFilters && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Menampilkan <span className="font-bold">{filteredGaleri.length}</span> dari <span className="font-bold">{galeri.length}</span> foto
            </p>
          </div>
        )}

        {/* Grid or Empty State */}
        {filteredGaleri.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-400 dark:text-slate-500 font-medium">
              {hasActiveFilters ? "Tidak ada foto yang cocok dengan filter" : "Belum ada foto. Upload foto pertama Anda!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredGaleri.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-100 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600"
              >
                {/* Image */}
                <div
                  className="aspect-square cursor-pointer overflow-hidden"
                  onClick={() => setLightboxItem(item)}
                >
                  <img
                    src={item.file_path}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Caption */}
                <div className="p-3 bg-white dark:bg-slate-800">
                  <h3 className="font-semibold text-sm text-slate-800 dark:text-gray-100 truncate">{item.judul}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-2 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tutup
            </button>
            <img
              src={lightboxItem.file_path}
              alt={lightboxItem.judul}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-3 text-center">
              <p className="text-white font-semibold text-lg">{lightboxItem.judul}</p>
              <p className="text-white/60 text-sm">
                {new Date(lightboxItem.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
