"use client";

import { useState, useEffect } from "react";

interface GaleriItem {
  id: number;
  judul: string;
  file_path: string;
  created_at: string;
}

export default function GaleriPage() {
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await fetch("/api/galeri");
      const data = await res.json();
      setGaleri(data);
    } catch (error) {
      console.error("Failed to fetch galeri:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !judul) {
      alert("Mohon isi judul dan pilih foto!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("file", file);

    try {
      const res = await fetch("/api/galeri", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Foto berhasil diupload!");
        setJudul("");
        setFile(null);
        fetchGaleri();
      } else {
        alert("Gagal mengupload foto");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal mengupload foto");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) {
      return;
    }

    try {
      const res = await fetch("/api/galeri", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Foto berhasil dihapus!");
        fetchGaleri();
      } else {
        alert("Gagal menghapus foto");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Gagal menghapus foto");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Galeri Kelas</h1>

      {/* Form Upload */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload Foto Kegiatan</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul Foto</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Presentasi AI"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pilih Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Mengupload..." : "Upload"}
          </button>
        </form>
      </div>

      {/* Galeri Display */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Dokumentasi Kelas</h2>
        
        {galeri.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada foto. Upload foto pertama Anda!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galeri.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={item.file_path}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{item.judul}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}