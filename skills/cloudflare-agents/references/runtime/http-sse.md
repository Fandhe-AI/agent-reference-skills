---
source: https://developers.cloudflare.com/agents/runtime/routing/http-sse/
---

# HTTP and Server-Sent Events

Handle HTTP requests in `onRequest()` and stream responses with Server-Sent Events from a Lifecycle Durable Object.

## Signature / Usage

Adapted (not in the official docs): the state-changing `/action` route now requires a caller check; `isAuthorizedCaller()` is a placeholder that rejects every request until you implement real verification; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

// Placeholder: verify what your Worker forwarded (for example a signed token).
// It rejects every request until you implement verification.
function isAuthorizedCaller(request: Request): boolean {
	return false;
}

export class ApiAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.endsWith("/status")) {
			return Response.json({ name: this.lifecycle.name, status: "ok" });
		}

		if (url.pathname.endsWith("/action")) {
			if (!isAuthorizedCaller(request)) {
				return new Response("Unauthorized", { status: 401 });
			}
			if (request.method !== "POST") {
				return new Response("Method not allowed", { status: 405 });
			}
			const { action } = await request.json<{ action: string }>();
			await this.ctx.storage.put("lastAction", action);
			return Response.json({ success: true });
		}

		return new Response("Not found", { status: 404 });
	}
}
```

Stream a model reply with the AI SDK:

Adapted (not in the official docs): model calls spend quota, so the handler requires a caller check; `isAuthorizedCaller()` is the same fail-closed placeholder as above; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { streamText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";

// Placeholder: rejects every request until you implement verification.
function isAuthorizedCaller(request: Request): boolean {
	return false;
}

export class ChatAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		if (!isAuthorizedCaller(request)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const { prompt } = await request.json<{ prompt: string }>();
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt,
		});

		return result.toTextStreamResponse();
	}
}
```

Resume a stored stream after a disconnect (experimental `Streams`):

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Streams, sseResponse } from "agents/streams";

export class ReportAgent extends DurableObject<Env> {
	readonly streams = new Streams();
	readonly lifecycle = Lifecycle.install(this).use(this.streams);

	async onRequest(request: Request): Promise<Response> {
		const id = new URL(request.url).searchParams.get("id") ?? "report";
		return sseResponse(this.streams, id, { request });
	}
}
```

## Options / Props

WebSockets or SSE:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Direction | WebSockets / SSE | — | Both ways / server to client. |
| Protocol | WebSockets / SSE | — | `ws://` or `wss://` / HTTP. |
| Binary data | WebSockets / SSE | — | Yes / no, text only. |
| Reconnection | WebSockets / SSE | — | `useAgent` and `AgentClient` / the browser. |
| Best for | WebSockets / SSE | — | Interactive apps, chat, callables / streaming replies, notifications. |

## Notes

- The object receives the full URL, so match on the end of the path. Without `onRequest()`, a request no capability handles returns `404`.
- To write SSE yourself, return a `ReadableStream` with the `text/event-stream` content type. Each event is one or more `field: value` lines followed by a blank line (for example `event: update`, `id: 42`, `data: {"count": 42}`).
- A stream from `onRequest()` ends when the client disconnects and the client loses what it missed. `Streams` stores each chunk and `sseResponse()` serves it as SSE; a reconnecting browser `EventSource` sends `Last-Event-ID` and the response continues from the next chunk. `Streams` is experimental.
- The `Agent` class calls the same `onRequest(request)` method, so these examples work with `extends Agent<Env>` in place of the Lifecycle setup.
- Adapted from the official docs: the `/action` and model-call handlers originally trusted any caller that reaches the object; they now call a fail-closed `isAuthorizedCaller()` placeholder. Also authenticate in the Worker before routing (see Routing authentication). The `Streams` example serves any stored stream ID to any caller; apply the same check there.

## Related

- [Routing](./routing.md)
- [Streams](./streams.md)
- [WebSockets](./websockets.md)
- [Authentication](./routing-authentication.md)
