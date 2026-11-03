---
source: https://developers.cloudflare.com/workers/examples/extract-cookie-value/
---

# Cookie parsing

Read the value of a named cookie from the request.

```js
import { parseCookie } from "cookie";
export default {
	async fetch(request) {
		// The name of the cookie
		const COOKIE_NAME = "__uid";
		const cookie = parseCookie(request.headers.get("Cookie") || "");
		if (cookie[COOKIE_NAME] != null) {
			// Respond with the cookie value
			return new Response(cookie[COOKIE_NAME]);
		}
		return new Response("No cookie with name: " + COOKIE_NAME);
	},
};
```

## Notes

- Requires the npm package `cookie` (`npm install cookie`).
- With Hono, use `getCookie` from `hono/cookie` instead; see the `hono` skill.
