import db from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await db.query("SELECT * FROM mahasiswa");
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

    await db.query(
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

    await db.query("DELETE FROM mahasiswa WHERE id = ?", [id]);

    return Response.json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: "Failed to delete mahasiswa data" });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, nim, email } = body;

    await db.query(
      "UPDATE mahasiswa SET nama = ?, nim = ?, email = ? WHERE id = ?",
      [nama, nim, email, id],
    );

    return Response.json({ message: "Mahasiswa berhasil diperbarui" });
  } catch (error) {
    return Response.json({ error: "Failed to update mahasiswa data" });
  }
}
