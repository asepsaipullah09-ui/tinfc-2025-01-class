import { mahasiswa, saveData } from "@/lib/mockData";

export async function GET() {
  return Response.json(mahasiswa);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, nim, email } = body;
    const newId = mahasiswa.length
      ? Math.max(...mahasiswa.map((m) => m.id)) + 1
      : 1;
    const newMahasiswa = { id: newId, nama, nim, email };
    mahasiswa.push(newMahasiswa);
    await saveData();
    return Response.json({
      message: "Mahasiswa berhasil ditambahkan",
      data: newMahasiswa,
    });
  } catch (error) {
    return Response.json({ error: "Failed to add mahasiswa data" });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    const index = mahasiswa.findIndex((m) => m.id === parseInt(id));
    if (index > -1) {
      mahasiswa.splice(index, 1);
      await saveData();
    }
    return Response.json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: "Failed to delete mahasiswa data" });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, nim, email } = body;
    const index = mahasiswa.findIndex((m) => m.id === parseInt(id));
    if (index > -1) {
      mahasiswa[index] = { ...mahasiswa[index], nama, nim, email };
      await saveData();
    }
    return Response.json({ message: "Mahasiswa berhasil diperbarui" });
  } catch (error) {
    return Response.json({ error: "Failed to update mahasiswa data" });
  }
}
