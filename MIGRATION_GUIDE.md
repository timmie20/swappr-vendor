# Swappr Vendor System - Migration Documentation

## Project Overview

This is the **Swappr Vendor Frontend** - a vendor management system for the Swappr platform. Swappr is a mobile phone swap platform where users can get the value of their phones and swap them for other models. Vendors can:

- Manage products (devices available for purchase/swap)
- View and process orders
- View and process swap requests from customers
- Manage their inventory and staff

## Recent Changes: Supabase Removal

This codebase has been refactored to **remove all Supabase dependencies** and prepare for integration with a custom backend API. All routes are now **publicly accessible** during development, with authentication to be re-implemented via the backend API.

---

## What Was Changed

### 1. Authentication & Middleware

#### Removed:

- ✅ Supabase authentication middleware
- ✅ Supabase session checks
- ✅ Protected route redirects

#### Updated Files:

- **[src/middleware.ts](src/middleware.ts)**
  - Removed all Supabase authentication logic
  - All routes are now publicly accessible (no auth checks)
  - Will be re-implemented with JWT token validation from backend

#### Current State:

- **All routes are open** - no authentication required
- Users can access all pages without logging in
- Development-friendly for frontend work

---

### 2. User Context & Profile Management

#### Removed:

- ✅ Supabase user session management
- ✅ Supabase auth state change listeners
- ✅ `get_my_profile` RPC call

#### Updated Files:

- **[src/contexts/UserContext.tsx](src/contexts/UserContext.tsx)**
  - Now uses `getVendorProfile()` from API client
  - Returns mock data if API call fails (for development)
  - Mock vendor: `vendor@swappr.com` with role `vendor`

#### Current State:

- User context provides mock vendor data
- Ready to integrate with backend `/api/vendor/profile` endpoint

---

### 3. API Client Layer

#### Created:

- ✅ **[src/lib/api-client.ts](src/lib/api-client.ts)** - Central API client with placeholder functions

#### Key Functions:

##### Authentication

- `loginVendor(email, password)` - Login endpoint
- `signupVendor(email, password, name)` - Registration endpoint
- `logoutVendor()` - Logout endpoint
- `getVendorProfile()` - Get current vendor profile
- `updateVendorProfile(data)` - Update profile

##### Products

- `fetchVendorProducts(params)` - Get vendor's products
- `fetchProductDetails(slug)` - Get single product
- `createProduct(formData)` - Create new product
- `updateProduct(id, formData)` - Update product
- `deleteProduct(id)` - Delete product
- `toggleProductStatus(id, published)` - Publish/unpublish

##### Orders

- `fetchVendorOrders(params)` - Get vendor's orders
- `fetchOrderDetails(id)` - Get single order
- `updateOrderStatus(id, status)` - Update order status

##### **Swap Requests (NEW for Swappr)**

- `fetchSwapRequests(params)` - Get all swap requests
- `fetchSwapRequestDetails(id)` - Get single swap request
- `updateSwapRequestStatus(id, status, notes)` - Update status
- `processSwapRequest(id, data)` - Process swap request

##### Categories, Coupons, Customers, Staff, Notifications

- See [src/lib/api-client.ts](src/lib/api-client.ts) for full API

#### Current State:

- All functions log warnings when called
- All functions return mock/empty data
- Ready for backend API integration

---

### 4. Service Layer

All service files have been updated to remove Supabase queries and use API placeholders.

#### Updated Files:

- **[src/services/products/index.ts](src/services/products/index.ts)** - Product data fetching
- **[src/services/orders/index.ts](src/services/orders/index.ts)** - Order data fetching
- **[src/services/customers/index.ts](src/services/customers/index.ts)** - Customer data
- **[src/services/categories/index.ts](src/services/categories/index.ts)** - Category data
- **[src/services/coupons/index.ts](src/services/coupons/index.ts)** - Coupon data
- **[src/services/staff/index.ts](src/services/staff/index.ts)** - Staff data
- **[src/services/notifications/index.ts](src/services/notifications/index.ts)** - Notifications

#### Pattern:

```typescript
// BEFORE
export async function fetchProducts(
  client: SupabaseClient<Database>,
  params: FetchProductsParams,
) {
  const query = client.from("products").select("*");
  // ... Supabase queries
}

// AFTER
export async function fetchProducts(params: FetchProductsParams) {
  console.warn("Using placeholder - replace with API call");
  return {
    data: [],
    pagination: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
  };
}
```

---

### 5. Server Actions

Server actions have been partially updated to use the API client.

#### Updated Files:

- **[src/actions/products/addProduct.ts](src/actions/products/addProduct.ts)** - Example migration
- **[src/actions/README.md](src/actions/README.md)** - Migration guide for remaining actions

#### Remaining Work:

Most server action files still need migration. See [src/actions/README.md](src/actions/README.md) for:

