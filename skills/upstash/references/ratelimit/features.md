# Features

Advanced capabilities of `@upstash/ratelimit` beyond basic rate limiting.

## Signature / Usage

### Ephemeral Cache

Reduces Redis calls by caching blocked identifiers in memory. Define the `Map` outside the handler so it persists across warm invocations.

```ts
const cache = new Map();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  ephemeralCache: cache,
});
```

Pass `ephemeralCache: false` to disable entirely.

### Timeout

Allows requests through if Redis does not respond within the specified duration. Prevents network issues from blocking legitimate traffic.

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  timeout: 1000, // ms; default is 5000
});
```

### Analytics

Enables request metrics visible in the Upstash Console (allowed, rate-limited, denied counts; top identifiers; geographic distribution).

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "10 s"),
  analytics: true,
});
```

### Multiple Limits (Tiered Rate Limiting)

Create separate `Ratelimit` instances with distinct prefixes to enforce per-tier rules.

```ts
const ratelimit = {
  free: new Ratelimit({
    redis,
    prefix: "ratelimit:free",
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  }),
  paid: new Ratelimit({
    redis,
    prefix: "ratelimit:paid",
    limiter: Ratelimit.slidingWindow(60, "10 s"),
  }),
};
```

### Custom Token Consumption

The `rate` field in `limit()` subtracts a variable number of tokens per call, useful for batch APIs.

```ts
const { success } = await ratelimit.limit("user_123", { rate: 5 });
```

### Multi-Region

`MultiRegionRatelimit` replicates state across multiple Redis instances using CRDTs. Returns from the nearest replica immediately; synchronization is asynchronous.

```ts
import { MultiRegionRatelimit } from "@upstash/ratelimit";

const ratelimit = new MultiRegionRatelimit({
  redis: [
    new Redis({ url: "...", token: "..." }), // us-east-1
    new Redis({ url: "...", token: "..." }), // eu-west-1
  ],
  limiter: MultiRegionRatelimit.slidingWindow(10, "10 s"),
  analytics: true,
});
```

### Dynamic Limits

Adjust the rate limit at runtime without recreating the instance.

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  dynamicLimits: true,
});

await ratelimit.setDynamicLimit({ limit: 5 });
const { dynamicLimit } = await ratelimit.getDynamicLimit();
await ratelimit.setDynamicLimit({ limit: false }); // revert to constructor default
```

## Notes

- Ephemeral cache is only effective when the serverless function instance is reused (warm starts); cold starts always hit Redis
- Multi-region setups cannot guarantee the configured limit is never exceeded by a small margin due to asynchronous CRDT synchronization
- Token Bucket algorithm is **not** supported in multi-region mode
- `analytics: true` adds +1 Redis command per `limit()` call (see [costs.md](./costs.md))
- Dynamic limits add +1 Redis command per `limit()` or `getRemaining()` call

## Related

- [overview.md](./overview.md)
- [methods.md](./methods.md)
- [traffic-protection.md](./traffic-protection.md)
- [costs.md](./costs.md)
