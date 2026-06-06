# Redis Command Costs

Number of Redis commands consumed per operation, by algorithm. Relevant for estimating Upstash billing.

## Options / Props

### `limit()` — commands per call

| Scenario | Fixed Window | Sliding Window | Token Bucket |
|----------|-------------|----------------|--------------|
| First call | 3 (EVAL, INCR, PEXPIRE) | 5 (EVAL, GET×2, INCR, PEXPIRE) | 4 (EVAL, HMGET, HSET, PEXPIRE) |
| Intermediate | 2 (EVAL, INCR) | 4 (EVAL, GET×2, INCR) | 4 (EVAL, HMGET, HSET, PEXPIRE) |
| Rate-limited (cache miss) | 2 (EVAL, INCR) | 3 (EVAL, GET×2) | 2 (EVAL, HMGET) |
| Rate-limited (cache hit) | 0 | 0 | 0 |

### Other methods — commands per call

| Method | Fixed Window | Sliding Window | Token Bucket |
|--------|-------------|----------------|--------------|
| `getRemaining()` | 2 | 3 | 2 |
| `resetUsedTokens()` | 3 | 4 | 3 |
| `blockUntilReady()` | same as `limit()` | same as `limit()` | same as `limit()` |

### Feature overhead (added to above per `limit()` call)

| Feature | Extra commands |
|---------|---------------|
| Deny lists (`enableProtection: true`) | +2 |
| Analytics (`analytics: true`) | +1 |
| Dynamic limits (`dynamicLimits: true`) | +1 (also applies to `getRemaining()`) |

## Notes

- Cache hit (0 commands) occurs when ephemeral cache holds the blocked identifier — no Redis call is made
- Sliding Window costs are higher than Fixed Window; prefer Fixed Window if Redis command cost is a primary concern
- Token Bucket is not available in multi-region mode

## Related

- [algorithms.md](./algorithms.md)
- [features.md](./features.md)
- [traffic-protection.md](./traffic-protection.md)
