import pool from "@/lib/db";

export async function GET() {
  try {
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

    // Ensure values are always numbers, default to 0 if null/undefined
    const totalMahasiswa = Number(mahasiswa?.[0]?.total ?? 0) || 0;
    const totalMateri = Number(materi?.[0]?.total ?? 0) || 0;
    const totalTugas = Number(tugas?.[0]?.total ?? 0) || 0;
    const totalGaleri = Number(galeri?.[0]?.total ?? 0) || 0;
    const totalKalender = Number(kalender?.[0]?.total ?? 0) || 0;

    return Response.json({
      totalMahasiswa,
      totalMateri,
      totalTugas,
      totalGaleri,
      totalKalender,
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
    });
  }
}
