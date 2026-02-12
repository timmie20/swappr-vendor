# Swappr Vendor - Implementation Checklist

Use this checklist to track progress on backend integration and feature development.

---

### Product Endpoints

- [ ] `GET /api/vendor/products` - List products
- [ ] `GET /api/vendor/products/:slug` - Get product details
- [ ] `POST /api/vendor/products` - Create product
- [ ] `PUT /api/vendor/products/:id` - Update product
- [ ] `DELETE /api/vendor/products/:id` - Delete product
- [ ] `PATCH /api/vendor/products/:id/status` - Toggle publish status
- [ ] Implement image upload for products
- [ ] Add bulk operations support

### Order Endpoints

- [ ] `GET /api/vendor/orders` - List orders
- [ ] `GET /api/vendor/orders/:id` - Get order details
- [ ] `PATCH /api/vendor/orders/:id/status` - Update order status
- [ ] `GET /api/vendor/orders/:id/invoice` - Generate invoice

### Swap Request Endpoints (NEW!)

- [ ] `GET /api/vendor/swap-requests` - List swap requests
- [ ] `GET /api/vendor/swap-requests/:id` - Get swap request details
- [ ] `PATCH /api/vendor/swap-requests/:id/status` - Update status
- [ ] `POST /api/vendor/swap-requests/:id/process` - Process swap
- [ ] `GET /api/vendor/swap-requests/analytics` - Get analytics
- [ ] Implement device valuation logic
- [ ] Add price difference calculation

### Category Endpoints

- [ ] `GET /api/vendor/categories` - List categories
- [ ] Add image upload for categories

### Coupon Endpoints

- [ ] `GET /api/vendor/coupons` - List coupons
- [ ] `POST /api/vendor/coupons` - Create coupon
- [ ] `PUT /api/vendor/coupons/:id` - Update coupon
- [ ] `DELETE /api/vendor/coupons/:id` - Delete coupon
- [ ] Implement coupon validation logic

### Customer Endpoints

- [ ] `GET /api/vendor/customers` - List customers
- [ ] `GET /api/vendor/customers/:id` - Get customer details
- [ ] `GET /api/vendor/customers/:id/orders` - Get customer orders

### Notification Endpoints

- [ ] `GET /api/vendor/notifications` - List notifications
- [ ] `PATCH /api/vendor/notifications/:id/read` - Mark as read
- [ ] `DELETE /api/vendor/notifications/:id` - Delete notification
- [ ] Implement real-time notifications (WebSocket/SSE)

### Analytics Endpoints

- [ ] `GET /api/vendor/analytics/dashboard` - Dashboard stats
- [ ] `GET /api/vendor/analytics/products` - Product analytics
- [ ] `GET /api/vendor/analytics/orders` - Order analytics
- [ ] `GET /api/vendor/analytics/swap-requests` - Swap analytics

---

## Phase 2: Frontend Integration ⏳

### API Client Implementation

- [ ] Update base URL in `axiosInstance.ts`
- [ ] Replace `loginVendor()` placeholder
- [ ] Replace `signupVendor()` placeholder
- [ ] Replace `logoutVendor()` placeholder
- [ ] Replace `getVendorProfile()` placeholder
- [ ] Replace all product API placeholders
- [ ] Replace all order API placeholders
- [ ] Replace all swap request API placeholders
- [ ] Replace all category API placeholders
- [ ] Replace all coupon API placeholders
- [ ] Replace all customer API placeholders
- [ ] Replace all staff API placeholders
- [ ] Replace all notification API placeholders
- [ ] Add axios request interceptor for auth tokens
- [ ] Add axios response interceptor for error handling

### Authentication Flow

- [ ] Implement JWT token storage (HTTP-only cookies)
- [ ] Update UserContext to use real auth
- [ ] Update middleware to validate JWT tokens
- [ ] Implement token refresh logic
- [ ] Add logout functionality
- [ ] Handle expired tokens
- [ ] Implement "Remember Me" feature
- [ ] Add password reset flow

### Server Actions Migration

Complete migration of all 28+ server action files:

#### Products (6 files)

- [x] `addProduct.ts` - Example completed
- [ ] `editProduct.ts`
- [ ] `deleteProduct.ts`
- [ ] `deleteProducts.ts`
- [ ] `toggleProductStatus.ts`
- [ ] `exportProducts.ts`

#### Orders (2 files)

- [ ] `changeOrderStatus.ts`
- [ ] `exportOrders.ts`

#### Coupons (7 files)

- [ ] `addCoupon.ts`
- [ ] `editCoupon.ts`
- [ ] `editCoupons.ts`
- [ ] `deleteCoupon.ts`
- [ ] `deleteCoupons.ts`
- [ ] `toggleCouponStatus.ts`
- [ ] `exportCoupons.ts`

#### Profile (1 file)

- [ ] `editProfile.ts`

---

## Phase 3: Swap Request Feature Development ⏳

### Service Layer

- [ ] Create `src/services/swap-requests/types.ts`
- [ ] Create `src/services/swap-requests/index.ts`
- [ ] Implement `fetchSwapRequests()`
- [ ] Implement `fetchSwapRequestDetails()`

### Server Actions

- [ ] Create `src/actions/swap-requests/updateSwapRequestStatus.ts`
- [ ] Create `src/actions/swap-requests/processSwapRequest.ts`
- [ ] Create `src/actions/swap-requests/exportSwapRequests.ts`

### UI Components

- [ ] Create `SwapRequestsTable.tsx`
- [ ] Create `SwapRequestFilters.tsx`
- [ ] Create `StatusBadge.tsx`
- [ ] Create `DeviceCard.tsx`
- [ ] Create `DeviceComparison.tsx`
- [ ] Create `PriceBreakdown.tsx`
- [ ] Create `StatusTimeline.tsx`
- [ ] Create `VendorNotes.tsx`
- [ ] Create `QuickActions.tsx`

### Pages

- [ ] Create `/swap-requests` list page
- [ ] Create `/swap-requests/[id]` details page
- [ ] Add swap requests widget to dashboard
- [ ] Add navigation menu item
- [ ] Update dashboard stats to include swaps

### Business Logic

- [ ] Implement device condition evaluation
- [ ] Implement price difference calculation
- [ ] Implement status workflow validation
- [ ] Add swap request notifications

---

## Phase 4: Testing & Quality Assurance ⏳

### Unit Tests

- [ ] Test API client functions
- [ ] Test service layer functions
- [ ] Test server actions
- [ ] Test helper functions
- [ ] Test business logic (device valuation, etc.)

### Integration Tests

- [ ] Test authentication flow
- [ ] Test product CRUD operations
- [ ] Test order management flow
- [ ] Test swap request workflow
- [ ] Test image upload functionality
- [ ] Test export functionality

### E2E Tests

- [ ] Test complete user journeys
- [ ] Test error scenarios
- [ ] Test edge cases
- [ ] Test mobile responsiveness

### Performance Testing

- [ ] Load testing on API endpoints
- [ ] Frontend performance optimization
- [ ] Image optimization
- [ ] Bundle size optimization

---
