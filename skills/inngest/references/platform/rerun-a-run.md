# Rerun a Run

Recover one failed run after fixing its cause, using the original trigger data. Inngest creates a new run and trace using the function code available when that run starts.

## Signature / Usage

```
Dashboard → Runs → <original run>
  → Rerun                       (start from the beginning)
  → select a step → Rerun from step
  → review input → create the new run
```

## Notes

- Before rerunning, open the original trace and check the failed step and every completed side effect. Use Idempotency to prevent repeated effects, and Versioning to understand how a new deployment affects existing runs.
- A rerun from the beginning repeats the entire function.
- A rerun from a selected step restores saved outputs from earlier steps, then runs the selected step and later steps again.
- Some steps let you replace JSON-serializable input before rerunning.
- After creating the new run, open its trace and compare results and repeated side effects against the original.
- Cron-triggered runs cannot be rerun.
- For CLI or API rerun-from-step, a step ID must identify exactly one step in the original run.
- For many runs from one incident, use bulk Replay instead.
- Source: https://www.inngest.com/docs-markdown/platform-and-operations/rerun-a-run (fetched 2026-10).

## Related

- [Replay](./replay.md)
- [Inspecting Function Runs](./inspecting-function-runs.md)
- [Traces](./traces.md)
