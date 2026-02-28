
export type Variant = {
    color: string;
    storage: number;
    price: number;
    stock_quantity: number;
  };
  
  export type Specifications = {
    processor: string;
    display: string;
    camera: string;
    battery: string;
    material: string;
  };
  
  export type CarrierStatus = {
    UNLOCKED : "unlocked",
    LOCKED : "locked"
  }
  
  export type ProductBody = {
    model: string;
    brand_id: string;
    category_id: string;
    condition: string;
    carrier_status: CarrierStatus;
    base_price: number;
    description: string;
    images: string[];
    specifications: Specifications;
    variants: Variant[];
  };