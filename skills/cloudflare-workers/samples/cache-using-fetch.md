---
source: https://developers.cloudflare.com/workers/examples/cache-using-fetch/
---

# Cache using fetch

Control caching of an origin fetch with `cf` options (TTL, cache everything, custom cache key) and set browser cache headers.

Adapted (not in the official docs): requests with `Authorization` / `Cookie` bypass the shared cache, `cacheTtl` is not forced, and the browser `Cache-Control` is set only on OK responses without `Set-Cookie` and without origin `private` / `no-store`; see Notes.

```js
export default {
	async fetch(request) {
		// cacheEverything would otherwise store personalised responses for everyone
		if (request.headers.has("Authorization") || request.headers.has("Cookie")) {
			return fetch(request);
		}

		const url = new URL(request.url);
		// Only use the path for the cache key, removing query strings
		// and always store using HTTPS, for example, https://www.example.com/file-uri-here
		const someCustomKey = `https://${url.hostname}${url.pathname}`;
		let response = await fetch(request, {
			cf: {
				// cacheEverything caches regardless of content type. No cacheTtl is
				// forced, so the origin's Cache-Control (including private / no-store)
				// still decides how long, or whether, the edge stores the response.
				cacheEverything: true,
				//Enterprise only feature, see Cache API for other plans
				cacheKey: someCustomKey,
			},
		});
		// Reconstruct the Response object to make its headers mutable.
		response = new Response(response.body, response);
		// Set cache control headers to cache on browser for 25 minutes, but only
		// for successful, cookie-free responses the origin did not mark private / no-store
		const cc = response.headers.get("Cache-Control") ?? "";
		if (
			response.ok &&
			!response.headers.has("Set-Cookie") &&
			!/\b(private|no-store)\b/i.test(cc)
		) {
			response.headers.set("Cache-Control", "max-age=1500");
		}
		return response;
	},
};
```

## Notes

- Adapted from the official docs: `cacheEverything: true` with a URL-only `cacheKey` would store and serve user-specific responses to other visitors; this version bypasses caching for requests carrying `Authorization` or `Cookie`. Remove the guard only for fully public content. The official code also sets `Cache-Control: max-age=1500` on every response, including errors and `Set-Cookie` responses; here it is applied only to OK responses without `Set-Cookie` and whose origin `Cache-Control` is not `private` / `no-store` (same rule as [cache-api.md](./cache-api.md)).
- Adapted from the official docs: the official code sets `cacheTtl: 5`, which forces edge caching for 5 seconds regardless of origin headers and so would store responses the origin marked `private` / `no-store`. It is removed here so the origin's `Cache-Control` governs the edge. For explicitly public paths only, `cf.cacheTtl` (or `cf.cacheTtlByStatus`) can be added back.
- The custom key drops the query string, so URLs differing only by query share one cached entry; use it only when the query does not change the content.
- `cacheKey` is an Enterprise-only option; on other plans use the Cache API ([cache-api.md](./cache-api.md)).
- `cf` is a Cloudflare-specific extension to `RequestInit`; it is ignored outside the Workers runtime.
