---
source: https://developers.cloudflare.com/agents/harnesses/think/client-tools/
---

# Think client tools

Think supports tools that execute in the browser. The client sends serializable tool schemas in the chat request body, Think merges them with server tools, and when the model calls a client tool the call is routed to the client.

## Signature / Usage

```ts
const { messages, sendMessage } = useAgentChat({
	agent,
	tools: {
		getUserTimezone: {
			description: "Get the user's timezone from their browser",
			parameters: {},
			execute: async () => {
				return Intl.DateTimeFormat().resolvedOptions().timeZone;
			},
		},
		getClipboard: {
			description: "Read text from the user's clipboard",
			parameters: {},
			execute: async () => {
				return navigator.clipboard.readText();
			},
		},
	},
});
```

## Options / Props

### `messageConcurrency`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `"queue"` | string | default | Queue every submit and process in order. |
| `"latest"` | string | — | Keep only the latest overlapping submission; superseded ones persist their user messages but start no model turn. |
| `"merge"` | string | — | Queue overlapping submissions, then collapse trailing user messages into one combined turn before the latest queued turn runs. |
| `"drop"` | string | — | Ignore overlapping submits entirely; messages are not persisted. |
| `{ strategy: "debounce", debounceMs?: number }` | object | `debounceMs` 750 | Trailing-edge latest with a quiet window. |

### `ChatOptions` for sub-agent RPC client tools

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `signal` | `AbortSignal` | — | Cancel the turn. |
| `clientTools` | `{ name, description, parameters }[]` | — | Tool schemas registered for the turn (like the WebSocket `clientTools` field). |
| `onClientToolCall` | `async ({ toolName, input }) => output` | — | Executes the call; output must be JSON-serializable. |

## Notes

- Client tools are tools without a server `execute`: they only have a schema. For most apps prefer defining tools on the server and using `onToolCall` for browser-only execution; the `tools` option suits SDKs/platforms where the browser decides the tool surface at runtime. Client tools are merged after server tools, so a same-named client tool overrides a server tool (for example a workspace tool) for that turn.
- The browser decides what a client tool does, so treat tool inputs from the model as untrusted before acting on them in the page (for example before reading the clipboard, which also needs user permission).
- Over RPC `chat()` there is no WebSocket, so pass `clientTools` and `onClientToolCall` via `ChatOptions`. Without `onClientToolCall` the tools are registered but have no result, and the turn ends with a dangling tool call.
- RPC behavior: schemas and executor are per-turn and never persisted; if eviction interrupts a mid-flight client-tool call, chat recovery errors the orphaned call and the model proceeds (re-invoke `chat()` with both options to re-run). A throw in `onClientToolCall` surfaces as an `output-error` tool error and the turn continues. No approval gate (`needsApproval` does not apply); gate inside your executor. Aborting via `signal` does not cancel an in-flight `onClientToolCall`.
- Auto-continuation: after a client tool result Think continues without a new user message (`continuation: true` in `TurnContext`). With several client tool calls in one turn it waits for all results before a single continuation; an immediate resume request attaches to a pending continuation instead of starting a duplicate.
- Durable recovery is always on: a turn paused on an approval prompt or a client tool call is parked, not failed, when the Durable Object is evicted; the eventual approval or result resumes the conversation.
- Multi-tab: streaming responses and tool-call states (pending, result, approval) are broadcast to all connected WebSocket clients; programmatic `chat()` turns and `clearMessages()` also broadcast.
- Distinction: `useAgentChat` is from `@cloudflare/ai-chat/react` (chat agents, sibling agent-class category); AI SDK UI hooks belong to `vercel-ai-sdk`.

### onToolCall and message concurrency

```ts
useAgentChat({
	agent,
	onToolCall: async ({ toolCall, addToolOutput }) => {
		if (toolCall.toolName === "read") {
			const result = await readFromBrowser(toolCall.input);
			addToolOutput({
				toolCallId: toolCall.toolCallId,
				output: result,
			});
		}
	},
});
```

`readFromBrowser` is your own function.

```ts
import { Think } from "@cloudflare/think";
import type { MessageConcurrency } from "@cloudflare/think";

export class SearchAgent extends Think<Env> {
	override messageConcurrency: MessageConcurrency = "latest";
}
```

### Client tools over sub-agent RPC chat()

```ts
await child.chat(message, callback, {
	signal,
	clientTools: [
		{
			name: "get_user_timezone",
			description: "Get the caller's timezone",
			parameters: { type: "object" },
		},
	],
	onClientToolCall: async ({ toolName, input }) => {
		// Run the client tool wherever the parent can — return its output.
		return runClientTool(toolName, input);
	},
});
```

## Related

- [think-sub-agents-submissions.md](./think-sub-agents-submissions.md)
- [think-tools.md](./think-tools.md)
- [think-recovery.md](./think-recovery.md)
