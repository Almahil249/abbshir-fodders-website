# services/commerce/ — Provider Interface & Backend Swap Plan

## Purpose

This directory contains the **commerce abstraction layer** — the single
seam between Abbshir's React UI and its data source. Today that source
is static JSON + `localStorage`; tomorrow it will be a real REST/GraphQL
API. The goal is to make that swap a **one-file change** (replace
`LocalCatalogProvider` with `ApiCatalogProvider`) without touching any
page or component code.

---

## Interface: `CommerceCatalogProvider`

Defined in `types/ecommerce.ts`. Every function returns `Promise<T>` even
when today's mock resolves synchronously — this ensures UI code already
uses `await` / suspense patterns that work with a real async backend.

| Method | Signature | Notes |
|:---|:---|:---|
| `listProducts` | `(params?: CatalogFilterParams) => Promise<Product[]>` | Filters by `categoryId`, `brandId`, `originCountry`, `includeOutOfStock`; sorts by `price-asc` \| `price-desc`; supports `search` text match |
| `getProductBySlug` | `(slug: string) => Promise<Product \| null>` | Returns `null` for unknown slugs — callers render a 404 state, not throw |
| `listCategories` | `() => Promise<Category[]>` | Full list — small enough to load eagerly in the filter sidebar |
| `getCategory` | `(categoryId: string) => Promise<Category \| null>` | Single lookup by slug-ID |
| `listBrands` | `() => Promise<Brand[]>` | Full list for sidebar filter |
| `getBrand` | `(brandId: string) => Promise<Brand \| null>` | Used by `/product-brand/:brandId` to render the brand header |

---

## Phase 1 Implementation: `LocalCatalogProvider` (T003)

- Reads `products.json`, `products2.json`, `categories.json`, `brands.json`
  from `src/app/data/` via Vite's `import ... from '...json'`.
- Filtering and sorting are done in-memory with `Array.filter()` / `.sort()`.
- No network calls. No `localStorage` for catalog data (that's for
  cart/wishlist/session via Zustand stores).
- Exported as a singleton from `services/commerce/index.ts`:
  ```ts
  export const catalog: CommerceCatalogProvider = new LocalCatalogProvider();
  ```
  Every page component imports `catalog` — never the class itself.

---

## Swap-to-Real-Backend Plan (future phase)

When a backend is introduced (separate dedicated task per AGENTS.md
Invariant #6), the migration is:

1. **Create `ApiCatalogProvider`** implementing `CommerceCatalogProvider`.
   Each method maps to a REST/GraphQL call. The type signatures are
   already async (`Promise<T>`), so no caller changes are needed.

2. **Update `services/commerce/index.ts`** to export the new provider:
   ```ts
   // import { LocalCatalogProvider } from './LocalCatalogProvider';
   import { ApiCatalogProvider } from './ApiCatalogProvider';
   export const catalog: CommerceCatalogProvider = new ApiCatalogProvider({
     baseUrl: import.meta.env.VITE_API_URL,
   });
   ```
   One file, one diff.

3. **Zustand stores** (`cartStore`, `wishlistStore`, `sessionStore`) will
   need their `persist` middleware pointed at real API endpoints instead
   of `localStorage`. This is a separate concern from the catalog
   provider — handle it in the same backend-migration task.

4. **Auth** (`sessionStore.signIn` / `.register`) currently mock-validates
   shape and writes a fake user to `localStorage`. The real version will
   POST credentials to the backend and store a session token (httpOnly
   cookie or secure token storage — **never** plain `localStorage` per
   AGENTS.md Invariant #7).

5. **Checkout** — the current cart CTA is "Request Quote" (re-using
   `ContactModal`). When a payment gateway (Telr, Stripe, PayTabs) is
   integrated, the cart summary component calls a new
   `services/commerce/checkout` function; the UI itself doesn't change
   beyond swapping the CTA text and handler.

---

## File structure (after T003)

```
services/
  commerce/
    index.ts              ← public API: `export const catalog`
    LocalCatalogProvider.ts ← Phase 1 mock (JSON + in-memory)
    README.md             ← this file
```
