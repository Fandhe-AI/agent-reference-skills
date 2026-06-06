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
| `responseEncoding` | `false` | Disable base64 response encoding if values appear hashed |
| `enableTelemetry` | `boolean` | Anonymous telemetry collection (default: `true`); also controllable via `UPSTASH_DISABLE_TELEMETRY` env var |

## Notes

- Install: `npm install @upstash/redis` (also supports yarn, pnpm, and Deno)
- `Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` automatically
- On Node.js v17 and earlier, `fetch` is not natively available — import `isomorphic-fetch` as a polyfill
- Large numbers (above `2^53 - 1`) are returned as strings due to JavaScript's number limit
- Initialize the client outside request handlers in serverless environments to maximize reuse

## Related

- [Connection & Authentication](./connection-auth.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [Deployment Environments](./deployment.md)
- [Python SDK Overview](./py-sdk-overview.md)
