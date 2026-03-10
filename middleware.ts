import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnMateri = req.nextUrl.pathname.startsWith("/materi");
  const isOnTugas = req.nextUrl.pathname.startsWith("/tugas");
  const isOnKalender = req.nextUrl.pathname.startsWith("/kalender");
  const isOnGaleri = req.nextUrl.pathname.startsWith("/galeri");
  const isOnMahasiswa = req.nextUrl.pathname.startsWith("/mahasiswa");
  const isOnProfile = req.nextUrl.pathname.startsWith("/profile");
  const isOnApiAuth = req.nextUrl.pathname.startsWith("/api/auth");

  // Allow API auth routes
  if (isOnApiAuth) {
    return;
  }

  // If not logged in and trying to access protected routes
  if (!isLoggedIn) {
    if (isOnDashboard || isOnMateri || isOnTugas || isOnKalender || isOnGaleri || isOnMahasiswa || isOnProfile) {
      const response = Response.redirect(new URL("/login", req.nextUrl));
      return response;
    }
  }

  // If logged in and trying to access login page
  if (isLoggedIn && isOnLoginPage) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/materi/:path*",
    "/tugas/:path*",
    "/kalender/:path*",
    "/galeri/:path*",
    "/mahasiswa/:path*",
    "/profile/:path*",
    "/login",
  ],
};