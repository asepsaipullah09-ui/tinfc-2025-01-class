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
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Materi Kuliah
      </h1>

      <FormMateri onSuccess={fetchMateri} />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Judul</th>
              <th className="border p-2">File</th>
            </tr>
          </thead>

          <tbody>
            {materi.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="border p-2">{m.judul}</td>
                <td className="border p-2">
                  <a
                    href={`/uploads/${m.file}`}
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
        {materi.map((m) => (
          <div key={m.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Judul:</span>
                <p className="font-medium">{m.judul}</p>
              </div>
              <a
                href={`/uploads/${m.file}`}
                target="_blank"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {materi.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Belum ada materi</p>
      )}
    </div>
  );
}
