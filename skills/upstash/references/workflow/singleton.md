# Singleton Workflows

Ensure at most one run of a workflow is in progress at a time by starting every run with the same `workflowRunId`. A run ID is reserved while its run is in progress and released once the run finishes, fails, or is cancelled.

## Signature / Usage

Keep the running one (the new trigger is rejected):

```typescript
import { Client } from "@upstash/workflow";
import { QstashError } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });

try {
  const { workflowRunId } = await client.trigger({
    url: "https://<YOUR_WORKFLOW_ENDPOINT>/nightly-sync",
    workflowRunId: "nightly-sync",
    body: { source: "crm" },
  });
  console.log(`started ${workflowRunId}`); // started wfr_nightly-sync
} catch (error) {
  if (!(error instanceof QstashError) || error.status !== 400) {
    throw error;
  }

  // a 400 can also mean an invalid request, so check that a run is in progress
  const { runs } = await client.logs({
    filter: { workflowRunId: "wfr_nightly-sync", state: "RUN_STARTED" },
  });
  if (runs.length === 0) {
    throw error;
  }
  console.log("nightly-sync is already running, skipping");
}
```

Replace the running one (cancel, then trigger):

```typescript
const { cancelled } = await client.cancel("wfr_rebuild-cache");
console.log(`cancelled ${cancelled} run(s)`);

const { workflowRunId } = await client.trigger({
  url: "https://<YOUR_WORKFLOW_ENDPOINT>/rebuild-cache",
  workflowRunId: "rebuild-cache",
  body: { reason: "settings changed" },
});
console.log(`started ${workflowRunId}`); // started wfr_rebuild-cache
```

## Patterns

| Pattern | When a run is already in progress |
|---------|-----------------------------------|
| Keep the running one | The new trigger is rejected (`client.trigger` throws `QstashError` with `status: 400`); the existing run continues |
| Replace the running one | The running run is cancelled and a new one starts |

In both patterns, a trigger after the previous run has ended starts a new run, even with exactly the same body.

## Notes

- Requires `@upstash/workflow` 1.4.0 or later. With older versions, a run started again with the same `workflowRunId` and the same body within 10 minutes of the previous one is deduplicated by QStash: it either does not start or gets stuck on its first step
- The ID you pass is prefixed with `wfr_` (`nightly-sync` becomes `wfr_nightly-sync`); that prefixed ID is what appears in logs and what you pass to `client.cancel`. Pass the unprefixed ID to `client.trigger`
- QStash returns `400` for other invalid trigger requests too (e.g. malformed URL), so check with `client.logs` that a run is in progress before skipping. If it ended in between, `runs` is empty; rethrow and retry
- `QstashError` comes from `@upstash/qstash`, a dependency of `@upstash/workflow`; add it to your own dependencies if your package manager blocks transitive imports, and keep it on the same version, otherwise `instanceof QstashError` does not match with two copies
- `client.cancel` resolves to `{ cancelled: 1 }` when a run was cancelled and `{ cancelled: 0 }` when there was nothing to cancel; it does not throw, so it can be called unconditionally. The cancel completes before it returns, so the ID is free for the new trigger
- A cancelled run stops right away; a step executing on your endpoint at that moment runs to the end but its result is discarded. Steps, waits, and `context.call` results of the cancelled run are never added to the new run
- If two callers cancel and trigger the same ID at the same time, both cancels can complete before either trigger; the second trigger then throws the 400 error. Catch it and retry cancel and trigger if the latest request must win
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/howto/singleton

## Related

- [client-trigger](./client-trigger.md)
- [client-cancel](./client-cancel.md)
- [client-logs](./client-logs.md)
- [context-cancel](./context-cancel.md)
