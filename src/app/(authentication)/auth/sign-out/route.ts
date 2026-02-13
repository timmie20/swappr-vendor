import { NextResponse } from "next/server";
import { logoutVendor } from "@/lib/api-client";
import { siteUrl } from "@/constants/siteUrl";

export async function POST() {
  // TODO: Replace with actual backend API logout
  // This should clear the JWT token and invalidate the session

  try {
    await logoutVendor();

    // TODO: Clear authentication cookies/tokens here
    // For now, just redirect to login
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Redirect the user to the login page.
  return NextResponse.redirect(`${siteUrl}/login`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
