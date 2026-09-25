# 50 — Admin Portal

> Phase 3 rule set. Codifies the five Open Decisions from the Phase 3
> planning pass (2026-09-25) as enforceable constraints for T013–T020.

---

## Integer Minor Units Everywhere

- All monetary values in admin state, IndexedDB, mock data, and
  `services/admin/*` method signatures are integer fils (1 AED = 100 fils).
- Admin form inputs accept human-readable AED amounts (e.g. `"45.50"`) and
  convert to fils on save: `Math.round(parseFloat(input) * 100)`. The
  `parseFloat` result is never stored — only the integer.
- Display formatting uses the same `formatPrice()` from `types/ecommerce.ts`
  as the customer storefront.
- Reviewer agent: grep for bare `float` arithmetic on monetary values in
  any `admin/` file — flag as a Standards violation.

## Sync Boundary (Open Decision #1)

- **Admin data is self-contained.** On first load, the admin mock service
  seeds IndexedDB from `products.json`/`products2.json` (and
  `categories.json`/`brands.json`). After seeding, admin reads and writes
  operate only against the IndexedDB copy — never against the JSON files.
- The seed is one-way and non-destructive: re-seeding replaces the IndexedDB
  copy, discarding any admin edits. This is acceptable for a UX prototype.
- Admin edits to products (name, price, stock, images) are visible only
  within the admin portal. They do **not** affect the customer-facing
  storefront, which continues to read from the static JSON files via
  `services/commerce/*`.
- Rationale: `products.json`/`products2.json` are Vite build-time imports.
  Writing to them at runtime from a browser is impossible without a
  build-server pipeline, which would violate Invariant #6.

## Mock Auth Disclosure (Open Decision #3 → Invariant #9)

- Every admin login, session check, and role-gate touch point must carry:
  ```ts
  // MOCK — replace when backend lands
  ```
- Admin mock-auth is separate from customer mock-auth (`sessionStore`).
  Admin auth state lives under `abbshir:admin-session` in `localStorage`.
- No plaintext password retention: the admin login form validates that
  an email/password were provided (shape check only), then writes a mock
  admin user object to `localStorage`. The password is never stored.
- The admin login page must include a visible caption: "Demo admin access —
  not a real authentication system."

## Asset Handling (Open Decision #4)

- Product photo upload in the admin uses real client-side binary handling:
  - `<input type="file" accept="image/*">` + HTML5 drag-and-drop.
  - Uploaded files stored as `Blob` values in IndexedDB, keyed by UUID.
  - Previews rendered via `URL.createObjectURL(blob)`.
  - `URL.revokeObjectURL()` called on component unmount to prevent leaks.
- No fake string placeholders (e.g. `"image1.jpg"`) — the mock must hold
  and preview real image data across a browser session.

## Order Provenance (Open Decision #5)

- Phase 1 has no customer-side order creation (the checkout CTA is
  "Request Quote" via ContactModal — Decision D4 is unchanged).
- Admin order management (T016) works against **seeded/synthetic mock
  orders only**. The seed function generates ~20 orders with:
  - `isSynthetic: true` flag on every record.
  - Realistic-looking UAE customer names (clearly fake: "Demo Customer 1").
  - Randomized statuses covering all state-machine states.
  - Correct integer-fils totals referencing real product prices.
- The admin order list UI must display a visible "Demo Data" badge or
  banner when showing synthetic orders. Do not present them as real
  transactions.
- When a real order-creation flow lands in a future phase, the admin UI
  is already wired up — synthetic orders can coexist with real ones, and
  the `isSynthetic` flag distinguishes them.

## Admin Routing

- All admin routes live under `/admin/*` within `App.tsx`'s existing
  `<Routes>` tree:
  - `/admin` — Dashboard (redirect to `/admin/dashboard`)
  - `/admin/dashboard` — Summary metrics + recent activity
  - `/admin/catalog` — Product list (DataGrid)
  - `/admin/catalog/new` — Create product wizard
  - `/admin/catalog/:productId` — Edit product
  - `/admin/orders` — Order list (DataGrid + status tabs)
  - `/admin/orders/:orderId` — Order detail drawer
  - `/admin/financials` — Revenue cards, charts, ledger
  - `/admin/login` — Admin login form
- A `<AdminRoleGate>` wrapper component renders admin routes only when
  the mock admin session is active. Unauthenticated users see the admin
  login page.

## Client State Pattern — TanStack Query

- TanStack Query (`@tanstack/react-query`) is used for all admin data
  fetching and mutations, with `services/admin/*` methods as the
  underlying fetchers. See `20-state.md` for full conventions.
- Zustand is NOT used for admin state. Admin has no equivalent of the
  customer `cartStore`/`wishlistStore` — all admin data is server-shaped
  (even though the "server" is a mock) and benefits from TanStack Query's
  caching, invalidation, and optimistic mutation primitives.
