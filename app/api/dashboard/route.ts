import { mahasiswa, materi, tugas, galeri, kalender } from "@/lib/mockData";

export async function GET() {
  try {
    const totalMahasiswa = mahasiswa.length;
    const totalMateri = materi.length;
    const totalTugas = tugas.length;
    const totalGaleri = galeri.length;
    const totalKalender = kalender.length;

    const recentMateri = materi
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    const recentTugas = tugas
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    const upcomingEvents = kalender
      .filter((k) => k.tanggal >= new Date().toISOString().split("T")[0])
      .slice(0, 5)
      .sort((a, b) => a.tanggal.localeCompare(b.tanggal));
    const recentGaleri = galeri
      .slice(0, 5)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

    return Response.json({
      totalMahasiswa,
      totalMateri,
      totalTugas,
      totalGaleri,
      totalKalender,
      recentMateri,
      recentTugas,
      upcomingEvents,
      recentGaleri,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return Response.json({
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
  }
}
