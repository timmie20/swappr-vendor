import { NextResponse } from "next/server";
import { signupVendor } from "@/lib/api-client";
import { signupFormSchema } from "@/app/(authentication)/signup/_components/schema";
import validateFormData from "@/helpers/validateFormData";

export async function POST(request: Request) {
  // TODO: Replace with actual backend API registration

  // Get form fields
  const { name, email, password, confirmPassword, privacy } =
    await request.json();

  // Server side form validation
  const { errors } = validateFormData(signupFormSchema, {
    name,
    email,
    password,
    confirmPassword,
    privacy,
  });

  // If there are validation errors, return a JSON response with the errors and a 401 status.
  if (errors) {
    return NextResponse.json({ errors }, { status: 401 });
  }

  try {
    // TODO: This will call the backend API to register the vendor
    const response = await signupVendor(email, password, name);

    // TODO: Store the JWT token from backend in a secure cookie or local storage
    // For now, just returning success

    return NextResponse.json({
      success: true,
      user: response.data.user,
      token: response.data.token,
    });
  } catch (error: any) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        errors: {
          email: error.response?.data?.message || "Failed to create account",
        },
      },
      { status: 401 },
    );
  }
}
