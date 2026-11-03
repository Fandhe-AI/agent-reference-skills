---
source: https://developers.cloudflare.com/agents/agent-class/callable-methods/
---

# Callable methods (@callable)

Mark a method with `@callable()` and a client connected with `useAgent` or `AgentClient` calls it through a typed stub over its WebSocket. Only decorated methods are callable.

## Signature / Usage

```ts
import { Agent, callable } from "agents";

export type CounterState = { count: number };

export class CounterAgent extends Agent<Env, CounterState> {
	initialState: CounterState = { count: 0 };

	@callable()
	increment(by: number): number {
		if (!Number.isInteger(by)) throw new Error("by must be an integer");
		this.setState({ count: this.state.count + by });
		return this.state.count;
	}

	// Not decorated, so clients cannot call it.
	reset() {
		this.setState({ count: 0 });
	}
}
```

Client:

```tsx
import { useAgent } from "agents/react";
import type { CounterAgent } from "./server";

export function Counter() {
	const agent = useAgent<CounterAgent>({ agent: "CounterAgent", name: "demo" });

	const add = async () => {
		const count = await agent.stub.increment(1);
		console.log(count);
	};

	return <button onClick={add}>+1</button>;
}
```

Streaming:

```ts
import { Agent, callable, type StreamingResponse } from "agents";
import { streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class WriterAgent extends Agent<Env> {
	@callable({ streaming: true })
	async write(stream: StreamingResponse, prompt: string) {
		const ai = createAI({ binding: this.env.AI });
		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			prompt,
		});
		for await (const text of result.textStream) {
			stream.send(text);
		}
		stream.end();
	}
}
```

```ts
await agent.call("write", ["Write a haiku"], {
	stream: {
		onChunk: (chunk) => console.log(chunk),
		onDone: () => console.log("done"),
		onError: (error) => console.error(error),
	},
});
```

Decorator setup (`vite.config.ts` and `tsconfig.json`):

```ts
import agents from "agents/vite";

export default defineConfig({
	plugins: [agents(), react(), cloudflare()],
});
```

```json
{
	"extends": "agents/tsconfig"
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `streaming` | `boolean` | — | Method receives a `StreamingResponse` as first argument and sends results as produced |
| `description` | `string` | — | Description attached to the method; listed via `this.getCallableMethods()` |

`StreamingResponse`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `send(chunk)` | method | — | Send a chunk |
| `end(finalChunk?)` | method | — | End the stream |
| `error(message)` | method | — | Fail the stream |

## Notes

- Any connected client can call a callable method; treat arguments as untrusted input.
- `agent.call("increment", [1])` is the untyped equivalent; a throwing method rejects the client promise with the error message.
- Callables are for clients outside your Worker. From a Worker or another Agent, use Durable Object RPC through a `getAgentByName()` stub (no decorator).
- `@callable()` is a TC39 standard decorator. If the dev server fails with `SyntaxError: Invalid or unexpected token`, add the `agents/vite` plugin and extend `agents/tsconfig` (or set `"target": "ES2021"`). Do not set `"experimentalDecorators": true`: it silently breaks `@callable()` at runtime.
- The streaming example uses a model ID taken verbatim from the source page.
- Timeouts, errors and transports: websockets.md (https://developers.cloudflare.com/agents/runtime/capabilities/websockets/).

## Related

- [WebSockets](./websockets.md)
- [Client SDK](./client-sdk.md)
- [Routing](./routing.md)
