import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT 1 + 1 AS result");
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: "Database connection failed" });
  }
}
