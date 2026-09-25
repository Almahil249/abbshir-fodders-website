# Mock Data & Schema Engineer Agent

> Formerly "Backend / Data Agent." Repurposed in Phase 3 (2026-09-25) to
> reflect the project's client-only reality — there is no backend
> (`AGENTS.md` Invariant #6). This agent owns mock data infrastructure,
> not server code.

Act as Abbshir FODDERS mock-data-layer owner. Read `AGENTS.md`, `RULES.md`,
and `PROJECT_SNAPSHOT.md` before touching anything under
`services/commerce/*`, `services/admin/*`, or the catalog data files.

## Customer Commerce Layer (Phase 2)

Today "backend" means the `CommerceCatalogProvider` mock implementation
(`LocalCatalogProvider`) reading extended JSON and, for cart/session,
`localStorage` via the Zustand `persist` middleware — see `AGENTS.md`
Invariant #6. Your job is to keep that seam clean: every method on the
interface in `types/ecommerce.ts` is implemented, typed, and testable in
isolation from any React component.

## Admin Mock Layer (Phase 3 — described here, implemented in T013+)

The admin portal needs a parallel mock infrastructure under
`services/admin/*`. This agent owns (to be built in T013):

### TypeScript Schemas (prose specification — code in T013)

- **`AdminProduct`** — extends/wraps the customer `Product` type with
  admin-only fields: `createdAt`, `updatedAt`, `isPublished`,
  `variantMatrix` (size/weight combinations), `imageBlobs` (IndexedDB
  keys for uploaded photos).
- **`AdminOrder`** — `orderId`, `customerName`, `items: AdminOrderLine[]`,
  `status: OrderStatus`, `statusHistory: OrderStatusTransition[]`,
  `trackingId?`, `totalFils`, `createdAt`, `notes`. Status follows a
  strict state machine: `pending → confirmed → processing → shipped →
  delivered` (with `cancelled` as a terminal branch from any non-delivered
  state).
- **`OrderStatusTransition`** — `{ from: OrderStatus, to: OrderStatus,
  timestamp: Date, actor: string }`. Enforced: no skipping states (e.g.
  `pending → shipped` is rejected).
- **`AdminFinancialSummary`** — `totalRevenueFils`, `totalOrderCount`,
  `averageOrderFils`, `refundedFils`, period breakdowns. All integers.
- **`AdminServiceProvider`** interface — mirrors `CommerceCatalogProvider`'s
  pattern: all methods return `Promise<T>`, the mock resolves synchronously
  (or with optional artificial delay via MSW), a real API implementation
  is a drop-in replacement.

### Mock Generators

- Seed function that reads `products.json`/`products2.json` on first load,
  copies product data into IndexedDB as `AdminProduct` records, and
  generates ~20 synthetic `AdminOrder` records with realistic UAE names,
  randomized statuses, and correct integer-fils totals. Every synthetic
  order is clearly flagged `isSynthetic: true`.
- Synthetic data is generated deterministically (seeded PRNG) so tests
  are reproducible.

### IndexedDB/localStorage Adapter

- Admin catalog and order data persists in IndexedDB (via `idb` or a
  thin wrapper) — not `localStorage` (data is too large for the 5 MB
  limit). Product image blobs are stored as IndexedDB `Blob` values,
  keyed by a generated UUID.
- Admin session/auth state uses `localStorage` under `abbshir:admin-session`,
  with the `// MOCK — replace when backend lands` comment at every touch
  point (Invariant #9).
- A `clearAdminData()` function resets IndexedDB to the seed state for
  development/testing.

### Simulated Network Delay (optional, for UX testing)

- MSW (Mock Service Worker) can intercept `services/admin/*` calls and
  add 200–800ms artificial latency, enabling the frontend agent to build
  and test loading/skeleton states, optimistic UI rollbacks, and error
  handling without a real network. MSW is opt-in — the default path is
  direct in-memory resolution.

## Guardrails

If a task requires a real backend (persistence beyond one browser, real
auth, real payments), stop and report — that's an architecture decision
for a dedicated task with the architect agent, not something to slip into
a data-layer task.

Own `catalog.json` (or the extended `products.json`/`products2.json`)
data integrity: every product resolves to a real `brandId`/`categoryId`,
every slug is unique, every price is an integer (fils).
