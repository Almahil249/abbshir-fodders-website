# 40 — Testing

- No test runner exists yet. The first task that needs one (pricing logic,
  cart store) adds Vitest + React Testing Library — once, not twice; check
  `package.json`/`vitest.config.ts` before assuming it's still missing.
- Pure logic (`getUnitPrice`, cart reducer actions) gets unit tests.
  Route-level UI gets at minimum a smoke test (renders without throwing,
  in both `en` and `ar`).
- Manual verification (both languages, both directions, `npm run build`
  clean) is still required even when automated tests exist — see
  `AGENTS.md` Definition of Done.
