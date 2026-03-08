import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa");
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: "Failed to fetch mahasiswa data" });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, nim, email } = body;

    await db.query(
      "INSERT INTO mahasiswa (nama, nim, email) VALUES (?, ?, ?)",
      [nama, nim, email]
    );

    return Response.json({ message: "Mahasiswa berhasil ditambahkan" });
  } catch (error) {
    return Response.json({ error: "Failed to add mahasiswa data" });
  }
}

