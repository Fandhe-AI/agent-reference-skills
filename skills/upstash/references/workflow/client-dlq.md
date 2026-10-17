# client.dlq (list / restart / resume / delete / retryFailureFunction)

Programmatic access to the Dead Letter Queue through the Workflow `Client`.

## Signature / Usage

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" });

// List all DLQ messages
const { messages, cursor } = await client.dlq.list();

// List with pagination and filtering
const result = await client.dlq.list({
  cursor,
  count: 10,
  filter: {
    fromDate: Date.now() - 86400000, // last 24 hours
    toDate: Date.now(),
    workflowUrl: "https://your-endpoint.com",
    label: "my-workflow",
  }
});

// Restart / resume by ID(s), with options
await client.dlq.restart(messages[0].dlqId, {
  flowControl: { key: "my-flow-control-key", parallelism: 10 },
  retries: 3,
});
await client.dlq.resume(["dlq-12345", "dlq-67890"]);

// Delete by ID, IDs, dlqIds object, filter, or all
await client.dlq.delete("dlq-123");
await client.dlq.delete({ dlqIds: ["dlq-123", "dlq-456"] });

// Retry a failed failureFunction / failureUrl request
await client.dlq.retryFailureFunction({ dlqId: "dlq-12345" });
```

## Options / Props

### filter (list / restart / resume / delete)

| Name | Type | Description |
|------|------|-------------|
| `workflowUrl` | `string` | Filter by exact workflow URL |
| `workflowRunId` | `string` | Filter by workflow run ID |
| `label` | `string \| string[]` | Filter by workflow label; an array matches runs with any of the labels (OR) |
| `fromDate` | `Date \| number` | Earliest date to include (Unix ms for numbers) |
| `toDate` | `Date \| number` | Latest date to include (Unix ms for numbers) |
| `callerIp` | `string` | IP address that triggered the workflow |
| `flowControlKey` | `string` | Filter by flow control key |
| `workflowCreatedAt` | `number` | Workflow creation time (Unix ms) |
| `failureFunctionState` | `string` | Filter by failure callback state |

### list

| Name | Type | Description |
|------|------|-------------|
| `cursor` | `string` | Pagination cursor from a previous request |
| `count` | `number` | Maximum number of DLQ messages to return (system-defined default) |
| `filter` | `object` | Filter options (above) |

Response: `messages: DLQMessage[]`, `cursor: string` (absent at the end of the DLQ).

### restart / resume

First argument: a DLQ ID, an array of IDs, `{ filter, count?, cursor? }`, or `{ all: true, cursor? }`. `count` defaults to `100` per call. Second argument options:

| Name | Type | Description |
|------|------|-------------|
| `flowControl` | `{ key: string; rate: number; parallelism: number; period: string \| number }` | Limits concurrency and rate of restarted/resumed runs. `period` defaults to `1s` |
| `retries` | `number` | Retry attempts for the restarted/resumed run. Defaults to `3` |

Response: `cursor` (absent when all matching entries are processed) and `workflowRuns: { workflowRunId: string; workflowCreatedAt: number }[]`.

### delete

First argument: a DLQ ID, an array of IDs, `{ dlqIds }`, `{ filter, count?, cursor? }`, or `{ all: true, cursor? }`. `count` defaults to `100` per call.

Response: `deleted: number` and `cursor`.

### retryFailureFunction

Takes `{ dlqId: string }`. Retries the `failureFunction` or `failureUrl` request that failed for that DLQ message.

## Paginated bulk example

```typescript
let cursor: string | undefined;
do {
  const result = await client.dlq.restart({
    filter: { label: "my-label" },
    cursor,
  });
  cursor = result.cursor;
} while (cursor);
```

## Notes

- Bulk operations (filter / all) are paginated; loop until `cursor` is undefined
- The DLQ feature page documents `restart` / `resume` with the object form `{ dlqId, retries }`; this API reference documents the ID / IDs / filter / all forms shown above
- Resume: only change workflow code after the failed steps (see update-workflow)
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/basics/client/dlq/list (and sibling pages `restart`, `resume`, `delete`, `callback` under `basics/client/dlq/`)

## Related

- [dlq](./dlq.md)
- [failure-callback](./failure-callback.md)
- [flow-control](./flow-control.md)
- [client](./client.md)
- [update-workflow](./update-workflow.md)
