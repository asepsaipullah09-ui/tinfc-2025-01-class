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
      {/* Hero Section - Gradient background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/20 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Selamat Datang di Kelas TINFC-2025-01
          </h1>
          <p className="text-blue-100/90 text-lg max-w-2xl mb-8">
            Portal resmi perkuliahan terintegrasi untuk mengakses materi, mengumpulkan tugas, dan jadwal akademik.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/materi"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl text-sm font-semibold transition-all transform hover:-translate-y-0.5 shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Materi
            </Link>
            <Link
              href="/tugas"
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-6 py-3 rounded-xl text-sm font-semibold border border-white/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Upload Tugas
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-30 pointer-events-none">
          <svg className="w-96 h-96" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.9,-33.5,96.9,-17.9,97.7,-2C98.4,14,93.8,32.4,84.1,48.5C74.3,64.6,59.3,78.3,42.5,84.8C25.7,91.3,7.1,90.6,-10.8,87C-28.7,83.4,-45.8,76.9,-59.6,65.8C-73.4,54.7,-84.1,38.9,-86.6,22.1C-89,5.2,-83.1,-12.9,-73.4,-27.6C-63.7,-42.2,-50.2,-53.4,-36,-60.7C-21.8,-68,-6.9,-71.4,7.6,-76.6C22.1,-81.8,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Quick Stats - Premium styling */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {[
          { label: "Mahasiswa", value: data.totalMahasiswa, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
          { label: "Materi", value: data.totalMateri, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
          { label: "Tugas", value: data.totalTugas, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
          { label: "Galeri", value: data.totalGaleri, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10" },
          { label: "Acara", value: data.totalKalender, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-blue-200 dark:hover:border-slate-600 transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-150 transition-transform duration-500">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">{stat.icon}</svg>
            </div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="text-3xl font-extrabold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{stat.icon}</svg>
              </div>
            </div>
          </div>
        ))}
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
