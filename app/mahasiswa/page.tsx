"use client";

import { useState, useEffect } from "react";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Daftar Mahasiswa
          <span className="ml-2 text-sm font-normal text-slate-500">TINFC-2025-01</span>
        </h1>
        <p className="text-slate-500 mt-1">Kelola data mahasiswa kelas</p>
      </div>

      <FormMahasiswa onSuccess={fetchMahasiswa} />

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">NIM</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mahasiswa.map((m) => (
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
        {mahasiswa.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>Belum ada mahasiswa</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {mahasiswa.map((m) => (
          <div key={m.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Nama</p>
                <p className="font-medium text-slate-800">{m.nama}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">NIM</p>
                <p className="font-mono text-slate-600">{m.nim}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Email</p>
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
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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