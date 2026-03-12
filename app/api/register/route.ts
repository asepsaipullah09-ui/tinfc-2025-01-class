import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, nama, role } = await req.json();

    // Validation
    if (!username || !email || !password || !nama) {
      return NextResponse.json(
        { message: "Username, email, password, dan nama wajib diisi!" },
        { status: 400 }
      );
    }

    // Check username only (email column fix pending)
    const [existingRows] = await pool.execute(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (Array.isArray(existingRows) && existingRows.length > 0) {
      return NextResponse.json(
        { message: "Username sudah digunakan!" },
        { status: 400 }
      );
    }

    // Skip email check until schema fixed
    if (email && !email.endsWith('@uniku.ac.id')) {
      return NextResponse.json(
        { message: "Email harus domain @uniku.ac.id!" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert without email (schema fix)
    const [result] = await pool.execute(
      "INSERT INTO users (username, password, nama, role) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, nama, role || "mahasiswa"]
    );


    return NextResponse.json(
      {
        message: "User berhasil dibuat!",
        user: { id: (result as any).insertId, username, email, nama, role: role || "mahasiswa" },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register FULL ERROR:", error);
    console.error("Error stack:", (error as Error).stack);
    return NextResponse.json(
      { 
        message: "Server error detail: " + (error as Error).message,
        debug: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}