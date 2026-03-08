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
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Daftar Mahasiswa TINFC-2025-01
      </h1>

      <FormMahasiswa onSuccess={fetchMahasiswa} />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nama</th>
              <th className="border p-2">NIM</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {mahasiswa.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="border p-2">{m.nama}</td>
                <td className="border p-2">{m.nim}</td>
                <td className="border p-2">{m.email}</td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(m.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
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
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {mahasiswa.map((m) => (
          <div key={m.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Nama:</span>
                <p className="font-medium">{m.nama}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">NIM:</span>
                <p className="font-medium">{m.nim}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium">{m.email}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditingId(m.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <DeleteMahasiswa id={m.id} onSuccess={fetchMahasiswa} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {mahasiswa.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Belum ada data mahasiswa</p>
      )}

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
