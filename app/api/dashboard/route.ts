
import pool from "@/lib/db";

export async function GET() {
  try {
    // Get total counts
    const [mahasiswaResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM mahasiswa"
    );
    const mahasiswaTotal = (mahasiswaResult as any)[0]?.total || 0;

    const [materiResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM materi"
    );
    const materiTotal = (materiResult as any)[0]?.total || 0;

    const [tugasResult] = await pool.execute("SELECT COUNT(*) as total FROM tugas");
    const tugasTotal = (tugasResult as any)[0]?.total || 0;

    const [galeriResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM galeri"
    );
    const galeriTotal = (galeriResult as any)[0]?.total || 0;

    const [kalenderResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM kalender"
    );
    const kalenderTotal = (kalenderResult as any)[0]?.total || 0;

    // Get recent materi (latest 5)
    const [recentMateriRows] = await pool.execute(
      "SELECT * FROM materi ORDER BY created_at DESC LIMIT 5"
    );
    const recentMateri = recentMateriRows || [];

    // Get recent tugas (latest 5)
    const [recentTugasRows] = await pool.execute(
      "SELECT * FROM tugas ORDER BY created_at DESC LIMIT 5"
    );
    const recentTugas = recentTugasRows || [];

    // Get upcoming events (from today onwards, next 5)
    const today = new Date().toISOString().split("T")[0];
    const [upcomingEventsRows] = await pool.execute(
      "SELECT * FROM kalender WHERE tanggal >= ? ORDER BY tanggal ASC LIMIT 5",
      [today]
    );
    const upcomingEvents = upcomingEventsRows || [];

    // Get recent galeri (latest 5)
    const [recentGaleriRows] = await pool.execute(
      "SELECT * FROM galeri ORDER BY created_at DESC LIMIT 5"
    );
    const recentGaleri = recentGaleriRows || [];

    // Ensure values are always numbers, default to 0 if null/undefined
    const totalMahasiswa = Number(mahasiswaTotal) || 0;
    const totalMateri = Number(materiTotal) || 0;
    const totalTugas = Number(tugasTotal) || 0;
    const totalGaleri = Number(galeriTotal) || 0;
    const totalKalender = Number(kalenderTotal) || 0;

    return Response.json({
      // Counts
      totalMahasiswa,
      totalMateri,
      totalTugas,
      totalGaleri,
      totalKalender,
      // Recent data
      recentMateri: Array.isArray(recentMateri) ? recentMateri : [],
      recentTugas: Array.isArray(recentTugas) ? recentTugas : [],
      upcomingEvents: Array.isArray(upcomingEvents) ? upcomingEvents : [],
      recentGaleri: Array.isArray(recentGaleri) ? recentGaleri : [],
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    // Return default values on error
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