- Complete list of files to update
- Migration pattern examples
- Current status checklist

---

### 6. Authentication Routes

All auth route handlers have been updated to use API client placeholders.

#### Updated Files:

- **[src/app/(authentication)/auth/sign-in/route.ts](<src/app/(authentication)/auth/sign-in/route.ts>)**
  - Uses `loginVendor()` from API client
  - Returns JWT token (placeholder)
- **[src/app/(authentication)/auth/sign-up/route.ts](<src/app/(authentication)/auth/sign-up/route.ts>)**
  - Uses `signupVendor()` from API client
  - Returns JWT token (placeholder)
- **[src/app/(authentication)/auth/sign-out/route.ts](<src/app/(authentication)/auth/sign-out/route.ts>)**
  - Uses `logoutVendor()` from API client
  - Redirects to login page
- **[src/app/(authentication)/auth/callback/route.ts](<src/app/(authentication)/auth/callback/route.ts>)**
  - OAuth callback placeholder
  - Ready for Google/GitHub OAuth integration

#### Current State:

- Auth endpoints exist but return mock data
- Frontend validation still works
- Ready for backend integration

---

### 7. Supabase Library Files

Supabase client files have been commented out but kept for reference.

#### Updated Files:

- **[src/lib/supabase/client.ts](src/lib/supabase/client.ts)** - Browser client
- **[src/lib/supabase/server-action.ts](src/lib/supabase/server-action.ts)** - Server action client
- **[src/lib/supabase/server.ts](src/lib/supabase/server.ts)** - Server component client

#### Current State:

- All functions throw errors if called
- Original code preserved in comments
- Should not be used anymore

---

## Backend API Integration Guide

### 1. Base URL Configuration

Update the base URL in [src/helpers/axiosInstance.ts](src/helpers/axiosInstance.ts):

```typescript
const axiosInstance = axios.create({
  baseURL: "https://api.swappr.com", // Update this!
});
```

### 2. Implementing API Functions

Replace placeholder functions in [src/lib/api-client.ts](src/lib/api-client.ts):

```typescript
// BEFORE (Placeholder)
export async function fetchVendorProducts(params?: any) {
  console.warn("fetchVendorProducts: Placeholder function called");
  return { data: { products: [], pagination: {...} } };
}

// AFTER (Real API)
export async function fetchVendorProducts(params?: any) {
  const response = await axiosInstance.get('/api/vendor/products', { params });
  return response;
}
```

### 3. Expected Backend API Endpoints

#### Authentication

- `POST /api/vendor/login` - Login
- `POST /api/vendor/signup` - Register
- `POST /api/vendor/logout` - Logout
- `GET /api/vendor/profile` - Get profile
- `PUT /api/vendor/profile` - Update profile

#### Products

- `GET /api/vendor/products` - List products
- `GET /api/vendor/products/:slug` - Get product
- `POST /api/vendor/products` - Create product
- `PUT /api/vendor/products/:id` - Update product
- `DELETE /api/vendor/products/:id` - Delete product
- `PATCH /api/vendor/products/:id/status` - Toggle status

#### Orders

- `GET /api/vendor/orders` - List orders
- `GET /api/vendor/orders/:id` - Get order
- `PATCH /api/vendor/orders/:id/status` - Update status

#### **Swap Requests (New for Swappr)**

- `GET /api/vendor/swap-requests` - List swap requests
- `GET /api/vendor/swap-requests/:id` - Get swap request
- `PATCH /api/vendor/swap-requests/:id/status` - Update status
- `POST /api/vendor/swap-requests/:id/process` - Process swap

#### Other Endpoints

- Categories: `/api/vendor/categories`
- Coupons: `/api/vendor/coupons`
- Customers: `/api/vendor/customers`
- Staff: `/api/vendor/staff`
- Notifications: `/api/vendor/notifications`

### 4. Authentication Implementation

#### JWT Token Management

The backend should return a JWT token on login/signup:

```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Frontend Token Storage

Update auth routes to store tokens:

```typescript
// In sign-in/route.ts
const response = await loginVendor(email, password);
const { token } = response.data;

// Store token in HTTP-only cookie (recommended) or localStorage
cookies().set("auth_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 7 days
});
```

#### Axios Interceptor for Auth Headers

Add to [src/helpers/axiosInstance.ts](src/helpers/axiosInstance.ts):

```typescript
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken(); // Implement this function
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 5. Middleware Re-implementation

Update [src/middleware.ts](src/middleware.ts) to check JWT tokens:

```typescript
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
```

---

## Swap Request Feature (New for Swappr)

### Data Structure

Expected swap request object:

```typescript
interface SwapRequest {
  id: string;
  customerId: string;
  customerName: string;

  currentDevice: {
    brand: string;
    model: string;
    storage: string;
    condition: "Excellent" | "Good" | "Fair" | "Poor";
    estimatedValue: number; // in currency units
  };

  desiredDevice: {
    brand: string;
    model: string;
    storage: string;
    price: number; // in currency units
  };

  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  notes?: string;
}
```

