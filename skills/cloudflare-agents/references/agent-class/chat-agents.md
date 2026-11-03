---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/chat-agents/
---

# Chat agents (AIChatAgent / useAgentChat)

`AIChatAgent` (`@cloudflare/ai-chat`) extends `Agent` with SQLite message persistence, resumable streaming, tool support (server, client, approval) and multi-client sync. `useAgentChat` is the React hook that wraps the AI SDK `useChat` over the Agent WebSocket.

## Signature / Usage

Install: `npm i @cloudflare/ai-chat agents ai @ai-sdk/react @ai-sdk/provider`.

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import { createAI } from "agents/models/ai-sdk";
import { streamText, convertToModelMessages } from "ai";

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		// Use any AI SDK provider, such as createAI from agents/models/ai-sdk, openai, anthropic, or google.
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			messages: await convertToModelMessages(this.messages),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

Client:

```tsx
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

function Chat() {
	const agent = useAgent({ agent: "ChatAgent" });
	const { messages, sendMessage, status } = useAgentChat({ agent });

	return (
		<div>
			{messages.map((msg) => (
				<div key={msg.id}>
					<strong>{msg.role}:</strong>
					{msg.parts.map((part, i) =>
						part.type === "text" ? <span key={i}>{part.text}</span> : null,
					)}
				</div>
			))}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					const input = e.currentTarget.elements.namedItem(
						"input",
					) as HTMLInputElement;
					sendMessage({ text: input.value });
					input.value = "";
				}}
			>
				<input name="input" placeholder="Type a message..." />
				<button type="submit" disabled={status !== "ready"}>
					Send
				</button>
			</form>
		</div>
	);
}
```

Wrangler (the `new_sqlite_classes` migration is required):

```jsonc
// wrangler.jsonc
{
	"ai": { "binding": "AI" },
	"durable_objects": {
		"bindings": [{ "name": "ChatAgent", "class_name": "ChatAgent" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["ChatAgent"] }],
}
```

Cancellation (forward the signal):

```ts
export class ChatAgent extends AIChatAgent {
	async onChatMessage(_onFinish, options) {
		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			messages: await convertToModelMessages(this.messages),
			abortSignal: options?.abortSignal, // Pass through for cancellation
		});

		return result.toUIMessageStreamResponse();
	}
}
```

Server tool, client tool and approval:

Adapted (not in the official docs): the source shows the server tool snippets as separate `tools: {...};` fragments (the client-side one with a stray semicolon inside an object literal), which is invalid code; they are merged into the valid `tools` object below (see Notes).

```ts
import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";
import { z } from "zod";

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			messages: await convertToModelMessages(this.messages),
			tools: {
				getWeather: tool({
					description: "Get weather for a city",
					inputSchema: z.object({ city: z.string() }),
					execute: async ({ city }) => {
						const data = await fetchWeather(city);
						return { temperature: data.temp, condition: data.condition };
					},
				}),
				// No execute — the client handles it via onToolCall
				getLocation: tool({
					description: "Get the user's location from the browser",
					inputSchema: z.object({}),
				}),
				processPayment: tool({
					description: "Process a payment",
					inputSchema: z.object({
						amount: z.coerce.number(),
						recipient: z.string(),
					}),
					needsApproval: async ({ amount }) => amount > 100,
					execute: async ({ amount, recipient }) => charge(amount, recipient),
				}),
			},
			stopWhen: stepCountIs(5),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

```ts
const { messages, sendMessage } = useAgentChat({
	agent,
	onToolCall: async ({ toolCall, addToolOutput }) => {
		if (toolCall.toolName === "getLocation") {
			const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject),
			);
			addToolOutput({
				toolCallId: toolCall.toolCallId,
				output: { lat: pos.coords.latitude, lng: pos.coords.longitude },
			});
		}
	},
});

// Reject with a custom error message
addToolOutput({
	toolCallId: part.toolCallId,
	state: "output-error",
	errorText: "User declined: insufficient budget for this quarter",
});

addToolApprovalResponse({ id: approval.id, approved: true });
```

Recovery:

```ts
import type {
	ChatRecoveryContext,
	ChatRecoveryOptions,
} from "@cloudflare/ai-chat";

