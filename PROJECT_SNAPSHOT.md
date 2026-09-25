# Abbshir FODDERS — Project Snapshot — v1.2

> Working memory only. Replace assumptions with verified facts as tasks
> complete. Updated by agents after each completed task. Keep under 300 lines.

---

## Status

- **Phase:** PHASE 2 (Step 2: Implementation) + PHASE 3 (Planning complete).
- **Current Task:** T002 (State Management: Zustand stores & Vitest) — PENDING.
- **Last Completed:** T000 (Reconnaissance & Reference Capture) & T001
  (Catalog Data Model & Extension). Phase 3 planning pass (2026-09-25).
- **Next Task:** T002, then T003–T012 (Phase 2), then T013+ (Phase 3).
- **Phase 3 Planning:** COMPLETE (2026-09-25). Admin portal architecture,
  agent contracts, rules, and task matrix (T013–T020) are written. T013
  implementation should not start until T002 and T003 are complete.

### Phase 2 Task Status (verified 2026-09-25)

| Task | Status | Notes |
|:---|:---|:---|
| T000 | ✅ Complete | Reference IA Notes recorded |
| T001 | ✅ Complete | Catalog data model extended, categories/brands created |
| T002 | ⬜ Pending | Zustand + Vitest not yet installed (confirmed: package.json has no zustand/vitest) |
| T003 | ⬜ Pending | services/commerce/README.md exists, no implementation yet |
| T004 | ⬜ Pending | /shop route does not exist yet |
| T005 | ⬜ Pending | /product-brand route does not exist yet |
| T006 | ⬜ Pending | /product/:slug route does not exist yet |
| T007 | ⬜ Pending | /cart route does not exist yet |
| T008 | ⬜ Pending | /signin, /register routes do not exist yet |
| T009 | ⬜ Pending | Navigation not yet updated |
| T010 | ⬜ Pending | Bilingual/RTL QA |
| T011 | ⬜ Pending | Responsive & Accessibility Sweep |
| T012 | ⬜ Pending | Final Review |

### Verification Notes (2026-09-25)

- `src/app/state/` does not exist — confirms T002 has not run.
- `services/commerce/` contains only `README.md` — confirms T003 has not run.
- `src/app/components/shop/` does not exist — confirms T004 has not run.
- `vitest.config.ts` does not exist — confirms no test runner installed.
- `package.json` has no zustand, vitest, msw, @testing-library, or
  @tanstack entries — confirms Phase 2 dependencies not yet installed.
- `types/ecommerce.ts` exists at repo root — confirmed.
- `App.tsx` has no /shop, /cart, /signin, /register routes — confirmed.

## Admin Portal — Open Decisions (Phase 3)

### OD1: Sync Boundary — DECIDED: Self-contained

Admin data is a self-contained UX prototype. On first load, the admin mock
service seeds IndexedDB from `products.json`/`products2.json` (and
`categories.json`/`brands.json`). After seeding, admin reads/writes operate
only against the IndexedDB copy — never back to the JSON files.

**Justification:** `products.json`/`products2.json` are Vite build-time
imports. Writing to them at runtime from a browser is impossible without a
build-server pipeline, which would violate Invariant #6 (no backend). A
self-contained admin seeded from those files is honest, and cleanly
separates the admin UX prototype from the customer storefront's data path.

### OD2: Language Scope — DECIDED: English-only

Admin routes (`/admin/*`) are English-only internal ops tools, exempt from
Invariant #1's bilingual requirement. `AGENTS.md` Invariant #1 has been
annotated to reflect this exemption.

**Justification:** Full bilingual + RTL doubles the translation and layout
QA work for every admin screen. Invariant #1 was written for customer-facing
pages. An internal ops tool used by warehouse/business staff does not need
Arabic support in Phase 1. This can be revisited in a future phase.

### OD3: Mock Auth Honesty — DECIDED: New Invariant #9

