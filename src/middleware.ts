import { NextRequest, NextResponse } from "next/server";

// TODO: Authentication middleware removed for development
// All routes are now publicly accessible
// Will be re-implemented with backend API authentication in future
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // No authentication checks - all routes are public for now
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth|.*\\..*).*)"],
};
