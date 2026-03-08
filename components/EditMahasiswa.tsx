"use client";

import { useState, useEffect } from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Mahasiswa</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">NIM</label>
            <input
              type="text"
              value={formData.nim}
              onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}