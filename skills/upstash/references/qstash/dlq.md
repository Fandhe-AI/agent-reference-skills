# Dead Letter Queue (DLQ)

Messages that exhaust all delivery retries are automatically moved to the Dead Letter Queue. DLQ messages can be retried or deleted individually or in bulk.

## Signature / Usage

```ts
// List DLQ messages (paginated)
const res = await client.dlq.listMessages({
  count: 10,
  order: "latestFirst",
  filter: { url: "https://example.com" },
});
// res.messages — array of DLQ message objects
// res.cursor   — pass to next call for pagination

// Retry specific messages
await client.dlq.retry(["dlq-id-1", "dlq-id-2"]);

// Delete specific messages
await client.dlq.delete(["dlq-id-1", "dlq-id-2"]);

// Bulk delete with filter
await client.dlq.delete({
  filter: { url: "https://example.com", responseStatus: 500 },
  all: true,
});
```

## Options / Props

**`dlq.listMessages()` options:**

| Name | Type | Description |
| --- | --- | --- |
| `cursor` | `string` | Pagination cursor from previous response |
| `count` | `number` | Number of messages to return per page |
| `order` | `"latestFirst"` | Sort order |
| `filter` | `{ url?: string; responseStatus?: number }` | Filter messages by destination URL or HTTP response status |
| `dlqIds` | `string[]` | Fetch specific DLQ message IDs |

**`dlq.retry()` / `dlq.delete()` options:**

| Name | Type | Description |
| --- | --- | --- |
| (positional) | `string` | Single DLQ message ID |
| (positional) | `string[]` | Multiple DLQ message IDs |
| `filter` | `{ url?: string; queueName?: string; responseStatus?: number }` | Bulk operation filter |
| `cursor` | `string` | Pagination cursor for large bulk operations |
| `all` | `boolean` | Apply operation to all matching messages |

## Notes

- Retried DLQ messages re-enter the delivery pipeline with the same retry configuration as new messages
- DLQ message retention is determined by your Upstash subscription tier
- Messages are permanently removed when their retention period expires
- `failureCallback` in `publishJSON` fires when a message is moved to DLQ

## Related

- [publish.md](./publish.md)
- [callbacks.md](./callbacks.md)
- [queues.md](./queues.md)
