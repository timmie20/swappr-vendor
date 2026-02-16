"use server";
import { TokenType, UserRole } from "@/types/auth-types";
import { cookies } from "next/headers";


/**
 * gets one or both authentication tokens from cookies. use AT for Access Token,
 * BT for both the tokens and rt for refresh token
 */
export async function getToken(type: TokenType): Promise<string | string[] | null> {
  const cookieStore = await cookies();

  switch (type) {
    case TokenType.AT:
      return cookieStore.get("accessToken")?.value ?? null;
    case TokenType.RT:
      return cookieStore.get("refreshToken")?.value ?? null;
    case TokenType.BT:
      return [
        cookieStore.get("accessToken")?.value ?? "",
        cookieStore.get("refreshToken")?.value ?? "",
      ];
    default:
      return null;
  }
}

/**
 * removes all the settokens
 */
export async function clearTokens(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

/**
 * checks if user is a vendor only.
 * Clears any existing tokens using the new tokens.
 */
export async function setCookie(
  accessToken: string,
  refreshToken: string,
  role: UserRole,
): Promise<boolean> {
  const cookieStore = await cookies();

  await clearTokens()

  if (role !== UserRole.VENDOR) {
    return false;
  }

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return true;
}