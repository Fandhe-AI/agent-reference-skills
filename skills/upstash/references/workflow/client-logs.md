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
| `label` | `string` | Match by workflow label |
| `fromDate` | `Date \| number` | Start of creation date range |
| `toDate` | `Date \| number` | End of creation date range |
| `messageId` | `string` | Match by QStash message ID |
| `callerIp` | `string` | Match by originating IP address |
| `flowControlKey` | `string` | Match by flow control key |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `runs` | `WorkflowRun[]` | Array of workflow execution records |
| `cursor` | `string \| undefined` | Pagination token; absent when no more results exist |

## Related

- [client](./client.md)
- [client.cancel](./client-cancel.md)
