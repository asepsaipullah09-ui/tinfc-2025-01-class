
import pool from "@/lib/db";

export async function GET() {
  try {
    // Get total counts
    const mahasiswaResult = await pool.query(
      "SELECT COUNT(*) as total FROM mahasiswa",
    );
    const mahasiswa = mahasiswaResult.rows;

    const materiResult = await pool.query(
      "SELECT COUNT(*) as total FROM materi",
    );
    const materi = materiResult.rows;

    const tugasResult = await pool.query("SELECT COUNT(*) as total FROM tugas");
    const tugas = tugasResult.rows;

    const galeriResult = await pool.query(
      "SELECT COUNT(*) as total FROM galeri",
    );
    const galeri = galeriResult.rows;

    const kalenderResult = await pool.query(
      "SELECT COUNT(*) as total FROM kalender",
    );
    const kalender = kalenderResult.rows;

    // Get recent materi (latest 5)
    const recentMateriResult = await pool.query(
      "SELECT * FROM materi ORDER BY created_at DESC LIMIT 5",
    );
    const recentMateri = recentMateriResult.rows;

    // Get recent tugas (latest 5)
    const recentTugasResult = await pool.query(
      "SELECT * FROM tugas ORDER BY created_at DESC LIMIT 5",
    );
    const recentTugas = recentTugasResult.rows;

    // Get upcoming events (from today onwards, next 5)
    const today = new Date().toISOString().split("T")[0];
    const upcomingEventsResult = await pool.query(
      "SELECT * FROM kalender WHERE tanggal >= ? ORDER BY tanggal ASC LIMIT 5",
      [today],
    );
    const upcomingEvents = upcomingEventsResult.rows;

    // Get recent galeri (latest 5)
    const recentGaleriResult = await pool.query(
      "SELECT * FROM galeri ORDER BY created_at DESC LIMIT 5",
    );
    const recentGaleri = recentGaleriResult.rows;

    // Ensure values are always numbers, default to 0 if null/undefined
    const totalMahasiswa = Number(mahasiswa?.[0]?.total ?? 0) || 0;
    const totalMateri = Number(materi?.[0]?.total ?? 0) || 0;
    const totalTugas = Number(tugas?.[0]?.total ?? 0) || 0;
    const totalGaleri = Number(galeri?.[0]?.total ?? 0) || 0;
    const totalKalender = Number(kalender?.[0]?.total ?? 0) || 0;

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