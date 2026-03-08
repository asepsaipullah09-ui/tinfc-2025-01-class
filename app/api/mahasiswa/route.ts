import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa");
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: "Failed to fetch mahasiswa data" });
  }
}

