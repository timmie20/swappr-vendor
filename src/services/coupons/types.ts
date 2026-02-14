/** Mock coupon types */

export type CouponStatus = "active" | "expired";

export interface Coupon {
  id: string;
  code: string;
  discount_type: "fixed" | "percentage";
  discount_value: number;
  status: CouponStatus;
  [key: string]: unknown;
}

export type SBCoupon = Pick<Coupon, "discount_type" | "discount_value">;
