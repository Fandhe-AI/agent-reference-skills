---
source: https://developers.cloudflare.com/agents/runtime/capabilities/streams/
---

# Streams

Experimental. `Streams` from `agents/streams` stores incremental output (such as model tokens) as an ordered chunk log in the Durable Object's SQLite database. Readers replay from any position and then follow live appends; SSE resume works without client code. Everything exported from `agents/streams` may change between releases.

## Signature / Usage

Adapted (not in the official docs): every request now passes a caller check before reading or starting a stream; `isAuthorizedCaller()` is a placeholder that rejects everyone until you implement verification. Each POST also opens a new stream under a unique `crypto.randomUUID()` ID, returns it in the 202 response (GET takes it as `?id=`), and answers 409 when `open()` throws instead of a blind 202; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { streamText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";
import { Streams, sseResponse } from "agents/streams";
import type { StreamWriter } from "agents/streams";

// Placeholder: rejects every request until you implement verification.
function isAuthorizedCaller(request: Request): boolean {
	return false;
}

export class ReportAgent extends DurableObject<Env> {
	readonly streams = new Streams();
	readonly lifecycle = Lifecycle.install(this).use(this.streams);

	async onRequest(request: Request): Promise<Response> {
		if (!isAuthorizedCaller(request)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);

		if (request.method === "POST") {
			const { prompt } = await request.json<{ prompt: string }>();
			// A new ID per generation: a settled stream cannot be reopened, and a
			// shared ID would let two generators write to one stream.
			const id = crypto.randomUUID();
			let stream: StreamWriter;
			try {
				stream = await this.streams.open(id);
			} catch (error) {
				return new Response(`Cannot start stream: ${String(error)}`, {
					status: 409,
				});
			}
			this.ctx.waitUntil(this.#generate(stream, prompt));
			return Response.json({ id }, { status: 202 });
		}

		const id = url.searchParams.get("id");
		if (!id) return new Response("Missing id", { status: 400 });
		if ((await this.streams.status(id)) === null) {
			return new Response("Unknown stream", { status: 404 });
		}

		// Replay what is stored, then follow live chunks until the stream ends.
		return sseResponse(this.streams, id, { request });
	}

	async #generate(stream: StreamWriter, prompt: string): Promise<void> {
		try {
			const ai = createAI({ binding: this.env.AI });
			const result = streamText({
				model: ai("anthropic/claude-opus-5.5"),
				prompt,
			});
			for await (const text of result.textStream) {
				stream.append(text);
			}
			stream.close();
		} catch (error) {
			stream.error(String(error));
		}
	}
}
```

Read, batch-read, and atomically replace a stream with its final content:

```ts
import type { StreamChunk, StreamWriter, Streams } from "agents/streams";

async function collect(streams: Streams, id: string, from = 0) {
	const chunks: unknown[] = [];
	for await (const { seq, chunk } of streams.read(id, { from })) {
		chunks.push(chunk);
		console.log(`chunk ${seq}`);
	}
	return chunks;
}

async function forward(
	streams: Streams,
	id: string,
	send: (batch: StreamChunk[]) => Promise<void>,
) {
	for await (const batch of streams.readBatches(id, {
		batchSize: 50,
		onUpToDate: () => console.log("caught up"),
	})) {
		await send(batch);
	}
}

function finish(stream: StreamWriter, sql: SqlStorage, text: string) {
	stream.close({
		commit: () => {
			sql.exec("INSERT INTO replies (text) VALUES (?)", text);
		},
		discard: true,
	});
}
```

Resume a producer after eviction:

```ts
import type { Streams } from "agents/streams";

async function produce(streams: Streams, id: string, total: number) {
	const stream = await streams.open(id);
	// Chunks before the cursor were stored by an earlier run.
	for (let i = stream.cursor; i < total; i++) {
		stream.append({ step: i });
	}
	stream.close();
}
```

## Options / Props

`StreamWriter` from `open(id)` (also accepts `metadata` JSON object and `tag`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `append(chunk)` | method | — | Stores one chunk and wakes live readers; synchronous; returns the sequence number. |
| `close(options?)` | method | — | Marks the stream `completed`; readers finish after the last chunk. |
| `error(reason?, options?)` | method | — | Marks the stream `errored` and stores `reason`. |
| `cursor` | number | — | Chunks stored so far, also the next chunk's sequence number. |
| `streamId` | string | — | The stream's ID. |

`new Streams(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxChunkBytes` | number | 1 MiB | Maximum chunk size; a chunk is any JSON value. |

`close()` / `error()` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `commit` | `() => void` | — | Your own synchronous writes; must not await. |
| `discard` | boolean | — | `true` deletes the stream's rows, in one SQLite transaction with `commit`. |

`sseResponse(streams, id, options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `request` | Request | — | Supplies `Last-Event-ID`, `?from=`, and the abort signal. |
| `from` | number | — | First sequence number to send. |
| `signal` | AbortSignal | — | Stops following the stream. |
| `batchSize` | number | — | Chunks per read during replay. |
| `heartbeatMs` | number | — | Interval between heartbeat comments. |

Read and manage:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `read(id, { from, signal })` | async iterable | — | Replays then follows; items are `{ seq, chunk }`. |
| `readBatches(id, { batchSize, onUpToDate })` | async iterable | 100 | Arrays; during replay up to `batchSize`, live arrays hold everything appended since the last. |
| `status(id)` | method | — | `StreamStatus` (`state` `"streaming"`/`"completed"`/`"errored"`, `cursor`, `tag`, `metadata`, `error`, timestamps) or `null`. |
| `list(options?)` | method | — | Newest first; filter by `state` or `tag`; cap with `limit`. |
| `delete(id)` | method | — | Deletes a settled stream and its chunks; `false` when none matched. |

## Notes

- `open()` is safe to call again: opening a live stream returns a writer at its current cursor; opening a settled stream throws `StreamClosedError`; closing or erroring a settled stream does nothing. A stream's tag is fixed at creation and not unique; find the latest tagged stream with `list({ tag, limit: 1 })`.
- SSE: each chunk's sequence number is its SSE `id`. Replay starts after `Last-Event-ID`, or at `?from=` when no valid header; the `from` option overrides both. After replay it sends an `up-to-date` event, follows live appends with heartbeat comments, and finishes with `done` or an `error` event carrying the stored reason. A reconnecting browser `EventSource` continues automatically. For other transports (WebSocket) pipe `read()` / `readBatches()` yourself.
- `onUpToDate` runs once, the first time the reader reaches the end of stored chunks; use it to switch a UI from replay to live.
- Storage: chunks are stored in blocks (one row up to 256 KB, then a new row). Nothing deletes old streams automatically; use `delete()` or `discard`. The `commit` + `discard` pattern makes it atomic: either the reply is stored and the stream is gone, or `commit` threw and the stream is still live.
- Adapted from the official docs: the `onRequest()` example originally let any caller start model generation; it now calls a fail-closed `isAuthorizedCaller()` placeholder. Also authenticate in the Worker first. The `id` query parameter selects which stream is read, so scope it to what the caller may see.
- Adapted from the official docs: the example no longer uses a fixed `report` stream ID. With a fixed ID, a POST after completion would get 202 but `open()` would throw `StreamClosedError` (GET would keep returning the old result), and a second POST during generation would share one stream between two generators. `open()` now runs before the 202 so a failure is reported (409), and GET requires and checks the `id` via `status(id)`.
- `AIChatAgent` and Think store each in-progress reply in `Streams`. To add it to an `Agent`, construct it as a field and `this.lifecycle.use()` it in the constructor.

## Related

- [Capabilities](./capabilities.md)
- [HTTP and Server-Sent Events](./http-sse.md)
- [Sessions](./sessions.md)
