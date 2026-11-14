# API Rate Limit Responses

Burst (per-second) and daily rate limits of the QStash API and the SDK errors raised when they are hit.

## Signature / Usage

```typescript
import { QstashRatelimitError } from "@upstash/qstash";

try {
  // Example of a request that could hit the burst rate limit
  const result = await client.publishJSON({
    url: "https://my-api...",
    // or urlGroup: "the name or id of a url group"
    body: {
      hello: "world",
    },
  });
} catch (error) {
  if (error instanceof QstashRatelimitError) {
    console.log("Burst rate limit exceeded. Retry after:", error.reset);
    // Implement exponential backoff or delay before retrying
  } else {
    console.error("An unexpected error occurred:", error);
  }
}
```

## Options / Props

| Item | Description |
| --- | --- |
| No per-second limit | trigger, publish, enqueue, notify, wait, batch |
| Per-second limit | Other endpoints (logs, listing flow-controls, queues, schedules and so on) |
| `Burst-RateLimit-Limit` | Maximum requests in the burst window (1 second) |
| `Burst-RateLimit-Remaining` | Remaining requests in the burst window |
| `Burst-RateLimit-Reset` | Unix timestamp when the burst limit resets |
| `QstashRatelimitError` | SDK error for burst limit; has `reset` |
| `QstashDailyRatelimitError` | SDK error for the daily limit; has `reset` |

## Notes

- `QstashDailyRatelimitError` is imported from `@upstash/qstash` the same way as `QstashRatelimitError`
- Distinct from flow-control.md, which limits delivery to your endpoints, not API calls to QStash
- Source: https://upstash.com/docs/qstash/api/api-ratelimiting (fetched 2026-11-14; no version pin on the site)

## Related

- [flow-control.md](./flow-control.md)
- [security.md](./security.md)
