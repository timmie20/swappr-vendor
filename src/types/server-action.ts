
type ValidationErrorsResponse = {
  validationErrors: Record<string, string>;
};

type DbErrorResponse = {
  "message": string;
  "error": string;
  "statusCode": number
}

type SuccessResponse = {
  success: boolean;
};

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  VENDOR = 'vendor',
}

export type VendorLoginData = {
  access_token : string;
  refresh_token: string;
  user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string,
      role: UserRole
      email_verified: boolean
  }
}



export type ServerActionResponse = DbErrorResponse | SuccessResponse;

export type VServerActionResponse =
  | ValidationErrorsResponse
  | ServerActionResponse;

export type ProductServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | (SuccessResponse & {
      product: SwapprProduct;
    });



export type VendorServerActionResponse =
| DbErrorResponse
| VendorLoginData;

export type ProfileServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | SuccessResponse;

export type CategoryServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | (SuccessResponse & { category?: unknown });

export type CouponServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | (SuccessResponse & { coupon?: unknown });

export type CustomerServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | SuccessResponse
  | (SuccessResponse & { customer?: unknown });

export type StaffServerActionResponse =
  | ValidationErrorsResponse
  | DbErrorResponse
  | (SuccessResponse & { staff?: SwapprVendor });


