/**
 * Coupons Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import { fetchCoupons as fetchCouponsAPI } from "@/lib/api-client";
import { Coupon, FetchCouponsParams, FetchCouponsResponse } from "./types";

export async function fetchCoupons(
  params: FetchCouponsParams,
): Promise<FetchCouponsResponse> {
  // TODO: Replace with actual API call
  // const response = await fetchCouponsAPI(params);

  console.warn(
    "fetchCoupons: Using placeholder - replace with actual API call",
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
