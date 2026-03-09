import db from "@/lib/db";

export async function GET() {
  try {
    const [mahasiswa]: any = await db.query(
      "SELECT COUNT(*) as total FROM mahasiswa",
    );

    const [materi]: any = await db.query(
      "SELECT COUNT(*) as total FROM materi",
    );

    const [tugas]: any = await db.query("SELECT COUNT(*) as total FROM tugas");

    const [galeri]: any = await db.query(
      "SELECT COUNT(*) as total FROM galeri",
    );

    const [kalender]: any = await db.query(
      "SELECT COUNT(*) as total FROM kalender",
    );

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
