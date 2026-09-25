# 20 — State & Data

## Customer State (Zustand — Phase 2)

- Cart/wishlist/session are Zustand stores under `src/app/state/`, each
  using `persist` → `localStorage` (`abbshir:cart`, `abbshir:wishlist`,
  `abbshir:session`). Components consume the store's hook only.
- Catalog/brand/category data is read through `services/commerce/*`
  (`CommerceCatalogProvider` in `types/ecommerce.ts`), never imported as
  raw JSON directly into a page/component. This is the seam a real backend
  replaces later — keep it clean even though today it's just JSON reads.

## Admin State (TanStack Query over mock fetchers — Phase 3)

- **TanStack Query (`@tanstack/react-query`)** is the state layer for all
  admin data (catalog, orders, financials). Justification:
  - Admin screens are read-heavy with filter/sort/pagination — query-key
    caching maps naturally to this pattern.
  - Optimistic UI for catalog edits (e.g. updating a product price
    reflects immediately, rolls back on mock-service failure) uses
    TanStack Query's built-in `onMutate`/`onError`/`onSettled` cycle.
  - Pagination/filter state synced to URL query params via query keys
    means data re-fetches automatically when the URL changes.
  - Zustand would work but requires manual cache invalidation logic that
    TanStack Query handles out of the box.
  - Customer-side state stays Zustand (simpler, already specified in T002,
    no need to migrate).

- Admin data fetchers live in `services/admin/*` and return `Promise<T>`.
  TanStack Query wraps these in `useQuery`/`useMutation` hooks defined in
  `src/app/hooks/admin/` — admin page components never call
  `services/admin/*` methods directly, they use the query hooks.

## Data Table Conventions

- Admin data tables use **TanStack Table** (`@tanstack/react-table`) for
  headless table logic (sorting, filtering, pagination, row selection),
  rendered through the shadcn `table` primitive.
- Filter/sort/pagination state is synced to URL search params so views are
  shareable and back-button-safe. The pattern:
  ```
  URL ?page=2&sort=name-asc&status=pending
   → parsed into TanStack Table state
   → drives the TanStack Query key
   → re-fetches data from mock service
  ```
- Column definitions are type-safe against the admin domain types.

## Shared Rules

- Money is integer fils, never a float, anywhere in state or JSON. Format
  with `Intl.NumberFormat` at the display boundary only.
- Tiered pricing goes through the single `getUnitPrice()` function in
  `types/ecommerce.ts` — no inline price-tier logic in components.
- Data edits to `products.json`/`products2.json` (or a new `catalog.json`)
  are additive only; every product resolves to a real `brandId` and
  `categoryId`; slugs are unique and stable once assigned.

## Optimistic UI for Admin Catalog Edits

- When an admin edits a product (price, name, stock, images), the UI
  reflects the change immediately using TanStack Query's optimistic update
  pattern:
  1. `onMutate`: snapshot current cache, apply optimistic update.
  2. `onError`: roll back to snapshot, show toast with error message.
  3. `onSettled`: invalidate query to re-fetch from mock service.
- This ensures the admin UI feels responsive even with simulated network
  delay (MSW). The pattern is the same one a real API would use.
