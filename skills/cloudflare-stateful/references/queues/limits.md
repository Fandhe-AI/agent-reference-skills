---
source: https://developers.cloudflare.com/queues/platform/limits/
---

# Limits

Account and queue limits for message size, throughput, retention, concurrency and consumer time.

## Signature / Usage

Raise the consumer CPU limit (default 30 seconds per invocation):

```jsonc
{
  // ...rest of your configuration...
  "limits": {
    "cpu_ms": 300000, // 300,000 milliseconds = 5 minutes
  },
  // ...rest of your configuration...
}
```

```toml
[limits]
cpu_ms = 300_000
```

## Options / Props

### Limits table

| Feature | Limit |
| --- | --- |
| Queues | Workers Paid: unlimited, default limit 10,000 per account; each queue above 10,000 costs $0.10 per month. Workers Free: 10,000 per account. |
| Message size | 128 KB (1 KB = 1000 bytes; about 100 bytes of internal metadata count toward it) |
| Message retries | 100 |
| Maximum consumer batch size | 100 messages |
| Maximum messages per `sendBatch` call | 100 (or 256 KB in total) |
| Maximum batch wait time | 60 seconds |
| Per-queue message throughput | 5,000 messages per second |
| Message retention period | Configurable up to 14 days (Free: fixed 24 hours) |
| Per-queue backlog size | 25 GB |
| Concurrent consumer invocations | 250 (push-based only) |
| Consumer duration (wall clock) | 15 minutes |
| Consumer CPU time | Configurable to 5 minutes (default 30 seconds) |
| `visibilityTimeout` (pull-based) | 12 hours |
| `delaySeconds` (send or retry) | 24 hours |

### Wall time by invocation type

| Invocation type | Wall time limit |
| --- | --- |
| Incoming HTTP request | Unlimited while the client remains connected; `waitUntil()` extends up to 30 seconds after the response or disconnect |
| Cron Triggers | 15 minutes |
| Queue consumers | 15 minutes |
| Durable Object alarm handlers | 15 minutes |
| Durable Objects (RPC / HTTP) | Unlimited while the caller stays connected |
| Workflows (per step) | Unlimited wall time; subject to the CPU time limit |

## Notes

- All limits apply to Workers Paid and Free except queue counts and message retention (non-configurable 24 hours on Free).
- Source inconsistency: the Wrangler command reference instead says `--message-retention-period-secs` accepts 60 to 86400 on the free tier, which implies retention below 24 hours can be set there.
- Exceeding the throughput limit makes `send()` / `sendBatch()` throw a `Too Many Requests` error; reaching the backlog limit gives `Storage Limit Exceeded`.
- Messages that reach retention are deleted; other messages are not.
- CPU time is active processing time, not time waiting on network or storage I/O.
- Request a higher limit with the Limit Increase Request Form linked from https://developers.cloudflare.com/queues/platform/limits/.

## Related

- [Pricing](./pricing.md)
- [Error codes](./error-codes.md)
- [Consumer concurrency](./consumer-concurrency.md)
