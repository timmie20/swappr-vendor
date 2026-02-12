import { NextResponse } from "next/server";
import { loginVendor } from "@/lib/api-client";
import { loginFormSchema } from "@/app/(authentication)/login/_components/schema";
import validateFormData from "@/helpers/validateFormData";

export async function POST(request: Request) {
  // TODO: Replace with actual backend API authentication

  // Get form fields
  const { email, password } = await request.json();

  // Server side form validation
  const { errors } = validateFormData(loginFormSchema, {
    email,
    password,
  });

  // If there are validation errors, return a JSON response with the errors and a 401 status.
  if (errors) {
    return NextResponse.json({ errors }, { status: 401 });
  }

  try {
    // TODO: This will call the backend API to authenticate the user
    const response = await loginVendor(email, password);

    // TODO: Store the JWT token from backend in a secure cookie or local storage
    // For now, just returning success

    return NextResponse.json({
      success: true,
      user: response.data.user,
      token: response.data.token,
    });
  } catch (error: any) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        errors: {
          password:
            error.response?.data?.message || "Invalid email or password",
        },
      },
      { status: 401 },
    );
  }
}
