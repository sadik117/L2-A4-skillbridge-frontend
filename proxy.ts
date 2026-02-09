import { NextRequest, NextResponse } from "next/server";
import { userService } from "./components/services/user.service";

enum Roles {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const { data } = await userService.getSession();

//   console.log(data);

  // Not logged in
  if (!data?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  // banned
  if (data.user.banned) {
    return NextResponse.redirect(new URL("/banned", request.url));
  }

  // If user already in correct place then allow

  if (role === Roles.ADMIN && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.next();
  }

  if (role === Roles.TUTOR && pathname.startsWith("/tutor-dashboard")) {
    return NextResponse.next();
  }

  if (role === Roles.STUDENT && pathname.startsWith("/student-dashboard")) {
    return NextResponse.next();
  }


   //  Otherwise redirect to their own dashboard
   
  if (role === Roles.ADMIN) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (role === Roles.TUTOR) {
    return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
  }

  if (role === Roles.STUDENT) {
    return NextResponse.redirect(new URL("/student-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/student-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
