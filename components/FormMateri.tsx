"use client";

import { useState } from "react";

export default function FormMateri() {
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!judul || !file) {
      alert("Judul dan file harus diisi");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("file", file);

    try {
      await fetch("/api/materi", {
        method: "POST",
        body: formData,
      });

      // Reset form
      setJudul("");
      setFile(null);
      
      // Reload page to show new materi
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload materi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="Judul Materi"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />

      <input
        type="file"
        className="border p-2 w-full"
        accept=".pdf,.ppt,.pptx,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button 
        className="bg-blue-600 text-white px-4 py-2 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Mengupload..." : "Upload Materi"}
      </button>
    </form>
  );
}