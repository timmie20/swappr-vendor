"use server";

import { revalidatePath } from "next/cache";

import { createProduct } from "@/lib/api-client";
import { productFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { ProductServerActionResponse } from "@/types/server-action";

export async function addProduct(
  formData: FormData,
): Promise<ProductServerActionResponse> {
  // TODO: Remove Supabase client - using API client instead

  const parsedData = productFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    sku: formData.get("sku"),
    category: formData.get("category"),
    costPrice: formData.get("costPrice"),
    salesPrice: formData.get("salesPrice"),
    stock: formData.get("stock"),
    minStockThreshold: formData.get("minStockThreshold"),
    slug: formData.get("slug"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors,
      ),
    };
  }

  try {
    // TODO: Replace with actual backend API call
    // Image upload will be handled by the backend
    const response = await createProduct(formData);

    revalidatePath("/products");

    return {
      success: true,
      product: response.data.product,
    };
  } catch (error: any) {
    console.error("Failed to create product:", error);

    // Handle validation errors from backend
    if (error.response?.status === 400) {
      return {
        validationErrors: error.response.data.errors || {},
      };
    }

    return {
      dbError:
        error.response?.data?.message ||
        "Something went wrong. Please try again later.",
    };
  }
}
