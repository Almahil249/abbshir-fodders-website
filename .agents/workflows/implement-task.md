# Workflow — Implement Task

1. Read `AGENTS.md`, `RULES.md`, `PROJECT_SNAPSHOT.md`, and the task prompt.
2. Activate the skills named in the task's `Skills` column.
3. Inspect the actual files you're about to touch — don't trust this doc
   set's memory of their shape.
4. Implement the smallest correct change that satisfies the task. Don't
   pull in adjacent refactors (see `RULES.md` §8 / scope discipline).
5. Verify: `npm run build` clean; manual check in `en` and `ar`, LTR and
   RTL, on the touched route(s); automated tests if any exist for the
   touched logic.
6. Run `verify-task.md`.
7. Run `update-snapshot.md`.
8. Stop and report. Do not start another task in this conversation.
