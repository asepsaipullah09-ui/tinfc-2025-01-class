import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM kalender ORDER BY tanggal ASC");
    return NextResponse.json(rows || []);
  } catch (error) {
    console.error("Error fetching kalender:", error);
    return NextResponse.json([], { status: 200 });
  }
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

    await pool.execute(
      "INSERT INTO kalender (judul, deskripsi, tanggal) VALUES (?, ?, ?)",
      [judul, deskripsi || "", tanggal],
    );

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

    await pool.execute(
      "UPDATE kalender SET judul = ?, deskripsi = ?, tanggal = ? WHERE id = ?",
      [judul, deskripsi || "", tanggal, id],
    );

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

    await pool.execute("DELETE FROM kalender WHERE id = ?", [id]);

    return NextResponse.json({ message: "Acara berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting kalender:", error);
    return NextResponse.json(
      { error: "Failed to delete kalender data" },
      { status: 500 },
    );
  }
}
