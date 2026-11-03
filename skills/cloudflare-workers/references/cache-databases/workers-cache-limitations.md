---
source: https://developers.cloudflare.com/workers/cache/limitations/
---

# Workers Cache limitations

Unsupported scenarios, limits, and how Workers Cache relates to zone caching, the Cache API, and `fetch()` subrequest caching.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/cache/configuration/#override-cache-control-from-the-calling-worker (the supported `cf.cacheControl` form on a `ctx.exports` call):

```ts
// Gateway entrypoint. Caches the Backend's response for this call for
// 5 minutes, without the Backend needing to set Cache-Control itself.
export default {
	async fetch(request, env, ctx): Promise<Response> {
		return ctx.exports.Backend.fetch(request, {
			cf: { cacheControl: "public, max-age=300" },
		});
	},
} satisfies ExportedHandler<Env>;
```

Per-property support of `cf` options on outgoing `fetch()` versus `ctx.exports.<Entrypoint>.fetch()`:

| `cf` property | On outgoing `fetch()` to your origin | On `ctx.exports.<Entrypoint>.fetch()` |
| --- | --- | --- |
| `cf.cacheKey` | Supported | Supported |
| `cf.cacheControl` | Supported | Supported |
| `cf.cacheTtl` | Supported | Not supported; return `Cache-Control: max-age=N` (or `s-maxage=N`) or override with `cf.cacheControl` |
| `cf.cacheEverything` | Supported | Not supported; cacheability comes from the response's `Cache-Control` |

## Notes

- Not cached: methods other than `GET` / `HEAD`; WebSocket upgrades; custom RPC methods (only `fetch()` on a `WorkerEntrypoint` goes through the cache); `520`-`526`; Worker-generated `206`; `scheduled`, `queue`, Workflows, Tail Workers, and Durable Object invocations (wrap a Durable Object behind a cached entrypoint instead).
- No purge by host (host is not in the key); use tag, path prefix, or `purgeEverything`. No cache pre-warming API; use Static Assets for pre-rendered content.
- To cache non-idempotent requests, hash the body into a synthetic URL and do an internal `GET` subrequest.
- Response size limits match the zone cache, but at launch all responses are subject to the Free plan limit. `Cache-Tag` limits match the zone cache. Purge rate limits always use Free tier limits.
- Zone features that do not apply: Cache Rules / Cache Response Rules, cache key customization, cache level settings, default cached extensions, custom tiered cache topologies, and Rulesets that modify requests/responses before cache. Express the same intent with `Cache-Control`, `ctx.props`, and Worker code.
- Cache API (`caches.default`) is separate: it does not read through, does not collapse concurrent requests, and does not use tiered caching. `ctx.cache.purge()` / `invalidate()` do not affect it. Prefer Workers Cache for new Workers.
- Workers Cache is a cache in front of the Worker, separate from the cache for outgoing `fetch()` subrequests.
- Coming soon: dashboard UI to enable caching and Cache Analytics in Workers Observability.

## Related

- [workers-cache.md](./workers-cache.md)
- [workers-cache-keys.md](./workers-cache-keys.md)
- [workers-cache-purge.md](./workers-cache-purge.md)
- [../web-apis/cache.md](../web-apis/cache.md)
