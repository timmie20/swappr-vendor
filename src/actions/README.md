# Server Actions - Migration Status

## Overview

All server action files need to be updated to remove Supabase dependencies and use the new API client from `/src/lib/api-client.ts`.

## Migration Pattern

### Before (Supabase):

```typescript
"use server";

import { createServerActionClient } from "@/lib/supabase/server-action";

export async function someAction(formData: FormData) {
  const supabase = createServerActionClient();

  const { data, error } = await supabase
    .from("table_name")
    .insert({ ... })
    .select()
    .single();

  if (error) {
    return { dbError: "..." };
  }

  return { success: true, data };
}
```

### After (API Client):

```typescript
"use server";

import { someApiFunction } from "@/lib/api-client";

export async function someAction(formData: FormData) {
  try {
    const response = await someApiFunction(formData);

    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response?.status === 400) {
      return { validationErrors: error.response.data.errors || {} };
    }

    return {
      dbError: error.response?.data?.message || "Something went wrong",
    };
  }
}
```

## Migration Status

### Products

- [x] addProduct.ts - Migrated to use API client
- [ ] editProduct.ts - TODO
- [ ] deleteProduct.ts - TODO
- [ ] deleteProducts.ts - TODO
- [ ] toggleProductStatus.ts - TODO
- [ ] exportProducts.ts - TODO

### Orders

- [ ] changeOrderStatus.ts - TODO
- [ ] exportOrders.ts - TODO

### Categories

- [ ] addCategory.ts - TODO
- [ ] editCategory.ts - TODO
- [ ] editCategories.ts - TODO
- [ ] deleteCategory.ts - TODO
- [ ] deleteCategories.ts - TODO
- [ ] toggleCategoryStatus.ts - TODO
- [ ] exportCategories.ts - TODO

### Coupons

- [ ] addCoupon.ts - TODO
- [ ] editCoupon.ts - TODO
- [ ] editCoupons.ts - TODO
- [ ] deleteCoupon.ts - TODO
- [ ] deleteCoupons.ts - TODO
- [ ] exportCoupons.ts - TODO
- [ ] toggleCouponStatus.ts - TODO

### Customers

- [ ] deleteCustomer.ts - TODO
- [ ] editCustomer.ts - TODO
- [ ] exportCustomers.ts - TODO

### Staff

- [ ] editStaff.ts - TODO
- [ ] deleteStaff.ts - TODO
- [ ] toggleStaffStatus.ts - TODO

### Profile

- [ ] editProfile.ts - TODO

## Notes

- All actions need to handle API errors properly
- Image uploads should be sent as FormData to the backend
- Validation should still happen on the frontend, but backend will also validate
- Use try/catch blocks to handle API errors gracefully
