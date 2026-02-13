/**
 * Customers Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import {
  fetchVendorCustomers,
  fetchCustomerDetails as fetchCustomerDetailsAPI,
} from "@/lib/api-client";
import {
  Customer,
  FetchCustomersParams,
  FetchCustomersResponse,
  CustomerOrder,
} from "./types";

export async function fetchCustomers(
  params: FetchCustomersParams,
): Promise<FetchCustomersResponse> {
  // TODO: Replace with actual API call
  // const response = await fetchVendorCustomers(params);

  console.warn(
    "fetchCustomers: Using placeholder - replace with actual API call",
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

export async function fetchCustomerOrders({ id }: { id: string }) {
  // TODO: Replace with actual API call
  // const response = await fetchCustomerDetailsAPI(id);

  console.warn(
    "fetchCustomerOrders: Using placeholder - replace with actual API call",
  );

  return {
    customerOrders: [] as CustomerOrder[],
  };
}
