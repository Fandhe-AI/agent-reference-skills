---
source: https://developers.cloudflare.com/workers/examples/cache-api/
---

# Using the Cache API

Store and reuse responses in Cloudflare's cache with `caches.default`.

```js
export default {
	async fetch(request, env, ctx) {
		const cacheUrl = new URL(request.url);

		// Construct the cache key from the cache URL
		const cacheKey = new Request(cacheUrl.toString(), request);
		const cache = caches.default;

		// Check whether the value is already available in the cache
		// if not, you will need to fetch it from origin, and store it in the cache
		let response = await cache.match(cacheKey);

		if (!response) {
			console.log(
				`Response for request url: ${request.url} not present in cache. Fetching and caching request.`,
			);
			// If not in cache, get it from origin
			response = await fetch(request);

			// Must use Response constructor to inherit all of response's fields
			response = new Response(response.body, response);

			// Cache API respects Cache-Control headers. Setting s-maxage to 10
			// will limit the response to be in cache for 10 seconds max

			// Any changes made to the response here will be reflected in the cached value
			response.headers.append("Cache-Control", "s-maxage=10");

			ctx.waitUntil(cache.put(cacheKey, response.clone()));
		} else {
			console.log(`Cache hit for: ${request.url}.`);
		}
		return response;
	},
};
```

## Notes

- `cache.put` is wrapped in `ctx.waitUntil` so the write finishes after the response is returned; pass `response.clone()` because the body can be read once.
- The Cache API is per data center and does not purge globally; see `../references/web-apis/cache.md`.
- Only GET requests are cacheable this way; see [cache-post-request.md](./cache-post-request.md) for the POST workaround.
