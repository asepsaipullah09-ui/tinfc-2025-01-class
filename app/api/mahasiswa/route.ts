import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM mahasiswa");
    const rows = result.rows;
    // Ensure we always return an array
    return Response.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("Failed to fetch mahasiswa:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, nim, email } = body;

    await pool.query(
      "INSERT INTO mahasiswa (nama, nim, email) VALUES ($1, $2, $3)",
      [nama, nim, email],
    );

    return Response.json({ message: "Mahasiswa berhasil ditambahkan" });
  } catch (error) {
    return Response.json({ error: "Failed to add mahasiswa data" });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await pool.query("DELETE FROM mahasiswa WHERE id = $1", [id]);

    return Response.json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: "Failed to delete mahasiswa data" });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, nim, email } = body;

    await pool.query(
      "UPDATE mahasiswa SET nama = $1, nim = $2, email = $3 WHERE id = $4",
      [nama, nim, email, id],
    );

    return Response.json({ message: "Mahasiswa berhasil diperbarui" });
  } catch (error) {
    return Response.json({ error: "Failed to update mahasiswa data" });
  }
}
