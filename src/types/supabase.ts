/** Mock Supabase Database type (replace with generated types when using Supabase) */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      orders: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      products: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      categories: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      coupons: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      staff: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
