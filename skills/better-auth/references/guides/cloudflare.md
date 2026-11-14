# Cloudflare Guide

What Better Auth needs on Cloudflare Workers: Node.js compatibility, environment variables, client IP for rate limiting, background tasks, database connections, and the limits of Workers KV as secondary storage. Set up Better Auth with the installation guide first.

## Signature / Usage

### Node.js Compatibility

Better Auth uses Node.js APIs such as `node:crypto` and `AsyncLocalStorage`. For a compatibility date earlier than `2026-08-04`, add the `nodejs_compat` flag to your Wrangler configuration:

```jsonc
// wrangler.jsonc
{
  "compatibility_flags": ["nodejs_compat"]
}
```

### Environment Variables

Better Auth reads environment variables from `process.env`. Set the secret with Wrangler, and put local values in `.dev.vars` or `.env`:

```bash
npx wrangler secret put BETTER_AUTH_SECRET
```

For a compatibility date earlier than `2025-04-01`, pass the values from `env` instead:

```ts
// auth.ts
import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
});
```

### Client IP

Read the client address from `CF-Connecting-IP`:

```ts
// auth.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"],
    },
  },
});
```

### Background Tasks

To run non-critical work after the response is sent, pass `waitUntil` from `cloudflare:workers` as `advanced.backgroundTasks.handler` (see reference/options.md).

## Notes

- Cloudflare Workers enable Node.js compatibility by default from compatibility date `2026-08-04`
- With Node.js compatibility, Workers add variables and secrets to `process.env` from compatibility date `2025-04-01`
- Requests to a Worker don't carry the client address in `X-Forwarded-For`, which Better Auth reads by default. Without it, rate limiting falls back to one shared bucket per path
- Workers don't allow I/O across requests, so an auth instance at module scope cannot hold a client that keeps connections open, such as a `pg` or `mysql2` pool, even through Hyperdrive. Use a driver that queries over HTTP instead (see Cloudflare's Hyperdrive connection-lifecycle guidance)
- Cloudflare Workers KV is eventually consistent, cannot expire a key sooner than 60 seconds, and has no atomic operations, so it cannot meet the `secondaryStorage` contract (see concepts/database.md). Use a store that can, such as Redis
- Source: https://www.better-auth.com/docs/guides/cloudflare (better-auth v1.7.23 docs)

## Related

- [Hono Integration](../integrations/hono.md)
- [Installation](../getting-started/installation.md)
