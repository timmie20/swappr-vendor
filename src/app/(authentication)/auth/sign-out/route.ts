import { NextResponse } from "next/server";
import { logoutVendor } from "@/lib/api-client";
import { siteUrl } from "@/constants/siteUrl";
import { clearTokens } from "@/lib/cookies";

export async function POST() {
  try {
    const res = await logoutVendor();
    if (res.data?.success) {
      await clearTokens();
    }
  } catch (error) {
    console.error("Logout error:", error);
    // still clear token even if server doesnt log-out just to be safe
    await clearTokens();
  }

  return NextResponse.redirect(`${siteUrl}/login`, {
    status: 301,
  });
}