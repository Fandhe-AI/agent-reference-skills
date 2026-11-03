---
source: https://developers.cloudflare.com/queues/configuration/javascript-apis/
---

# Producer API (Queue binding)

The `Queue` binding lets a producer Worker send messages: `send()`, `sendBatch()` and `metrics()`.

## Signature / Usage

Adapted (not in the official docs): Cookie and Authorization headers are removed before the request is enqueued; see Notes.

```ts
interface Env {
  readonly MY_QUEUE: Queue;
}

export default {
  async fetch(req, env, ctx): Promise<Response> {
    const headers = new Headers(req.headers);
    headers.delete("cookie");
    headers.delete("authorization");
    await env.MY_QUEUE.send({
      url: req.url,
      method: req.method,
      headers: Object.fromEntries(headers),
    });
    return new Response("Sent!");
  },
} satisfies ExportedHandler<Env>;
```

Send several messages at once:

```ts
const sendResultsToQueue = async (results: Array<unknown>, env: Env) => {
	const batch: MessageSendRequest[] = results.map((value) => ({
		body: value,
	}));
	await env.MY_QUEUE.sendBatch(batch);
};
```

Type definitions:

Adapted (not in the official docs): `MessageSendRequest.contentType` is typed with `QueuesContentType`, the name the page actually defines (the page writes the undefined `QueueContentType`). See Notes.

```ts
interface Queue<Body = unknown> {
  send(body: Body, options?: QueueSendOptions): Promise<QueueSendResult>;
  sendBatch(messages: Iterable<MessageSendRequest<Body>>, options?: QueueSendBatchOptions): Promise<QueueSendResult>;
  metrics(): Promise<QueueMetrics>;
}

interface MessageSendRequest<Body = unknown> {
  body: Body;
  contentType?: QueuesContentType;
  delaySeconds?: number;
}

// Default: json
type QueuesContentType = "text" | "bytes" | "json" | "v8";

interface QueueSendResult {
	metadata: {
		metrics: QueueMetrics;
	};
}

interface QueueMetrics {
	backlogCount: number;
	backlogBytes: number;
	oldestMessageTimestamp: number;
}
```

## Options / Props

### Methods

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `send(body, options?)` | `Promise<QueueSendResult>` | — | Sends one message. Body: any structured-clone type under 128 KB. When the promise resolves the message is confirmed written to disk. |
| `sendBatch(messages, options?)` | `Promise<QueueSendResult>` | — | Sends up to 100 messages; each item under 128 KB, total under 256 KB. Resolves when messages are written to disk. |
| `metrics()` | `Promise<QueueMetrics>` | — | Returns realtime metrics for the queue. |

### MessageSendRequest

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `body` | unknown | — | Message body; structured-clone type, under 128 KB. |
| `contentType` | `QueuesContentType` | `json` | Explicit content type, so the message previews correctly in the dashboard message listing. |
| `delaySeconds` | number | — | Seconds to delay before delivery to a consumer. Integer between 0 and 86400 (24 hours). |

### QueueSendOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `contentType` | `QueuesContentType` | `json` | Explicit content type. The page says this option is currently for internal use. |
| `delaySeconds` | number | — | Integer between 0 and 86400. `0` explicitly prevents delay even when the queue has a default delivery delay. |

### QueueSendBatchOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `delaySeconds` | number | — | Seconds to delay all messages in the batch. The page says "must be a positive integer", while the delay examples pass `0` to override the queue default. |

### QueuesContentType

| Value | Type sent | Dashboard preview |
| --- | --- | --- |
| `json` (default) | JSON-serializable object | Yes |
| `text` | `String` | Yes |
| `bytes` | `ArrayBuffer` | No (shown Base64-encoded) |
| `v8` | Structured-clone value that is not JSON-serializable (for example `Date`, `Map`) | No (shown Base64-encoded) |

### QueueMetrics

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `backlogCount` | number | — | Messages currently in the queue. |
| `backlogBytes` | number | — | Total size of messages in the queue, in bytes. |
| `oldestMessageTimestamp` | number | — | Timestamp (ms since epoch) of the oldest message. |

## Notes

- The producer enqueues a message for every request it receives and has no authentication, so anyone who can reach the Worker URL can add messages (each one a billed operation). Put it behind authentication before exposing it; the publish-from-worker sample in this skill shows a fail-closed bearer-token check.
- `QueueSendResult.metadata.metrics` carries realtime queue metrics after every successful send.
- An invalid content type, or one that does not match the body type, makes the send fail with an error.
- Compatibility date: the default content type changed from `v8` to `json` for Workers with a compatibility date after `2024-03-18` (or the `queues_json_messages` flag). Older Workers keep `v8` as the default. Pull-based consumers cannot decode `v8`.
- Doc inconsistencies: prose says `sendBatch` returns `Promise<QueueSendBatchResult>` but the interface declares `Promise<QueueSendResult>` (used here); `MessageSendRequest` is typed with `QueueContentType` while the defined type is `QueuesContentType`.
- Corrected from the official docs: `MessageSendRequest.contentType` now uses `QueuesContentType`, the type the page defines, so the snippet type-checks as written.
- Exceeding the per-queue throughput limit makes `send()` / `sendBatch()` throw a `Too Many Requests` error; see the limits and error-codes pages.
- Adapted from the official docs: the official example enqueues all request headers; Cookie and Authorization are stripped here so credentials are not persisted in the queue.
- The same binding can be used from Durable Objects. The Python Workers form uses a `WorkerEntrypoint` class with `self.env.MY_QUEUE.send(...)`.

## Related

- [Consumer API](./consumer-api.md)
- [Batching, retries and delays](./batching-retries.md)
- [Configure Queues](./configure-queues.md)
- [Error codes](./error-codes.md)
- [Limits](./limits.md)
