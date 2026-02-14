/** Mock product types */

export type ProductStatus = "selling" | "out-of-stock";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  status: ProductStatus;
  [key: string]: unknown;
}

export type ProductDetails = Product;
