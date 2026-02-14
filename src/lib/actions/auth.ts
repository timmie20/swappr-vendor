"use server";

import { UserRole, VendorServerActionResponse } from "@/types/server-action";
import { cookies } from "next/headers";

function isVendorLoginData(
  payload: VendorServerActionResponse
): payload is Extract<VendorServerActionResponse, { user: unknown }> {
  return "user" in payload && "access_token" in payload;
}

export async function setCookie(
  payload: VendorServerActionResponse
): Promise<boolean> {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  if (typeof payload !== "object" || payload === null) {
    console.error("Invalid payload:", payload);
    return false;
  }

  if (!isVendorLoginData(payload) || payload.user.role !== UserRole.CUSTOMER) {
    return false;
  }

  cookieStore.set("accessToken", payload.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("refreshToken", payload.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return true;
}