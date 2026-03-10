import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password, nama, role } = await req.json();

    // Validation
    if (!username || !password || !nama) {
      return NextResponse.json(
        { message: "Username, password, dan nama wajib diisi!" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "Username sudah digunakan!" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      "INSERT INTO users (username, password, nama, role) VALUES ($1, $2, $3, $4) RETURNING id, username, nama, role",
      [username, hashedPassword, nama, role || "mahasiswa"]
    );

    return NextResponse.json(
      {
        message: "User berhasil dibuat!",
        user: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server!" },
      { status: 500 }
    );
  }
}