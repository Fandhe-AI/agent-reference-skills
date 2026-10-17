# Dead Letter Queue (DLQ)

The DLQ automatically captures failed workflow runs that exhausted all retry attempts, preserving their complete execution context for recovery.

## Signature / Usage

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<WORKFLOW_TOKEN>" });

// Restart: re-execute from the beginning (previous step results discarded)
await client.dlq.restart("dlq-12345", { retries: 3 });

// Resume: continue from the point of failure (completed step results preserved)
await client.dlq.resume("dlq-12345", { retries: 3 });

// Rerun failure function (only if the failure function itself failed)
await client.dlq.retryFailureFunction({ dlqId: "dlq-12345" });

// Delete
await client.dlq.delete("dlq-12345");
await client.dlq.delete(["dlq-12345", "dlq-67890"]);
await client.dlq.delete({ filter: { label: "my-label" } });
await client.dlq.delete({ all: true });
```

### Recovery actions

| Action | Description |
|--------|-------------|
| Restart | Re-execute from the beginning with the original configuration and initial payload; all previous step results are discarded. Use when earlier results are irrelevant, state is corrupted, or a fresh execution is needed |
| Resume | Continue from the exact point of failure, preserving completed steps and results. Use for long-running or expensive steps already done, or temporary failures now resolved |
| Re-run Failure Function | Retry the failure function that runs when a run enters the DLQ (cleanup, logging, alerting) |
| Delete | Remove entries individually, in bulk by IDs, or by filters such as label, URL, or date range |

Actions can be applied in bulk to multiple DLQ entries.

### Retention

| Plan | Retention |
|------|-----------|
| Free | 3 days |
| Pay-as-you-go | 1 week |
| Fixed pricing | Up to 3 months |

After the retention duration expires, DLQ items are automatically removed and cannot be recovered.

## Notes

- Failed runs move to the DLQ automatically; no configuration is required
- Rerunning the failure function is only available if the failure function itself failed; if it already succeeded it cannot be rerun. Status is shown in the DLQ and Logs dashboards
- Resume: workflow code may be modified only **after** the failed steps. Changes to steps before the failure are not allowed and may break the workflow (see update-workflow)
- The `features/dlq/*` pages show `restart` / `resume` / `delete` with object forms such as `{ dlqId, retries }` and `{ label }`; the call forms above follow the API reference (`basics/client/dlq/*`, see client-dlq), which takes an ID / array of IDs / `{ filter }` / `{ all }` first and options second
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/features/dlq

## Related

- [client-dlq](./client-dlq.md)
- [failure-callback](./failure-callback.md)
- [failures](./failures.md)
- [update-workflow](./update-workflow.md)
