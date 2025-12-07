import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value || null;
  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname === "/admin";
  const isDashboardRoute = pathname.startsWith("/admin/dashboard");

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
