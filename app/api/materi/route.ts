import db from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM materi ORDER BY created_at DESC",
    );
    // Ensure we always return an array
    return Response.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("Failed to fetch materi:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const judul = formData.get("judul") as string;
    const file = formData.get("file") as File;

    if (!judul || !file) {
      return Response.json(
        { error: "Judul dan file harus diisi" },
        { status: 400 },
      );
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
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
    await db.query("INSERT INTO materi (judul, file) VALUES (?, ?)", [
      judul,
      filename,
    ]);

    return Response.json({ message: "Materi berhasil diupload" });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Failed to upload materi" }, { status: 500 });
  }
}
