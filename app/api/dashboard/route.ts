import db from "@/lib/db";

export async function GET() {
  try {
    const [mahasiswa] = await db.query(
      "SELECT COUNT(*) as total FROM mahasiswa"
    );

    const totalMahasiswa = (mahasiswa as any)[0].total;

    return Response.json({
      totalMahasiswa
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch dashboard data" });
  }
}