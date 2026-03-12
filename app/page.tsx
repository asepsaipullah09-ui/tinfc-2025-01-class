import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import pool from "@/lib/db";

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

async function getDashboardData(): Promise<DashboardData> {
  const [
    [mahasiswaRes],
    [materiRes],
    [tugasRes],
    [galeriRes],
    [kalenderRes],
    [recentMateri],
    [recentTugas],
    [upcomingEvents],
    [recentGaleri]
  ] = await Promise.all([
    pool.execute("SELECT COUNT(*) as count FROM mahasiswa"),
    pool.execute("SELECT COUNT(*) as count FROM materi"),
    pool.execute("SELECT COUNT(*) as count FROM tugas"),
    pool.execute("SELECT COUNT(*) as count FROM galeri"),
    pool.execute("SELECT COUNT(*) as count FROM kalender"),
    pool.execute("SELECT id, judul, file, created_at FROM materi ORDER BY created_at DESC LIMIT 5"),
    pool.execute("SELECT id, nama, nim, judul, file, created_at FROM tugas ORDER BY created_at DESC LIMIT 5"),
    pool.execute("SELECT id, judul, deskripsi, tanggal FROM kalender WHERE tanggal >= CURDATE() ORDER BY tanggal ASC LIMIT 5"),
    pool.execute("SELECT id, judul, file_path, created_at FROM galeri ORDER BY created_at DESC LIMIT 5")
  ]);

  return {
    totalMahasiswa: (mahasiswaRes as any[])[0]?.count || 0,
    totalMateri: (materiRes as any[])[0]?.count || 0,
    totalTugas: (tugasRes as any[])[0]?.count || 0,
    totalGaleri: (galeriRes as any[])[0]?.count || 0,
    totalKalender: (kalenderRes as any[])[0]?.count || 0,
    recentMateri: recentMateri as any[],
    recentTugas: recentTugas as any[],
    upcomingEvents: upcomingEvents as any[],
    recentGaleri: recentGaleri as any[],
  };
}

export default async function HomePage() {
  const session = await auth();

  // If logged in, show dashboard
  if (session?.user) {
    const data = await getDashboardData();
    return <DashboardContent data={data} />;
  }

  // Public landing
  return <LandingPage />;
}

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl shadow-2xl shadow-blue-500/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
          </div>
        </div>
        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
          Portal Kelas Digital
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            TINFC‑2025‑01
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Platform terintegrasi untuk materi kuliah, pengumpulan tugas, kalender akademik, dan galeri kelas Teknik Informatika.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Masuk ke Portal
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/register" className="px-8 py-4 bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            </svg>
            Daftar Sekarang
          </Link>
        </div>
        <p className="mt-12 text-sm text-gray-400 dark:text-gray-600">
          © 2025 Kelas TINFC-2025-01 · Teknik Informatika
        </p>
      </div>
    </div>
  );
}

interface DashboardContentProps {
  data: DashboardData;
}

function DashboardContent({ data }: DashboardContentProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const stats = [
    { label: "Mahasiswa", value: data.totalMahasiswa, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { label: "Materi", value: data.totalMateri, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { label: "Tugas", value: data.totalTugas, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Galeri", value: data.totalGaleri, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Acara", value: data.totalKalender, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  ];

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-500/20 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
          Selamat Datang di Kelas TINFC-2025-01
        </h1>
        <p className="text-blue-100/90 text-lg max-w-2xl mb-8">
          Portal resmi perkuliahan terintegrasi untuk mengakses materi, mengumpulkan tugas, dan jadwal akademik.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group ${stat.bg}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className={`text-3xl font-extrabold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 transition-colors ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { href: "/mahasiswa", label: "Data Mahasiswa", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
          { href: "/materi", label: "Materi", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
          { href: "/tugas", label: "Tugas", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
          { href: "/galeri", label: "Galeri", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
          { href: "/kalender", label: "Kalender", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        ].map(({ href, label, icon }, i) => (
          <Link key={i} href={href} className="group p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </div>
            <div className="font-semibold text-gray-800 dark:text-white">{label}</div>
          </Link>
        ))}
      </div>

      {/* Recent sections simplified */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-6">
          <h3 className="font-bold text-lg mb-4">Materi Terbaru</h3>
          {data.recentMateri.length ? (
            <ul className="space-y-2">
              {data.recentMateri.slice(0,3).map((m) => (
                <li key={m.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <span className="font-medium">{m.judul}</span>
                  <span className="text-sm text-gray-500">{formatDate(m.created_at!)}</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500">Belum ada materi</p>}
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-6">
          <h3 className="font-bold text-lg mb-4">Tugas Terbaru</h3>
          {data.recentTugas.length ? (
            <ul className="space-y-2">
              {data.recentTugas.slice(0,3).map((t) => (
                <li key={t.id} className="flex justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <span>{t.nama} ({t.nim})</span>
                  <span className="text-sm">{formatDate(t.created_at!)}</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500">Belum ada tugas</p>}
        </div>
      </div>
    </div>
  );
}
