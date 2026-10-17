# client.logs()

Retrieves paginated workflow run history with optional filtering by state, label, date range, and more.

## Signature / Usage

```typescript
// Basic retrieval
const { runs, cursor } = await client.logs()

// Filter failed runs
const { runs } = await client.logs({
  filter: { state: "RUN_FAILED" },
})

// Paginated iteration
let cursor: string | undefined
do {
  const result = await client.logs({ cursor, count: 50 })
  process(result.runs)
  cursor = result.cursor
} while (cursor)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cursor` | `string` | Pagination token from a previous response |
| `count` | `number` | Maximum runs to return per request |
| `filter` | `object` | Filter criteria (see below) |

### filter

| Name | Type | Description |
|------|------|-------------|
| `workflowRunId` | `string` | Match a specific run ID |
| `workflowUrl` | `string` | Match by workflow endpoint URL |
| `state` | `string` | One of: `RUN_STARTED`, `RUN_SUCCESS`, `RUN_FAILED`, `RUN_CANCELED` |
| `label` | `string \| string[]` | Match by workflow label; an array matches runs that have any of the given labels (OR semantics) |
| `workflowCreatedAt` | `number` | Match by workflow creation time (Unix timestamp) |
| `fromDate` | `Date \| number` | Start of creation date range |
| `toDate` | `Date \| number` | End of creation date range |
| `messageId` | `string` | Match by QStash message ID |
| `callerIp` | `string` | Match by originating IP address |
| `flowControlKey` | `string` | Match by flow control key |

### Response

| Field | Type | Description |
|-------|------|-------------|
| `runs` | `WorkflowRun[]` | Array of workflow execution records |
| `cursor` | `string \| undefined` | Pagination token; absent when no more results exist |

### runs[] fields

| Field | Type | Description |
|-------|------|-------------|
| `workflowRunId` | `string` | ID of the workflow run |
| `workflowUrl` | `string` | URL of the workflow endpoint |
| `workflowState` | `string` | `RUN_STARTED`, `RUN_SUCCESS`, `RUN_FAILED`, `RUN_CANCELED` |
| `workflowCreatedAt` | `number` | Unix timestamp (ms) when the run started |
| `workflowRunCompletedAt` | `string` | Unix timestamp (ms) when the run completed, if applicable |
| `labels` | `string[]` | Labels assigned on trigger |
| `label` | `string` | Deprecated; use `labels`. With multiple labels contains only the first |
| `failureFunction` | `object` | Failure callback details if a failure function was defined: `messageId`, `url`, `state` (`CALLBACK_INPROGRESS` / `CALLBACK_SUCCESS` / `CALLBACK_FAIL`), `failHeaders`, `failStatus`, `failResponse`, `dlqId`, `responseBody`, `responseHeaders`, `responseStatus`, `errors`, `maxRetries` |
| `steps` | `Array` | Grouped steps; group `type` is `sequential`, `parallel` or `next`, each with a nested `steps` array |

Each nested step has `stepId`, `stepName`, `stepType` (`Initial`, `Run`, `Call`, `SleepFor`, `SleepUntil`, `Wait`, `Notify`, `Invoke`), `messageId`, `out`, `concurrent`, `state` (`STEP_SUCCESS`, `STEP_RETRY`, `STEP_FAILED`, `STEP_CANCELED`), `createdAt`, `nextDeliveryTime` (only for `STEP_RETRY`), plus type-specific fields (`sleepFor`, `sleepUntil`, `waitEventId`, `waitTimeoutDeadline`, `waitTimeoutDuration`, `waitTimeout`, `callUrl`, `callMethod`, `callHeaders`, `callBody`, `callResponseStatus`, `callResponseBody`, `callResponseHeaders`, `invokedWorkflowRunId`, `invokedWorkflowUrl`, `invokedWorkflowCreatedAt`, `invokedWorkflowRunBody`, `invokedWorkflowRunHeaders`).

## Related

- [client](./client.md)
- [client.cancel](./client-cancel.md)
