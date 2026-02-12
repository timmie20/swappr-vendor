# Swappr Vendor - Quick Start Guide

Welcome to the Swappr Vendor frontend project! This guide will get you up and running in 5 minutes.

---

## What is Swappr?

Swappr is a platform where users can:

- Get the value of their current phone
- Swap it for a different model
- Buy new/used devices from vendors

As a **vendor**, you can:

- Manage your device inventory (products)
- Process customer orders
- **Handle swap requests** (the core feature!)
- Manage staff and customers

---

## Project Status

✅ **Supabase Removed** - All database code has been removed  
✅ **API Ready** - Placeholder functions ready for backend integration  
⏳ **Backend Needed** - You need to build/connect the backend API  
⏳ **Swap Feature** - UI needs to be built (specs provided)

---

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Create Environment File

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Backend API URL (update when backend is ready)
NEXT_PUBLIC_API_URL=http://localhost:8000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
pnpm dev
```

### 4. Open Browser

Navigate to: http://localhost:3000

**Note:** All routes are public (no auth required) during development!

---

## Project Structure

```
src/
├── lib/
│   └── api-client.ts          ⭐ START HERE - All API functions
├── services/                   📦 Data fetching logic
├── actions/                    🔧 Server actions (form submissions)
├── app/                        🎨 Pages & UI
└── components/                 🧩 Reusable components
```

### Key Files to Know

1. **[lib/api-client.ts](src/lib/api-client.ts)**
   - All API function placeholders
   - Replace these with real backend calls

2. **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)**
   - Complete migration documentation
   - API endpoint specifications
   - Authentication guide

3. **[SWAP_REQUEST_GUIDE.md](SWAP_REQUEST_GUIDE.md)**
   - Swap feature specifications
   - UI components to build
   - Business logic

4. **[IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)**
   - Track your progress
   - Organized by phase

---

## Understanding the Codebase

### How Data Flows

```
User Action (UI)
    ↓
Server Action (actions/)
    ↓
API Client (lib/api-client.ts) ← YOU IMPLEMENT THIS
    ↓
Backend API (not built yet)
    ↓
