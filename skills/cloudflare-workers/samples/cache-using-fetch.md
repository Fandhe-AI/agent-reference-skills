---
source: https://developers.cloudflare.com/workers/examples/cache-using-fetch/
---

# Cache using fetch

Control caching of an origin fetch with `cf` options (TTL, cache everything, custom cache key) and set browser cache headers.

Adapted (not in the official docs): requests with `Authorization` / `Cookie` bypass the shared cache; see Notes.

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
				// Always cache this fetch regardless of content type
				// for a max of 5 seconds before revalidating the resource
				cacheTtl: 5,
				cacheEverything: true,
				//Enterprise only feature, see Cache API for other plans
				cacheKey: someCustomKey,
			},
		});
		// Reconstruct the Response object to make its headers mutable.
		response = new Response(response.body, response);
		// Set cache control headers to cache on browser for 25 minutes
		response.headers.set("Cache-Control", "max-age=1500");
		return response;
	},
};
```

## Notes

- Adapted from the official docs: `cacheEverything: true` with a URL-only `cacheKey` would store and serve user-specific responses to other visitors; this version bypasses caching for requests carrying `Authorization` or `Cookie`. Remove the guard only for fully public content.

- `cacheKey` is an Enterprise-only option; on other plans use the Cache API ([cache-api.md](./cache-api.md)).
- `cf` is a Cloudflare-specific extension to `RequestInit`; it is ignored outside the Workers runtime.
