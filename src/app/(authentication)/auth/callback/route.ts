import { NextResponse } from "next/server";

// TODO: OAuth callback route - will be implemented with backend OAuth integration
// This route handles OAuth callbacks from Google, GitHub, etc.
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // TODO: Send the OAuth code to backend API for token exchange
    // const response = await axios.post('/api/auth/oauth/callback', { code });
    console.warn("OAuth callback: Placeholder - implement with backend API");
  }

  // Redirect to dashboard after OAuth flow
  return NextResponse.redirect(requestUrl.origin);
}
