import { NextResponse } from "next/server";

export function middleware(req) {
  const authCookie = req.cookies.get("auth_token")?.value;

  // Jika tidak ada token, redirect ke login
  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Proteksi semua halaman di /admin
export const config = {
  matcher: ["/admin/:path*"],
};
