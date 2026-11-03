---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/chat-agents/
---

# Chat agents: data parts, streaming, providers and advanced patterns

Continuation of the chat-agents page for `AIChatAgent`: custom request data, typed data parts, resumable streaming, storage limits, provider setup, and AI SDK patterns inside `onChatMessage` (prepareStep, middleware, structured output, in-process subagents).

## Signature / Usage

Custom request data:

Adapted (not in the official docs): a comment is added that `options.body` is client-controlled (see Notes).

```ts
const { messages, sendMessage } = useAgentChat({
	agent,
	body: {
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		userId: currentUser.id,
	},
});

// Server
export class ChatAgent extends AIChatAgent {
	async onChatMessage(_onFinish, options) {
		// options.body is client-controlled: use it for preferences such as
		// timezone, never as an identity. Derive the user from the authenticated
		// connection/route (the Agent name), not from body.userId.
		const { timezone, userId } = options?.body ?? {};
		// ...
	}
}
```

Per-request headers:

```ts
const { messages, sendMessage } = useAgentChat({
	agent,
	prepareSendMessagesRequest: async ({ messages, trigger }) => ({
		headers: { Authorization: `Bearer ${await getToken()}` },
		body: { requestedAt: Date.now() },
	}),
});
```

Writing data parts on the server:

```ts
import {
	streamText,
	convertToModelMessages,
	createUIMessageStream,
	createUIMessageStreamResponse,
} from "ai";

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const ai = createAI({ binding: this.env.AI });

		const stream = createUIMessageStream({
			execute: async ({ writer }) => {
				const result = streamText({
					model: ai("@cf/zai-org/glm-4.7-flash"),
					messages: await convertToModelMessages(this.messages),
				});

				// Merge the LLM stream
				writer.merge(result.toUIMessageStream());

				// Write a data part — persisted to message.parts
				writer.write({
					type: "data-sources",
					id: "src-1",
					data: { query: "agents", status: "searching", results: [] },
				});

				// Later: update the same part in-place (same type + id)
				writer.write({
					type: "data-sources",
					id: "src-1",
					data: {
						query: "agents",
						status: "found",
						results: ["Agents SDK docs", "Durable Objects guide"],
					},
				});
			},
		});

		return createUIMessageStreamResponse({ stream });
	}
}
```

Reading typed data parts and transient parts:

```ts
import { useAgentChat } from "@cloudflare/ai-chat/react";
import type { UIMessage } from "ai";

type ChatMessage = UIMessage<
	unknown,
	{
		sources: { query: string; status: string; results: string[] };
		usage: { model: string; inputTokens: number; outputTokens: number };
	}
>;

const { messages } = useAgentChat<unknown, ChatMessage>({ agent });

// Typed access — no casts needed
for (const msg of messages) {
	for (const part of msg.parts) {
		if (part.type === "data-sources") {
			console.log(part.data.results); // string[]
		}
	}
}

const [thinking, setThinking] = useState(false);

const { messages: m2 } = useAgentChat<unknown, ChatMessage>({
	agent,
	onData(part) {
		if (part.type === "data-thinking") {
			setThinking(true);
		}
	},
});
```

```ts
writer.write({
	transient: true,
	type: "data-thinking",
	data: { model: "glm-4.7-flash", startedAt: new Date().toISOString() },
});
```

Resumable streaming and stop:

```tsx
const { messages, stop } = useAgentChat({ agent });

return <button onClick={stop}>Stop</button>;

// Disable resume
const { messages: m3 } = useAgentChat({ agent, resume: false });
```

Context vs storage:

```ts
export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			messages: pruneMessages({
				// LLM context limit
				messages: await convertToModelMessages(this.messages),
				reasoning: "before-last-message",
				toolCalls: "before-last-2-messages",
			}),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

Providers (inside `onChatMessage`):

```ts
import { createAI } from "agents/models/ai-sdk";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const ai = createAI({ binding: this.env.AI });
const workersAi = streamText({
	model: ai("@cf/zai-org/glm-4.7-flash"),
	messages: await convertToModelMessages(this.messages),
});

