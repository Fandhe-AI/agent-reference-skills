# Messages

Retrieve, run-now, and cancel in-flight messages by ID.

## Signature / Usage

```ts
// Get a message by ID
const msg = await client.messages.get("message-id");

// Run a delayed (or retry-waiting) message now
await client.messages.runNow("message-id");

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

**`messages.runNow(id: string)`** releases a message that is waiting on a delay (`Upstash-Delay` / `Upstash-Not-Before`) or on a retry backoff so QStash delivers it on its next poll. Throws `QstashError` with status `404` if the message is no longer waiting.

**`messages.cancel()` overloads:**

| Signature | Description |
| --- | --- |
| `cancel(id: string)` | Cancel a single message |
| `cancel(ids: string[])` | Cancel multiple messages by ID |
| `cancel({ all: true })` | Cancel all messages; returns `{ cancelled: number }` |
| `cancel({ filter: { url?, label? } })` | Cancel messages matching filter; returns `{ cancelled: number }` |

## Notes

- `runNow` does not add a delivery attempt: a retrying message uses the attempt it was already scheduled for, so if it was on its last retry and fails again it goes to the DLQ as usual
- REST equivalent: `POST https://qstash.upstash.io/v2/messages/<MESSAGE_ID>/retry` returns `200` when a waiting message was released, `404` when it is not waiting, and `400` for messages in a queue (queued messages cannot be released this way)
- The console also offers Run now / Retry now buttons on waiting messages in the Logs tab
- `messages.get()` may return `null` for messages that have already been delivered—messages are removed from the database shortly after delivery
- `delete()`, `deleteMany()`, and `deleteAll()` are deprecated; use `cancel()` in all cases
- `cancel({ all: true })` should be called in a loop until `cancelled === 0` to handle large queues
- Cancelling a message that is currently being delivered has no effect on the ongoing attempt

## Related

- [publish.md](./publish.md)
- [dlq.md](./dlq.md)
- [queues.md](./queues.md)
