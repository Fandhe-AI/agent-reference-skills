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

// Cloudflare Workers (module worker — pass env object)
import { Redis } from "@upstash/redis/cloudflare"

export default {
  async fetch(request: Request, env: Bindings) {
    const redis = Redis.fromEnv(env)
    // ...
  }
}

// Fastly Compute@Edge — requires explicit backend name
import { Redis } from "@upstash/redis/fastly"

const redis = new Redis({
  url: <UPSTASH_REDIS_REST_URL>,
  token: <UPSTASH_REDIS_REST_TOKEN>,
  backend: <BACKEND_NAME>,  // configured in fastly.toml
})

// Deno / Netlify Edge
import { Redis } from "npm:@upstash/redis"
const redis = Redis.fromEnv()
```

## Notes

- **Node.js v18+**: native `fetch` is available; no polyfill needed
- **Node.js v17 and earlier**: install `isomorphic-fetch` and import it before using the SDK
- **Cloudflare Workers**: use `wrangler secret put` or the dashboard to set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`; for module workers, pass `env` to `Redis.fromEnv(env)`
- **Fastly**: configure a backend named entry in `fastly.toml` pointing to your Upstash endpoint
- Initialize the Redis client outside the request handler to reuse across invocations (serverless warm start optimization)
- Platform entry points: `@upstash/redis` (Node.js / browser / Deno via `npm:`), `@upstash/redis/cloudflare`, `@upstash/redis/fastly`. Deno and Netlify Edge use the `npm:@upstash/redis` import (the older `deno.land/x/upstash_redis` URL is no longer shown in the docs)
- Fastly: until the Fastly API stabilizes the docs recommend creating the instance manually with `new Redis({ url, token, backend })`
- Source: https://upstash.com/docs/redis/sdks/ts/deployment (fetched 2026-11-14; no version pin on the site)

## Related

- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Connection & Authentication](./connection-auth.md)
