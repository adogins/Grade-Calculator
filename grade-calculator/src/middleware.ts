import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: any) {
    const { nextUrl } = request;
    const pathname = nextUrl.pathname;

    if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname === '/favicon.ico') {
        return NextResponse.next();
      }
    
      // Skip authentication check for public routes (like login page)
      if (pathname === "/" || pathname === "/Signup" || pathname === "/api/users") {
        return NextResponse.next();
      }

    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, nextUrl.pathname);

    const reqUrl = new URL(request.url);
    if (!isAuthenticated && reqUrl.pathname !=="/") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

/*export const config = {
    matcher: [
        "/api/users/",
        "/api/users/[userId]/:path*",
        "/Signup",
        "/CourseView"
    ],
};*/