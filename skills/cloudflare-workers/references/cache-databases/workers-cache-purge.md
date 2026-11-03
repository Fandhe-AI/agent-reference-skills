---
source: https://developers.cloudflare.com/workers/cache/purge/
---

# Purge and invalidate Workers Cache

Delete cached responses with `ctx.cache.purge()` or mark them stale with `ctx.cache.invalidate()`, by tag, path prefix, or everything.

## Signature / Usage

```ts
import { cache } from "cloudflare:workers";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Using the module import — no need to thread ctx through helper functions.
		await cache.purge({ tags: ["blog-posts"] });

		// Equivalent, using ctx directly:
		// await ctx.cache.purge({ tags: ["blog-posts"] });

		return new Response("Purged", { status: 200 });
	},
} satisfies ExportedHandler;
```

Check the result:

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const result = await ctx.cache.purge({ tags: ["blog-posts"] });

		if (!result.success) {
			console.error("Cache purge failed", result.errors);
			return new Response("Purge failed", { status: 500 });
		}

		return new Response("Purged", { status: 200 });
	},
} satisfies ExportedHandler;
```

Combined call (fields are unioned):

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Combined call: purges everything tagged "blog-posts" AND
		// everything under /blog/ in a single round-trip.
		await ctx.cache.purge({
			tags: ["blog-posts"],
			pathPrefixes: ["/blog/"],
		});

		return new Response("Purged", { status: 200 });
	},
} satisfies ExportedHandler;
```

Purge everything:

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		await ctx.cache.purge({ purgeEverything: true });

		return new Response("Purged", { status: 200 });
	},
} satisfies ExportedHandler;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tags` | string[] | Purge every response tagged with one of the values via `Cache-Tag`. Per entrypoint. |
| `pathPrefixes` | string[] | Purge responses whose request path starts with a prefix. Paths only (no scheme, host, query, fragment); leading slash optional. Per entrypoint. |
| `purgeEverything` | boolean | Purge everything stored by the calling entrypoint. Exclusive: do not combine with `tags` / `pathPrefixes`. |

Result: `{ success, errors }`, where each error has a numeric `code` and a `message`.

## Notes

- `invalidate()` takes the same options, scoping, and result as `purge()`. Matching entries are kept but marked stale; the next request revalidates with `If-None-Match` / `If-Modified-Since`. A `304` keeps the body (`Cf-Cache-Status: REVALIDATED`); a `200` replaces it. It saves work only if the Worker emits `ETag` / `Last-Modified` and answers `304`.
- Purge and invalidate are scoped to the Worker and, within it, to the entrypoint that calls them. Tags and prefixes in other entrypoints are unaffected; call from each entrypoint (or from a method on the cached entrypoint, as in the leaderboard example). Zone-level purges (dashboard, API, Terraform) do not affect Workers Cache.
- No "purge by URL" or "purge by host" mode. Use a single-element `pathPrefixes` (may over-purge paths that extend it) or a tag for exact semantics.
- Tags: printable ASCII, max 1024 chars each, up to 1000 per response, case-insensitive; invalid tags silently dropped. Hierarchical tags such as `_path:/blog/2025/` let one purge cover a subtree.
- Version-specific purging applies only with `cache.cross_version_cache` enabled: add the version metadata binding (`"version_metadata": { "binding": "CF_VERSION_METADATA" }`), emit `Cache-Tag: ...,v:${env.CF_VERSION_METADATA.id}`, then purge `v:<id>` on rollback.
- Purges use Instant Purge infrastructure with the same propagation guarantees as zone purges, but rate limits always follow the Free tier regardless of plan; when rate-limited `success` is `false`.
- Use `purgeEverything` sparingly: all subsequent requests miss until refilled.

## Related

- [workers-cache.md](./workers-cache.md)
- [workers-cache-configuration.md](./workers-cache-configuration.md)
- [workers-cache-keys.md](./workers-cache-keys.md)
- [workers-cache-examples.md](./workers-cache-examples.md)
