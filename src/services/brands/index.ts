/**
 * Brands Service
 */

import { fetchBrands as fetchBrandsAPI } from "@/lib/api-client";
import {
    BrandDropdown,
    FetchBrandsParams,
    FetchBrandsResponse,
} from "./types";

export async function fetchBrands(
    params: FetchBrandsParams,
): Promise<FetchBrandsResponse> {
    const response = await fetchBrandsAPI(params);
    const brands = response?.brands || response?.data || response || [];
    const pagination = response?.pagination || {};

    return {
        data: brands,
        pagination: {
            pages: pagination.totalPages || pagination.pages || 1,
            limit: pagination.limit || 10,
            items: pagination.totalItems || pagination.items || brands.length || 0,
            current: pagination.page || pagination.currentPage || 1,
            next: null,
            prev: null,
        },
    };
}

export async function fetchBrandsDropdown(): Promise<BrandDropdown[]> {
    // const response = await fetchBrandsAPI();

    // const brands = response?.brands || response?.data || response || [];

    return [{
        id: "61eba56a-a85f-4984-9573-d46fb645768d",
        name: "Apple",
        slug : "apple"
    }];
}
