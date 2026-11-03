---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/
---

# Streams

The Streams API is a web standard API that allows JavaScript to programmatically access and process streams of data.

## Signature / Usage

A Worker can create a `Response` using a `ReadableStream` as the body. Any data provided through the `ReadableStream` is streamed to the client as it becomes available.

```js
export default {
	async fetch(request, env, ctx) {
		// Fetch from origin server.
		const response = await fetch(request);

		// ... and deliver our Response while that’s running.
		return new Response(response.body, response);
	},
};
```

A `TransformStream` and `ReadableStream.pipeTo()` can modify the response body as it is being streamed:

```js
export default {
	async fetch(request, env, ctx) {
		// Fetch from origin server.
		const response = await fetch(request);

		const { readable, writable } = new TransformStream({
			transform(chunk, controller) {
				controller.enqueue(modifyChunkSomehow(chunk));
			},
		});

		// Start pumping the body. NOTE: No await!
		response.body.pipeTo(writable);

		// ... and deliver our Response while that’s running.
		return new Response(readable, response);
	},
};
```

## Notes

- Use the Streams API to avoid buffering large requests or responses in memory. This lets a Worker parse extremely large bodies within its 128 MB memory limit and handle multi-gigabyte payloads incrementally.
- Workers do not need to prepare an entire response body before returning a `Response`; a `ReadableStream` can stream the body after the status line and headers are sent.
- To maintain streaming behavior, only modify the response body using the Streams API methods. If a Worker only forwards subrequest responses verbatim without reading their body text, its body handling is already optimal.
- The example calls `response.body.pipeTo(writable)` without `await` so it does not block the rest of the function. It continues asynchronously until the response completes or the client disconnects; the runtime can continue running it after the response is returned.
- The Streams API is only available inside the Request context (inside the `fetch` handler).
- Docs inconsistency: the Streams overview example above passes a `transform(chunk, controller)` option to `new TransformStream(...)`, while the TransformStream page states Workers currently only implements an identity transform stream. Treat custom `transform` callbacks with caution and verify against the runtime.
- Sub-pages: ReadableStream, ReadableStream BYOBReader, ReadableStream DefaultReader, TransformStream, WritableStream, WritableStream DefaultWriter.

## Related

- [ReadableStream](./readablestream.md)
- [ReadableStream BYOBReader](./readablestream-byob-reader.md)
- [ReadableStream DefaultReader](./readablestream-default-reader.md)
- [TransformStream](./transformstream.md)
- [WritableStream](./writablestream.md)
- [WritableStream DefaultWriter](./writablestream-default-writer.md)
- [Request](./request.md)
