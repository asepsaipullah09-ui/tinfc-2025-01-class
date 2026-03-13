import { NextResponse } from "next/server";
import { kalender, saveData } from "@/lib/mockData";

export async function GET() {
  const sorted = kalender.sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  return NextResponse.json(sorted);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { judul, deskripsi, tanggal } = body;

    if (!judul || !tanggal) {
      return NextResponse.json(
        { error: "Judul dan tanggal wajib diisi" },
        { status: 400 },
      );
    }

    const newId = kalender.length
      ? Math.max(...kalender.map((k: any) => k.id)) + 1
      : 1;
    const newKalender = {
      id: newId,
      judul,
      deskripsi: deskripsi || "",
      tanggal,
      created_at: new Date().toISOString(),
    };
    kalender.push(newKalender);
    await saveData();

    return NextResponse.json({ message: "Acara berhasil ditambahkan" });
  } catch (error) {
    console.error("Error adding kalender:", error);
    return NextResponse.json(
      { error: "Failed to add kalender data" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, judul, deskripsi, tanggal } = body;

    if (!id || !judul || !tanggal) {
      return NextResponse.json(
        { error: "ID, judul, dan tanggal wajib diisi" },
        { status: 400 },
      );
    }

    const index = kalender.findIndex((k) => k.id === parseInt(id));
    if (index > -1) {
      kalender[index] = {
        ...kalender[index],
        judul,
        deskripsi: deskripsi || "",
        tanggal,
      };
      kalender[index].created_at = new Date().toISOString();
      await saveData();
    }

    return NextResponse.json({ message: "Acara berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating kalender:", error);
    return NextResponse.json(
      { error: "Failed to update kalender data" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    const index = kalender.findIndex((k) => k.id === parseInt(id));
    if (index > -1) {
      kalender.splice(index, 1);
      await saveData();
    }

    return NextResponse.json({ message: "Acara berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting kalender:", error);
    return NextResponse.json(
      { error: "Failed to delete kalender data" },
      { status: 500 },
    );
  }
}
