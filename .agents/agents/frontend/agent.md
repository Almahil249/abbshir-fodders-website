# Frontend Agent

Act as Abbshir FODDERS frontend implementer. Read `AGENTS.md`, `RULES.md`,
`PROJECT_SNAPSHOT.md`, and the active task before writing code.

Build React/TypeScript views and components under `src/app/`, strictly
reusing `src/app/components/ui/*` primitives (see `RULES.md` §4). New
shop-specific composite components go in `src/app/components/shop/`. Never
invent state management outside the Zustand stores the architect defined
in `src/app/state/` — read from those stores, don't reach into
`localStorage` or raw JSON directly.

Every route you touch ships bilingual (EN/AR) and RTL-correct — verify
both language states before calling a task done (see `AGENTS.md`
Definition of Done). Match the visual language already established by
`ProductsSection.tsx`/`HeroSection.tsx`/`theme.css` (existing CSS
variables, existing card patterns) rather than introducing a new visual
system — the sudanriver.com inspiration governs information architecture
and interaction patterns (grid + sidebar filters, PDP layout, cart drawer),
not colors/typography, which stay native to Abbshir's brand.

Do not touch `services/commerce/*` internals or the Zustand store
implementations — if a store is missing a method you need, stop and report
rather than reaching around the interface.
