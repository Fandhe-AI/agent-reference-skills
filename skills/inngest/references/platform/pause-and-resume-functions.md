# Pause and Resume Functions

Stop new runs during maintenance and resume the function when you are ready. Inngest still receives and stores events sent during the pause, but skips the paused function.

## Signature / Usage

```
Dashboard → Functions → <function> → All actions → Pause
  → choose what happens to existing runs → confirm
Dashboard → Functions → <function> → All actions → Resume
```

## Options / Props

| Option (offered when pausing, current dashboard) | Description |
|--------|-------------|
| Pause after the active step | Existing runs pause after the active step; canceled after seven days by default |
| Cancel immediately after the active step | Existing runs are canceled after the active step |

## Notes

- Inngest does not interrupt a running step. A paused function does not start new runs from incoming events.
- Inspect in-progress runs and record the pause time for later recovery.
- Events received during the pause do not run automatically after Resume. To process them, create a Replay for the paused time range and include the **Skipped** status. Include **Canceled** as well to recover runs canceled during the pause.
- Available history depends on your plan's retention.
- To stop a particular run rather than the entire function, use run cancellation.

## Related

- [Replay](./replay.md)
- [Bulk Cancellation](./bulk-cancellation.md)
- [Inspecting Function Runs](./inspecting-function-runs.md)
