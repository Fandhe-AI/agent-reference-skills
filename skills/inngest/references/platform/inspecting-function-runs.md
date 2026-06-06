# Inspecting Function Runs

Viewing, searching, and analyzing individual function run details in the Inngest Cloud dashboard.

## Signature / Usage

```
# CEL expression for advanced search
output.name == "NonRetriableError" && output.message == "Failed to import data"
```

## Options / Props

Searchable fields via CEL expressions:

| Field | Operators | Description |
|-------|-----------|-------------|
| `event.id` | `==`, `!=` | Event ID string |
| `event.name` | `==`, `!=` | Event name string |
| `event.v` | `==`, `!=` | Event version string |
| `event.ts` | `==`, `!=`, `>`, `>=`, `<`, `<=` | Event timestamp |
| `event.data` | all | Event payload map |
| `output` | all | Function output map (errors serialized as JSON) |

## Notes

- The Runs page (left navigation) lists all executions across apps in the selected environment; filter by Status, Queued/Started timestamps, or Application
- To view runs for a specific function, navigate via the Functions menu to that function's run history
- Click "Show search" to open the advanced CEL expression search field
- Each run detail view shows: trigger details, event payload (right panel), and a step execution timeline (bottom) with retry information per step
- Expand any step to see error messages, retry attempts, and timing data
- Two primary recovery actions available per run:
  1. **Rerun button**: replay a single run after fixing the underlying issue
  2. **Send to local Dev Server**: reproduce the issue locally without external dependencies
- For bulk recovery across many runs, use [Function Replay](./replay.md)

## Related

- [Traces](./traces.md)
- [Replay](./replay.md)
- [Observability & Metrics](./observability-metrics.md)
