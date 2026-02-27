/**
 * Products Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import {
  fetchVendorProducts,
  fetchProductDetails as fetchProductDetailsAPI,
} from "@/lib/api-client";
import {
  Product,
  FetchProductsParams,
  FetchProductsResponse,
  ProductDetails,
} from "./types";

export async function fetchProducts(
  params: FetchProductsParams,
): Promise<FetchProductsResponse> {
  const response = (await fetchVendorProducts(params)) as any;

  console.log("Products response:", response);

  const products = response?.products || response?.data || [];

  // The API returns pagination info at the root level of the response
  const totalItems = response?.total ?? products.length ?? 0;
  const limit = response?.limit ?? 10;
  const currentPage = response?.page ?? 1;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  return {
    data: products,
    pagination: {
      pages: totalPages,
      limit: limit,
      items: totalItems,
      current: currentPage,
      next: currentPage < totalPages ? currentPage + 1 : null,
      prev: currentPage > 1 ? currentPage - 1 : null,
    },
  };
}

export async function fetchProductDetails({ slug }: { slug: string }) {
  // TODO: Replace with actual API call
  // const response = await fetchProductDetailsAPI(slug);

  console.warn(
    "fetchProductDetails: Using placeholder - replace with actual API call",
  );

  return {
    product: null as ProductDetails | null,
  };
}
