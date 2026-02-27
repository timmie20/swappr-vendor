"use server";

import { revalidatePath } from "next/cache";
import { productFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { ProductServerActionResponse } from "@/types/server-action";
import { productEndpoint } from "@/endpoints/products";

export async function addProduct(
  formData: FormData,
): Promise<ProductServerActionResponse> {
  const parsedData = productFormSchema.safeParse({
    model: formData.get("model"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    condition: formData.get("condition"),
    carrier_status: formData.get("carrier_status"),
    base_price: formData.get("base_price"),
    description: formData.get("description"),
    images: formData.getAll("images"),
    specifications: JSON.parse((formData.get("specifications") as string) || "{}"),
    variants: JSON.parse((formData.get("variants") as string) || "[]"),
  });

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors,
      ),
    };
  }

  console.log(parsedData.data)
  try {
    await productEndpoint.add({
      ...parsedData.data,
      carrier_status: parsedData.data.carrier_status as any,
    });

    revalidatePath("/products");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create product:", error);
    console.error("Validation Payload from Backend:", error.response?.data);

    if (error.response?.status === 400) {
      return {
        validationErrors: error.response?.data?.errors || {},
      };
    }

    return {
      dbError: "Network error. Please try again later.",
    };
  }
}