const openai = createOpenAI({ apiKey: this.env.OPENAI_API_KEY });
const viaOpenAI = streamText({
	model: openai.chat("gpt-4o"),
	messages: await convertToModelMessages(this.messages),
});

const anthropic = createAnthropic({ apiKey: this.env.ANTHROPIC_API_KEY });
const viaAnthropic = streamText({
	model: anthropic("claude-sonnet-4-20250514"),
	messages: await convertToModelMessages(this.messages),
});
```

`prepareStep` loop control:

```ts
import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";
import { z } from "zod";

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const result = streamText({
			model: cheapModel, // Default model for simple steps
			messages: await convertToModelMessages(this.messages),
			tools: {
				search: searchTool,
				analyze: analyzeTool,
				summarize: summarizeTool,
			},
			stopWhen: stepCountIs(10),
			prepareStep: async ({ stepNumber, messages }) => {
				// Phase 1: Search (steps 0-2)
				if (stepNumber <= 2) {
					return {
						activeTools: ["search"],
						toolChoice: "required", // Force tool use
					};
				}

				// Phase 2: Analyze with a stronger model (steps 3-5)
				if (stepNumber <= 5) {
					return {
						model: expensiveModel,
						activeTools: ["analyze"],
					};
				}

				// Phase 3: Summarize
				return { activeTools: ["summarize"] };
			},
		});

		return result.toUIMessageStreamResponse();
	}
}
```

Language model middleware:

```ts
import { streamText, convertToModelMessages, wrapLanguageModel } from "ai";
import type { LanguageModelV3Middleware } from "@ai-sdk/provider";

const guardrailMiddleware: LanguageModelV3Middleware = {
	wrapGenerate: async ({ doGenerate }) => {
		const { text, ...rest } = await doGenerate();
		// Filter PII or sensitive content from the response
		const cleaned = text?.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED]");
		return { text: cleaned, ...rest };
	},
};

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const model = wrapLanguageModel({
			model: baseModel,
			middleware: [guardrailMiddleware],
		});

		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

Structured output inside a tool:

```ts
import {
	streamText,
	generateObject,
	convertToModelMessages,
	tool,
	stepCountIs,
} from "ai";
import { z } from "zod";

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const result = streamText({
			model: myModel,
			messages: await convertToModelMessages(this.messages),
			tools: {
				extractContactInfo: tool({
					description:
						"Extract structured contact information from the conversation",
					inputSchema: z.object({
						text: z.string().describe("The text to extract contact info from"),
					}),
					execute: async ({ text }) => {
						const { object } = await generateObject({
							model: myModel,
							schema: z.object({
								name: z.string(),
								email: z.string().email(),
								phone: z.string().optional(),
							}),
							prompt: `Extract contact information from: ${text}`,
						});
						return object;
					},
				}),
			},
			stopWhen: stepCountIs(5),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

In-process subagent with `ToolLoopAgent` (and preliminary results):

```ts
import {
	ToolLoopAgent,
	streamText,
	convertToModelMessages,
	tool,
	stepCountIs,
} from "ai";
import { z } from "zod";

// Define a reusable research agent with its own tools and instructions
const researchAgent = new ToolLoopAgent({
	model: researchModel,
	instructions: "You are a research assistant. Be thorough and cite sources.",
	tools: { webSearch: webSearchTool },
	stopWhen: stepCountIs(10),
});

