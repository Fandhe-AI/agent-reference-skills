---
source: https://developers.cloudflare.com/agents/harnesses/think/
---

# Think overview and turn APIs (Experimental)

`@cloudflare/think` is an opinionated chat-agent base class: provide a model with `getModel()` and Think wires the agentic loop, message persistence, streaming, client tools, stream resumption, and extensions, all backed by Durable Object SQLite. It works as a top-level agent (WebSocket chat via `useAgentChat`) and as a sub-agent driven over RPC via `chat()`.

## Signature / Usage

```ts
import { Think } from "@cloudflare/think";
import { createAI } from "agents/models/ai-sdk";
import { routeAgentRequest } from "agents";

export class MyAgent extends Think<Env> {
	getModel() {
		return createAI({ binding: this.env.AI })("@cf/moonshotai/kimi-k2.6");
	}
}

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

```sh
npm i @cloudflare/think @cloudflare/computer @cloudflare/ai-chat agents ai zod @ai-sdk/provider
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "ai": {
    "binding": "AI"
  },
  "durable_objects": {
    "bindings": [
      {
        "class_name": "MyAgent",
        "name": "MyAgent"
      }
    ]
  },
  "migrations": [
    {
      "new_sqlite_classes": [
        "MyAgent"
      ],
      "tag": "v1"
    }
  ]
}
```

Tracing: Think uses `wrapAISDK()` internally; to send `invoke_agent`, `chat`, `execute_tool`, and `tool_approval` spans to Workers Observability, enable Workers traces:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "observability": {
    "traces": {
      "enabled": true
    }
  }
}
```

## Options / Props

### runTurn() modes (experimental)