A new Invariant #9 has been added to `AGENTS.md`, explicitly requiring
admin mock-auth to follow the same `// MOCK — replace when backend lands`
disclosure discipline as customer mock-auth (Invariant #7). Admin auth
lives in `services/admin/*`, separate from customer `sessionStore`. No
plaintext password retention. Admin login page shows "Demo admin access"
caption.

### OD4: Asset Handling — DECIDED: Real binary blobs

Product photo drag-and-drop uses real client-side binary handling:
`URL.createObjectURL()` for previews, `Blob` storage in IndexedDB keyed
by UUID, `URL.revokeObjectURL()` on unmount. No fake string placeholders.
The mock-storage approach can hold and preview real image data across a
browser session because IndexedDB persists blobs until explicitly cleared.

### OD5: Order Data Provenance — DECIDED: Seeded/synthetic only

Admin Order Management (T016) works against seeded/synthetic mock orders
only, clearly labeled as "Demo Data" in the UI. The customer-side D4
decision ("Request Quote" via ContactModal) is unchanged — there is no
customer-side order-creation flow yet. Every synthetic order carries
`isSynthetic: true`. When a real order-creation flow lands in a future
phase, the admin UI is already wired up.

**Justification:** Revising D4 in Phase 3 would create a cross-phase
dependency requiring customer-side code changes, which this planning pass
cannot touch. Synthetic orders are sufficient to build and test the admin
order management UI.

## Verified Repository Map (verified against repo on 2026-09-25)

- **Entry point:** `src/main.tsx` → `src/app/App.tsx`.
- **Router:** `react-router-dom` v7.13.0, `BrowserRouter` in `App.tsx`.
  Existing routes: `/`, `/ar`, `/en` (all render `LandingPage`), catch-all
  `*` → `ErrorPage code="404"`. **No `/shop`, `/cart`, `/product`, `/signin`,
  `/register`, `/admin` routes exist yet.**
- **i18n:** `src/app/components/LanguageContext.tsx` — React Context,
  `language: 'en' | 'ar'`, `toggleLanguage()`, `t(key)`.
- **UI kit:** `src/app/components/ui/*.tsx` — 48 files of shadcn/ui.
- **Styling:** Tailwind v4.1.12 via `@tailwindcss/vite` plugin.
- **State management:** None beyond React `useState`/Context. No
  Redux/Zustand/Jotai in `package.json` yet (T002 will install Zustand).
- **Data files (Extended in T001):** `products.json`, `products2.json`,
  `categories.json`, `brands.json`, `PRICING_TODO.md`, `species.ts`.
- **Domain model:** `types/ecommerce.ts` at repo root.
- **Commerce README:** `services/commerce/README.md` (no implementation).
- **Test runner:** None configured.
- **Deployment:** `vercel.json` — static Vite build on Vercel.

## Skill Inventory (installed 2026-09-25 via skills.sh CLI)

| Skill | Source | URL | Purpose |
|:---|:---|:---|:---|
| `ui-ux-pro-max` | `nextlevelbuilder/ui-ux-pro-max-skill` | https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill | UI/UX design intelligence: styles, palettes, font pairings, UX guidelines |
| `ui-styling` | `nextlevelbuilder/ui-ux-pro-max-skill` | https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill | shadcn/ui + Tailwind styling patterns |
| `web-design-guidelines` | `vercel-labs/agent-skills` | https://skills.sh/vercel-labs/agent-skills | Web Interface Guidelines compliance review |
| `table-features` | `tanstack/table` | https://skills.sh/tanstack/table | TanStack Table feature implementation guide |
| `table-state` | `tanstack/table` | https://skills.sh/tanstack/table | TanStack Table state management patterns |
| `shadcn-ui` | `jezweb/claude-skills` | https://skills.sh/jezweb/claude-skills | shadcn/ui component patterns and conventions |
| `vitest` | `jezweb/claude-skills` | https://skills.sh/jezweb/claude-skills | Vitest testing patterns (runner install deferred to T002) |
| `msw` | `pproenca/dot-skills` | https://skills.sh/pproenca/dot-skills | MSW mock service worker patterns |
| `zod` | `pproenca/dot-skills` | https://skills.sh/pproenca/dot-skills | Zod schema validation patterns |
| `code-review` | `mattpocock/skills` | https://skills.sh/mattpocock/skills | Standards + Spec dual-axis code review |
| `codebase-design` | `mattpocock/skills` | https://skills.sh/mattpocock/skills | Deep module design vocabulary |
| `writing-for-agents` | `mattpocock/skills` | https://skills.sh/mattpocock/skills | Agent-facing document authoring |

**Note:** No skill generators were run — skills are installed as reference
material only. Scaffold/generation steps happen in T013+ tasks, not in this
planning pass. The `vitest` skill is documentation only — T002 owns the
actual Vitest install.

## Decisions Log

### D1–D9: See previous entries (unchanged)

### D1: Domain Model (Step 1)
- SpeciesTarget enum, ProductStat.label typing, salePrice, originCountry,
  weight/weightUnit, CartLine.slug, CatalogFilterParams, getCategory(),
  formatPrice() — all decided and implemented in Step 1/T001.

### D2: State Management (Step 1)
- Zustand + persist CONFIRMED for customer-side stores.

### D3: Backend Seam (Step 1)
- `services/commerce/*` with `LocalCatalogProvider` CONFIRMED.

### D4: Cart Checkout CTA (Step 1)
- "Request Quote" via ContactModal for Phase 1. **Unchanged by Phase 3
  planning** — Open Decision #5 explicitly preserves this.

### D5: Auth Form Fields (Step 1)
- Adjusted for B2B context (Company Name, Phone added).

### D6: tsconfig.json Fix (T001)
- Added `"types"` to `include`.

### D7: Categories & Brands Data Files (T001)
- `categories.json` (5), `brands.json` (5) created.

### D8: Species Targeting & Emoji Strategy (T001)
- Emoji preserved, `speciesTargets` added alongside, `species.ts` utility.

### D9: Placeholder Pricing & Stats Normalization (T001)
- All 20 products priced in fils, `PRICING_TODO.md` created.

### D10: Model Roster Reconciliation (Phase 3 Planning, 2026-09-25)
- User prompt referenced "Gemini 3.5 Flash" which doesn't match the
  existing TASK_EXECUTION_MATRIX.md header's "Gemini 3.8 Flash." Retained
  "3.8 Flash" as the canonical version since it was the already-declared
  model in the file. If a version renaming occurred upstream, this note
  tracks the discrepancy. Both the Phase 2 and Phase 3 task matrices use
  the same four models: Gemini 3.8 Flash, Gemini 3.1 Pro, Claude Sonnet
  4.6, Claude Opus 4.6.

### D11: Admin Client State Library (Phase 3 Planning, 2026-09-25)
- **TanStack Query (`@tanstack/react-query`)** chosen over Zustand for
  admin data. Justification: admin screens are read-heavy with
  filter/sort/pagination state that maps naturally to query-key caching.
  Optimistic UI for catalog edits benefits from TanStack Query's built-in
  `onMutate`/`onError`/`onSettled` cycle. Zustand would require manual
  cache invalidation. Customer-side state remains Zustand (simpler, already
  specified in T002, no migration needed).

### D12: Admin Mock Service Pattern (Phase 3 Planning, 2026-09-25)
- `services/admin/*` mirrors `services/commerce/*`'s provider pattern:
  TypeScript interface (`AdminServiceProvider`) + mock implementation
  (`LocalAdminProvider`) using IndexedDB + optional MSW for simulated
  latency. All methods return `Promise<T>` for swap-readiness. This was
  specified in prose only in this planning pass — code implementation
  happens in T013.

### D13: Open Decisions 1–5 (Phase 3 Planning, 2026-09-25)
- OD1 (Sync Boundary): Self-contained — admin never writes to JSON files.
- OD2 (Language Scope): English-only for admin routes.
- OD3 (Mock Auth): New Invariant #9 added to AGENTS.md.
- OD4 (Asset Handling): Real binary blobs in IndexedDB.
- OD5 (Order Provenance): Seeded/synthetic mock orders only.
- See "Admin Portal — Open Decisions" section above for full justifications.

### D14: Task Execution Matrix Optimization Pass (2026-09-25)
- **Skills Reconciliation:** Harmonized all tasks across Phase 2 (T000–T012)
  and Phase 3 (T013–T020) with the ground-truth `## Skill Inventory`. Removed
  non-installed/guessed skill names (`domain-modeling`, `ui-components`,
  `testing`, `prototype`, `security-review`). Added installed skills matching
  actual task activities (`shadcn-ui`, `ui-styling`, `ui-ux-pro-max`,
  `web-design-guidelines`, `vitest`, `codebase-design`). Synchronized both the
  master table Skills columns and prompt-block `Activate skills: ...` lines.
- **Application & Model Routing:** Added `Application` column to both Phase 2
  and Phase 3 master tables. Routed to two supported environments:
  Google Antigravity (Anthropic Claude + Google Gemini) and Codex (OpenAI GPT).
  Reassigned pure TypeScript/store/provider tasks (T001, T002, T003) to
  `Codex — GPT-6 Sol` for superior multi-step coding value. Reassigned routine,
  templated tasks (T005, T008, T009, T018) to `Codex — GPT-6 Luna` for fast,
  cheap execution. Kept browser-heavy/vision (T000) on `Google Antigravity —
  Gemini 3.1 Pro`, sweeps (T011, T019) on `Google Antigravity — Gemini 3.8
  Flash`, complex UI/layout/RTL (T004, T006, T007, T010, T014–T017) on
  `Google Antigravity — Claude Sonnet 4.6 (Thinking)`, and architectural
  foundations/final reviews (Step 1, T012, T013, T020) on `Google Antigravity —
  Claude Opus 4.6 (Thinking)`. Added self-contained `Run this in: ...` headers
  to all prompt blocks.
- **Reference Formatting Sanitization:** Swept all `@-mentions` in
  `TASK_EXECUTION_MATRIX.md` to ensure every reference is followed strictly by
  whitespace and no attached punctuation (periods, commas, colons), avoiding
  path ingestion failures in automated tooling.

---

## Architect Handoff to Phase 3 Implementation

### Summary
Phase 3 planning (2026-09-25) is complete. All agentic environment files
are updated: AGENTS.md (Invariant #9, Invariant #1 annotation), RULES.md
(§9, §1/§3/§7 updates — both root and .agents/rules/ copies synced),
agent contracts (architect, backend→mock-data, frontend, reviewer),
numbered rules (10/20/40 updated, 50 created), and the task matrix
(T013–T020 with paste-ready prompts).

### Pre-flight for T013 (Admin Foundations)
Before starting T013, ensure:
- [ ] T002 complete (Zustand installed, Vitest runner available)
- [ ] T003 complete (`services/commerce/*` implemented, `CommerceCatalogProvider`
      interface finalized — admin mirrors this pattern)
- [ ] `types/ecommerce.ts` stable (admin types are additive to it)
- [ ] Skills installed (see Skill Inventory above — already done)

### What This Planning Pass Did NOT Do
- Did not create or modify anything under `src/`, `types/`, `services/`,
  `public/`, or `package.json`.
- Did not install zustand, vitest, msw, @tanstack/react-query, or idb —
  those are deferred to their respective task prompts (T002, T013, T014).
- Did not run any skill generators — skills are installed as reference
  material only.
- Did not revise Invariant #6 ("no backend exists") — it remains true.
