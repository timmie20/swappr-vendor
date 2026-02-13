/**
 * Categories Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import { fetchCategories as fetchCategoriesAPI } from "@/lib/api-client";
import {
  Category,
  CategoryDropdown,
  FetchCategoriesParams,
  FetchCategoriesResponse,
} from "./types";

export async function fetchCategories(
  params: FetchCategoriesParams,
): Promise<FetchCategoriesResponse> {
  // TODO: Replace with actual API call
  // const response = await fetchCategoriesAPI(params);

  console.warn(
    "fetchCategories: Using placeholder - replace with actual API call",
  );

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

export async function fetchCategoriesDropdown(): Promise<CategoryDropdown[]> {
  // TODO: Replace with actual API call
  // const response = await fetchCategoriesAPI({ limit: 1000 });

  console.warn(
    "fetchCategoriesDropdown: Using placeholder - replace with actual API call",
  );

  return [];
}
