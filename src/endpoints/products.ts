/**
 * Api endpoints related to product management
 * */

import axiosInstance from "@/helpers/axiosInstance";
import { productFormSchema } from "@/app/(dashboard)/products/_components/form/schema";
import z from "zod";
import { getToken } from "@/lib/cookies";
import { TokenType } from "@/types/auth-types";

type ProductFormData = z.infer<typeof productFormSchema>;

export const productEndpoint = {
  async add(product: ProductFormData) {
    const token = await getToken(TokenType.AT)
    const { data } = await axiosInstance.post("/products/create", product, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  },
  async delete(productID: string) {
    const token = await getToken(TokenType.AT)
    const { data } = await axiosInstance.delete(`/products/${productID}/archive`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return data;
  }
};
