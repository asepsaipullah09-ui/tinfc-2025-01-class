import { NextRequest, NextResponse } from "next/server";
import { users, saveData } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  const { username, email, password, nama, role } = await req.json();

  // Validation
  if (!username || !email || !password || !nama) {
    return NextResponse.json(
      { message: "Username, email, password, dan nama wajib diisi!" },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password minimal 6 karakter!" },
      { status: 400 },
    );
  }

  // Check existing username
  if (users.some((u) => u.username === username)) {
    return NextResponse.json(
      { message: "Username sudah digunakan!" },
      { status: 400 },
    );
  }

  // Check existing email
  if (email) {
    if (!email.endsWith("@uniku.ac.id")) {
      return NextResponse.json(
        { message: "Email harus domain @uniku.ac.id!" },
        { status: 400 },
      );
    }

    if (users.some((u) => u.email === email)) {
      return NextResponse.json(
        { message: "Email sudah terdaftar!" },
        { status: 400 },
      );
    }
  }

  // Add user (plain password for mock)
  const newId = users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 3;
  const newUser = {
    id: newId,
    username,
    email: email || null,
    password, // plain for mock
    nama,
    role: role || "mahasiswa",
  };
  users.push(newUser);
  await saveData();

  console.log("User registered successfully:", newUser);

  return NextResponse.json(
    {
      message: "User berhasil dibuat!",
      user: newUser,
    },
    { status: 201 },
  );
}
