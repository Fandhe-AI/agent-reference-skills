# Retry

If the destination does not return a 2XX status code, QStash retries the delivery. Retry count, delay expression, Retry-After headers and a non-retryable error signal are configurable.

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });
const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  retries: 3,
  retryDelay: "pow(2, retried) * 1000", // 2^retried * 1000ms
});
```

cURL equivalent: `Upstash-Retries: 3` and `Upstash-Retry-Delay: pow(2, retried) * 1000` headers. Python: `retries=3, retry_delay="pow(2, retried) * 1000"` in `client.message.publish_json(...)`.

## Options / Props

| Name | Header | Description |
| --- | --- | --- |
| `retries` | `Upstash-Retries` | Number of retries per message. Default is 3 |
| `retryDelay` | `Upstash-Retry-Delay` | Math expression for the delay between attempts (milliseconds in the official examples) |

`retryDelay` expression: may use the variable `retried` (current retry attempt count, starting from 0) and these functions: `pow`, `sqrt`, `abs`, `exp`, `floor`, `ceil`, `round`, `min`, `max`.

| Expression | Meaning |
| --- | --- |
| `1000` | Fixed 1 second delay |
| `1000 * (1 + retried)` | Linear backoff: 1s, 2s, 3s, 4s... |
| `pow(2, retried) * 1000` | Exponential backoff: 1s, 2s, 4s, 8s... |
| `max(1000, pow(2, retried) * 100)` | Exponential with minimum 1s delay |

Default backoff (each delay capped at 1 day):

```
n = how many times this request has been retried
delay =  min(86400, e ** (2.5*n)) // in seconds
```

| n | delay |
| --- | --- |
| 1 | 12s |
| 2 | 2m28s |
| 3 | 30m8ss |
| 4 | 6h7m6s |
| 5 | 24h |
| 6 | 24h |

## Notes

- A delivery attempt is aborted if the HTTP call to your endpoint does not return within the plan-specific Max HTTP Response Duration (see the QStash pricing page).
- Retry-After headers: respond with one of `Retry-After`, `X-RateLimit-Reset`, `X-RateLimit-Reset-Requests`, `X-RateLimit-Reset-Tokens` to choose the next retry time instead of the default backoff. Value formats: seconds, RFC1123 date, or duration (e.g. `6m5s`; units `ns`, `us`/`µs`, `ms`, `s`, `m`, `h`). Delays beyond the default backoff maximum (1 day) fall back to the backoff algorithm.
- `Upstash-Retried` request header: QStash adds it to requests to your API; `0` is the first attempt, `1` the second, etc.
- Non-retryable error: respond with status `489` and header `Upstash-NonRetryable-Error: true`. QStash marks the message failed immediately, skips further retries, and forwards it to the Dead Letter Queue.
- The Python SDK `RetryConfig` (`retry={"retries": ..., "backoff": ...}`) configures retries of requests sent to QStash, not QStash's delivery retries.

## Related

- [dlq.md](./dlq.md)
- [publish.md](./publish.md)
- [callbacks.md](./callbacks.md)
