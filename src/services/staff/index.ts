/** Mock staff service */

import type { Staff } from "./types";
import { Pagination } from "@/types/pagination";

export async function fetchStaff(_params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}): Promise<{ data: Staff[]; pagination: Pagination }> {
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

export async function getCurrentStaff(): Promise<Staff | null> {
  return null;
}

export async function fetchStaffDetails(_id?: string): Promise<{ staff: Staff | null }> {
  return { staff: null };
}

export interface StaffRole {
  name: string;
  display_name: string;
}

export async function fetchStaffRolesDropdown(): Promise<StaffRole[]> {
  return [];
}
