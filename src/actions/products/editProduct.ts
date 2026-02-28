"use server";

import { revalidatePath } from "next/cache";

import { updateProductFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import { formatValidationErrors } from "@/helpers/formatValidationErrors";
import { ProductServerActionResponse } from "@/types/server-action";
import { productEndpoint } from "@/endpoints/products";

export async function editProduct(
  productId: string,
  payload: any
): Promise<ProductServerActionResponse> {

  const parsedData = updateProductFormSchema.safeParse(payload);

  if (!parsedData.success) {
    return {
      validationErrors: formatValidationErrors(
        parsedData.error.flatten().fieldErrors
      ),
    };
  }

  try {
    const updatedProduct = await productEndpoint.update(productId, parsedData.data);

    revalidatePath("/products");
    if (updatedProduct?.slug) {
      revalidatePath(`/products/${updatedProduct.slug}`);
    }

    return { success: true, product: updatedProduct };
  } catch (error: any) {
    console.error("Failed to update product:", error?.response?.data || error.message);
    return { dbError: "Something went wrong. Could not update the product." };
  }
}
