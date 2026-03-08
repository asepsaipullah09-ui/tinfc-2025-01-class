"use client";

import { useState, useEffect } from "react";
import FormTugas from "@/components/FormTugas";

interface Tugas {
  id: number;
  nama: string;
  nim: string;
  judul: string;
  file: string;
}

export default function TugasPage() {
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTugas();
  }, []);

  const fetchTugas = async () => {
    try {
      const res = await fetch("/api/tugas", { cache: "no-store" });
      const data = await res.json();
      setTugas(data);
    } catch (error) {
      console.error("Failed to fetch tugas:", error);
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
        Upload Tugas Mahasiswa
      </h1>

      <FormTugas onSuccess={fetchTugas} />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nama</th>
              <th className="border p-2">NIM</th>
              <th className="border p-2">Judul</th>
              <th className="border p-2">File</th>
            </tr>
          </thead>

          <tbody>
            {tugas.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="border p-2">{t.nama}</td>
                <td className="border p-2">{t.nim}</td>
                <td className="border p-2">{t.judul}</td>
                <td className="border p-2">
                  <a
                    href={`/uploads/tugas/${t.file}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {tugas.map((t) => (
          <div key={t.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Nama:</span>
                <p className="font-medium">{t.nama}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">NIM:</span>
                <p className="font-medium">{t.nim}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Judul:</span>
                <p className="font-medium">{t.judul}</p>
              </div>
              <div className="pt-2">
                <a
                  href={`/uploads/tugas/${t.file}`}
                  target="_blank"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tugas.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Belum ada tugas</p>
      )}
    </div>
  );
}
