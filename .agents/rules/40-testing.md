# 40 — Testing

## Test Runner Status

- No test runner exists yet. The first task that needs one (pricing logic,
  cart store) adds Vitest + React Testing Library — once, not twice; check
  `package.json`/`vitest.config.ts` before assuming it's still missing.
- **T002 (Phase 2, still pending) owns the Vitest install.** Do not
  install a test runner in Phase 3 planning or in any admin task. When
  T002 completes, the runner will be available for all subsequent tasks.

## Test Expectations (once a runner exists via T002)

- Pure logic (`getUnitPrice`, cart reducer actions) gets unit tests.
  Route-level UI gets at minimum a smoke test (renders without throwing,
  in both `en` and `ar`).
- Manual verification (both languages, both directions, `npm run build`
  clean) is still required even when automated tests exist — see
  `AGENTS.md` Definition of Done.

## Admin-Specific Test Coverage (Phase 3, to be written once T002 lands)

### State-Machine Transitions

- Order status transitions must be tested exhaustively:
  - Happy path: `pending → confirmed → processing → shipped → delivered`.
  - Cancellation: `pending → cancelled`, `confirmed → cancelled`,
    `processing → cancelled`.
  - Rejection: `pending → shipped` (skip) must throw/return error.
  - Each transition records a `OrderStatusTransition` entry.

### Currency Math

- Every price conversion path must round-trip without drift:
  - AED input string → fils integer (e.g. `"45.50"` → `4550`).
  - Fils integer → AED display string (e.g. `4550` → `"AED 45.50"`).
  - Bulk pricing tier boundaries: quantity at exact tier threshold returns
    the tier price, not the previous tier.
- Test with edge cases: `"0.01"` → `1` fil, `"999.99"` → `99999` fils.

### Mock Service Layer

- Verify that `services/admin/*` methods return data matching the
  TypeScript interface contracts:
  - `listProducts()` returns `AdminProduct[]` with all required fields.
  - `getOrder(id)` returns `AdminOrder | null`.
  - `updateOrderStatus()` enforces the state machine.
  - `getFinancialSummary()` returns integer fils for all monetary fields.
- Verify IndexedDB persistence: write a record, reload the service, read
  it back — data survives.
- Verify seed function: first load populates ~20 synthetic orders, all
  with `isSynthetic: true`.

### Vitest/RTL Pattern for Admin

- Admin components are tested in English only (no `ar` variant needed per
  Open Decision #2).
- Smoke test every admin route: renders without throwing.
- DataGrid: renders correct row count, responds to sort/filter changes.
- ImageDropzone: accepts file input, creates blob URL for preview.
