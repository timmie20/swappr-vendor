"use client";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { siteUrl } from "@/constants/siteUrl";

type AuthProvider = "github" | "google";

type Props = {
  authType?: "Login" | "Signup";
};

export default function AuthProviders({ authType = "Login" }: Props) {
  // Handle authentication with OAuth providers.
  // const handleAuth = (authProvider: AuthProvider) => {
  //   supabase.auth.signInWithOAuth({
  //     provider: authProvider,
  //     options: {
  //       redirectTo: `${siteUrl}/auth/callback`, // Redirect URL after authentication
  //     },
  //   });
  // };

  return (
    <div className="mb-10 space-y-4">

      <Button
        // onClick={() => handleAuth("google")}
        variant="secondary"
        className="min-h-14 w-full"
      >
        <FcGoogle className="mr-3 size-4" />
        {authType} With Google
      </Button>
    </div>
  );
}
