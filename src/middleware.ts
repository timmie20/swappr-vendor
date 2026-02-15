import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ["/((?!api|proxy|_next/static|_next/image|favicon.ico|login|.*\\..*).*)"],
};