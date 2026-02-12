# Swappr - Swap Request Feature Guide

## Overview

The swap request feature is the core functionality of Swappr. It allows customers to trade in their current phone and swap it for a different model. Vendors process these requests and manage the entire swap lifecycle.

---

## How Swap Requests Work

### Customer Flow:

1. Customer submits current device details (brand, model, storage, condition)
2. System evaluates device and provides estimated value
3. Customer selects desired device to swap for
4. System calculates price difference
5. Customer submits swap request
6. Customer pays difference (if applicable) or receives credit

### Vendor Flow:

1. View incoming swap requests
2. Review device condition and pricing
3. Approve or reject request
4. Process the swap (arrange pickup/delivery)
5. Mark as completed

---

## Data Model

### Swap Request Object

```typescript
interface SwapRequest {
  // Identifiers
  id: string;
  customerId: string;
  vendorId: string;

  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Current Device (Trade-In)
  currentDevice: {
    brand: string; // e.g., "Apple", "Samsung"
    model: string; // e.g., "iPhone 12"
    storage: string; // e.g., "128GB", "256GB"
    color?: string; // e.g., "Black", "Blue"
    condition: DeviceCondition; // "Excellent" | "Good" | "Fair" | "Poor"
    imei?: string; // Device IMEI number
    functionalIssues: string[]; // e.g., ["Battery drain", "Screen scratch"]
    estimatedValue: number; // Evaluated trade-in value (in cents/kobo)
  };

  // Desired Device (What customer wants)
  desiredDevice: {
    productId: string; // Reference to product in inventory
    brand: string; // e.g., "Apple", "Samsung"
    model: string; // e.g., "iPhone 14 Pro"
    storage: string; // e.g., "256GB", "512GB"
    color?: string; // e.g., "Gold", "Purple"
    price: number; // Retail price (in cents/kobo)
  };

  // Financial
  tradeInValue: number; // Value of current device
  desiredDevicePrice: number; // Price of desired device
  priceDifference: number; // Amount customer pays/receives (+ or -)

  // Status & Workflow
  status: SwapRequestStatus;
  priority: "low" | "medium" | "high";

  // Timestamps
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  approvedAt?: string;
  completedAt?: string;

  // Notes & Communication
  customerNotes?: string; // Customer's notes/requirements
  vendorNotes?: string; // Internal vendor notes
  rejectionReason?: string; // If rejected, why?

  // Logistics
  pickupAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  deliveryMethod?: "pickup" | "delivery" | "in-store";
  scheduledDate?: string; // ISO date for pickup/delivery
}

type DeviceCondition = "Excellent" | "Good" | "Fair" | "Poor";

type SwapRequestStatus =
  | "pending" // Just submitted, awaiting review
  | "reviewing" // Vendor is reviewing
  | "approved" // Vendor approved, awaiting payment
  | "payment_pending" // Payment being processed
  | "processing" // Swap is being processed
  | "ready" // Ready for pickup/delivery
  | "completed" // Swap completed successfully
  | "rejected" // Request rejected
  | "cancelled"; // Cancelled by customer
```

---

## Backend API Endpoints

### List Swap Requests

```
GET /api/vendor/swap-requests

Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- status: SwapRequestStatus (optional)
- priority: "low" | "medium" | "high" (optional)
- search: string (search customer name/email)
- dateFrom: ISO date string
- dateTo: ISO date string
- sortBy: "createdAt" | "priority" | "priceDifference"
- sortOrder: "asc" | "desc"

Response:
{
  swapRequests: SwapRequest[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  }
}
```

### Get Swap Request Details

```
GET /api/vendor/swap-requests/:id

Response:
{
  swapRequest: SwapRequest
}
```

### Update Swap Request Status

```
PATCH /api/vendor/swap-requests/:id/status

Body:
{
  status: SwapRequestStatus;
  vendorNotes?: string;
  rejectionReason?: string; // Required if status is "rejected"
  scheduledDate?: string;   // Required for certain statuses
}

Response:
{
  success: true;
  swapRequest: SwapRequest;
}
```

### Process Swap Request

```
POST /api/vendor/swap-requests/:id/process

Body:
{
  action: "approve" | "reject" | "complete";
  adjustedTradeInValue?: number; // If vendor adjusts value
  vendorNotes?: string;
  rejectionReason?: string;
  deliveryMethod?: "pickup" | "delivery" | "in-store";
  scheduledDate?: string;
}

Response:
{
  success: true;
  swapRequest: SwapRequest;
}
```

### Get Swap Request Analytics

```
GET /api/vendor/swap-requests/analytics

Response:
{
  totalRequests: number;
  pendingCount: number;
  approvedCount: number;
  completedCount: number;
  rejectedCount: number;
  totalTradeInValue: number;
  averageTradeInValue: number;
  topTradedInDevices: Array<{ brand: string; model: string; count: number }>;
  topRequestedDevices: Array<{ brand: string; model: string; count: number }>;
}
```

---

## Frontend Pages to Create

### 1. Swap Requests List Page

**Route:** `/swap-requests`

**Features:**

- Table view of all swap requests
- Filters: status, priority, date range
- Search by customer name/email
- Sort by date, priority, value
- Status badges (color-coded)
- Quick actions: approve, reject, view details
- Export to CSV

**Components:**

```
src/app/(dashboard)/swap-requests/
├── page.tsx                 # Main page
├── _components/
│   ├── SwapRequestsTable.tsx
│   ├── SwapRequestFilters.tsx
│   ├── StatusBadge.tsx
│   └── QuickActions.tsx
```

