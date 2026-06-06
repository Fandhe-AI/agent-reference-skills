# Function Replay

Bulk recovery from function failures by reprocessing runs from a selected time window directly from the Inngest dashboard.

## Signature / Usage

```
Dashboard → Functions → <function> → All actions → Replay
```

## Options / Props

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Descriptive label for the replay (e.g., "Bug fix from PR #958") |
| Time range | Yes | The period during which the affected runs occurred |
| Status filter(s) | Yes | Which run statuses to target: Failed, Succeeded, Cancelled, or multiple |

## Notes

- Typical workflow: detect issue → fix and deploy corrected code → create a replay for the affected time window
- Multiple statuses can be selected simultaneously to catch both explicit failures and silent bugs (e.g., replay both "Failed" and "Succeeded" runs if the bug caused incorrect silent completion)
- Replay spreads runs over time to avoid overwhelming your application; depending on run count, completion takes seconds to minutes
- The replay page shows progress and marks the job "Completed" when all runs finish reprocessing
- Replay is distinct from single-run rerun: use the Rerun button on a specific run's detail page for individual recovery; use Replay for batch recovery
- Use case example: if a third-party email provider goes down, use Replay to re-run only the failed email-sending functions without re-triggering the entire signup flow

## Related

- [Inspecting Function Runs](./inspecting-function-runs.md)
- [Observability & Metrics](./observability-metrics.md)
