---
source: https://developers.cloudflare.com/workers/examples/streaming-json/
---

# Stream large JSON

Parse a large JSON request body incrementally to stay within the Worker memory limit.

```sh
npm install @streamparser/json-whatwg
```

Adapted (not in the official docs): input and accumulated output are bounded with `MAX_BODY_BYTES` / `MAX_USERS`; see Notes.

```ts
import { JSONParser } from "@streamparser/json-whatwg";

const MAX_BODY_BYTES = 1024 * 1024; // 1 MiB: bounds parser state, retained names and output
const MAX_USERS = 10_000; // cap the number of retained entries

export default {
	async fetch(request): Promise<Response> {
		const declared = Number(request.headers.get("Content-Length") ?? 0);
		if (!request.body || declared > MAX_BODY_BYTES) {
			return new Response("Payload too large or missing", { status: 413 });
		}

		const parser = new JSONParser({ paths: ["$.users.*"] });

		const users: string[] = [];
		let received = 0;

		// Count bytes as they stream in (Content-Length may be absent or wrong)
		const counter = new TransformStream<Uint8Array, Uint8Array>({
			transform(chunk, controller) {
				received += chunk.byteLength;
				if (received > MAX_BODY_BYTES) {
					controller.error(new Error("Payload too large"));
					return;
				}
				controller.enqueue(chunk);
			},
		});

		// Pipe the request body through the JSON parser
		const reader = request.body
			.pipeThrough(counter)
			.pipeThrough(parser)
			.getReader();

		try {
			// Process matching JSON values as they stream in
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				// Extract only the name field from each user object
				if (value.value?.name) {
					if (users.length >= MAX_USERS) {
						await reader.cancel();
						return new Response("Too many users", { status: 413 });
					}
					users.push(value.value.name);
				}
			}
		} catch {
			return new Response("Payload too large or invalid JSON", { status: 413 });
		}

		return Response.json({ userNames: users });
	},
} satisfies ExportedHandler;
```

## Notes

- Adapted from the official docs: the official sample bounds nothing, so a hostile client can stream an unbounded body and grow `users` until the Worker runs out of memory. This version rejects oversized `Content-Length`, counts bytes in a `TransformStream` (so a missing or wrong header does not matter), and caps the number of retained entries (`MAX_USERS`). The streaming parser does not limit the size of a single value being built, so the 1 MiB input cap is what bounds memory: parser state, the retained `name` strings and the JSON output are all derived from at most `MAX_BODY_BYTES` of input. Raise the cap only after checking it against the 128 MB Worker memory limit; the limits are examples. A parse error is reported as 413 for brevity; return 400 for invalid JSON if you need to distinguish it.
- Buffering with `request.json()` would hit the 128 MB memory limit on multi-gigabyte payloads; streaming avoids that only together with a byte cap like the one above, since the sample retains the extracted names.
- `paths` is a JSONPath-like selector choosing which values are emitted.
- Streams API details: `../references/web-apis/streams.md`.