### 2. Swap Request Details Page

**Route:** `/swap-requests/[id]`

**Features:**

- Full swap request information
- Customer details
- Current device specs and condition
- Desired device specs
- Price breakdown:
  - Trade-in value
  - Desired device price
  - Difference to pay/receive
- Status timeline
- Update status controls
- Add vendor notes
- Process/approve/reject actions

**Components:**

```
src/app/(dashboard)/swap-requests/[id]/
├── page.tsx                 # Details page
├── _components/
│   ├── CustomerInfo.tsx
│   ├── DeviceComparison.tsx
│   ├── PriceBreakdown.tsx
│   ├── StatusTimeline.tsx
│   ├── VendorNotes.tsx
│   └── ActionButtons.tsx
```

### 3. Dashboard Widget

**Route:** `/` (Dashboard)

**Features:**

- Pending swap requests count
- Recent swap requests (last 5)
- Quick stats:
  - Approved today
  - Completed this week
  - Total trade-in value this month
- Quick link to swap requests page

**Component:**

```
src/app/(dashboard)/_components/
└── SwapRequestsWidget.tsx
```

---

## UI Components to Build

### Status Badge

```tsx
interface StatusBadgeProps {
  status: SwapRequestStatus;
}

// Color mapping:
// pending -> yellow
// reviewing -> blue
// approved -> green
// rejected -> red
// completed -> gray
// etc.
```

### Device Card

```tsx
interface DeviceCardProps {
  device: {
    brand: string;
    model: string;
    storage: string;
    condition?: DeviceCondition;
    price?: number;
    estimatedValue?: number;
  };
  type: "current" | "desired";
}
```

### Price Breakdown

```tsx
interface PriceBreakdownProps {
  tradeInValue: number;
  desiredDevicePrice: number;
  priceDifference: number;
}

// Display:
// Trade-in Value: ₦45,000
// Desired Device: ₦85,000
// ------------------------
// You Pay: ₦40,000 (or)
// You Receive: ₦5,000
```

### Status Update Modal

```tsx
interface StatusUpdateModalProps {
  swapRequest: SwapRequest;
  onStatusChange: (status: SwapRequestStatus, notes?: string) => void;
}
```

---

## Navigation Updates

Add to sidebar navigation:

```typescript
{
  title: "Swap Requests",
  icon: "ArrowRightLeft", // or "Repeat"
  href: "/swap-requests",
  badge: pendingCount // Show pending count
}
```

---

## Business Logic

### Device Condition Evaluation

```typescript
const conditionMultipliers = {
  Excellent: 0.85, // 85% of original price
  Good: 0.7, // 70% of original price
  Fair: 0.5, // 50% of original price
  Poor: 0.3, // 30% of original price
};

function calculateTradeInValue(
  originalPrice: number,
  condition: DeviceCondition,
  age: number, // in months
): number {
  let multiplier = conditionMultipliers[condition];

  // Depreciation: 2% per month
  const depreciation = 1 - age * 0.02;
  multiplier *= Math.max(depreciation, 0.3); // Minimum 30%

  return Math.round(originalPrice * multiplier);
}
```

### Price Difference Calculation

```typescript
function calculatePriceDifference(
  tradeInValue: number,
  desiredDevicePrice: number,
): number {
  return desiredDevicePrice - tradeInValue;
}

// Positive = customer pays
// Negative = customer receives credit
```

---

## Notifications

Send notifications to vendor when:

- New swap request submitted
- Customer cancels request
- Payment received (status -> processing)

Send notifications to customer when:

- Request approved/rejected
- Device ready for pickup
- Swap completed

---

## Example Usage

### In API Client (src/lib/api-client.ts)

```typescript
export async function fetchSwapRequests(params?: any) {
  const response = await axiosInstance.get("/api/vendor/swap-requests", {
    params,
  });
  return response;
}

export async function updateSwapRequestStatus(
  id: string,
  status: string,
  notes?: string,
) {
  const response = await axiosInstance.patch(
    `/api/vendor/swap-requests/${id}/status`,
    { status, vendorNotes: notes },
  );
  return response;
}
```

### In Service Layer (src/services/swap-requests/index.ts)

```typescript
export async function fetchSwapRequests(
  params: FetchSwapRequestsParams,
): Promise<FetchSwapRequestsResponse> {
  const response = await fetchSwapRequestsAPI(params);
  return {
    data: response.data.swapRequests,
    pagination: response.data.pagination,
  };
}
```

---

## Testing Checklist

### Swap Request Flow

- [ ] View list of swap requests
- [ ] Filter by status, priority, date
- [ ] Search for customer
- [ ] View swap request details
- [ ] Approve swap request
- [ ] Reject swap request with reason
- [ ] Add vendor notes
- [ ] Update status through workflow
- [ ] Mark as completed
- [ ] View analytics/stats

### Edge Cases

- [ ] Handle missing device information
- [ ] Validate price calculations
- [ ] Handle unavailable desired device
- [ ] Customer cancellation
- [ ] Payment failure handling

---

## Priority Levels

Auto-assign priority based on:

- **High:** Price difference > ₦100,000 OR customer is VIP
- **Medium:** Price difference ₦50,000 - ₦100,000
- **Low:** Price difference < ₦50,000

---

## Metrics to Track

- Total swap requests (all time, this month, this week)
- Approval rate
- Rejection rate
- Completion rate
- Average processing time
- Average trade-in value
- Average price difference
- Most traded-in devices
- Most requested devices

---

This guide provides everything needed to implement the swap request feature! 🚀
