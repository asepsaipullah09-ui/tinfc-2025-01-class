import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM mahasiswa");
    return Response.json(rows || []);
  } catch (error) {
    console.error("Failed to fetch mahasiswa:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, nim, email } = body;

    await pool.execute(
      "INSERT INTO mahasiswa (nama, nim, email) VALUES (?, ?, ?)",
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

    await pool.execute("DELETE FROM mahasiswa WHERE id = ?", [id]);

    return Response.json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: "Failed to delete mahasiswa data" });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, nim, email } = body;

    await pool.execute(
      "UPDATE mahasiswa SET nama = ?, nim = ?, email = ? WHERE id = ?",
      [nama, nim, email, id],
    );

    return Response.json({ message: "Mahasiswa berhasil diperbarui" });
  } catch (error) {
    return Response.json({ error: "Failed to update mahasiswa data" });
  }
}