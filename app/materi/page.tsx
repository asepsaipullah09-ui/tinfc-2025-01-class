"use client";

import { useState, useEffect } from "react";
import FormMateri from "@/components/FormMateri";

interface Materi {
  id: number;
  judul: string;
  file: string;
}

export default function MateriPage() {
  const [materi, setMateri] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-800">Materi Kuliah</h1>
        <p className="text-slate-500 mt-1">Download materi perkuliahan</p>
      </div>

      <FormMateri onSuccess={fetchMateri} />

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Judul Materi</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materi.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800">{m.judul}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/uploads/${m.file}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {materi.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Belum ada materi</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {materi.map((m) => (
          <div key={m.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Judul</p>
                <p className="font-medium text-slate-800">{m.judul}</p>
              </div>
              <a
                href={`/uploads/${m.file}`}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Download
              </a>
            </div>
          </div>
        ))}
        {materi.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Belum ada materi</p>
          </div>
        )}
      </div>
    </div>
  );
}