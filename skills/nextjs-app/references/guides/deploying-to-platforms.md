# Deploying Next.js to Different Platforms

Guide for choosing a deployment target: what platform capabilities each Next.js feature requires and how to configure a deployment via the Adapter API.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // adapterPath configures a platform-specific build adapter
  adapterPath: require.resolve('./my-adapter'),
}

export default nextConfig
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Minimum requirement | Node.js server | A single `next start` process handles every Next.js feature correctly (Server Components, ISR, PPR, Cache Components, Server Actions, Proxy, `after()`) |
| Functional fidelity | concept | Every Next.js feature works correctly; binary pass/fail per the adapter test suite |
| Performance fidelity | concept | Features achieve optimal performance (e.g. PPR shell at CDN latency); a spectrum, not binary |
| Streaming Required | feature matrix column | Platform must not buffer responses; needed for Server Components, PPR, Cache Components, Server Actions |
| Shared Cache Recommended | feature matrix column | Multiple instances coordinate cache/tag invalidation via `cacheHandler` (ISR) or `cacheHandlers` (`'use cache'`) |
| Verified adapter | classification | Open source + runs the full compatibility test suite; listed under the Next.js GitHub organization |

## Notes

- The adapter API (`adapterPath`) plus `cacheHandler`/`cacheHandlers` form the complete platform integration surface; `cacheHandler` (singular) covers ISR/route handlers/`fetch`/`unstable_cache`/image optimization, `cacheHandlers` (plural) configures `'use cache'` backends.
- Without shared cache, each instance maintains its own cache independently — features still work per-instance, but revalidation events don't propagate across instances.
- CDN infrastructure primitives (edge compute, KV/tags, blob storage, PPR resuming) are available building blocks, not finished integrations; most community adapters deploy as a Docker container or Node.js server without them.
- Anyone can build an adapter using the public API with no special access required; Vercel's own adapter uses the same public API as every other adapter.

## Related

- [Self-Hosting](./self-hosting.md)
- [Partial Prerendering (PPR) Platform Guide](./ppr-platform-guide.md)
- [How Revalidation Works](./how-revalidation-works.md)
