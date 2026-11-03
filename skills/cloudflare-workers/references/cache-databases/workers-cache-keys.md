---
source: https://developers.cloudflare.com/workers/cache/cache-keys/
---

# Workers Cache keys

How Workers Cache builds the cache key, and how to control it with `ctx.props`, `cf.cacheKey`, and version settings.

## Signature / Usage

Override the URL component of the key from a gateway entrypoint calling a cached entrypoint through `ctx.exports`:

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// Strip a tracking parameter so that requests differing only by
		// `utm_source` resolve to the same cached entry.
		url.searchParams.delete("utm_source");

		return ctx.exports.Backend.fetch(request, {
			cf: { cacheKey: url.pathname + url.search },
		});
	},
} satisfies ExportedHandler<Env>;
```

Wrangler configuration (gateway uncached, `Backend` cached):

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"cache": { "enabled": true },
	"exports": {
		"default": { "type": "worker", "cache": { "enabled": false } },
		"Backend": { "type": "worker", "cache": { "enabled": true } },
	},
}
```

Per-caller isolation with `ctx.props` (part of the key automatically):

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

interface Props {
	userId: string;
}

export default class Backend extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		// ctx.props.userId is set by the caller (for example, an auth gateway).
		// Because it is part of the cache key, User A and User B requesting the
		// same URL get separate cache entries — there is no way for one to
		// see the other's response.
		const { userId } = this.ctx.props;
		const data = { userId, timestamp: Date.now() };

		return new Response(JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=300",
			},
		});
	}
}
```

## Notes

- Key components: target entrypoint; path and query string (order and trailing slashes matter); Worker version (default; disable with `cache.cross_version_cache`); `ctx.props` for service-binding/RPC invocations.
- Anti-poisoning additions: the `x-http-method-override`, `x-http-method`, `x-method-override` headers; `x-forwarded-host`, `x-host`, `x-forwarded-scheme` (unless `http`/`https`), `x-original-url`, `x-rewrite-url`, `forwarded`; and the `Cloudflare-Workers-Version-Key` request header (not set automatically; only if a caller adds it).
- Not in the key: HTTP method (`GET` and `HEAD` share an entry; a cold `HEAD` is converted to `GET`), host, request body, and other headers (`User-Agent`, `Accept-Language`, `Cookie`, `Authorization`). Use `Vary` for content negotiation.
- The cache belongs to the Worker, not a domain: `api.example.com`, `api.example.net`, `workers.dev`, and service bindings share one cache. For per-hostname/tenant content, pass the tenant identifier via `ctx.props` from a gateway.
- Service binding `fetch()` URLs: the hostname is a placeholder and ignored; only path and query string (plus entrypoint and `ctx.props`) count.
- Multi-tenant caution: authentication via a custom header is not part of the key, so callers can receive each other's responses; move it into `ctx.props` (or rely on automatic bypass for `Set-Cookie` / `Authorization`).
- Deployments: a new version starts cold (default). Hit rate resets on deploy. With `cross_version_cache`, either tag responses with the version ID and purge the tag on rollback, or call `ctx.cache.purge({ purgeEverything: true })` after deploy.
- A custom `cf.cacheKey` replaces only the path and query string; entrypoint and `ctx.props` remain. Same URL with different `cacheKey` gives separate entries; different URLs with the same `cacheKey` share one. Empty or omitted falls back to the URL. Honored only for same-account calls and ignored for eyeball requests.
- The computed key cannot be inspected. Use `Cf-Cache-Status` and cache-hit information in Workers observability.

## Related

- [workers-cache.md](./workers-cache.md)
- [workers-cache-configuration.md](./workers-cache-configuration.md)
- [workers-cache-purge.md](./workers-cache-purge.md)
- [workers-cache-debugging.md](./workers-cache-debugging.md)
