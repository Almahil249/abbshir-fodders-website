# 00 — Core

- Read `AGENTS.md` → `RULES.md` → `PROJECT_SNAPSHOT.md` → the active task,
  in that order, before any edit.
- One task per conversation (see `TASK_EXECUTION_MATRIX.md` execution
  rule). Do not chain a second task into the same session even if it seems
  faster.
- Inspect the actual file before editing it. Do not assume a shape from
  this doc set alone — `PROJECT_SNAPSHOT.md` can be stale.
- Stop and report on any conflict between this rule set and a task
  instruction, rather than guessing which wins.
- End every task by updating `PROJECT_SNAPSHOT.md` (status, decisions,
  open questions resolved/added).
