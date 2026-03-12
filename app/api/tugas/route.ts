import pool from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM tugas ORDER BY created_at DESC");
    return Response.json(rows || []);
  } catch (error) {
    console.error("Failed to fetch tugas:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const nim = formData.get("nim") as string;
    const judul = formData.get("judul") as string;
    const file = formData.get("file") as File;

    if (!nama || !nim || !judul || !file) {
      return Response.json(
        { error: "Semua field harus diisi" },
        { status: 400 },
      );
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "tugas");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filepath = path.join(uploadDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Save to database
    await pool.execute(
      "INSERT INTO tugas (nama, nim, judul, file) VALUES (?, ?, ?, ?)",
      [nama, nim, judul, filename],
    );

    return Response.json({ message: "Tugas berhasil diupload" });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Failed to upload tugas" }, { status: 500 });
  }
}
