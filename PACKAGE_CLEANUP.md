# Package Cleanup Guide

## Supabase Dependencies to Remove

The following Supabase packages are no longer needed and can be removed:

```bash
pnpm uninstall @supabase/auth-helpers-nextjs @supabase/supabase-js
```

### Current Dependencies (in package.json)

```json
"@supabase/auth-helpers-nextjs": "^0.8.1",
"@supabase/supabase-js": "^2.36.0"
```

These were already uninstalled from your project, but if you need to remove them again or from a fresh install, use the command above.

---

## Required Dependencies

All other dependencies should remain:

### Core Framework

- `next` - Next.js 14
- `react` - React
- `react-dom` - React DOM

### UI & Styling

- `@radix-ui/*` - Headless UI components (shadcn/ui)
- `tailwindcss` - Styling
- `tailwindcss-animate` - Animations
- `tailwind-merge` - Utility merging
- `clsx` - Class name utilities
- `class-variance-authority` - Component variants
- `lucide-react` - Icons
- `react-icons` - Additional icons

### Forms & Validation

- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form resolvers
- `zod` - Schema validation

### Data Fetching & State

- `@tanstack/react-query` - Data fetching & caching
- `@tanstack/react-query-devtools` - Dev tools
- `axios` - HTTP client (for backend API)

### Utilities

- `date-fns` - Date utilities
- `slugify` - URL slug generation
- `sonner` - Toast notifications
- `next-themes` - Theme management

### UI Components

- `react-dropzone` - File uploads
- `react-chartjs-2` - Charts
- `chart.js` - Chart library
- `html2canvas` - Screenshot generation
- `jspdf` - PDF generation
- `react-day-picker` - Date picker
- `react-loader-spinner` - Loading spinners

### Development

- `typescript` - TypeScript
- `eslint` - Linting
- `jest` - Testing
- `@testing-library/*` - Testing utilities

---

## New Dependencies Needed (Future)

When implementing backend integration, you may need:

### Authentication

```bash
pnpm add jose # For JWT handling
pnpm add bcryptjs # For password hashing (if doing server-side)
pnpm add @types/bcryptjs -D
```

### File Upload

```bash
pnpm add formidable # If handling multipart/form-data
pnpm add @types/formidable -D
```

### Additional Utilities

```bash
pnpm add cookie # For cookie handling
pnpm add @types/cookie -D
```

---

## Environment Variables

### Remove (Supabase)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Add (Backend API)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# App URL (for redirects, etc.)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: If using separate auth server
NEXT_PUBLIC_AUTH_URL=http://localhost:8001
```

---

## Summary

✅ **Already Removed:** Supabase packages  
✅ **Kept:** All other dependencies (needed for UI, forms, data fetching)  
⏳ **To Add Later:** JWT, file upload libraries (when implementing backend)

The current dependency set is perfect for continuing development!
