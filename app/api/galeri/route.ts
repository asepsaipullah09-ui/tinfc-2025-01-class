import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM galeri ORDER BY created_at DESC",
    );
    // Ensure we always return an array
    return Response.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("Failed to fetch galeri:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const judul = data.get("judul") as string;
    const file = data.get("file") as File;

    if (!file) {
      return Response.json({ error: "File is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = Date.now() + "-" + file.name.replace(/\s+/g, "-");
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    await db.query("INSERT INTO galeri (judul, file_path) VALUES (?, ?)", [
      judul,
      fileUrl,
    ]);

    return NextResponse.json({
      success: true,
      message: "Foto berhasil diupload",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    // Get file path first
    const [rows]: any = await db.query(
      "SELECT file_path FROM galeri WHERE id = ?",
      [id],
    );

    if (rows && rows.length > 0) {
      const filePath = rows[0].file_path;

      // Delete file from filesystem
      const fullPath = path.join(process.cwd(), "public", filePath);
      try {
        await unlink(fullPath);
      } catch (err) {
        console.error("File deletion error:", err);
      }
    }

    await db.query("DELETE FROM galeri WHERE id = ?", [id]);

    return Response.json({ message: "Foto berhasil dihapus" });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete galeri data" },
      { status: 500 },
    );
  }
}
