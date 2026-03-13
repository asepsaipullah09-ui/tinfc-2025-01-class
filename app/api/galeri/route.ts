import { NextResponse } from "next/server";
import { galeri, saveData } from "@/lib/mockData";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  return Response.json(
    galeri.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
  );
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

    // Add to mock
    const newId = galeri.length
      ? Math.max(...galeri.map((g: any) => g.id)) + 1
      : 1;
    const newGaleri = {
      id: newId,
      judul: judul || "Untitled",
      file_path: fileUrl,
      created_at: new Date().toISOString(),
    };
    galeri.push(newGaleri);
    await saveData();

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

    const index = galeri.findIndex((g) => g.id === parseInt(id));
    if (index > -1) {
      const filePath = galeri[index].file_path;
      const fullPath = path.join(process.cwd(), "public", filePath);
      try {
        await unlink(fullPath);
      } catch (err) {
        console.error("File deletion error:", err);
      }
      galeri.splice(index, 1);
      await saveData();
    }

    return Response.json({ message: "Foto berhasil dihapus" });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete galeri data" },
      { status: 500 },
    );
  }
}
