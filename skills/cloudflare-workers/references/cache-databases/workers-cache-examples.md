---
source: https://developers.cloudflare.com/workers/cache/examples/
---

# Workers Cache examples

Patterns that combine Workers Cache with authentication, request normalization, Durable Objects, and third-party origins using a gateway entrypoint plus cached inner entrypoints.

## Signature / Usage

Shared Wrangler configuration: disable caching on the gateway (default) entrypoint and enable it on the inner entrypoint.

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
		"CachedAPI": { "type": "worker", "cache": { "enabled": true } },
	},
}
```

Cache authenticated responses (strip `Authorization` before forwarding):

Adapted (not in the official docs): `authenticate()` fails closed when `env.API_TOKEN` is unset or the header is malformed; the gateway copies the cached response and sets `Cache-Control: private, no-store` on the outward response so shared proxies and browsers cannot reuse it without authentication; see Notes.

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

interface Env {
	API_TOKEN: string;
}

export class CachedAPI extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		const data = await loadExpensiveData(request);

		return new Response(JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
				// All authenticated callers see this same response on a hit.
				"Cache-Control": "public, max-age=60",
			},
		});
	}
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (!(await authenticate(request, env))) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Strip the Authorization header before forwarding. Otherwise the
		// request would trigger Cloudflare's automatic bypass for
		// authenticated requests, and nothing would ever be cached.
		const forwarded = new Request(request);
		forwarded.headers.delete("Authorization");

		const cached = await ctx.exports.CachedAPI.fetch(forwarded);

		// The inner response is public, max-age=60 so the cache layer can
		// store it. Do not let it escape to shared caches or browsers.
		const res = new Response(cached.body, cached);
		res.headers.set("Cache-Control", "private, no-store");
		return res;
	},
} satisfies ExportedHandler<Env>;

// Fail closed: reject when API_TOKEN is not configured or the header is malformed.
async function authenticate(request: Request, env: Env): Promise<boolean> {
	if (!env.API_TOKEN) return false;
	const match = /^Bearer\s+(\S+)$/.exec(request.headers.get("Authorization") ?? "");
	return match !== null && match[1] === env.API_TOKEN;
}

async function loadExpensiveData(request: Request): Promise<unknown> {
	// Replace with your real data source — D1, KV, an origin, and so on.
	return { timestamp: Date.now() };
}
```

Per-user partitioning: pass `props` so the user ID becomes part of the key.

Adapted (not in the official docs): `props` is supplied when the entrypoint binding is created (`ctx.exports.CachedAPI({ props })`), not as a `fetch()` option, and the user ID comes from a separate `authenticateUser()` helper returning `string | null` (the earlier `authenticate()` returns a boolean) and failing closed when `env.API_TOKEN` is unset or the header is malformed; see Notes. The gateway also copies the cached response and sets `Cache-Control: private, no-store` on the outward response.

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const userId = await authenticateUser(request, env);
		if (!userId) {
			return new Response("Unauthorized", { status: 401 });
		}

		const forwarded = new Request(request);
		forwarded.headers.delete("Authorization");

		// The gateway's cache is disabled, so it runs on every request.
		// Pass the authenticated userId to the cached entrypoint via props —
		// this becomes part of the cache key. The callee reads it as
		// this.ctx.props.userId.
		const cached = await ctx.exports
			.CachedAPI({ props: { userId } })
			.fetch(forwarded);

		// Per-user content: keep it out of shared proxies and browser caches.
		const res = new Response(cached.body, cached);
		res.headers.set("Cache-Control", "private, no-store");
		return res;
	},
} satisfies ExportedHandler<Env>;

// Replace with real verification: return the user ID that the credential
// verifiably belongs to, or null. Never take it from unverified input.
// Fail closed: null when API_TOKEN is unset/empty or the header is not a
// well-formed "Bearer <token>". "user-123" stands in for the user ID your
// real verification (for example a JWT or session lookup) returns.
async function authenticateUser(request: Request, env: Env): Promise<string | null> {
	if (!env.API_TOKEN) return null;
	const match = /^Bearer\s+(\S+)$/.exec(request.headers.get("Authorization") ?? "");
	if (match === null || match[1] !== env.API_TOKEN) return null;
	return "user-123";
}
```

Cache an origin you do not control (overlay your own `Cache-Control`):

Adapted (not in the official docs): the upstream URL is built from the fixed `ORIGIN` host with `pathname`/`search` assigned separately, and only an allowlist of non-credential headers is forwarded, so the shared cached response is never personalized; upstream `CDN-Cache-Control` / `Cloudflare-CDN-Cache-Control` are removed so the TTL override applies; see Notes.

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

const ORIGIN = "https://api.example.com";

// Headers safe to forward. Credentials (Authorization, Cookie) are never
// forwarded, so the cached response is identical for every caller.
const FORWARDED_HEADERS = ["accept", "accept-language", "user-agent"];

// Cached entrypoint. Fetches the upstream origin and overlays your own
// Cache-Control on the response. Workers Caching sits in front of this,
// so on a hit the upstream origin is never contacted.
export class CachedOrigin extends WorkerEntrypoint {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		// Fixed host: never resolve the incoming pathname as a relative URL
		// (a path like //attacker.example/x would change the host).
		const upstream = new URL(ORIGIN);
		upstream.pathname = url.pathname;
		upstream.search = url.search;

		const upstreamHeaders = new Headers();
		for (const name of FORWARDED_HEADERS) {
			const value = request.headers.get(name);
			if (value !== null) upstreamHeaders.set(name, value);
		}

		// Forward the request to the third-party origin. The origin's own
		// caching headers (or lack of them) are about to be overwritten —
		// they apply to the origin's relationship with the public internet,
		// not to your cache layer.
		const response = await fetch(upstream, {
			method: request.method,
			headers: upstreamHeaders,
			body: request.body,
		});

		// Replace the origin's Cache-Control with your own. This is the
		// whole point of the pattern: you decide how long Workers Caching
		// stores this response, regardless of what the origin says.
		const headers = new Headers(response.headers);
		// Higher-precedence upstream headers would otherwise override the TTL below.
		headers.delete("Cloudflare-CDN-Cache-Control");
		headers.delete("CDN-Cache-Control");
		headers.set("Cache-Control", "public, max-age=300");
		headers.set("Cache-Tag", "origin:example");

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	}
}

// Default entrypoint. Forwards every request through the cached entrypoint.
export default {
	async fetch(request, env, ctx): Promise<Response> {
		// The gateway's cache is disabled (see the Wrangler configuration
		// above), so it runs on every request and forwards to the cached
		// CachedOrigin entrypoint.
		return ctx.exports.CachedOrigin.fetch(request);
	},
} satisfies ExportedHandler;
```

