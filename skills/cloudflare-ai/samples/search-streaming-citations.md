---
source: https://developers.cloudflare.com/ai-search/how-to/chunk-citations/
---

# Parse citations from a streaming AI Search response

With `stream: true`, the source chunks arrive as an SSE event named `chunks` before the answer tokens; rewrite it into a `citations` event and forward the rest.

## Signature / Usage

`src/index.ts`, using the same `wrangler.jsonc` (`ai_search_namespaces` binding `AI_SEARCH`, `main` = `src/index.ts`) and `API_TOKEN` secret as the chunk citations sample:

Adapted (not in the official docs): adds the bearer-token gate (fail closed, `API_TOKEN` secret), closes the writer exactly once (the official `pump().catch(() => writer.close())` could close a stream that `finally` had already closed), forwards `event:` lines of events other than `chunks` instead of dropping them, validates that the `chunks` payload is an array, and flushes the final partial line. See Notes.

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
	API_TOKEN?: string;
}

function isAuthorized(request: Request, token: string | undefined): boolean {
	if (!token) return false; // fail closed when the secret is unset
	const enc = new TextEncoder();
	const given = enc.encode(request.headers.get("authorization") ?? "");
	const expected = enc.encode(`Bearer ${token}`);
	return (
		given.byteLength === expected.byteLength &&
		crypto.subtle.timingSafeEqual(given, expected)
	);
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (!isAuthorized(request, env.API_TOKEN)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// Stream answer tokens, but extract source chunks first.
		const stream = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
			stream: true,
		});

		// Transform the stream: extract the chunks event and forward the rest
		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();
		const decoder = new TextDecoder();
		const reader = stream.getReader();

		// Track the current SSE event type to identify source chunks.
		let currentEvent = "";

		const pump = async () => {
			try {
				let buffer = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() ?? "";

					for (const line of lines) {
						// The chunks event arrives before the streamed answer.
						if (line.startsWith("event: ")) {
							currentEvent = line.slice(7).trim();
							// The chunks event is replaced below; forward every other event name.
							if (currentEvent !== "chunks") {
								await writer.write(encoder.encode(line + "\n"));
							}
							continue;
						}

						// Transform the chunks data line into a citations event for your UI.
						if (currentEvent === "chunks" && line.startsWith("data: ")) {
							const chunks: unknown = JSON.parse(line.slice(6));
							if (!Array.isArray(chunks)) {
								throw new Error("Unexpected chunks payload");
							}
							const citations = chunks.map(
								(chunk: { item: { key: string }; score: number }) => ({
									source: chunk.item.key,
									score: chunk.score,
								}),
							);
							await writer.write(
								encoder.encode(
									`event: citations\ndata: ${JSON.stringify(citations)}\n\n`,
								),
							);
							currentEvent = "";
							continue;
						}

						// Forward answer tokens and other SSE data unchanged.
						// A blank line ends the current event.
						if (line === "") currentEvent = "";
						await writer.write(encoder.encode(line + "\n"));
					}
				}
				// Flush any bytes left in the decoder and the last partial line.
				buffer += decoder.decode();
				if (buffer) await writer.write(encoder.encode(buffer));
				await writer.close();
			} catch (error) {
				await writer.abort(error);
			} finally {
				reader.releaseLock();
			}
		};

		// Keep the pump running after the Response is returned.
		ctx.waitUntil(pump());

		return new Response(readable, {
			headers: {
				"content-type": "text/event-stream",
				"cache-control": "no-cache",
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: the gate, the single-close error handling (`close()` on success, `abort()` on failure), and `ctx.waitUntil(pump())` so the background pump is tied to the request's lifetime.
- Corrected from the official docs: the official loop `continue`s on every `event:` line, so the names of events other than `chunks` were dropped and their data reached the client as unnamed `message` events; it also discarded the final partial line. The loop now forwards other event names, resets the event type only at the blank line that ends an event, and flushes the remaining buffer. A `chunks` payload that is not an array aborts the stream instead of throwing on `.map`.
- The `chunks` event comes before the streamed answer, so a UI can render citations before the answer finishes.
- Authenticated, per-user responses must not be stored in a shared cache; `cache-control: no-cache` is kept from the source.

## Related

- [Chunk citations](./search-chunk-citations.md)
- [Chat completions](../references/ai-search/chat-completions.md)
