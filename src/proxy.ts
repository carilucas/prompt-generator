import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const session = request.cookies.get("session");

    const isDashboard =
        request.nextUrl.pathname.startsWith("/dashboard");

    const isAuthPage =
        request.nextUrl.pathname.startsWith("/auth/login") ||
        request.nextUrl.pathname.startsWith("/auth/register");

    if (isDashboard && !session) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuthPage && session) {
        return NextResponse.redirect(new URL("/dashboard/prompt", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth/login",
        "/auth/register",
    ],
};