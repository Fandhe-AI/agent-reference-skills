# Bulk Cancellation

Dashboard UI for cancelling multiple function runs at once by date range, complementing SDK-based cancellation and the REST cancellation endpoint.

## Signature / Usage

```
Dashboard → Functions → <function> → All actions → Bulk cancel
  → name the cancellation → select date range → confirm
```

## Options / Props

| Field | Description |
|-------|-------------|
| Name | Label identifying the bulk cancellation process |
| Date range | Selects which function runs (by start time) are targeted for cancellation |

## Notes

- Cancellation starts immediately; the Function runs list updates progressively as runs are marked "cancelled"
- History of running/completed bulk cancellations is available under the "Cancellation history" tab
- Steps currently executing on your compute provider are not force-stopped — the run cancels once the current step completes
- Cancelling runs does not prevent new runs from being enqueued; for unwanted loops or abnormal execution volume, consider Function Pausing instead
- Complements [SDK cancellation](https://www.inngest.com/docs-markdown/features/inngest-functions/cancellation/cancel-on-events) and the dedicated REST cancellation API endpoint

## Related

- [Replay](./replay.md)
- [Inspecting Function Runs](./inspecting-function-runs.md)
