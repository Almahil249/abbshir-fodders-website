# Workflow — Update Snapshot

After a task passes `verify-task.md`:

1. In `PROJECT_SNAPSHOT.md`, move the task from "Current Task" to "Last
   Completed," with a one-line summary of what actually changed (file
   paths, new routes, new store names) — not a restatement of the prompt.
2. Add any newly-verified fact to "Verified Repository Map" and remove the
   corresponding item from "Open Questions" if it was answered.
3. Add a line to "Decisions Log" for any non-obvious choice made during
   the task (a naming choice, a trade-off, a deviation from the task
   prompt and why).
4. Keep the whole file under 300 lines — condense or archive older
   "Last Completed" detail into a single line if the file is getting long.
5. Commit the snapshot update in the same change as the task's code, not
   as a separate follow-up.
