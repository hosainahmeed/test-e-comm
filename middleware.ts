import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const verified = req.cookies.get("age_verified")?.value === "true";

  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/age-verification" ||
    pathname === "/privacy" ||
    pathname === "/terms"
  ) {
    return NextResponse.next();
  }

  if (!verified) {
    const url = req.nextUrl.clone();

    url.pathname = "/age-verification";
    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
