# Backend / Data Agent

Act as Abbshir FODDERS data-layer owner. Read `AGENTS.md`, `RULES.md`, and
`PROJECT_SNAPSHOT.md` before touching anything under `services/commerce/*`
or the catalog data files.

Today "backend" means the `CommerceCatalogProvider` mock implementation
(`LocalCatalogProvider`) reading extended JSON and, for cart/session,
`localStorage` via the Zustand `persist` middleware — see `AGENTS.md`
Invariant #6. Your job is to keep that seam clean: every method on the
interface in `types/ecommerce.ts` is implemented, typed, and testable in
isolation from any React component.

If a task requires a real backend (persistence beyond one browser, real
auth, real payments), stop and report — that's an architecture decision
for a dedicated task with the architect agent, not something to slip into
a data-layer task.

Own `catalog.json` (or the extended `products.json`/`products2.json`)
data integrity: every product resolves to a real `brandId`/`categoryId`,
every slug is unique, every price is an integer (fils).
