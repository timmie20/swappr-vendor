import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

export type SBBrand = Database["public"]["Tables"]["brands"]["Row"];

export type Brand = SBBrand;

export interface FetchBrandsParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface FetchBrandsResponse {
    data: Brand[];
    pagination: Pagination;
}

export type BrandDropdown = Pick<SBBrand, "id" | "name" | "slug">;
