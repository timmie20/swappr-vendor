export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
  VENDOR = "vendor",
}

export type VendorAuthData = {
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
};

export type AuthSuccess = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user: VendorAuthData;
};

type AuthNullError = {
  message: string;
  statusCode: string;
};


export enum TokenType {
  "AT" = "accessToken",
  "RT" = "refreshToken",
  "BT" = "all"
}

export type VendorServerActionResponse = AuthNullError | AuthSuccess;
