/** Mock order types (replace with real types when backend is ready) */

export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";

export interface OrderCustomer {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  invoice_no: string;
  order_time: string;
  customers?: OrderCustomer;
  payment_method: string;
  total_amount: number;
  shipping_cost?: number;
  status: OrderStatus;
  coupons?: { discount_type: string; discount_value: number } | null;
}

export interface OrderItemDetail {
  id: string;
  quantity: number;
  unit_price: number;
  products?: { name: string; price?: number };
}

export interface OrderDetails extends Order {
  order_items?: OrderItemDetail[];
  coupons?: { discount_type: string; discount_value: number } | null;
}

export interface OrdersExport {
  id: string;
  invoice_no: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  discount: string;
  shipping_cost?: number;
  payment_method: string;
  order_time: string;
  status: string;
  created_at?: unknown;
  updated_at?: unknown;
}

export interface OrderRowExport {
  id: string;
  invoice_no: string;
  total_amount: number;
  shipping_cost?: number;
  payment_method: string;
  order_time: string;
  status: string;
  created_at?: unknown;
  updated_at?: unknown;
  coupons?: { discount_type: "fixed" | "percentage"; discount_value: number } | null;
  customers?: { name?: string; email?: string } | null;
}

export type SBOrder = Pick<Order, "total_amount" | "shipping_cost">;
