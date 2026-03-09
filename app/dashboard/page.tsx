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
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Selamat Datang di Kelas TINFC-2025-01
        </h1>
        <p className="text-blue-100 text-lg">
          Website resmi perkuliahan untuk berbagi materi, tugas, dan informasi akademik
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/materi"
            className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Download Materi
          </Link>
          <Link
            href="/tugas"
            className="bg-blue-500 bg-opacity-30 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-opacity-40 transition-colors"
          >
            Upload Tugas
          </Link>
          <Link
            href="/kalender"
            className="bg-blue-500 bg-opacity-30 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-opacity-40 transition-colors"
          >
            Kalender Akademik
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-blue-600">{data.totalMahasiswa}</div>
          <div className="text-sm text-slate-500 mt-1">Mahasiswa</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-green-600">{data.totalMateri}</div>
          <div className="text-sm text-slate-500 mt-1">Materi</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-purple-600">{data.totalTugas}</div>
          <div className="text-sm text-slate-500 mt-1">Tugas</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-orange-500">{data.totalGaleri}</div>
          <div className="text-sm text-slate-500 mt-1">Galeri</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-red-500">{data.totalKalender}</div>
          <div className="text-sm text-slate-500 mt-1">Acara</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Materi */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Materi Terbaru
            </h2>
            <Link href="/materi" className="text-sm text-green-600 hover:text-green-700 font-medium">
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {data.recentMateri.length > 0 ? (
              data.recentMateri.map((materi) => (
                <div key={materi.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 line-clamp-1">{materi.judul}</p>
                        <p className="text-xs text-slate-500">{materi.created_at && formatDate(materi.created_at)}</p>
                      </div>
                    </div>
                    <a href={`/uploads/${materi.file}`} target="_blank" className="text-green-500 hover:text-green-700 p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>Belum ada materi</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Acara Mendatang
            </h2>
            <Link href="/kalender" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {data.upcomingEvents.length > 0 ? (
              data.upcomingEvents.map((kalenderEvent) => (
                <div key={kalenderEvent.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{new Date(kalenderEvent.tanggal).getDate()}</span>
                      <span className="text-xs text-blue-500">{new Date(kalenderEvent.tanggal).toLocaleDateString("id-ID", { month: "short" })}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{kalenderEvent.judul}</p>
                      <p className="text-sm text-slate-500 line-clamp-1">{kalenderEvent.deskripsi || "Tidak ada deskripsi"}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>Tidak ada acara mendatang</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Tugas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Tugas Terbaru
          </h2>
          <Link href="/tugas" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            Lihat Semua →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">Nama</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">NIM</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">Judul Tugas</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">Tanggal</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-slate-700">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.recentTugas.length > 0 ? (
                data.recentTugas.map((tugas) => (
                  <tr key={tugas.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-slate-800">{tugas.nama}</td>
                    <td className="px-5 py-3 text-slate-600 font-mono text-sm">{tugas.nim}</td>
                    <td className="px-5 py-3 text-slate-800">{tugas.judul}</td>
                    <td className="px-5 py-3 text-slate-500 text-sm">{tugas.created_at && formatDate(tugas.created_at)}</td>
                    <td className="px-5 py-3">
                      <a href={`/uploads/tugas/${tugas.file}`} target="_blank" className="inline-flex items-center gap-1 text-purple-500 hover:text-purple-700 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    Belum ada tugas yang dikumpulkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Galeri */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Galeri Kelas
          </h2>
          <Link href="/galeri" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            Lihat Semua →
          </Link>
        </div>
        <div className="p-5">
          {data.recentGaleri.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {data.recentGaleri.map((foto) => (
                <div key={foto.id} className="aspect-square rounded-lg overflow-hidden bg-slate-100 group">
                  <img src={foto.file_path} alt={foto.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>Belum ada foto di galeri</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}