## Notes

- Two rules: disable caching on the gateway entrypoint (not `Cache-Control: no-store`, which still pays the tiered-cache round trip), and strip request headers that force a bypass (such as `Authorization`) before invoking the cached entrypoint.
- Only `fetch()` calls go through the cache; custom RPC methods bypass it. Expose cacheable work as a `fetch` handler on its own entrypoint.
- Sharing one cached response across all authenticated callers is correct only when the response is identical for all of them; otherwise partition with `ctx.props`.
- Normalize `Accept-Encoding` for `Vary`: Cloudflare typically rewrites `Accept-Encoding` to a canonical value before the Worker runs; the original is in `request.cf.clientAcceptEncoding`. A gateway restores it (`forwarded.headers.set("Accept-Encoding", original)`) before calling the cached entrypoint that sets `Vary: Accept-Encoding`. All variants must share the same `Cache-Tag`.
- Cache Durable Object responses: wrap the Durable Object in a cached `WorkerEntrypoint` (for example `CachedLeaderboard`) that forwards to the stub and sets `Cache-Control: public, max-age=30` and `Cache-Tag: leaderboard`. After writes, the gateway calls an `invalidate()` method on that entrypoint (`await this.ctx.cache.purge({ tags: ["leaderboard"] })`); the purge must run inside the cached entrypoint because purges are scoped to the calling entrypoint. For one Durable Object per tenant, pass the tenant ID via `ctx.props`.
- In the first (authenticated) snippet `authenticate()` returns a boolean; the per-user snippet reuses the name but treats the result as a user ID (`const userId = await authenticate(...)`), so there it must return the verified user ID (or a falsy value). Derive `props.userId` only from verified credentials, never from client-supplied headers or query parameters.
- Corrected from the official docs: the per-user snippet assigns `userId` from `authenticate()`, which in the first snippet returns a boolean (so `props.userId` would be `true` for every caller); it uses an `authenticateUser()` helper returning a verified user ID or `null` instead.
- Corrected from the official docs: the per-user snippet shows `ctx.exports.CachedAPI.fetch(forwarded, { props: { userId } })`, but `fetch()` takes no `props` option, so `this.ctx.props` would stay empty and users would share one cache entry. Props are set when creating the entrypoint binding: `ctx.exports.CachedAPI({ props: { userId } }).fetch(forwarded)` (see `handlers-context/context.md`).
- Adapted from the official docs: the origin snippet originally resolved `new URL(url.pathname + url.search, ORIGIN)` (a pathname such as `//attacker.example/x` changes the host and leaks forwarded credentials) and forwarded all incoming headers (including `Authorization`, `Cookie`, `Host`) and cached the response for every caller. It now assigns `pathname`/`search` onto `new URL(ORIGIN)` and forwards only an allowlist of non-credential headers. If the origin needs credentials, bypass this cached entrypoint for those requests or partition by verified user via `ctx.props`.
- Adapted from the official docs: the authenticated and per-user snippets originally returned the inner entrypoint's `Cache-Control: public, max-age=...` response straight to the client. After the gateway authenticates the caller, that header would let shared proxies and browsers reuse the response for unauthenticated or different users, so the gateway now copies the response (`new Response(cached.body, cached)`) and sets `Cache-Control: private, no-store` on the outward response. The inner `public` header still governs Workers Cache.
- Adapted from the official docs: `authenticate()` and `authenticateUser()` originally compared `Authorization` (with an optional `Bearer` prefix stripped) to `env.API_TOKEN`, so an unset secret and a missing header (`undefined === undefined`) would authenticate every caller. They now fail closed: reject when `env.API_TOKEN` is unset or empty, and require a well-formed `Authorization: Bearer <token>` header. `"user-123"` is a placeholder for the verified user ID.
- Adapted from the official docs: the origin snippet now also deletes `Cloudflare-CDN-Cache-Control` and `CDN-Cache-Control` before setting `Cache-Control`, because those upstream headers take precedence over `Cache-Control` (see workers-cache-configuration.md) and would otherwise defeat the TTL override.
- Origin pattern extensions: per-path TTL and tags, per-user `ctx.props`, `stale-while-revalidate` for slow or flaky origins, targeted `ctx.cache.purge({ tags: [...] })` on webhooks.
- The docs describe the composition as "four lenses" while the page contains five example sections (authenticated, per-user, `Accept-Encoding`, Durable Object, origin); the summary table lists four rows.

## Related

- [workers-cache.md](./workers-cache.md)
- [workers-cache-configuration.md](./workers-cache-configuration.md)
- [workers-cache-keys.md](./workers-cache-keys.md)
- [workers-cache-purge.md](./workers-cache-purge.md)