`runTurn(options)` is the unified turn-admission API; `options.mode` selects the mode.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mode: "wait"` | returns `Promise<TurnResult>` | default mode | Caller blocks until the model response finishes. Shortcut for `saveMessages()`. |
| `mode: "submit"` | returns `Promise<SubmitMessagesResult>` | — | Fast durable acceptance, status later. Shortcut for `submitMessages()`. Does not accept function input. |
| `mode: "stream"` | returns `Promise<void>` | — | Streams to a `callback` (`onStart`, `onEvent`, `onDone`, `onError`). Shortcut for `chat()`. |
| `input` | `string \| UIMessage \| UIMessage[] \| (current) => UIMessage[]` | — | Function form only in `wait` and `stream` modes. |
| `continuation` | `boolean` | — | Continue the last assistant turn instead of sending input. |
| `idempotencyKey`, `submissionId` | `string` | — | Dedupe key(s) for `submit`. |
| `channel` | `string` | — | Run on a configured channel (see think-channels-messengers.md). |

### Pick a shortcut

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `useAgentChat` | client hook | — | A browser user sends chat messages over the WebSocket chat protocol. |
| `saveMessages()` | method | — | Server code can wait for the model response. |
| `submitMessages()` | method | — | Fast durable acceptance and later status. |
| `getScheduledTasks()` | method | — | Recurring prompt-driven turns or handlers. |
| `subAgent(...).chat()` | method | — | Direct streaming RPC to a specific child. |
| `agentTool()` / `runAgentTool()` | methods | — | Parent delegates to a retained child agent. |
| `startFiber()` | method | — | Wrap a turn with idempotent app-owned side effects. |
| `addMessages()` | method | — | Add context/messages without a model turn. |
| `continueLastTurn()` | method | — | Advanced subclass/recovery continuation. |

### Think vs AIChatAgent

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Minimal subclass | — | — | AIChatAgent ~15 lines; Think 3 lines (`getModel()` only). |
| Storage | — | — | AIChatAgent flat SQL table; Think Session (tree-structured messages, context blocks, compaction, FTS5). |
| Regeneration | — | — | AIChatAgent destructive; Think non-destructive branching. |
| Context management | — | — | AIChatAgent manual; Think context blocks with LLM-writable persistent memory. |
| Sub-agent RPC | — | — | AIChatAgent not built in; Think `chat()` with `StreamCallback`. |
| Compaction | — | — | AIChatAgent `maxPersistedMessages` (deletes oldest); Think non-destructive summaries via overlays. |
| Search | — | — | AIChatAgent none; Think FTS5 per-session and cross-session. |

## Notes

- Think supports AI SDK v6 and v7: use `ai@^6` with `@ai-sdk/react@^3`, or `ai@^7` with `@ai-sdk/react@^4`; keep AI SDK packages on matching majors. (The Configuration page lists `ai` as "AI SDK v6" under peer dependencies; use the version pairing above.)
- `runTurn()` is stable in shape but experimental. Blocking modes (`wait`/`stream`/continuation) cannot be called from inside an active turn (for example from a tool's `execute`); doing so throws because it would deadlock the turn queue. From inside a turn use `runTurn({ mode: "submit" })` or `addMessages()`.
- `submit` is idempotent: re-submitting a known `submissionId`/`idempotencyKey` returns the existing record with `accepted: false`. The `wait`, `stream`, and drained `submit` paths run inside a recovery fiber so an interrupted turn resumes after eviction. Exported types: `RunTurnOptions`, `RunTurnWait`, `RunTurnSubmit`, `RunTurnStream`, `TurnInputMessages`, `TurnResult`.
- `addMessages()` appends/upserts into the Session tree without inference and without entering the turn queue (safe inside a tool's `execute`). Entries append linearly; the first attaches to the latest committed leaf unless `parentId` (or `null` for root) is passed. Appends are idempotent by message id; `{ mode: "upsert" }` updates in place. Supported pattern: add context, then `runTurn()`.
- `chat()` is for low-level parent-to-child streaming where your code owns forwarding, cancellation, and replay; "agents as tools" gives retained child runs, event replay, abort bridging, and UI drill-in. `startFiber()` suits app-owned jobs around a turn; Think submissions own conversation admission and turn serialization.
- Choose AIChatAgent when you need full control over the LLM call (RAG, multi-model, custom streaming), a `Response` return type, or a simple stateless chatbot. Choose Think for fast setup, persistent memory, long conversations with compaction, conversation search, sub-agent systems, proactive agents, or durable async submission.
- Think's design is inspired by Pi. Example: https://github.com/cloudflare/agents/tree/main/examples/assistant.
- The `routeAgentRequest(request, env)` example is unauthenticated; add `onBeforeConnect` / `onBeforeRequest` checks before exposing a Think agent (routing-authentication reference).
- Distinction: `Agent`, `AIChatAgent`, Sessions, `subAgent()`, fibers (`startFiber`/`runFiber`) are documented in the sibling agent-class and runtime categories of this skill. Workers AI models come from the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); AI SDK provider packages and their native APIs belong to the provider skills (e.g. `vercel-ai-sdk`, `openai-api-core`, `anthropic-api-core`).

### runTurn examples

```ts
export class Assistant extends Think<Env> {
	async examples(inboundEventId: string) {
		// wait — block for the result
		const result = await this.runTurn({ input: "Summarize the latest thread" });
		if (result.status === "completed") {
			// result.message is the assistant message; result.continuation is false
		}

		// submit — durable acceptance, check status later
		const submission = await this.runTurn({
			mode: "submit",
			input: "Process this webhook",
			idempotencyKey: inboundEventId, // dedupe; safe to retry
		});
		// submission.accepted is true on first accept; submission.status is "pending"

		// stream — drive a callback (the same surface as chat())
		await this.runTurn({
			mode: "stream",
			input: "Stream me",
			callback: {
				onStart({ requestId }) {},
				onEvent(json) {}, // UIMessageChunk JSON
				onDone() {},
				onError(error) {},
			},
		});

		// continuation — continue the last assistant turn instead of sending input
		await this.runTurn({ continuation: true });
	}
}
```

### addMessages

```ts
export class Assistant extends Think<Env> {
	async importContext() {
		await this.addMessages([
			{
				id: crypto.randomUUID(),
				role: "user",
				parts: [{ type: "text", text: "Imported context" }],
			},
		]);
	}
}
```

## Related

- [think-getting-started.md](./think-getting-started.md)
- [think-configuration.md](./think-configuration.md)
- [think-tools.md](./think-tools.md)
- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)
- [think-sub-agents-submissions.md](./think-sub-agents-submissions.md)
- [think-recovery.md](./think-recovery.md)
- [overview.md](./overview.md)
