"use server";

import { revalidatePath } from "next/cache";

import { ServerActionResponse } from "@/types/server-action";
import { productEndpoint } from "@/endpoints/products";

export async function deleteProduct(
  productId: string
): Promise<ServerActionResponse> {
  try {
    await productEndpoint.delete(productId);

    revalidatePath("/products");

    return { success: true };
  } catch (error: any) {
    console.error("Delete failed:", error?.response?.data || error.message);
    return { dbError: "Something went wrong. Could not delete the product." };
  }
}
