---
source: https://developers.cloudflare.com/workers/cache/configuration/
---

# Workers Cache configuration

Workers Cache is configured per Worker in the Wrangler file (`cache` block, per-entrypoint `exports` map) and through the `Cache-Control`, `cdn-cache-control`, `cloudflare-cdn-cache-control`, and `Cache-Tag` headers your Worker returns.

## Signature / Usage

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"cache": {
		"enabled": true,
		"cross_version_cache": true,
	},
	"exports": {
		// Opt the default entrypoint out of caching.
		"default": { "type": "worker", "cache": { "enabled": false } },
		// Keep caching on for the Admin entrypoint.
		"Admin": { "type": "worker", "cache": { "enabled": true } },
	},
}
```

Bypass the callee's cache for one call (same account):

```js
const response = await env.OTHER_WORKER.fetch(request, {
	cache: "no-store",
});
```

Override `Cache-Control` from the calling Worker through a `ctx.exports` loopback:

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

// Cached entrypoint. It does not set Cache-Control itself.
export class Backend extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		return new Response("Hello from the backend", {
			headers: { "Content-Type": "text/html" },
		});
	}
}

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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cache.enabled` | boolean (required) | Turns caching on/off for the Worker (default for every entrypoint). Requires Wrangler 4.69.0+. |
| `cache.cross_version_cache` | boolean | `true` drops the Worker version from the cache key so responses are shared across versions. Requires Wrangler 4.107.0+. Only effective when caching is enabled. |
| `exports.<name>` | `{ "type": "worker", "cache": { "enabled": boolean } }` | Per-entrypoint override; `"default"` is the default export. Unlisted entrypoints inherit the top-level value. Requires Wrangler 4.107.0+. |
| `cf.cacheControl` | string | Calling entrypoint supplies the `Cache-Control` for a cached callee (same-account `ctx.exports` loopback only). |

Default TTLs when the response has no `Cache-Control` or `Expires` (RFC 9111 heuristic freshness; other statuses are not cached):

| Status | Default TTL |
|--------|-------------|
| 200, 203, 204 | 7200 s (2 hours) |
| 300, 301 | 1200 s (20 minutes) |
| 404, 410 | 180 s (3 minutes) |
| 405, 414, 501 | 60 s (1 minute) |

Header precedence (most specific wins): `cloudflare-cdn-cache-control` (consumed and stripped), `cdn-cache-control` (passed to downstream CDNs), `Cache-Control`.

## Notes

- Only `enabled` and `cross_version_cache` are accepted in the `cache` block; other fields are reserved and may fail validation in future Wrangler versions. The `cache` setting is part of the Worker version (rolls back with it) and can be overridden per `env` (for example, enable only in `env.production`).
- Disabling caching does not purge existing entries; they become usable again if re-enabled within TTL. Purge after disabling if needed.
- Gateway entrypoints: disable caching on the entrypoint in `exports` instead of returning `Cache-Control: no-store`; otherwise each request still pays the tiered-cache round trip.
- Default behavior keys by Worker version, so hit rate resets on every deploy. With `cross_version_cache`, deployments no longer invalidate; purge after deploy or tag responses by version.
- Cache Deception Armor runs only for heuristic-freshness responses with `Content-Type` `text/*` or `application/*`: if the request URI extension maps to a MIME type that does not match, the response is not cached (`BYPASS`). Any explicit `Cache-Control` skips the check.
- `stale-while-revalidate` and `stale-if-error` are disabled when the response has `s-maxage`, `must-revalidate`, or `proxy-revalidate` (RFC 9111 4.2.4); use `max-age`. `stale-if-error` serves the last cached response (`Cf-Cache-Status: STALE`) when refreshing fails; without an explicit value (and none of those directives) stale is served on Worker error indefinitely, so set `stale-if-error=0` to surface errors. A true miss cannot benefit.
- `max-age=0, stale-while-revalidate=<large>` means "always serve from cache" but the Worker still runs once per request to revalidate.
- Automatic bypass: `Set-Cookie` on the response (unless `private="set-cookie"` / `no-cache="set-cookie"`), `Authorization` on the request (stored only with `public`, `must-revalidate`, or `s-maxage`), and `private` / `no-store`. `no-cache` is not a bypass: the entry is stored but always revalidated (`REVALIDATED` on 304, `EXPIRED` on fresh 200; with `stale-while-revalidate=N`, `UPDATING`). Statuses `520`-`526` are never cached.
- `Cache-Tag`: comma-separated; printable ASCII (0x21-0x7E), max 1024 chars per tag, up to 1000 tags, case-insensitive matching; invalid tags are silently dropped. The header is stripped before reaching clients.
- `Range`: Cloudflare strips `Range` before invoking the Worker, caches the full `200`, and serves `206`/`416` itself. A Worker-generated `206` is not cached.
- `Accept-Encoding`: whatever `Content-Encoding` the Worker sets is stored. Either pick one canonical encoding or `Vary: Accept-Encoding` (values compared verbatim; normalize in a gateway).
- `cf.cacheKey` and `cf.cacheControl` are dropped across account boundaries and have no effect on eyeball requests.

## Related

- [workers-cache.md](./workers-cache.md)
- [workers-cache-keys.md](./workers-cache-keys.md)
- [workers-cache-purge.md](./workers-cache-purge.md)
- [workers-cache-debugging.md](./workers-cache-debugging.md)
