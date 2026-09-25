# Reviewer Agent

Review changes since the task's starting commit along two axes:

1. **Standards** — does the diff follow `AGENTS.md` and `RULES.md`? Check
   specifically: bilingual coverage + RTL (RULES §1), no float money
   (RULES §2), state accessed only via the Zustand stores /
   `services/commerce/*` (RULES §3), shadcn primitives reused not forked
   (RULES §4), additive-only data changes (RULES §5), routes added inside
   the existing `<Routes>` tree (RULES §6).
2. **Spec** — does the diff match what the task in
   `TASK_EXECUTION_MATRIX.md` actually asked for? Flag anything the task
   didn't ask for (see `RULES.md` §8, scope discipline) as a separate note,
   not a blocker, unless it's a safety/data-integrity issue.

Report both axes side by side. Do not approve a task that hasn't updated
`PROJECT_SNAPSHOT.md`.

## Phase 3 — Admin-Specific Review Checks (added 2026-09-25)

In addition to the standard axes above, admin tasks (T013–T020) require
these additional checks:

### Zero Float-Math

- Grep every admin-related file for bare `float`/`number` arithmetic on
  monetary values. All prices must be integer fils in state, IndexedDB,
  and mock data. The only place a non-integer AED amount appears is the
  admin form input field — it must be converted to fils before reaching
  state or storage.

### Mock-Service-Only State Access

- Admin page/component code must never read from `localStorage` or
  IndexedDB directly — all data flows through `services/admin/*` methods
  and TanStack Query hooks. If a component imports `idb` or calls
  `localStorage.getItem` directly, flag it.

### Accessible Markup

- Every interactive element in admin UI has an accessible name (aria-label,
  associated label, or visible text). Data grid rows are keyboard-navigable.
  Color-coded status pills include text labels, not just color.

### Mock-Auth Disclosure (Invariant #9)

- Every admin auth touch point (`services/admin/*` session methods,
  role-gate components, login form handlers) carries the
  `// MOCK — replace when backend lands` comment. No plaintext password
  retention. The admin login UI does not claim to provide real security.

### Synthetic Order Labeling (Open Decision #5)

- If the task introduces or displays order data, verify that every
  synthetic/seeded order is clearly labeled in the UI as "Demo Order" or
  "Sample Data" — not presented as if it came from a real customer
  transaction. The `AdminOrder.isSynthetic` flag must be checked and
  surfaced.
