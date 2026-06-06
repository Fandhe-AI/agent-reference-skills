# publishJSON / publish

Publish a single message to a URL or URL Group. `publishJSON` serializes the body as JSON and sets `Content-Type: application/json` automatically.

## Signature / Usage

```ts
const res = await client.publishJSON({
  url: "https://example.com/api/handler",
  body: { hello: "world" },
});
// res.messageId — track delivery in Upstash Console
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `string` | — | Destination endpoint URL (mutually exclusive with `urlGroup`) |
| `urlGroup` | `string` | — | URL Group name; fans out to all subscribed endpoints |
| `body` | `unknown` | — | Message payload; serialized to JSON by `publishJSON` |
| `headers` | `Record<string, string>` | — | Custom headers forwarded to destination (sent as `Upstash-Forward-*`) |
| `method` | `string` | `"POST"` | HTTP method used when delivering the message |
| `delay` | `number \| string` | — | Relative delay before delivery (e.g. `60`, `"3s"`, `"1m"`, `"2h"`) |
| `notBefore` | `number` | — | Absolute Unix timestamp (seconds, UTC) before which message is not delivered; takes precedence over `delay` |
| `retries` | `number` | plan default | Max delivery attempts; cannot exceed plan limit |
| `retryDelay` | `string` | — | Custom backoff expression using `retried` variable (e.g. `"pow(2, retried) * 1000"`) |
| `callback` | `string` | — | URL to receive delivery result (success or failure) |
| `failureCallback` | `string` | — | URL to receive result only after all retries are exhausted |
| `deduplicationId` | `string` | — | Explicit deduplication key; duplicate within 10-minute window returns `202` with existing ID |
| `contentBasedDeduplication` | `boolean` | `false` | Auto-generates dedup ID from destination + body + headers |
| `timeout` | `string` | — | Per-delivery request timeout (e.g. `"30s"`) |
| `flowControl` | `{ key: string; rate?: number; period?: string; parallelism?: number }` | — | Rate limiting and concurrency control |

## Notes

- Returns `{ messageId: string }` on success
- Duplicate detected: HTTP `202` with original `messageId`; message not re-enqueued
- Deduplication window: 10 minutes
- Default exponential backoff: `min(86400, e^(2.5*n))` seconds; capped at 24 h after attempt 5+
- Return `489` with `Upstash-NonRetryable-Error: true` to skip remaining retries immediately

## Related

- [batch.md](./batch.md)
- [schedules.md](./schedules.md)
- [queues.md](./queues.md)
- [callbacks.md](./callbacks.md)
- [dlq.md](./dlq.md)
