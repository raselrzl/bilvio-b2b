// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Only routes listed here will require a session.
// Add or remove paths as needed.
const PROTECTED_PATHS = [
  "/",            // homepage protected
 "/dashboard",
  "/account",
  "/settings",
  // "/anything-else",
];

function isProtected(pathname: string) {
  // Special-case root "/" so it doesn't match everything
  if (pathname === "/") return PROTECTED_PATHS.includes("/");

  // Match an exact protected path or any child path under it
  return PROTECTED_PATHS.some(
    (p) => p !== "/" && (pathname === p || pathname.startsWith(`${p}/`))
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next internals, API routes, and static files through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api") ||
    /\.\w+$/.test(pathname) // e.g. /logo.svg, /file.js
  ) {
    return NextResponse.next();
  }

  // If the route isn't protected, let it through
  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  // Auth check for protected routes
  const raw = req.cookies.get("bilvio_session")?.value ?? "";
  const authed = Boolean(raw && raw !== "undefined" && raw !== "null");

  if (!authed) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname); // optional: for redirect-after-login
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except obvious assets; we early-exit above anyway.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
