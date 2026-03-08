import db from "@/lib/db";

export async function GET() {
  try {
    const [mahasiswa] = await db.query(
      "SELECT COUNT(*) as total FROM mahasiswa"
    );

    const [materi] = await db.query(
      "SELECT COUNT(*) as total FROM materi"
    );

    const [tugas] = await db.query(
      "SELECT COUNT(*) as total FROM tugas"
    );

    const [galeri] = await db.query(
      "SELECT COUNT(*) as total FROM galeri"
    );

    const totalMahasiswa = (mahasiswa as any)[0].total;
    const totalMateri = (materi as any)[0].total;
    const totalTugas = (tugas as any)[0].total;
    const totalGaleri = (galeri as any)[0].total;

    return Response.json({
      totalMahasiswa,
      totalMateri,
      totalTugas,
      totalGaleri
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch dashboard data" });
  }
}