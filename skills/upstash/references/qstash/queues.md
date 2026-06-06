# Queues

FIFO ordered message delivery. Messages in a queue are processed one at a time (default parallelism: 1); the next message waits until the current delivery—including callbacks and retries—completes.

## Signature / Usage

```ts
const queue = client.queue({ queueName: "my-queue" });

// Enqueue a message
await queue.enqueueJSON({
  url: "https://example.com/api/handler",
  body: { task: "process" },
});

// Create / update queue with parallelism
await queue.upsert({ parallelism: 2 });

// Inspect queue
const details = await queue.get();

// Pause and resume processing
await queue.pause();
await queue.resume();

// Delete queue
await queue.delete();
```

## Options / Props

**`client.queue()` constructor:**

| Name | Type | Description |
| --- | --- | --- |
| `queueName` | `string` | Identifies the queue to operate on |

**`queue.upsert()` options:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `parallelism` | `number` | `1` | Number of messages processed concurrently |

**`queue.enqueueJSON()` options:**

Accepts the same options as `publishJSON` (`body`, `headers`, `delay`, `retries`, `callback`, `failureCallback`, `deduplicationId`, etc.) plus:

| Name | Type | Description |
| --- | --- | --- |
| `url` | `string` | Destination endpoint for this message |

## Notes

- Messages are delivered in FIFO order within a queue
- `parallelism > 1` enables concurrent delivery while preserving enqueue order
- `pause()` / `resume()` may take up to 1 minute to take effect; avoid concurrent calls
- `queue.get()` returns queue configuration including current `parallelism` setting
- Schedules can target a queue via the `queueName` option in `schedules.create()`

## Related

- [publish.md](./publish.md)
- [schedules.md](./schedules.md)
- [dlq.md](./dlq.md)
