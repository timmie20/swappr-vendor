/** Mock orders service (replace with real API when backend is ready) */

import type { OrderDetails } from "./types";

export async function fetchOrderDetails(
  idOrParams: string | { id: string }
): Promise<{ order: OrderDetails | null }> {
  const id = typeof idOrParams === "string" ? idOrParams : idOrParams.id;
  return { order: null };
}
