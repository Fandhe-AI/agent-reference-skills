# Deployment Environments

Platform-specific configuration for `@upstash/redis` across Node.js, Cloudflare Workers, Fastly, and Deno/edge runtimes.

## Signature / Usage

```ts
// Node.js / Vercel / AWS Lambda / Netlify
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

// Node.js v17 and earlier — requires fetch polyfill
import "isomorphic-fetch"
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

// Cloudflare Workers (module syntax — pass env object)
export default {
  fetch(request, env) {
    const redis = Redis.fromEnv(env)
    // ...
  }
}

// Fastly Compute@Edge — requires explicit backend name
const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
  backend: "upstash-backend",  // defined in fastly.toml
})

// Deno / Netlify Edge
import { Redis } from "https://deno.land/x/upstash_redis/mod.ts"
const redis = Redis.fromEnv()
```

## Notes

- **Node.js v18+**: native `fetch` is available; no polyfill needed
- **Node.js v17 and earlier**: install `isomorphic-fetch` and import it before using the SDK
- **Cloudflare Workers**: use `wrangler secret put` or the dashboard to set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`; for module workers, pass `env` to `Redis.fromEnv(env)`
- **Fastly**: configure a backend named entry in `fastly.toml` pointing to your Upstash endpoint
- Initialize the Redis client outside the request handler to reuse across invocations (serverless warm start optimization)

## Related

- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Connection & Authentication](./connection-auth.md)