Database
```

### Current State

Right now, API calls look like this:

```typescript
// src/lib/api-client.ts
export async function fetchVendorProducts(params?: any) {
  console.warn("fetchVendorProducts: Placeholder function called");
  return { data: { products: [], pagination: {...} } };
}
```

**Your job:** Replace with real API calls:

```typescript
export async function fetchVendorProducts(params?: any) {
  const response = await axiosInstance.get("/api/vendor/products", { params });
  return response;
}
```

---

## Development Workflow

### Phase 1: Connect Frontend

1. **Update API base URL**

   ```typescript
   // src/helpers/axiosInstance.ts
   baseURL: process.env.NEXT_PUBLIC_API_URL;
   ```

2. **Replace placeholder functions**
   - Start with auth: `loginVendor()`, `signupVendor()`
   - Then products: `fetchVendorProducts()`, `createProduct()`
   - See: [lib/api-client.ts](src/lib/api-client.ts)

3. **Test each feature**
   - Login → Products → Orders → Swap Requests

### Phase 2: Build Swap Feature

1. **Backend: Create swap request endpoints**
   - See: [SWAP_REQUEST_GUIDE.md](SWAP_REQUEST_GUIDE.md) → Backend API Endpoints

2. **Frontend: Build UI pages**
   - `/swap-requests` - List page
   - `/swap-requests/[id]` - Details page
   - See: [SWAP_REQUEST_GUIDE.md](SWAP_REQUEST_GUIDE.md) → Frontend Pages

---

## Testing the App

### Without Backend

Currently, you can:

- ✅ View all pages
- ✅ Fill out forms
- ✅ See UI components
- ❌ Save data (returns mock responses)

### With Backend

Once connected, you can:

- ✅ Login/signup
- ✅ Create/edit products
- ✅ Process orders
- ✅ Handle swap requests
- ✅ All CRUD operations

---

## Common Tasks

### Add a New API Endpoint

1. **Define function in [lib/api-client.ts](src/lib/api-client.ts)**

   ```typescript
   export async function fetchSomething(params?: any) {
     const response = await axiosInstance.get("/api/something", { params });
     return response;
   }
   ```

2. **Use in service layer**

   ```typescript
   // src/services/something/index.ts
   import { fetchSomething } from "@/lib/api-client";

   export async function getSomething(params) {
     const response = await fetchSomething(params);
     return response.data;
   }
   ```

3. **Call from component**
   ```typescript
   const { data } = useQuery({
     queryKey: ["something"],
     queryFn: () => getSomething(),
   });
   ```

### Add a New Page

1. **Create route folder**

   ```
   src/app/(dashboard)/new-page/
   ├── page.tsx
   └── _components/
   ```

2. **Add to navigation**
   ```typescript
   // src/components/shared/sidebar/...
   {
     title: "New Page",
     href: "/new-page",
     icon: Icon
   }
   ```

### Handle Form Submissions

1. **Create server action**

   ```typescript
   // src/actions/something/doSomething.ts
   "use server";

   export async function doSomething(formData: FormData) {
     // Validate
     // Call API
     // Return result
   }
   ```

2. **Use in form component**

   ```typescript
   import { doSomething } from "@/actions/something/doSomething";

   const handleSubmit = async (formData) => {
     const result = await doSomething(formData);
     if (result.success) {
       toast.success("Done!");
     }
   };
   ```

---

## Troubleshooting

### "All routes redirect to login"

→ Check [middleware.ts](src/middleware.ts) - should be disabled for now

### "Console shows warnings about placeholders"

→ This is expected! Replace functions in [lib/api-client.ts](src/lib/api-client.ts)

### "Forms submit but nothing happens"

→ Expected - backend not connected yet. Check console for API calls.

### "Images don't display"

→ Update image URLs to match your backend storage

### "TypeScript errors"

→ Update types in `src/types/` to match backend responses

---

## Resources

### Documentation Files

- 📘 [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Complete integration guide
- 📗 [SWAP_REQUEST_GUIDE.md](SWAP_REQUEST_GUIDE.md) - Swap feature specs
- 📙 [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) - Task tracking
- 📕 [PACKAGE_CLEANUP.md](PACKAGE_CLEANUP.md) - Dependencies info
- 📓 [README_TRANSFORMATION.md](README_TRANSFORMATION.md) - Transformation summary

### Code References

- 🔧 [src/lib/api-client.ts](src/lib/api-client.ts) - All API functions
- 🔨 [src/actions/README.md](src/actions/README.md) - Server actions guide
- ✅ [src/actions/products/addProduct.ts](src/actions/products/addProduct.ts) - Example migration

### External Docs

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## Next Steps

### Today

1. ✅ Read this guide
2. ✅ Run the app locally
3. ✅ Explore the code structure
4. 📖 Read [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

### This Week

1. 🔨 Set up backend project
2. 🗄️ Create database schema
3. 🔐 Implement authentication
4. 🔗 Connect first API endpoint

### This Month

1. 📦 Connect all API endpoints
2. 🛠️ Migrate all server actions
3. 🎨 Build swap request UI
4. ✅ Test everything
5. 🚀 Deploy!

---

## Getting Help

1. **Check the docs** - Everything is documented!
2. **Search the code** - Example implementations exist
3. **Read comments** - Code has helpful TODOs and explanations

---

## Important Notes

⚠️ **Security:** All routes are currently public. Implement auth ASAP!  
⚠️ **Environment:** Don't commit `.env.local` to git  
⚠️ **Backend:** This is frontend-only. You need to build the backend!  
⚠️ **Testing:** No tests written yet. Add them as you develop!

---

## You're Ready! 🚀

The codebase is clean, organized, and ready for integration.

**Start with:**

1. Backend authentication
2. Product CRUD endpoints
3. Frontend API client connection

**Then build:** 4. Swap request feature (the main attraction!)

Good luck! 💪

---

**Questions?** Check the docs above or review the existing code patterns.

**Last Updated:** February 12, 2026
