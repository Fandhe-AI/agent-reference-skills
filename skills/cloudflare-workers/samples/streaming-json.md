---
source: https://developers.cloudflare.com/workers/examples/streaming-json/
---

# Stream large JSON

Parse a large JSON request body incrementally to stay within the Worker memory limit.

```sh
npm install @streamparser/json-whatwg
```

```ts
import { JSONParser } from "@streamparser/json-whatwg";

export default {
	async fetch(request): Promise<Response> {
		const parser = new JSONParser({ paths: ["$.users.*"] });

		const users: string[] = [];

		// Pipe the request body through the JSON parser
		const reader = request.body
			.pipeThrough(parser)
			.getReader();

		// Process matching JSON values as they stream in
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			// Extract only the name field from each user object
			if (value.value?.name) {
				users.push(value.value.name);
			}
		}

		return Response.json({ userNames: users });
	},
} satisfies ExportedHandler;
```

## Notes

- Buffering with `request.json()` would hit the 128 MB memory limit on multi-gigabyte payloads; streaming avoids that.
- `paths` is a JSONPath-like selector choosing which values are emitted.
- Streams API details: `../references/web-apis/streams.md`.
