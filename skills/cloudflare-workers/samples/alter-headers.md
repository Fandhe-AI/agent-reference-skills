---
source: https://developers.cloudflare.com/workers/examples/alter-headers/
---

# Alter headers

Add, change, or delete response headers on an upstream response.

```js
export default {
	async fetch(request) {
		const response = await fetch("https://example.com");

		// Clone the response so that it's no longer immutable
		const newResponse = new Response(response.body, response);

		// Add a custom header with a value
		newResponse.headers.append(
			"x-workers-hello",
			"Hello from Cloudflare Workers",
		);

		// Delete headers
		newResponse.headers.delete("x-header-to-delete");
		newResponse.headers.delete("x-header2-to-delete");

		// Adjust the value for an existing header
		newResponse.headers.set("x-header-to-change", "NewValue");

		return newResponse;
	},
};
```

## Notes

- Headers on a `fetch()` result are immutable; re-wrap with `new Response(response.body, response)` first.
- Use `Request` re-wrapping the same way to modify outgoing request headers.
- See `../references/web-apis/headers.md`.
