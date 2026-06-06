# Algorithms

Three rate limiting algorithms available as static factory methods on `Ratelimit` (and `MultiRegionRatelimit`).

## Signature / Usage

### Fixed Window

```ts
Ratelimit.fixedWindow(tokens: number, window: Duration): Algorithm
```

Divides time into fixed-length windows. Counter resets when a new window begins.

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "10 s"),
});
```

### Sliding Window

```ts
Ratelimit.slidingWindow(tokens: number, window: Duration): Algorithm
```

Rolling window weighted by prior-period traffic: `rate = prior × (remaining / period) + current`.

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
```

### Token Bucket

```ts
Ratelimit.tokenBucket(refillRate: number, interval: Duration, maxTokens: number): Algorithm
```

Bucket refills at `refillRate` tokens per `interval`; each request consumes one token.

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.tokenBucket(5, "10 s", 10),
  analytics: true,
});
```

## Options / Props

### `fixedWindow(tokens, window)`

| Name | Type | Description |
|------|------|-------------|
| `tokens` | `number` | Maximum requests allowed per window |
| `window` | `Duration` | Window duration string (e.g., `"10 s"`, `"1 m"`, `"1 h"`) |

### `slidingWindow(tokens, window)`

| Name | Type | Description |
|------|------|-------------|
| `tokens` | `number` | Maximum requests allowed per window |
| `window` | `Duration` | Rolling window duration |

### `tokenBucket(refillRate, interval, maxTokens)`

| Name | Type | Description |
|------|------|-------------|
| `refillRate` | `number` | Tokens added per `interval` |
| `interval` | `Duration` | Refill interval duration |
| `maxTokens` | `number` | Maximum bucket capacity |

## Notes

- **Fixed Window**: lowest Redis command cost; susceptible to burst traffic at window boundaries
- **Sliding Window**: smoothest distribution; uses an approximation (assumes uniform request spread); not suitable for multi-region
- **Token Bucket**: allows controlled initial bursts up to `maxTokens`; highest compute cost; **not supported in multi-region** setups
- `Duration` strings follow `"<number> <unit>"` format: `s` (seconds), `m` (minutes), `h` (hours), `d` (days)
- Dynamic limits (`dynamicLimits: true`) are supported by all three algorithms

## Related

- [overview.md](./overview.md)
- [costs.md](./costs.md)
- [features.md](./features.md)
