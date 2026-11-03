---
source: https://developers.cloudflare.com/workers/examples/fetch-json/
---

# Fetch JSON

Send a GET request to an external API and relay the body with its content type.

```js
export default {
	async fetch(request, env, ctx) {
		const url = "https://jsonplaceholder.typicode.com/todos/1";

		// gatherResponse returns both content-type & response body as a string
		async function gatherResponse(response) {
			const { headers } = response;
			const contentType = headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
				return { contentType, result: JSON.stringify(await response.json()) };
			}
			return { contentType, result: await response.text() };
		}

		const response = await fetch(url);
		const { contentType, result } = await gatherResponse(response);

		const options = { headers: { "content-type": contentType } };
		return new Response(result, options);
	},
};
```

## Notes

- The body is read once, either as JSON or text, depending on the upstream `content-type`.
- To pass the upstream response through unchanged, return the `fetch()` result directly instead.
