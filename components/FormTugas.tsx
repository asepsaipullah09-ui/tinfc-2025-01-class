"use client";

import { useState } from "react";

interface FormTugasProps {
  onSuccess?: () => void;
}

export default function FormTugas({ onSuccess }: FormTugasProps) {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!nama || !nim || !judul || !file) {
      alert("Semua field harus diisi");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("nim", nim);
    formData.append("judul", judul);
    formData.append("file", file);

    try {
      await fetch("/api/tugas", {
        method: "POST",
        body: formData,
      });

      setNama("");
      setNim("");
      setJudul("");
      setFile(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload tugas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Upload Tugas Mahasiswa</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Nama</label>
          <input
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">NIM</label>
          <input
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Judul Tugas</label>
          <input
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Judul Tugas"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">File</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-purple-900/40 file:text-purple-700 dark:file:text-purple-400 hover:file:bg-purple-100 dark:hover:file:bg-purple-900/60 transition-colors"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
        >
          {loading ? "Mengupload..." : "Upload"}
        </button>
      </form>
    </div>
  );
}