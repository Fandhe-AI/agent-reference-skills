---
source: https://developers.cloudflare.com/workers/runtime-apis/fetch/
---

# Fetch

The Fetch API provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

## Signature / Usage

Adapted (not in the official docs): `return` dropped because a `scheduled()` handler does not return a Response; see Notes.

```js
export default {
	async scheduled(controller, env, ctx) {
		const response = await fetch("https://example.com", {
			headers: {
				"X-Source": "Cloudflare-Workers",
			},
		});
		console.log(response.status);
	},
};
```

- `fetch(resource, options optional)` : Promise `<Response>`
- Fetch returns a promise to a Response.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resource` | Request \| string \| URL | The resource to fetch. |
| `options` | options | An object that defines the content and behavior of the request. |
| `options.cache` | `undefined \| 'no-store' \| 'no-cache'` (optional) | Standard HTTP `cache` header. Only `cache: 'no-store'` and `cache: 'no-cache'` are supported. Any other `cache` header will result in a `TypeError` with the message `Unsupported cache mode: <attempted-cache-mode>`. For all requests this forwards the `Pragma: no-cache` and `Cache-Control: no-cache` headers to the origin. For `no-store`, requests to origins not hosted by Cloudflare bypass the use of Cloudflare's caches. For `no-cache`, requests to origins not hosted by Cloudflare are forced to revalidate with the origin before responding. |

## Notes

- Adapted from the official docs: the official `scheduled()` example returns the `fetch()` result, but `scheduled()` handlers return nothing useful (a `Response` is ignored); the example logs the status instead.
- Asynchronous tasks such as `fetch` must be executed within a handler. If you try to call `fetch()` within global scope, your Worker will throw an error.
- Worker-to-Worker `fetch` requests are possible with Service bindings or by enabling the `global_fetch_strictly_public` compatibility flag.
- Service Workers are deprecated, but still supported. Module Workers are recommended. New features may not be supported for Service Workers.
- Workers supports both the gzip and brotli compression algorithms. Usually it is not necessary to specify `Accept-Encoding` or `Content-Encoding` headers in production; brotli or gzip compression is automatically requested when fetching from an origin and applied to the response when returning data to the client, depending on the capabilities of the client and origin server.
- To support requesting brotli from the origin, you must enable the `brotli_content_encoding` compatibility flag. Soon, this flag will be enabled by default for all Workers past an upcoming compatibility date.
- Passthrough behavior: as long as you do not read the body of a compressed response prior to returning it to the client and keep the `Content-Encoding` header intact, it passes through without being decompressed and then recompressed. Recompression is still needed when the response uses an encoding not supported by the client (for example, origin returns brotli but client supports only gzip); it is applied automatically and may vary based on compression rules.

Passthrough example (from the same page):

```typescript
export default {
	async fetch(request) {
		// Accept brotli or gzip compression
		const headers = new Headers({
			"Accept-Encoding": "br, gzip",
		});
		let response = await fetch("https://developers.cloudflare.com", {
			method: "GET",
			headers,
		});

		// As long as the original response body is returned and the Content-Encoding header is
		// preserved, the same encoded data will be returned without needing to be compressed again.
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
		});
	},
};
```

## Related

- [Request](./request.md)
- [Response](./response.md)
- [Headers](./headers.md)
- [Streams](./streams.md)
