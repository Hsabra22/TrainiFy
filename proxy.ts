import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const path = req.nextUrl.pathname;

  const verifyToken = async (token: string, secretKey: string) => {
    const secret = new TextEncoder().encode(secretKey);
    return await jwtVerify(token, secret);
  };

  const handleRoleRouting = (role: string) => {
    if (["/login", "/register"].includes(path)) {
      const redirectPath =
        role === "user"
          ? "/Users/generate"
          : role === "trainer"
          ? "/Trainers/dashboard"
          : "/Admin/dashboard";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    if (role === "user" && (path.startsWith("/Admin") || path.startsWith("/Trainers"))) {
      return NextResponse.redirect(new URL("/Users/generate", req.url));
    }
    if (role === "admin" && (path.startsWith("/Users") || path.startsWith("/Trainers"))) {
      return NextResponse.redirect(new URL("/Admin/dashboard", req.url));
    }
    if (role === "trainer" && (path.startsWith("/Users") || path.startsWith("/Admin"))) {
      return NextResponse.redirect(new URL("/Trainers/dashboard", req.url));
    }

    if ((role === "admin" || role === "trainer") && (path === "/" || path.startsWith("/aboutus"))) {
      const redirectPath = role === "admin" ? "/Admin/dashboard" : "/Trainers/dashboard";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  };

  if (["/login", "/register"].includes(path) && !authToken && !refreshToken) {
    return NextResponse.next();
  }

  try {
    if (authToken) {
      const { payload } = await verifyToken(authToken, process.env.JWT_KEY!);
      return handleRoleRouting(payload.role as string);
    }
    if (refreshToken) {
      const { payload } = await verifyToken(refreshToken, process.env.JWT_REFRESH_KEY!);
      return handleRoleRouting(payload.role as string);
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (path === "/" || path === "/aboutus") {
  return NextResponse.next();
 }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/Admin/:path*",
    "/Users/:path*",
    "/Trainers/:path*",
    "/login",
    "/register",
    "/",
    "/aboutus",
  ],
};