export class ChatAgent extends AIChatAgent {
	override chatRecovery = {
		maxAttempts: 10,
		stableTimeoutMs: 10_000,
		terminalMessage: "The assistant was interrupted and could not recover.",
		noProgressTimeoutMs: 5 * 60 * 1000,
		maxRecoveryWork: 2000,
		maxInterruptedAttempts: 5,
		async shouldKeepRecovering(ctx) {
			return (await getSpendForTurn(ctx.recoveryRootRequestId)) < MAX_SPEND;
		},
		async onExhausted(ctx) {
			console.warn("Chat recovery exhausted", ctx.incidentId, ctx.reason);
		},
	};

	override async onChatRecovery(
		ctx: ChatRecoveryContext,
	): Promise<ChatRecoveryOptions> {
		console.log(`Recovered ${ctx.partialText.length} chars of partial text`);

		// Default: persist partial + schedule continuation
		return {};
	}
}
```

## Options / Props

`AIChatAgent` members:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onChatMessage(onFinish, options)` | method | — | Override; return a `Response`. `options`: `abortSignal`, `body`, `requestId`, `continuation`, `clientTools` |
| `this.messages` | `UIMessage[]` | — | Conversation history from SQLite |
| `maxPersistedMessages` | `number` | — | Cap stored messages (oldest deleted); does not affect what is sent to the LLM |
| `waitForMcpConnections` | `{ timeout: number } \| boolean` | `{ timeout: 10_000 }` | `true` waits indefinitely, `false` does not wait |
| `messageConcurrency` | `"queue" \| "latest" \| "merge" \| "drop" \| { strategy: "debounce", debounceMs?: number }` | `"queue"` | Overlapping `sendMessage()` handling (debounce window default 750ms) |
| `persistMessages(messages)` | method | — | Store and broadcast without a model turn |
| `saveMessages(messagesOrUpdater, options?)` | method | — | Persist and trigger `onChatMessage`; returns `{ requestId, status }` |
| `onChatResponse(result)` | hook | — | After a turn persists an assistant message; `ChatResponseResult` fields `message`, `requestId`, `continuation`, `status`, `error` |
| `sanitizeMessageForPersistence(message)` | method | — | Custom transform after built-in sanitization |
| `hasPendingInteraction()` / `waitUntilStable({ timeout })` / `resetTurnState()` | method | — | Turn lifecycle helpers |
| `abortRequest(requestId, reason?)` / `abortAllRequests()` | protected | — | Cancel turns inside the DO |
| `continueLastTurn(body?, options?)` | protected | — | Append to the last assistant message |
| `this.stash(data)` | method | — | Recovery data, read as `ctx.recoveryData` in `onChatRecovery` |

`chatRecovery` fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxAttempts` | `number` | `10` | Attempt cap before terminal exhaustion; resets on progress |
| `stableTimeoutMs` | `number` | `10_000` | Wait for stable state before rescheduling |
| `terminalMessage` | `string` | generic message | Shown when recovery is given up |
| `noProgressTimeoutMs` | `number` | `300_000` | Stuck-turn bound; resets on every progress-bearing attempt |
| `maxRecoveryWork` | `number` | `10,000` | Runaway-loop guard; `Infinity` removes it |
| `maxInterruptedAttempts` | `number` | `5` | Attempts that may die before giving up (replaces `maxOomRetries`) |
| `shouldKeepRecovering(ctx)` | function | — | Return `false` to stop; enforce cost budgets here |
| `onExhausted(ctx)` | function | — | Called once when giving up; `ctx.reason` |

`ctx.reason` values: `no_progress_timeout`, `max_attempts_exceeded`, `work_budget_exceeded`, `interrupted_attempts_exceeded`, `out_of_memory`, `recovery_aborted`, `stable_timeout`. `ChatRecoveryOptions`: `persist` (default `true`), `continue` (default `true`).

`useAgentChat` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agent` | `ReturnType<typeof useAgent>` | — | Required |
| `onToolCall` | `({ toolCall, addToolOutput }) => void` | — | Client-side tool execution |
| `tools` | `Record<string, AITool>` | — | Dynamically registered client tools |
| `autoContinueAfterToolResult` | `boolean` | `true` | Auto-continue after tool results/approvals |
| `resume` | `boolean` | `true` | Automatic stream resumption on reconnect |
| `cancelOnClientAbort` | `boolean` | `false` | Cancel the server turn on client abort |
| `body` | `object \| () => object` | — | Custom data sent with every request |
| `prepareSendMessagesRequest` | `(options) => { body?, headers? }` | — | Per-request customization |
| `getInitialMessages` | `(options) => Promise<UIMessage[]> \| null` | — | Custom loader; `null` skips the HTTP fetch |
| `syncMessagesToServer` | `boolean` | `true` | Whether `setMessages` pushes to the server |

