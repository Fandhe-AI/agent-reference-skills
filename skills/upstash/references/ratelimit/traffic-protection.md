# Traffic Protection

Deny-list based request blocking by IP address, user agent, country, or arbitrary identifier. Managed via the Upstash Ratelimit Dashboard.

## Signature / Usage

```ts
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  enableProtection: true,
  analytics: true,
});

const { success, reason, deniedValue } = await ratelimit.limit(identifier, {
  ip: request.headers.get("x-forwarded-for") ?? "",
  userAgent: request.headers.get("user-agent") ?? "",
  country: request.geo?.country ?? "",
});

if (!success && reason === "denyList") {
  console.log("Blocked:", deniedValue);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enableProtection` | `boolean` | Enable deny-list checking on each `limit()` call |
| `ip` | `string` (in `req`) | Client IP address to check against the deny list |
| `userAgent` | `string` (in `req`) | User-agent string to check against the deny list |
| `country` | `string` (in `req`) | Two-letter country code to check against the deny list |

### `RatelimitResponse` fields (when blocked by deny list)

| Field | Value | Description |
|-------|-------|-------------|
| `success` | `false` | Request is blocked |
| `reason` | `"denyList"` | Block reason identifier |
| `deniedValue` | `string` | The exact value matched in the deny list |

## Notes

- Deny-list entries are managed in the Upstash Console / Ratelimit Dashboard; the library reads from Redis at runtime
- Blocked values are cached locally for ~1 minute, reducing Redis round-trips
- **Exact matching only** — wildcard or regex patterns are not supported
- Auto IP deny list: when enabled, malicious IPs are sourced from the ipsum aggregator (30+ deny lists), updated daily at 02:00 UTC via background refresh
- Adding `enableProtection: true` costs +2 extra Redis commands per `limit()` call (see [costs.md](./costs.md))
- `analytics: true` is recommended alongside `enableProtection` to monitor denied requests in the dashboard

## Related

- [overview.md](./overview.md)
- [methods.md](./methods.md)
- [features.md](./features.md)
- [costs.md](./costs.md)
