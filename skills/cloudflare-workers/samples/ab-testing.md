---
source: https://developers.cloudflare.com/workers/examples/ab-testing/
---

# A/B testing with same-URL direct access

Serve control or test content by cookie, assigning new visitors randomly and allowing direct access to either variant.

Adapted (not in the official docs): only GET/HEAD requests are rewritten, and the rewritten request keeps the original method and headers; see Notes.

```js
const NAME = "myExampleWorkersABTest";

export default {
	async fetch(req) {
		const url = new URL(req.url);

		// Enable Passthrough to allow direct access to control and test routes.
		if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
			return fetch(req);

		// Only GET/HEAD pages are split; other methods pass through unchanged.
		if (req.method !== "GET" && req.method !== "HEAD") return fetch(req);

		// Determine which group this requester is in.
		const cookie = req.headers.get("cookie");

		if (cookie && cookie.includes(`${NAME}=control`)) {
			url.pathname = "/control" + url.pathname;
		} else if (cookie && cookie.includes(`${NAME}=test`)) {
			url.pathname = "/test" + url.pathname;
		} else {
			// If there is no cookie, this is a new client. Choose a group and set the cookie.
			const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
			if (group === "control") {
				url.pathname = "/control" + url.pathname;
			} else {
				url.pathname = "/test" + url.pathname;
			}
			// Reconstruct response to avoid immutability
			let res = await fetch(new Request(url, req));
			res = new Response(res.body, res);
			// Set cookie to enable persistent A/B sessions.
			res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
			return res;
		}
		return fetch(new Request(url, req));
	},
};
```

## Notes

- Adapted from the official docs: the official sample calls `fetch(url)` with the rewritten URL only, which drops the original method, body and headers (for example `Authorization`). This version rewrites only GET/HEAD requests, passes every other method through unchanged, and builds the forwarded request with `new Request(url, req)` so the headers are preserved.
- The Set-Cookie header is only added for new visitors; returning visitors are routed by the cookie alone.
- The response must be re-wrapped (`new Response(res.body, res)`) before headers can be appended.
- See [extract-cookie-value.md](./extract-cookie-value.md) for parsing cookies robustly instead of `includes`.
