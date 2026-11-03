---
source: https://developers.cloudflare.com/workers/cache/
---

# Workers Cache

Workers Cache returns cached HTTP responses from your Worker without executing Worker code. It is tiered (lower tier near the eyeball, upper tier aggregating the network), collapses concurrent requests per cache key, and is controlled by standard `Cache-Control` response headers.

## Signature / Usage

Enable in the Wrangler configuration (requires Wrangler 4.69.0 or above):

```jsonc
{
 "name": "my-worker",
 "main": "src/index.ts",
 "upload_source_maps": true,
 // Set this to today's date
 "compatibility_date": "2026-11-03",
 "cache": {
  "enabled": true,
 },
}
```

Return a cacheable response:

```ts
export default {
	async fetch(request): Promise<Response> {
		const body = JSON.stringify({
			timestamp: new Date().toISOString(),
			random: Math.random(),
		});

		return new Response(body, {
			headers: {
				"Content-Type": "application/json",
				// Cache for 1 hour; serve stale for up to 5 minutes while revalidating.
				"Cache-Control": "public, max-age=3600, stale-while-revalidate=300",
			},
		});
	},
} satisfies ExportedHandler;
```

Purge from code:

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		await ctx.cache.purge({ tags: ["blog-posts"] });
		return new Response("Purged", { status: 200 });
	},
} satisfies ExportedHandler;
```

Check `Cf-Cache-Status` (`HIT`, `MISS`, `EXPIRED`, `REVALIDATED`, `UPDATING`, `STALE`, `BYPASS`) with `curl -I`; the first request is `MISS`, the second `HIT`.

## Notes

- Workers Cache is the Worker's own cache, owned by the Worker and private to it. Zone-level controls (Cache Rules, Cache Response Rules, Page Rules, cache level, default cached extensions) have no effect on it. The cache is shared across every ingress path (routes, custom domains, `workers.dev`, service bindings) because the key does not include the host.
- Applies to any `fetch()` invocation: eyeball requests, service binding calls, and loopback calls via `ctx.exports`. Only `GET` and `HEAD` are cached (they share one entry). Custom RPC methods, WebSocket upgrades, `scheduled`, `queue`, Workflows, Tail Workers, Durable Object and Email Worker invocations bypass the cache.
- Request collapsing: concurrent misses for the same cache key (per data center) run the Worker once and stream the response to all waiting requests. Uncacheable responses (`BYPASS`, `DYNAMIC`) are not collapsed. The Cache API does not collapse.
- Tiering is automatic and independent of Smart Placement. The cache is consulted before Smart Placement; only on a miss in both tiers does Smart Placement choose where the Worker runs. The upper tier and the placement target are generally different data centers (a full miss traverses three locations).
- `Vary` is honored: one variant per distinct combination of listed request header values, compared verbatim. `Vary: *` disables caching. Variants share a purge identity, so all variants must use the same `Cache-Tag`. `Vary` is ignored for responses rewritten by Polish or Image Resizing.
- Caching between Workers: the callee's cache is consulted; the key includes the caller's `ctx.props`. The caller can set `cf.cacheKey` / `cf.cacheControl` (same account only) or `cache: "no-store"` to bypass.
- Durable Objects are never cached directly. Wrap the Durable Object behind a named `WorkerEntrypoint`, disable caching on the default (gateway) entrypoint, enable it on the wrapper, and set `Cache-Control` on the wrapper's response (see workers-cache-examples.md for the full leaderboard pattern).
- Previews cache independently of production. Workers for Platforms: each user Worker has its own isolated cache.
- Pricing: no separate charge. With caching on, every request (including normally free static asset requests and worker-to-worker invocations) is billed at the standard Workers request rate; CPU time is billed only when the Worker runs (not on `HIT`).
- Omitting `Cache-Control` does not opt out: responses are still cached with heuristic freshness (see workers-cache-configuration.md). Return `no-store` or `private` to opt out.
- This is distinct from the Cache API (`caches.default`), covered in the web-apis category.

## Related

- [workers-cache-configuration.md](./workers-cache-configuration.md)
- [workers-cache-keys.md](./workers-cache-keys.md)
- [workers-cache-purge.md](./workers-cache-purge.md)
- [workers-cache-examples.md](./workers-cache-examples.md)
- [workers-cache-debugging.md](./workers-cache-debugging.md)
- [workers-cache-limitations.md](./workers-cache-limitations.md)
- [../web-apis/cache.md](../web-apis/cache.md)
