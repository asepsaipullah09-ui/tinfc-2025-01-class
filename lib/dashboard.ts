import { galeri, kalender, mahasiswa, materi, tugas } from "@/lib/mockData";

export interface DashboardData {
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

export async function getDashboardData(): Promise<DashboardData> {
  return {
    totalMahasiswa: mahasiswa.length,
    totalMateri: materi.length,
    totalTugas: tugas.length,
    totalGaleri: galeri.length,
    totalKalender: kalender.length,
    recentMateri: materi
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
      ),
    recentTugas: tugas
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
      ),
    upcomingEvents: kalender
      .filter((k) => k.tanggal >= new Date().toISOString().split("T")[0])
      .slice(0, 5),
    recentGaleri: galeri
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
      ),
  };
}

