# Overview

`@upstash/ratelimit` — connectionless (HTTP-based) rate limiting library for serverless and edge environments. Requires no persistent TCP connections and integrates with Upstash Redis.

## Signature / Usage

```bash
npm install @upstash/ratelimit @upstash/redis
```

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

const { success } = await ratelimit.limit("api");
if (!success) return "Rate limited";
```

For Deno:

```ts
import { Ratelimit } from "https://cdn.skypack.dev/@upstash/ratelimit@latest";
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `redis` | `Redis` | — | Upstash Redis instance (use `Redis.fromEnv()` or pass credentials explicitly) |
| `limiter` | `Algorithm` | — | Rate limiting algorithm: `fixedWindow`, `slidingWindow`, or `tokenBucket` |
| `prefix` | `string` | `"@upstash/ratelimit"` | Redis key namespace prefix to avoid collisions |
| `analytics` | `boolean` | `false` | Enables request tracking in Upstash Console |
| `timeout` | `number` | `5000` | Milliseconds to wait for Redis before allowing the request through |
| `ephemeralCache` | `Map \| false` | built-in | In-memory cache for blocked identifiers; pass `false` to disable |
| `enableProtection` | `boolean` | `false` | Enables deny-list traffic protection (IP, user agent, country) |
| `dynamicLimits` | `boolean` | `false` | Enables runtime limit adjustment via `setDynamicLimit()` |

## Notes

- Designed for AWS Lambda, Vercel, Cloudflare Workers, Fastly, Next.js, and client-side apps
- Environment variables required: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- In serverless runtimes, await the `pending` promise to ensure background tasks complete before shutdown: `context.waitUntil(pending)`
- `MultiRegionRatelimit` is the multi-region variant; its constructor accepts an array of `Redis` instances

## Related

- [algorithms.md](./algorithms.md)
- [methods.md](./methods.md)
- [features.md](./features.md)
