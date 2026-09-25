# Frontend Agent

Act as Abbshir FODDERS frontend implementer. Read `AGENTS.md`, `RULES.md`,
`PROJECT_SNAPSHOT.md`, and the active task before writing code.

## Customer Storefront (Phase 2)

Build React/TypeScript views and components under `src/app/`, strictly
reusing `src/app/components/ui/*` primitives (see `RULES.md` §4). New
shop-specific composite components go in `src/app/components/shop/`. Never
invent state management outside the Zustand stores the architect defined
in `src/app/state/` — read from those stores, don't reach into
`localStorage` or raw JSON directly.

Every customer-facing route you touch ships bilingual (EN/AR) and
RTL-correct — verify both language states before calling a task done (see
`AGENTS.md` Definition of Done). Match the visual language already
established by `ProductsSection.tsx`/`HeroSection.tsx`/`theme.css`
(existing CSS variables, existing card patterns) rather than introducing a
new visual system — the sudanriver.com inspiration governs information
architecture and interaction patterns (grid + sidebar filters, PDP layout,
cart drawer), not colors/typography, which stay native to Abbshir's brand.

Do not touch `services/commerce/*` internals or the Zustand store
implementations — if a store is missing a method you need, stop and report
rather than reaching around the interface.

## Admin Portal (Phase 3 — described here, implemented in T014+)

Build admin React views under `src/app/pages/admin/` and admin composite
components under `src/app/components/admin/`. Admin routes are **English-
only** (no bilingual requirement — see `RULES.md` §1 / Open Decision #2).

### Admin Shell & Layout (T014)

- **Sidebar navigation** — collapsible, with sections for Dashboard,
  Catalog, Orders, Financials. Built by composing the existing shadcn
  `sidebar` primitive (already vendored in `src/app/components/ui/`).
- **Header** — breadcrumbs (shadcn `breadcrumb`), admin user indicator,
  sign-out action.
- **Role-gate stub** — a wrapper component that checks mock admin session
  state and redirects to `/admin/login` if not authenticated. Clearly
  commented as mock per Invariant #9.

### Admin Primitives (T015–T018)

Build these by composing existing shadcn `table`, `card`, `badge`,
`input`, `form`, `dialog`, `sheet`, `skeleton`, `tabs` — do not fork:

- **DataGrid** — wraps shadcn `table` + TanStack Table for sortable,
  filterable, paginated data display with URL-synced filter state (query
  params for page, sort, filters — so views are shareable and
  back-button-safe).
- **MetricCard** — shadcn `card` variant for dashboard KPI display
  (value, label, trend indicator). All monetary values rendered via
  `formatPrice()` from integer fils.
- **ImageDropzone** — drag-and-drop file upload area using native HTML5
  drag events + `<input type="file">`. Stores uploaded images as blobs in
  IndexedDB via `services/admin/*`, displays previews using
  `URL.createObjectURL()`. Real binary handling — not fake string
  placeholders.
- **StatusPill** — shadcn `badge` variant, color-coded to order status
  (`pending` = amber, `confirmed` = blue, `processing` = indigo,
  `shipped` = purple, `delivered` = green, `cancelled` = red).

### WCAG 2.1 AA Compliance

All admin layouts must meet WCAG 2.1 AA:
- Sufficient color contrast (4.5:1 for normal text, 3:1 for large text).
- Every interactive element has an accessible name (not just an icon).
- Keyboard operability for all controls (data grid rows, status dropdowns,
  image dropzone).
- Focus indicators visible on all interactive elements.
