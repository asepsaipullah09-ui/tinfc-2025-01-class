"use client";

import { useState } from "react";

export default function FormMahasiswa() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/mahasiswa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, nim, email }),
    });

    window.location.reload();
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
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2">
        Tambah Mahasiswa
      </button>
    </form>
  );
}

