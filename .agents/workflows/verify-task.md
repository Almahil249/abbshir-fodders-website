# Workflow — Verify Task

Checklist before declaring a task complete:

- [ ] `npm run build` succeeds with no new warnings on touched files.
- [ ] `npm run dev` boots; touched route(s) render with no console errors.
- [ ] Checked in `en` (LTR) and `ar` (RTL) — layout doesn't break in either.
- [ ] No bare `float` used for money; `getUnitPrice()` used for any tiered
      price, not reimplemented inline.
- [ ] State reads/writes go through the Zustand store or
      `services/commerce/*` — not direct `localStorage`/JSON imports in a
      component.
- [ ] Existing shadcn primitives reused, not forked.
- [ ] No route/provider duplicated outside `App.tsx`'s existing tree.
- [ ] Nothing outside the task's stated scope was changed.
- [ ] `PROJECT_SNAPSHOT.md` not yet updated — do that next, in
      `update-snapshot.md`.

If any box is unchecked, fix it before reporting done — don't report done
and note the gap as a "known issue" unless the task prompt explicitly
allows deferring it.
