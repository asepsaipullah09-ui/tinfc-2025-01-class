import { tugas, saveData } from "@/lib/mockData";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  const sorted = tugas.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return Response.json(sorted);
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

    // Save to mock data
    const newId = tugas.length
      ? Math.max(...tugas.map((t: any) => t.id || 0)) + 1
      : 1;
    const newTugas = {
      id: newId,
      nama,
      nim,
      judul,
      file: filename,
      created_at: new Date().toISOString(),
    };
    tugas.push(newTugas);
    await saveData();

    return Response.json({ message: "Tugas berhasil diupload" });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Failed to upload tugas" }, { status: 500 });
  }
}
