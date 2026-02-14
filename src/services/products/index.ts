/** Mock products service */

import type { Product } from "./types";
import { Pagination } from "@/types/pagination";

export async function fetchProducts(_params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<{ data: Product[]; pagination: Pagination }> {
  const limit = _params?.limit ?? 10;
  const page = _params?.page ?? 1;
  return {
    data: [],
    pagination: {
      limit,
      current: page,
      items: 0,
      pages: 1,
      next: null,
      prev: null,
    },
  };
}

export async function fetchProductBySlug(_slug: string): Promise<{ product: Product | null }> {
  return { product: null };
}

export async function fetchProductDetails(_id: string): Promise<{ product: Product | null }> {
  return { product: null };
}
