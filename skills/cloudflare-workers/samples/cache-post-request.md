---
source: https://developers.cloudflare.com/workers/examples/cache-post-request/
---

# Cache POST requests

Cache POST responses by hashing the request body into a GET-shaped cache key.

Adapted (not in the official docs): authenticated requests bypass the cache, only OK responses without `Set-Cookie` / `private` / `no-store` are stored, the body size is bounded, a `/` separates path and hash, and errors return 500; see Notes.

```js
const MAX_BODY_BYTES = 64 * 1024; // do not buffer or cache larger POST bodies

export default {
	async fetch(request, env, ctx) {
		async function sha256(bytes) {
			// hash the raw request body bytes (no text decoding)
			const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
			// convert bytes to hex string
			return [...new Uint8Array(hashBuffer)]
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
		}
		try {
			// Only cache when the size is declared and small; otherwise pass through uncached
			const lengthHeader = request.headers.get("Content-Length");
			const declared = lengthHeader === null ? NaN : Number(lengthHeader);
			if (
				request.method.toUpperCase() === "POST" &&
				!request.headers.has("Authorization") &&
				!request.headers.has("Cookie") &&
				Number.isInteger(declared) &&
				declared <= MAX_BODY_BYTES
			) {
				const bytes = await request.clone().arrayBuffer();
				if (bytes.byteLength > MAX_BODY_BYTES) {
					return fetch(request);
				}
				// Hash the raw request body bytes to use them as a part of the cache key
				const hash = await sha256(bytes);
				const cacheUrl = new URL(request.url);
				// Store the URL in cache by prepending the body's hash
				cacheUrl.pathname = "/posts" + cacheUrl.pathname + "/" + hash;
				// Convert to a GET to be able to cache
				const cacheKey = new Request(cacheUrl.toString(), {
					method: "GET",
				});

				const cache = caches.default;
				// Find the cache key in the cache
				let response = await cache.match(cacheKey);
				// Otherwise, fetch response to POST request from origin
				if (!response) {
					response = await fetch(request);
					const cc = response.headers.get("Cache-Control") ?? "";
					if (
						response.ok &&
						!response.headers.has("Set-Cookie") &&
						!/\b(private|no-store)\b/i.test(cc)
					) {
						ctx.waitUntil(cache.put(cacheKey, response.clone()));
					}
				}
				return response;
			}
			return fetch(request);
		} catch (e) {
			return new Response("Error thrown " + e.message, { status: 500 });
		}
	},
};
```

## Notes

- The Cache API only stores GET keys, so the key is rewritten to a GET URL containing the body hash.
- Adapted from the official docs: the official sample copies all request headers into the cache key, caches any status (including 5xx), concatenates path and hash without a separator, buffers any body size, returns caught errors as a 200, and would share one user's response with others. This version bypasses the cache for requests with `Authorization` / `Cookie`, stores only OK responses without `Set-Cookie` / `Cache-Control: private` / `no-store`, inserts `/` before the hash, hashes the raw body bytes (not decoded text), and returns 500 on errors. Only requests that declare an integer `Content-Length` of at most `MAX_BODY_BYTES` are buffered and cached; requests without `Content-Length` (for example chunked) or with a larger one are forwarded uncached, and the actual `byteLength` is re-checked after reading. The cache key still contains only path, query and body hash, never the caller's identity.
- `request.clone()` is needed before reading the body, since the original is still forwarded to the origin.
