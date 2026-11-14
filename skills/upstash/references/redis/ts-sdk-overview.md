# @upstash/redis — TypeScript SDK Overview

HTTP/REST-based Redis client for TypeScript, built on the Upstash REST API. Connectionless by design — ideal for serverless, edge, and WebAssembly environments where TCP is unavailable.

## Signature / Usage

```ts
import { Redis } from "@upstash/redis"

// Manual initialization
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Auto-load from environment variables
const redis = Redis.fromEnv()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | REST endpoint URL from Upstash Console |
| `token` | `string` | Auth token (standard or read-only) |
| `automaticDeserialization` | `boolean` | Disable automatic JSON deserialization (default: `true`) |
| `responseEncoding` | `false \| "base64"` | Response encoding requested from the server. Default `false` (plain JSON strings) since 1.40.0; set `"base64"` for the pre-1.40.0 behaviour |
| `enableTelemetry` | `boolean` | Anonymous telemetry collection (default: `true`); also controllable via `UPSTASH_DISABLE_TELEMETRY` env var |
| `retry` | `{ retries, backoff }` | Retry policy for network errors; default 5 retries with backoff `(retryCount) => Math.exp(retryCount) * 50` ms |
| `signal` | `() => AbortSignal` | Request timeout, e.g. `() => AbortSignal.timeout(1000)`; a timeout surfaces as an error named `TimeoutError` |

## Notes

- Install: `npm install @upstash/redis` (also yarn and pnpm; in Deno use `import { Redis } from "npm:@upstash/redis"`)
- `Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` automatically
- On Node.js v17 and earlier, `fetch` is not natively available — import `isomorphic-fetch` as a polyfill
- Large numbers (above `2^53 - 1`) are returned as strings due to JavaScript's number limit
- Initialize the client outside request handlers in serverless environments to maximize reuse
- Since `@upstash/redis` 1.40.0 `responseEncoding` defaults to `false`: the server returns plain JSON strings instead of base64. Earlier versions requested base64 responses by default, so an undecoded response looked like a hash (`dmFsdWU=` for `value`); upgrade to 1.40.0 or later, or set `responseEncoding: false` on older versions. Pass `responseEncoding: "base64"` to restore the old behaviour (release notes)
- Search is available on the same client: `import { Redis, s } from "@upstash/redis"`, then `redis.search.createIndex(...)`; since 1.41.0 the `s` builder has `s.hybrid()` and `index.query()` accepts the `$ann` / `$rrf` / `$standard` retrievers (see Redis Search pages)
- Keep-alive connection reuse is on by default (keep the client in memory across invocations); `automaticDeserialization: false` disables JSON (de)serialization and may break types
- Retries: network errors are retried 5 times by default with `(retryCount) => Math.exp(retryCount) * 50` ms backoff; override via the `retry` option
- Source: https://upstash.com/docs/redis/sdks/ts/overview, https://upstash.com/docs/redis/sdks/ts/getstarted, https://upstash.com/docs/redis/sdks/ts/advanced, https://upstash.com/docs/redis/sdks/ts/retries, https://upstash.com/docs/redis/sdks/ts/troubleshooting (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/redis-js/releases (release notes for 1.40.0 and 1.41.0, checked 2026-11-14)

## Related

- [Connection & Authentication](./connection-auth.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [Deployment Environments](./deployment.md)
- [Python SDK Overview](./py-sdk-overview.md)
