"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Typography from "@/components/ui/typography";
import { SubmitButton } from "@/components/shared/form/SubmitButton";
import { useLogin } from "@/hooks/use-auth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInSchema } from "./schema";
import { useRouter } from "next/navigation";

export type FormData = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const router = useRouter();

  const signIn = useLogin();

  const onSubmit = async (values: FormData) => {
    try {
      await signIn.mutateAsync(values);
      form.reset();
      router.push("/");
    } catch (error) {
      const err = error as Error;
      form.setError("password", { message: "Failed to sign in" });
    }
  };

  return (
    <div className="w-full">
      <Typography variant="h2" className="mb-8">
        Login
      </Typography>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet className="w-full">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    placeholder="Enter email address"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    type={field.name}
                    placeholder="Enter password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <SubmitButton isPending={signIn.isPending} className="w-full">
          Login
        </SubmitButton>
      </form>

      {/* 
      <Separator className="my-12" />

      <AuthProviders />

      <div className="flex w-full flex-wrap justify-between gap-4">
        <Typography variant="a" href="/forgot-password" className="md:!text-sm">
          Forgot password?
        </Typography>
        <Typography variant="a" href="/signup" className="md:!text-sm">
          Create an account
        </Typography>
      </div> */}
    </div>
  );
}
