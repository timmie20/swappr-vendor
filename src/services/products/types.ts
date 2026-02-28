import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

import { SBCategory } from "../categories/types";

export type ProductStatus = "selling" | "out-of-stock";

export type Product = {
  id: string;
  model: string;
  base_price: string;
  brand: { id: string; brand_name: string };
  carrier_status: string;
  category: { id: string; name: string };
  condition: string;
  created_at: string;
  images: string[];
  is_active: boolean;
  is_swappable: boolean;
  total_stock: number;
  vendor: {
    id: string;
    business_name: string;
    is_verified: boolean;
    rating: string;
  };

  description?: string;
  min_stock_threshold?: number;
  slug?: string;
  sku?: string;
  specifications?: any;
};

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  priceSort?: string;
  status?: string;
  published?: boolean;
  dateSort?: string;
}

export interface FetchProductsResponse {
  data: Product[];
  pagination: Pagination;
}

export type ProductDetails = Pick<
  Product,
  | "id"
  | "model"
  | "description"
  | "base_price"
  | "total_stock"
  | "min_stock_threshold"
  | "category"
  | "images"
  | "slug"
  | "sku"
>;
