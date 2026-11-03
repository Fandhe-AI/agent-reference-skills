---
source: https://developers.cloudflare.com/pages/functions/examples/cors-headers/
---

# Example: Adding CORS headers

Append CORS headers to responses and answer `OPTIONS` preflights. Snippet from the Cloudflare Pages template repo.

## Signature / Usage

Adapted (not in the official docs): response headers are set on a copy of the response, because the response from `context.next()` may have immutable headers; see Notes.

```ts
// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "86400",
		},
	});
};

// Set CORS to all /api responses
export const onRequest: PagesFunction = async (context) => {
	const upstream = await context.next();
	const response = new Response(upstream.body, upstream);
	response.headers.set("Access-Control-Allow-Origin", "*");
	response.headers.set("Access-Control-Max-Age", "86400");
	return response;
};
```

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Adapted from the official docs: the official code calls `response.headers.set` directly on the result of `context.next()`; copying the response avoids a failure if those headers are immutable.
- `Access-Control-Allow-Origin: *` allows any origin; use it only for public endpoints that do not rely on cookies or credentials.
- When both `onRequestOptions` and `onRequest` are exported, `OPTIONS` requests go to `onRequestOptions` (a method-specific export takes precedence).

## Related

- [api-reference.md](./api-reference.md)
- [middleware.md](./middleware.md)
