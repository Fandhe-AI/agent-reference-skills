---
source: https://developers.cloudflare.com/durable-objects/examples/readable-stream/
---

# Durable Object ReadableStream

Stream an incrementing number from a Durable Object to a Worker, and cancel the stream from the Worker side.

## Signature / Usage

Adapted (not in the official docs): the official loop cancels after six values rather than five, does not await `reader.cancel()`, and never closes the stream when the source ends. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

// Send incremented counter value every second
async function* dataSource(signal) {
	let counter = 0;
	while (!signal.aborted) {
		yield counter++;
		await new Promise((resolve) => setTimeout(resolve, 1_000));
	}

	console.log("Data source cancelled");
}

export class MyDurableObject extends DurableObject {
	async fetch(request) {
		const abortController = new AbortController();

		const stream = new ReadableStream({
			async start(controller) {
				if (request.signal.aborted) {
					controller.close();
					abortController.abort();
					return;
				}

				for await (const value of dataSource(abortController.signal)) {
					controller.enqueue(new TextEncoder().encode(String(value)));
				}
				// After a cancel the stream is already closed; closing it again would throw.
				if (!abortController.signal.aborted) controller.close();
			},
			cancel() {
				console.log("Stream cancelled");
				abortController.abort();
			},
		});

		const headers = new Headers({
			"Content-Type": "application/octet-stream",
		});

		return new Response(stream, { headers });
	}
}

export default {
	async fetch(request, env, ctx) {
		const stub = env.MY_DURABLE_OBJECT.getByName("foo");
		const response = await stub.fetch(request);
		if (!response.ok || !response.body) {
			return new Response("Invalid response", { status: 500 });
		}

		const reader = response.body
			.pipeThrough(new TextDecoderStream())
			.getReader();

		let data = [];
		while (true) {
			// Cancel the stream after 5 messages
			if (data.length >= 5) {
				await reader.cancel();
				break;
			}
			const { value, done } = await reader.read();

			if (value) {
				console.log(`Got value ${value}`);
				data = [...data, value];
			}

			if (done) {
				break;
			}
		}

		return Response.json(data);
	},
};
```

## Notes

- Corrected from the official docs: the page's counter `i > 5` check read six values although the description says five; the loop now cancels when five values are collected. `reader.cancel()` is awaited and `controller.close()` is called when the source finishes, unless the stream was cancelled first (closing a cancelled stream throws). The no-op `{ ...request }` init argument to `stub.fetch` was dropped.
- If the Worker cancels the Durable Object's readable stream, the cancellation propagates to the Durable Object (its `cancel()` runs).
- Requires a `MY_DURABLE_OBJECT` binding to class `MyDurableObject` with a migration, as in the other Durable Object samples.
- Only the JavaScript variant is shown.

## Related

- [Stub](../references/durable-objects/stub.md)
- [Create stubs and send requests](../references/durable-objects/create-stubs-and-send-requests.md)
