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
            <tr key={m.id}>
              <td className="border p-2">{m.nama}</td>
              <td className="border p-2">{m.nim}</td>
              <td className="border p-2">{m.email}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(m.id)}
                    className="bg-yellow-500 text-white px-3 py-1"
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