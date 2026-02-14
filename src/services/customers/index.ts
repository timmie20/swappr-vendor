/** Mock customers service */

import type { CustomerOrder } from "./types";

export async function fetchCustomerOrders(_params: {
  id: string;
}): Promise<{ customerOrders: CustomerOrder[] }> {
  return { customerOrders: [] };
}
