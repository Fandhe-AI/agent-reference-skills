# Durable Endpoints Streaming

Streams data back to clients in real-time over Server-Sent Events (SSE) from within a [Durable Endpoint](./durable-endpoints.md), preserving durability: if a step fails and retries, chunks streamed during that step are automatically rolled back on the client. TypeScript SDK only.

## Signature / Usage

```ts
import { step } from "inngest";
import { stream } from "inngest/experimental/durable-endpoints";
import { inngest } from "@/inngest";

export const GET = inngest.endpoint(async () => {
  const text = await step.run("generate", async () => {
    stream.push("Generating...\n");
    // ...call an LLM, pushing tokens as they arrive
    return finalText;
  });

  return new Response("\nDone!");
});
```

```ts
// client
import { fetchWithStream } from "inngest/experimental/durable-endpoints/client";

const resp = await fetchWithStream("/api/generate", {
  onData: ({ data }) => {
    /* append chunk */
  },
  onRollback: () => {
    /* discard uncommitted chunks from the retried step */
  },
  onCommit: () => {
    /* chunks are now permanent */
  },
});
const result = await resp.text();
```

## Options / Props

### Server API

| Name | Type | Description |
|------|------|-------------|
| `stream.push(data)` | `(data: unknown) => void` | Sends one JSON-serializable chunk as an SSE event. Fire-and-forget; no-op outside an Inngest execution context. |
| `stream.pipe(source)` | `(source: ReadableStream \| AsyncIterable<string> \| (() => AsyncIterable<string>)) => Promise<string>` | Streams each chunk from `source` and resolves with the concatenated text. No-op (resolves `""`) outside an Inngest execution context. |

### Client API

| Name | Type | Description |
|------|------|-------------|
| `fetchWithStream(url, options)` | `(url, options) => Promise<Response>` | Consumes the SSE stream, handling sync-to-async redirects and commit/rollback. Returns the endpoint's final `Response`. |
| `onData({ data, hashedStepId })` | callback | Called per chunk. `hashedStepId` identifies the producing step (or `null` if streamed outside a step). |
| `onRollback({ hashedStepId })` | callback | Called when the producing step fails and will retry; caller must discard that step's chunks. |
| `onCommit({ hashedStepId })` | callback | Called when the producing step succeeds; its chunks become permanent. |

## Notes

- Streaming activates lazily: only when the client sends `Accept: text/event-stream` (done automatically by `fetchWithStream()`) **and** the server calls `stream.push()`/`stream.pipe()`. Otherwise the endpoint behaves like a non-streaming Durable Endpoint.
- Data streamed outside of a `step.run()` is never rolled back.
- Developer preview limitations: 15-minute client connection timeout; only one parallel step may stream at a time (multiple produce interleaved, undisambiguatable output); child functions invoked via `step.invoke()` cannot stream to the parent's client; a raw `Response` return value (e.g. file download) can be lost on a sync-to-async transition — use `stream.push()`/`stream.pipe()` instead.
- SSE event types: `inngest.metadata`, `inngest.stream` (user data), `inngest.commit`, `inngest.rollback`, `inngest.redirect_info`, `inngest.response`. The `inngest.*` protocol events are handled automatically by `fetchWithStream()`.

## Related

- [durable-endpoints](./durable-endpoints.md)
