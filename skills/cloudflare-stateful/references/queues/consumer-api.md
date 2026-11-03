---
source: https://developers.cloudflare.com/queues/configuration/javascript-apis/
---

# Consumer API (queue handler)

A consumer Worker defines a `queue()` handler on its default export and receives a `MessageBatch`.

## Signature / Usage

```js
export default {
	async queue(batch, env, ctx) {
		for (const message of batch.messages) {
			console.log("Received", message.body);
		}
	},
};
```

Typed messages:

```ts
type MyMessage = {
  id: string;
};

interface Env {
  MY_QUEUE: Queue<MyMessage>;
}

export default {
  async queue(batch) {
    for (const message of batch.messages) {
      console.log(message.body.id);
    }
  },
} satisfies ExportedHandler<Env, MyMessage>;
```

Type definitions:

```ts
interface MessageBatch<Body = unknown> {
  readonly queue: string;
  readonly messages: readonly Message<Body>[];
  ackAll(): void;
  retryAll(options?: QueueRetryOptions): void;
}

interface Message<Body = unknown> {
  readonly id: string;
  readonly timestamp: Date;
  readonly body: Body;
	readonly attempts: number;
  ack(): void;
  retry(options?: QueueRetryOptions): void;
}

interface QueueRetryOptions {
  delaySeconds?: number;
}
```

## Options / Props

### MessageBatch

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | string | — | Name of the queue the batch belongs to. |
| `messages` | `Message[]` | — | Messages in the batch; ordering is best effort. |
| `ackAll()` | void | — | Marks every message delivered, regardless of whether `queue()` succeeds. |
| `retryAll(options?)` | void | — | Marks every message to be retried in the next batch. |

### Message

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | string | — | Unique system-generated message ID. |
| `timestamp` | `Date` | — | When the message was sent. |
| `body` | unknown | — | Message body (structured-clone type, under 128 KB). |
| `attempts` | number | — | Delivery attempts so far; starts at 1. |
| `ack()` | void | — | Marks the message delivered, regardless of whether the handler returns successfully. |
| `retry(options?)` | void | — | Marks the message to be retried in the next batch. |

### QueueRetryOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `delaySeconds` | number | — | Seconds to delay before redelivery, up to 24 hours (86400). The page says "must be a positive integer", while the batching guide documents `0` to bypass a queue-level delay. |

## Notes

- Implicit acknowledgement: the whole batch is acknowledged once `queue()` has returned, any returned promise resolved, and all `waitUntil()` promises resolved. If the handler throws or any of those promises reject, the entire batch is retried per the consumer retry settings.
- Delivery is at-least-once: make handlers idempotent (see [delivery-guarantees.md](./delivery-guarantees.md)), call `ack()` only after the message's side effects succeeded, use `retry()` for transient failures only, and configure a Dead Letter Queue so permanently failing messages are not silently deleted after `max_retries`.
- `waitUntil()` is the only supported way to run work (logging, metrics) after the handler returns; unresolved promises may not complete.
- Iterate with `for (const m of batch.messages)` or `await Promise.all(batch.messages.map(work))`; `batch.messages.forEach()` does not wait for asynchronous work.
- If `Queue<T>` / `ExportedHandler<Env, T>` types are not given, `message.body` is `unknown`.
- Legacy: the service-worker syntax `addEventListener('queue', ...)` is deprecated; `event` then has the `MessageBatch` fields plus `waitUntil()`. The Python form is a `WorkerEntrypoint` with `async def queue(self, batch)`.
- Consumer concurrency is not supported when running locally.
- The official page ends the `QueueRetryOptions` section with two stray bullets copied from `send()`; they are not transcribed.

## Related

- [Producer API](./producer-api.md)
- [Batching, retries and delays](./batching-retries.md)
- [Consumer concurrency](./consumer-concurrency.md)
- [Dead Letter Queues](./dead-letter-queues.md)
