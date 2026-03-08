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

      // Reset form
      setNama("");
      setNim("");
      setJudul("");
      setFile(null);

      // Call onSuccess callback
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
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="NIM"
        value={nim}
        onChange={(e) => setNim(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Judul Tugas"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />

      <input
        type="file"
        className="border p-2 w-full"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Mengupload..." : "Upload Tugas"}
      </button>
    </form>
  );
}
