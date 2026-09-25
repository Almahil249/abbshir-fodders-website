# Abbshir FODDERS — E-Commerce Agentic Build Package

This package is the output of a repo audit + planning pass. It is meant to be
copied into the root of your `Abbshir FODDERS` repo and handed to a coding
agent (Google Antigravity, Claude Code, Cursor, etc.) exactly as-is.

## What's in here

```
AGENTS.md                    ← Agent contract (read by every agent, every task)
RULES.md                     ← Hard, non-negotiable constraints
PROJECT_SNAPSHOT.md          ← Verified facts about the CURRENT repo (working memory)
TASK_EXECUTION_MATRIX.md     ← Step 1 (Super Architect prompt) + Step 2 (paste-ready task prompts)
types/ecommerce.ts           ← Starting domain model (Category/Brand/Product/Cart/User)
.agents/agents/*/agent.md    ← Role briefs: architect, frontend, backend, reviewer
.agents/rules/*.md           ← Scoped rule packs (core, frontend, state, i18n, testing)
.agents/workflows/*.md       ← Reusable task loops (implement, verify, update-snapshot)
```

Drop the whole tree into the repo root (the `.agents/` folder sits next to
`src/`, `package.json`, etc.). `AGENTS.md`, `RULES.md`, `PROJECT_SNAPSHOT.md`
and `TASK_EXECUTION_MATRIX.md` also live at repo root, same as your Agentec
reference project.

## What I verified directly (facts, not guesses)

I unzipped and read both attachments before writing this:

- **AF.zip** — a Vite 6 + React 18 + TypeScript + `react-router-dom` v7 site,
  using shadcn/ui (Radix) components already vendored in
  `src/app/components/ui/`, Tailwind v4 (CSS-variable theme in
  `src/styles/theme.css`), and a hand-rolled bilingual (EN/AR) `LanguageContext`
  with a flat translation dictionary. It is currently a **single marketing
  landing page** (`/`, `/ar`, `/en` all render the same `LandingPage`) — there
  is no `/shop`, no cart, no auth, and **no backend of any kind**. Product
  content lives in two static files, `src/app/data/products.json` (9 items,
  local `/ProductsIMG/...` images) and `products2.json` (11 items, Unsplash
  placeholder images) — neither has price, SKU, brand, category, or stock
  fields. There's no state-management library installed (no Redux/Zustand) —
  only React `useState`/Context.
- **Agentec_coding_environment.zip** — a real prior project's `.agents/`
  scaffold (`AGENTS.md`, `RULES.md`, `PROJECT_SNAPSHOT.md`,
  `TASK_EXECUTION_MATRIX.md`, `.agents/agents/{architect,backend,database,
  reviewer,security}`, `.agents/rules/00-core.md…50-testing.md`,
  `.agents/workflows/*`, and a 50-skill library). I mirrored that exact
  structure and file-naming convention below, and reused the ones from that
  skill library that actually fit this job: `domain-modeling`,
  `codebase-design`, `ui-components`, `react-admin`, `tdd`, `testing`,
  `security-review`, `prototype`, `code-review`, `writing-for-agents`,
  `to-tickets`, `handoff`. The reference project's task table used the
  `/goal` prefix and "one task per Antigravity conversation" convention —
  I kept that convention in Step 2 below.

## What I could NOT verify

`sudanriver.com` blocks automated fetching (`robots.txt` disallow) — I
could not pull its actual markup, so the inspiration below is built from
**your own written spec** for those seven URLs, general B2B/agri-feed
e-commerce UX conventions, and your existing product data shape. Your coding
agent (Antigravity has a real browser/screenshot tool) should visually open
the seven URLs itself as the first sub-step of Task T000 before writing any
component — I've written that into the T000 prompt.

## Assumptions I made (flagged so you can override them)

1. **No backend yet.** Rather than blocking the whole plan on choosing/building
   a backend, Phase 1 defines a `services/commerce/*` data-access layer with
   a `LocalCatalogProvider` (reads the extended JSON + `localStorage` for
   cart/wishlist/session) behind an interface. Swapping in a real API later
   only touches that one folder. If you already have a backend or a
   preferred one (Supabase, a headless commerce API, your own Node service),
   say so and Task T001 changes accordingly — everything downstream is
   unaffected.
2. **State management: Zustand**, added as a new dependency, with the
   `persist` middleware for cart/wishlist (localStorage) — the codebase has
   no state library today and `useState`/prop-drilling won't survive a
   cart shared across `/shop`, `/cart`, and the nav badge.
3. **Currency: AED**, unit types **Bale / Bag / Ton**, tiered bulk pricing
   (standard → 10+ → 50+), matching how UAE fodder distributors (incl. the
   ADAFSA-regulated market Abbshir already serves) actually sell — mirrors
   the "Bale pricing vs. Bulk" split you asked for.
4. Bilingual EN/AR + RTL is treated as a **hard requirement** for every new
   page, since the existing site is fully bilingual — this is called out
   repeatedly in RULES.md because it's the constraint most likely to be
   silently dropped by a coding agent focused on "shop functionality."
5. Third-party brand logos (Arasco, Al Ghurair, Bartl, Zabeel) are **not**
   in `AF.zip`'s `Logos/` folder (that folder only has Abbshir's own logo
   files) — flagged as an asset gap in T001 rather than invented.

## Recommended sequence

1. Paste the **Super Architect prompt** (Step 1, in `TASK_EXECUTION_MATRIX.md`)
   into a fresh Antigravity conversation. It scaffolds `.agents/` (already
   done for you here — the architect's real job is the domain model, state
   strategy, and `PROJECT_SNAPSHOT.md` verification pass) and produces the
   handoff doc for Phase 2.
2. Run the Step 2 tasks **one per fresh conversation**, in order — each has
   its own model recommendation, skill list, and paste-ready `/goal` prompt.
