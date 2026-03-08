"use client";

import { useState } from "react";

interface Mahasiswa {
  id: number;
  nama: string;
  nim: string;
  email: string;
}

interface EditMahasiswaProps {
  id: number;
  nama: string;
  nim: string;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditMahasiswa({ id, nama, nim, email, onClose, onSuccess }: EditMahasiswaProps) {
  const [formData, setFormData] = useState({
    nama: nama,
    nim: nim,
    email: email,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/mahasiswa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nama: formData.nama,
          nim: formData.nim,
          email: formData.email,
        }),
      });

      if (res.ok) {
        alert("Data mahasiswa berhasil diperbarui!");
        onSuccess();
        onClose();
      } else {
        alert("Gagal memperbarui data mahasiswa");
      }
    } catch (error) {
      console.error("Error updating mahasiswa:", error);
      alert("Gagal memperbarui data mahasiswa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Edit Mahasiswa</h2>
          <p className="text-white/80 text-sm">Perbarui data mahasiswa</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Nama</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">NIM</label>
            <input
              type="text"
              value={formData.nim}
              onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}