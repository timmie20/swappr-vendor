/**
 * Staff Service
 *
 * TODO: Replace with actual backend API calls
 * Currently using placeholder functions from api-client
 */

import {
  fetchStaff as fetchStaffAPI,
  getVendorProfile,
} from "@/lib/api-client";
import {
  Staff,
  StaffRolesDropdown,
  FetchStaffParams,
  FetchStaffResponse,
  SBStaff,
} from "./types";

export async function fetchStaff(
  params: FetchStaffParams,
): Promise<FetchStaffResponse> {
  // TODO: Replace with actual API call
  // const response = await fetchStaffAPI(params);

  console.warn("fetchStaff: Using placeholder - replace with actual API call");

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

export async function fetchStaffRolesDropdown(): Promise<StaffRolesDropdown[]> {
  // TODO: Replace with actual API call

  console.warn(
    "fetchStaffRolesDropdown: Using placeholder - replace with actual API call",
  );

  return [];
}

export async function fetchStaffDetails(): Promise<SBStaff | null> {
  // TODO: Replace with actual API call
  // const response = await getVendorProfile();

  console.warn(
    "fetchStaffDetails: Using placeholder - replace with actual API call",
  );

  return null;
}