### UI Components to Create

You'll need to create pages/components for:

1. **Swap Requests List Page**
   - `/swap-requests` - Table view of all swap requests
   - Filters: status, date range, customer
   - Search by customer name or device model

2. **Swap Request Details Page**
   - `/swap-requests/[id]` - Full swap request details
   - Current device info and value
   - Desired device info and price
   - Difference to pay/receive
   - Status update controls
   - Process swap button

3. **Dashboard Widget**
   - Pending swap requests count
   - Recent swap requests list

---

## Testing the Application

### 1. Run Development Server

```bash
pnpm dev
```

### 2. Access Routes

- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/
- Products: http://localhost:3000/products
- Orders: http://localhost:3000/orders
- (Create) Swap Requests: http://localhost:3000/swap-requests

All routes are accessible without authentication.

### 3. Console Warnings

You'll see warnings in the browser console like:

```
fetchProducts: Using placeholder - replace with actual API call
```

This is expected! These warnings help identify which API functions are being called.

---

## Migration Checklist

### Completed ✅

- [x] Remove Supabase middleware
- [x] Create API client structure
- [x] Update UserContext
- [x] Update all service files
- [x] Update auth route handlers
- [x] Comment out Supabase lib files
- [x] Update one example server action (addProduct)
- [x] Create documentation

### Remaining Work 🚧

#### Backend API Development

- [ ] Create backend API with all endpoints
- [ ] Implement JWT authentication
- [ ] Create database schema for swap requests
- [ ] Set up file upload handling (for product images)

#### Frontend Integration

- [ ] Update all server actions (see [src/actions/README.md](src/actions/README.md))
- [ ] Replace API client placeholders with real calls
- [ ] Implement JWT token storage
- [ ] Add auth interceptors to axios
- [ ] Re-implement protected routes middleware
- [ ] Create swap request pages/components
- [ ] Add swap request navigation to sidebar
- [ ] Update dashboard to show swap request metrics

#### Testing

- [ ] Test authentication flow
- [ ] Test product CRUD operations
- [ ] Test order management
- [ ] Test swap request flow
- [ ] Test file uploads
- [ ] Test error handling

---

## Project Structure

```
src/
├── actions/              # Server actions (most need migration)
│   ├── products/        # Product actions
│   ├── orders/          # Order actions
│   ├── categories/      # Category actions
│   ├── coupons/         # Coupon actions
│   ├── customers/       # Customer actions
│   ├── staff/           # Staff actions
│   └── README.md        # Migration guide
│
├── app/                 # Next.js app router
│   ├── (authentication)/ # Auth pages (login, signup, etc)
│   └── (dashboard)/     # Dashboard pages
│
├── components/          # React components
│   ├── shared/          # Shared components
│   └── ui/              # UI components (shadcn)
│
├── contexts/            # React contexts
│   └── UserContext.tsx  # ✅ Updated - uses API client
│
├── helpers/             # Helper functions
│   └── axiosInstance.ts # Axios configuration
│
├── lib/                 # Library code
│   ├── api-client.ts    # ✅ NEW - Central API client
│   └── supabase/        # ⚠️ Deprecated - kept for reference
│
├── services/            # ✅ All updated - use API placeholders
│   ├── products/
│   ├── orders/
│   ├── categories/
│   ├── coupons/
│   ├── customers/
│   ├── staff/
│   └── notifications/
│
└── middleware.ts        # ✅ Updated - no auth checks
```

---

## Getting Help

If you encounter issues during backend integration:

1. Check console warnings to see which API functions are being called
2. Review [src/lib/api-client.ts](src/lib/api-client.ts) for expected API structure
3. Check [src/actions/README.md](src/actions/README.md) for server action migration patterns
4. Look at [src/actions/products/addProduct.ts](src/actions/products/addProduct.ts) for a complete migration example

---

## Important Notes

### Security Considerations

- ⚠️ **All routes are currently PUBLIC** - implement authentication ASAP
- JWT tokens should be stored in HTTP-only cookies
- Implement CSRF protection
- Add rate limiting to auth endpoints
- Validate all inputs on the backend

### Image Uploads

- Current code expects Supabase storage URLs
- Update to handle backend file upload endpoints
- Consider using FormData for file uploads
- Update image URL structure in database

### Environment Variables

Current env vars (Supabase - to be removed):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

New env vars needed:

```
NEXT_PUBLIC_API_URL=https://api.swappr.com
NEXT_PUBLIC_APP_URL=https://vendor.swappr.com
```

---

## Contact

For questions about this migration or the Swappr vendor system, reach out to the development team.

---

**Last Updated:** February 12, 2026  
**Status:** Supabase Removed - Ready for Backend Integration  
**Version:** 2.0.0-alpha