export class ChatAgent extends AIChatAgent {
	async onChatMessage() {
		const result = streamText({
			model: orchestratorModel,
			messages: await convertToModelMessages(this.messages),
			tools: {
				deepResearch: tool({
					description: "Research a topic in depth",
					inputSchema: z.object({
						topic: z.string().describe("The topic to research"),
					}),
					async *execute({ topic }) {
						// Preliminary result — the client sees "searching" immediately
						yield { status: "searching", topic, summary: undefined };

						const { text } = await researchAgent.generate({ prompt: topic });

						// Final result — sent to the model for its next step
						yield { status: "done", topic, summary: text };
					},
				}),
			},
			stopWhen: stepCountIs(5),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

## Options / Props

Data part patterns:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Reconciliation | same `type` + `id` | — | Updates in place; persisted. Progressive state (searching to found) |
| Append | no `id` or a different `id` | — | Appends; persisted. Log entries, multiple citations |
| Transient | `transient: true` | — | Not added to `message.parts` and not persisted; consumed through `onData` |

Streaming and storage controls:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `resume` | `boolean` | `true` | Buffer chunks in SQLite and resume after reconnect |
| `cancelOnClientAbort` | `boolean` | `false` | Browser abort/cleanup also cancels the server turn; explicit `stop()` always cancels |
| `maxPersistedMessages` | `number` | — | How many messages SQLite stores |
| `pruneMessages()` | AI SDK function | — | What the model sees (LLM context) |
| Row-size compaction | automatic | starts at roughly 1.8 MB | Workers SQLite rows have a hard 2 MB maximum |
| `onData(part)` | `useAgentChat` callback | — | Receives data parts including transient ones |
| `body` | `object \| () => object` | — | Custom data on every request; read as `options.body` on the server |

`prepareStep` may return overrides for `model`, `activeTools`, `toolChoice`, `system`, `messages`. Built-in AI SDK middlewares: `extractReasoningMiddleware`, `defaultSettingsMiddleware`, `simulateStreamingMiddleware`.

## Notes

- Adapted from the official docs: the custom-data example sends `userId` in `body` and reads it on the server; `body` is supplied by the client, so a comment now warns not to treat it as an identity.
- Streams resume automatically after reconnect with no configuration: chunks are buffered in SQLite, the server keeps streaming while the client is away, and a reconnecting client receives all buffered chunks and then live data. Generic client stream abort stays local to the browser, so the server turn keeps running.
- `onData` fires on new messages, stream resumption and cross-tab broadcasts.
- Row-size protection: tool output compaction first (large outputs replaced with a summary telling the model to re-run the tool), then text truncation. Compacted messages carry `metadata.compactedToolOutputs`.
- `maxPersistedMessages`, `pruneMessages()` and automatic compaction are independent controls for storage, LLM context and per-row size.
- Providers: the server decides the model, the client need not change. Keys come from `this.env` secrets (`wrangler secret put OPENAI_API_KEY`), never from code. Model IDs (`gpt-4o`, `claude-sonnet-4-20250514`, `@cf/zai-org/glm-4.7-flash`) are verbatim from the source.
- Multiple middlewares compose in order: `[first, second]` applies as `first(second(model))`. The guardrail example's `wrapGenerate` only intercepts non-streaming generation (e.g. `generateObject`/`generateText`); `streamText` uses `wrapStream`, so that middleware as written would not redact streamed output. This is a caveat on the source example, not a change to it.
- `ToolLoopAgent` is for in-process subagents, not a replacement for `streamText` in `onChatMessage` (which needs `this.env`, `this.messages`, `options.body`). The research agent has its own token budget; only the summary returns to the parent. Durable Object sub-agents are in [sub-agents.md](./sub-agents.md) and retained streaming tools in [agent-tools.md](./agent-tools.md).
- Each `yield` from an async-generator `execute` updates the client tool part with `preliminary: true`; the last yielded value is the final output.
- AI SDK concepts (`prepareStep`, `wrapLanguageModel`, `generateObject`, `ToolLoopAgent`, preliminary tool results) belong to the vercel-ai-sdk skill.
- Placeholders (defined elsewhere in an application): `pruneMessages` (exported by `ai`), `agent`, `currentUser`, `getToken`, `ai`, `cheapModel`, `expensiveModel`, `searchTool`, `analyzeTool`, `summarizeTool`, `baseModel`, `myModel`, `researchModel`, `orchestratorModel`, `webSearchTool`.
- The snippets are consecutive excerpts, not one file; JS variants from the source are omitted.

## Related

- [Chat agents](./chat-agents.md)
- [Sub-agents](./sub-agents.md)
- [Agents as tools](./agent-tools.md)
- [Client SDK](./client-sdk.md)