Return values: `messages`, `sendMessage`, `clearHistory`, `addToolOutput`, `addToolApprovalResponse`, `setMessages`, `status` (`"ready" | "submitted" | "streaming" | "error"`), `isStreaming`, `isServerStreaming`, `isToolContinuation`, `isRecovering`.

Exports: `@cloudflare/ai-chat` (`AIChatAgent`, `createToolsFromClientSchemas`, recovery types), `@cloudflare/ai-chat/react` (`useAgentChat`, `extractClientToolSchemas`, `getToolPartState`, `getToolCallId`, `getToolInput`, `getToolOutput`, `getToolApproval`), `@cloudflare/ai-chat/types`, `agents/chat`, `agents/chat/transport`.

WebSocket protocol messages: `CF_AGENT_USE_CHAT_REQUEST`, `CF_AGENT_USE_CHAT_RESPONSE`, `CF_AGENT_CHAT_MESSAGES`, `CF_AGENT_CHAT_CLEAR`, `CF_AGENT_CHAT_REQUEST_CANCEL`, `CF_AGENT_TOOL_RESULT`, `CF_AGENT_TOOL_APPROVAL`, `CF_AGENT_MESSAGE_UPDATED`, `CF_AGENT_STREAM_RESUMING`, `CF_AGENT_STREAM_RESUME_REQUEST`, `CF_AGENT_STREAM_RESUME_ACK`, `CF_AGENT_STREAM_RESUME_NONE`.

Deprecated: `addToolResult` -> `addToolOutput`; `detectToolsRequiringConfirmation()` and `toolsRequiringConfirmation` -> `needsApproval` on the tool.

## Notes

- Corrected from the official docs: the server-tool, client-tool and approval examples were separate fragments, the client-tool one with an invalid `;` inside the object literal. They are combined into one valid `tools` object.
- Plain-text responses are allowed: return `new Response("...", { headers: { "Content-Type": "text/plain" } })`.
- If `abortSignal` is not forwarded to `streamText`, the LLM call keeps running after the user cancels.
- Stream `resume` is client reconnect recovery only; it does not cover DO eviction. Durable recovery wraps every `AIChatAgent` and Think turn in `runFiber()` and is always on; `chatRecovery` only tunes budgets. A turn waiting on a human (client tool or approval) is exempt from recovery budgets.
- Default recovery persists the partial and continues via `continueLastTurn()`. Strategies by provider: Workers AI uses `continueLastTurn()` (assistant prefill); OpenAI Responses API retrieves the completed response by ID; Anthropic persists the partial and sends a synthetic user message. `{ persist: false }` never drops settled tool results.
- `addToolApprovalResponse({ approved: false })` auto-continues; `addToolOutput` with `state: "output-error"` does not (call `sendMessage()`).
- Non-React clients use `WebSocketChatTransport`, which covers new/regenerated turns and cancellation but not history loading, stream resume, cross-tab sync or client-tool continuations.
- Custom request data, data parts, resumable streaming, storage limits, provider setup, `prepareStep`, language-model middleware, structured output and in-process subagent delegation are in [chat-agents-advanced.md](./chat-agents-advanced.md). The AI SDK itself is covered by the vercel-ai-sdk skill.
- `fetchWeather`, `charge`, `getSpendForTurn`, `MAX_SPEND`, `ai`, `part`, `approval` are placeholders.
- Helper sections: observability channel `chat` event `chat:recovery:exhausted`; `cf_agent_chat_recovering` status frame drives `isRecovering`.

## Related

- [Chat agents: advanced](./chat-agents-advanced.md)
- [Autonomous responses](./autonomous-responses.md)
- [Durable execution](./durable-execution.md)
- [Client SDK](./client-sdk.md)
- [Agents as tools](./agent-tools.md)
