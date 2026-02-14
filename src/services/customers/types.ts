/** Mock customer types */

import type { OrderStatus } from "@/services/orders/types";

export interface CustomerOrder {
  id: string;
  invoice_no: string;
  order_time: string;
  payment_method: string;
  total_amount: number;
  status: OrderStatus;
  address?: string;
  customers?: { name?: string; email?: string; address?: string };
  [key: string]: unknown;
}
