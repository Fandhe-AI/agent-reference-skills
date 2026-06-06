# Messages

Retrieve and cancel in-flight messages by ID.

## Signature / Usage

```ts
// Get a message by ID
const msg = await client.messages.get("message-id");

// Cancel a single message
await client.messages.cancel("message-id");

// Cancel multiple messages
await client.messages.cancel(["message-id-1", "message-id-2"]);

// Cancel all messages
let result = { cancelled: Infinity };
while (result.cancelled > 0) {
  result = await client.messages.cancel({ all: true });
}

// Cancel by filter
await client.messages.cancel({ filter: { url: "https://example.com" } });
```

## Options / Props

**`messages.cancel()` overloads:**

| Signature | Description |
| --- | --- |
| `cancel(id: string)` | Cancel a single message |
| `cancel(ids: string[])` | Cancel multiple messages by ID |
| `cancel({ all: true })` | Cancel all messages; returns `{ cancelled: number }` |
| `cancel({ filter: { url?, label? } })` | Cancel messages matching filter; returns `{ cancelled: number }` |

## Notes

- `messages.get()` may return `null` for messages that have already been delivered—messages are removed from the database shortly after delivery
- `delete()`, `deleteMany()`, and `deleteAll()` are deprecated; use `cancel()` in all cases
- `cancel({ all: true })` should be called in a loop until `cancelled === 0` to handle large queues
- Cancelling a message that is currently being delivered has no effect on the ongoing attempt

## Related

- [publish.md](./publish.md)
- [dlq.md](./dlq.md)
- [queues.md](./queues.md)
