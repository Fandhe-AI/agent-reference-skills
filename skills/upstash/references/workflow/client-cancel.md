# client.cancel()

Terminates one or more workflow runs. Supports direct run ID, filter-based, and bulk cancellation. Returns the count of canceled runs.

## Signature / Usage

```typescript
// Single run
await client.cancel("wfr_abc123")

// Multiple runs
await client.cancel(["wfr_abc123", "wfr_def456"])

// Filter-based
await client.cancel({
  filter: { label: "my-label", fromDate: new Date("2024-01-01") },
  count: 100,
})

// Bulk cancel all runs
await client.cancel({ all: true })
```

## Options / Props

When passing a filter object:

| Name | Type | Description |
|------|------|-------------|
| `filter.workflowUrl` | `string` | Match runs by exact workflow URL |
| `filter.workflowUrlStartingWith` | `string` | Match runs by URL prefix (mutually exclusive with `workflowUrl`) |
| `filter.label` | `string` | Match runs by label |
| `filter.fromDate` | `Date \| number` | Start of date range (Date object or Unix ms timestamp) |
| `filter.toDate` | `Date \| number` | End of date range |
| `filter.callerIp` | `string` | Filter by originating IP address |
| `filter.flowControlKey` | `string` | Target runs with a specific flow control key |
| `count` | `number` | Max runs to cancel per request; default: 100 |
| `all` | `boolean` | Cancel all active runs when `true` |

## Response

```typescript
{ cancelled: number }
```

## Notes

- Bulk cancellation (`all: true`) requires looping until `cancelled === 0` to ensure all runs are terminated
- Canceled runs do not trigger `failureFunction` and are not sent to the DLQ; they receive a "canceled" status

## Related

- [client](./client.md)
- [client.logs](./client-logs.md)
