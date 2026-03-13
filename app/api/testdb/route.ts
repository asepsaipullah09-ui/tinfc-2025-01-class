import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Test DB OK - Now using mock data (no real DB)",
  });
}
