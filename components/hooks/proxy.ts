import { NextRequest, NextResponse } from "next/server";
import { userService } from "../services/user.service";

// Define roles
enum Roles {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip public pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Get server session
  const { data } = await userService.getSession();
  // Not authenticated → redirect to login
  if (!data?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  // Banned users → redirect
  if (data.user.banned) {
    return NextResponse.redirect(new URL("/banned", request.url));
  }

  // Role-based access
  if (role === Roles.ADMIN && pathname.startsWith("/dashboard") || pathname.startsWith("/tutor-dashboard") || pathname.startsWith("/student-dashboard")) {
    // Admin cannot access student/tutor dashboard
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if ((role === Roles.STUDENT || role === Roles.TUTOR) && pathname.startsWith("/admin-dashboard")) {
    // Students/Tutors cannot access admin dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (role === Roles.STUDENT && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/student-dashboard", request.url));
  }

  if (role === Roles.TUTOR && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
  }

  // All allowed → continue
  return NextResponse.next();
}

// Apply middleware to dashboard routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
