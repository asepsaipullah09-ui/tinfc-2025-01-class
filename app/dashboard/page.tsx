"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  totalMahasiswa: number;
  totalMateri: number;
  totalTugas: number;
  totalGaleri: number;
  totalKalender: number;
  recentMateri: Array<{
    id: number;
    judul: string;
    file: string;
    created_at?: string;
  }>;
  recentTugas: Array<{
    id: number;
    nama: string;
    nim: string;
    judul: string;
    file: string;
    created_at?: string;
  }>;
  upcomingEvents: Array<{
    id: number;
    judul: string;
    deskripsi: string;
    tanggal: string;
  }>;
  recentGaleri: Array<{
    id: number;
    judul: string;
    file_path: string;
    created_at?: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalMahasiswa: 0,
    totalMateri: 0,
    totalTugas: 0,
    totalGaleri: 0,
    totalKalender: 0,
    recentMateri: [],
    recentTugas: [],
    upcomingEvents: [],
    recentGaleri: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Memuat dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section - White with subtle gray shadow */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Selamat Datang di Kelas TINFC-2025-01
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          Website resmi perkuliahan untuk berbagi materi, tugas, dan informasi
          akademik
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/materi"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Download Materi
          </Link>
          <Link
            href="/tugas"
            className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Upload Tugas
          </Link>
          <Link
            href="/kalender"
            className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Kalender Akademik
          </Link>
        </div>
      </div>

      {/* Quick Stats - Clean white cards with gray accents */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.totalMahasiswa}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Mahasiswa
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.totalMateri}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Materi
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.totalTugas}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tugas
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.totalGaleri}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Galeri
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.totalKalender}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Acara
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Materi - Clean white card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-800 dark:text-white">
              Materi Terbaru
            </h2>
            <Link
              href="/materi"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {data.recentMateri.length > 0 ? (
              data.recentMateri.map((materi) => (
                <div
                  key={materi.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-600 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm line-clamp-1">
                          {materi.judul}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {materi.created_at && formatDate(materi.created_at)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`/uploads/${materi.file}`}
                      target="_blank"
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 p-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 dark:text-gray-500">
                <p>Belum ada materi</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events - Clean white card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-800 dark:text-white">
              Acara Mendatang
            </h2>
            <Link
              href="/kalender"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {data.upcomingEvents.length > 0 ? (
              data.upcomingEvents.map((kalenderEvent) => (
                <div
                  key={kalenderEvent.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {new Date(kalenderEvent.tanggal).getDate()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(kalenderEvent.tanggal).toLocaleDateString(
                          "id-ID",
                          { month: "short" },
                        )}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                        {kalenderEvent.judul}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 line-clamp-1">
                        {kalenderEvent.deskripsi || "Tidak ada deskripsi"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 dark:text-gray-500">
                <p>Tidak ada acara mendatang</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Tugas - Clean white card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">
            Tugas Terbaru
          </h2>
          <Link
            href="/tugas"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  NIM
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Judul Tugas
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  File
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {data.recentTugas.length > 0 ? (
                data.recentTugas.map((tugas) => (
                  <tr key={tugas.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm text-gray-800">
                      {tugas.nama}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 font-mono">
                      {tugas.nim}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-800">
                      {tugas.judul}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-400">
                      {tugas.created_at && formatDate(tugas.created_at)}
                    </td>
                    <td className="px-5 py-3">
                      <a
                        href={`/uploads/tugas/${tugas.file}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-gray-400"
                  >
                    Belum ada tugas yang dikumpulkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Galeri - Clean white card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">
            Galeri Kelas
          </h2>
          <Link
            href="/galeri"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="p-5">
          {data.recentGaleri.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {data.recentGaleri.map((foto) => (
                <div
                  key={foto.id}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 group"
                >
                  <img
                    src={foto.file_path}
                    alt={foto.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500">
              <p>Belum ada foto di galeri</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
