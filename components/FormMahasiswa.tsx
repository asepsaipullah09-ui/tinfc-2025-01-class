"use client";

import { useState } from "react";

interface FormMahasiswaProps {
  onSuccess?: () => void;
}

export default function FormMahasiswa({ onSuccess }: FormMahasiswaProps) {
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

    setNama("");
    setNim("");
    setEmail("");
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tambah Mahasiswa Baru</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Nama</label>
          <input
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">NIM</label>
          <input
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow">
          Tambah
        </button>
      </form>
    </div>
  );
}