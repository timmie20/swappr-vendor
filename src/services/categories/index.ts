/**
 * Categories Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import { fetchCategories as fetchCategoriesAPI } from "@/lib/api-client";
import {
  CategoryDropdown,
  FetchCategoriesParams,
  FetchCategoriesResponse,
} from "./types";

export async function fetchCategories(
  params: FetchCategoriesParams,
): Promise<FetchCategoriesResponse> {
  const response = await fetchCategoriesAPI(params);
  const categories = response?.categories || [];
  const pagination = response?.pagination || {};

  return {
    data: categories,
    pagination: {
      pages: pagination.totalPages || pagination.pages || 1,
      limit: pagination.limit || 10,
      items: pagination.totalItems || pagination.items || categories.length || 0,
      current: pagination.page || pagination.currentPage || 1,
      next: null,
      prev: null,
    },
  };
}

export async function fetchCategoriesDropdown(): Promise<CategoryDropdown[]> {
  const response = await fetchCategoriesAPI({ limit: 1000 });

  return response.categories;
}
