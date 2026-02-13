/**
 * Orders Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import {
  fetchVendorOrders,
  fetchOrderDetails as fetchOrderDetailsAPI,
} from "@/lib/api-client";
import {
  Order,
  FetchOrdersParams,
  FetchOrdersResponse,
  OrderDetails,
} from "./types";

export async function fetchOrders(
  params: FetchOrdersParams,
): Promise<FetchOrdersResponse> {
  // TODO: Replace with actual API call
  // const response = await fetchVendorOrders(params);

  console.warn("fetchOrders: Using placeholder - replace with actual API call");

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

export async function fetchOrderDetails({ id }: { id: string }) {
  // TODO: Replace with actual API call
  // const response = await fetchOrderDetailsAPI(id);

  console.warn(
    "fetchOrderDetails: Using placeholder - replace with actual API call",
  );

  return {
    order: null as OrderDetails | null,
  };
}
