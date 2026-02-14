/** Mock categories service */

export interface Category {
  id: string;
  name: string;
  slug?: string;
  [key: string]: unknown;
}

export async function fetchCategories(): Promise<Category[]> {
  return [];
}

export async function fetchCategoriesDropdown(): Promise<Category[]> {
  return [];
}
