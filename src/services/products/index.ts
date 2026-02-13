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
  // TODO: Remove client parameter and use API client instead
  // const response = await fetchVendorProducts(params);

  console.warn(
    "fetchProducts: Using placeholder - replace with actual API call",
  );

  // Return mock data structure for now
  return {
    data: [],
    pagination: {
      page: params.page || 1,
      limit: params.limit || 10,
      totalPages: 0,
      totalItems: 0,
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
