/** Mock coupons service */

import type { Coupon } from "./types";
import { Pagination } from "@/types/pagination";

export async function fetchCoupons(_params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<{ data: Coupon[]; pagination: Pagination }> {
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
