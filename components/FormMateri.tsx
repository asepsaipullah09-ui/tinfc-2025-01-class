"use client";

import { useState } from "react";

interface FormMateriProps {
  onSuccess?: () => void;
}

export default function FormMateri({ onSuccess }: FormMateriProps) {
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!judul || !file) {
      alert("Judul dan file harus diisi");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("file", file);

    try {
      await fetch("/api/materi", {
        method: "POST",
        body: formData,
      });

      setJudul("");
      setFile(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload materi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Upload Materi Baru</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Judul Materi</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            placeholder="Contoh: Pertemuan 1 - Pengenalan Web"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">File (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 dark:file:bg-green-900/40 file:text-green-700 dark:file:text-green-400 hover:file:bg-green-100 dark:hover:file:bg-green-900/60 transition-colors"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
          >
            {loading ? "Mengupload..." : "Upload Materi"}
          </button>
        </div>
      </form>
    </div>
  );
}