"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/helpers/axiosInstance";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { setCookie } from "@/lib/cookies";
import type { UseFormReturn } from "react-hook-form";
import { FormData } from "@/app/(authentication)/login/_components/LoginForm";
import { VendorAuthData, VendorServerActionResponse } from "@/types/auth-types";
import {useRouter} from "next/navigation"
import { loginVendor } from "@/lib/api-client";

export const useLoginMutation = (
  form: UseFormReturn<{ email: string; password: string }>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await loginVendor(formData.email, formData.password)
      if (!res || !res.data) throw new Error("No data returned");
      return res.data as Extract<
        VendorServerActionResponse,
        { user: VendorAuthData }
      >;
    },
    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
      return true;
    },
    onSuccess: async (
      data: Extract<VendorServerActionResponse, { access_token: string }>,
    ) => {
      toast.dismiss("login");
      try {
        const res = await setCookie(
          data.access_token,
          data.refresh_token,
          data.user.role,
        );
        if (!res) {
          form.setError("email", { message: "" });
          form.setError("password", { message: "You're not a vendor" });
          return false;
        }
        toast.success("Welcome back!", {
          id: "login",
          description: "Redirecting.....",
        });
        router.push("/")
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        return true;
      } catch {
        form.setError("email", { message: "" });
        form.setError("password", {
          message: "Failed to save session, please try again",
        });
        return false;
      }
    },
    onError: (error) => {
      toast.dismiss("login");
      if (isAxiosError(error)) {
        form.setError("email", { message: "" });
        form.setError("password", {
          message: error.response?.data.message ?? "Login failed",
        });
      } else {
        form.setError("email", { message: "" });
        form.setError("password", { message: "Unexpected error occurred" });
      }
    },
  });
};
