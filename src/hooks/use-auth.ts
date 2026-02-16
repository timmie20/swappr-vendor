"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookies";
import { AuthSuccess, UserRole } from "@/types/auth-types";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/types";
import { authEndpoints } from "@/endpoints/auth";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cred: LoginCredentials) => authEndpoints.login(cred),

    onMutate: () => {
      toast.loading("Signing in...", { id: "login" });
    },
    onSuccess: (response: AuthSuccess) => {
      const { access_token, refresh_token, user } = response;

      if (user.role !== UserRole.VENDOR) {
        toast.error("You're not a vendor", {
          id: "login",
          description:
            "This account is not a vendor, contact support for help.",
        });
        throw new Error("NOT_VENDOR");
      }

      setCookie(access_token, refresh_token, user.role);

      toast.success("Welcome back!", {
        id: "login",
        description: "Redirecting.....",
      });
    },
    onError: (error: Error) => {
      if (error.message !== "NOT_VENDOR") {
        toast.error("Failed to sign in", { id: "login" });
      }
      console.error(error);
    },
  });
}
