---
source: https://developers.cloudflare.com/agents/harnesses/think/lifecycle-hooks/
---

# Think lifecycle hooks

Think owns the `streamText` call and provides hooks at each stage of a chat turn. Hooks fire on every turn regardless of entry path: WebSocket chat, sub-agent `chat()`, `saveMessages()`, durable `submitMessages()` execution, `continueLastTurn()`, and auto-continuation after tool results.

## Signature / Usage

```ts
beforeTurn(ctx: TurnContext): TurnConfig | void | Promise<TurnConfig | void>

beforeTurn(ctx: TurnContext) {
	if (ctx.continuation) {
		return { model: this.cheapModel };
	}
}
```

`this.cheapModel` is a `LanguageModel` field you define.

## Options / Props

### Hook summary

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `configureSession(session)` | returns `Session` (async ok) | — | Once during `onStart`, not per turn. |
| `beforeTurn(ctx)` | `TurnConfig \| void` | — | Before `streamText`. |
| `beforeStep(ctx)` | `StepConfig \| void` | — | Before each model step (forwarded as `prepareStep`). |
| `beforeToolCall(ctx)` | `ToolCallDecision \| void` | — | Before a server-side tool executes. |
| `afterToolCall(ctx)` | `void` | — | After a tool outcome is known (executed, blocked, substituted, thrown). |
| `onStepFinish(ctx)` | `void` | — | After each step (`StepContext` = AI SDK step-finish event). |
| `onChunk(ctx)` | `void` | — | Per streaming chunk; high frequency, observational. |
| `onChatResponse(result)` | `void` | — | After the turn completes and the message is persisted; turn lock already released. |
| `onChatError(error, ctx?)` | error to propagate (sync) | — | On error during a turn. |
| `classifyChatError(error, ctx?)` | `ChatErrorClassification \| void` (sync) | — | Before `onChatError`, only when `contextOverflow.reactive` is enabled. |

### TurnContext

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `system` | `string` | — | Assembled system prompt. |
| `messages` | `ModelMessage[]` | — | Assembled (truncated, pruned) messages. |
| `tools` | `ToolSet` | — | Merged tool set. |
| `model` | `LanguageModel` | — | Model from `getModel()`. |
| `continuation` | `boolean` | — | Auto-continue turn after a tool result. |
| `body` | `Record<string, unknown>` | — | Custom body fields from the client request. |

### TurnConfig (all optional)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `LanguageModel` | — | Override model for this turn. |
| `system` | `string` | — | Override system prompt. |
| `messages` | `ModelMessage[]` | — | Override assembled messages. |
| `tools` | `ToolSet` | — | Extra tools (additive). |
| `activeTools` | `string[]` | — | Limit callable tools. |
| `toolChoice` | `ToolChoice` | — | Force a specific tool call. |
| `maxSteps` | `number` | — | Override `maxSteps` for this turn. |
| `sendReasoning` | `boolean` | — | Send reasoning chunks this turn. |
| `chatStreamStallTimeoutMs` | `number` | — | Override the stall watchdog for this turn (`0` disables); auto-resets. |
| `output` | `Output` | — | Structured output for this turn (turn-level only). |
| `providerOptions` | `Record<string, unknown>` | — | Provider-specific options. |
| `experimental_telemetry` | `object` | — | AI SDK telemetry settings. |
| `experimental_transform` | `StreamTextTransform \| StreamTextTransform[]` | — | Stream transform(s), applied in order. |

### ToolCallDecision (return of `beforeToolCall`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `void` or `{ action: "allow" }` | — | — | Run the original tool and input. |
| `{ action: "allow", input }` | — | — | Run with modified input. |
| `{ action: "block", reason }` | — | — | Skip the tool; return `reason` as result. |
| `{ action: "substitute", output }` | — | — | Skip the tool; return `output` as result. |

`ToolCallContext`: `toolName`, `input`, `toolCallId`, `messages`, `abortSignal`. `ToolCallResultContext` adds `durationMs`, `success`, `output` (when successful), `error` (when not).

### ChatResponseResult and ChatErrorContext

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `UIMessage` | — | Persisted assistant message. |
| `requestId` | `string` | — | Turn id. |
| `continuation` | `boolean` | — | Continuation turn. |
| `status` | `"completed" \| "error" \| "aborted"` | — | How the turn ended. |
| `error` | `string?` | — | Message when `status` is `"error"`. |
| `stage` (ChatErrorContext) | `"parse" \| "persist" \| "turn" \| "stream" \| "recovery" \| "transcript"` | — | Failure stage. |
| `messagesPersisted` (ChatErrorContext) | `boolean` | — | Whether incoming user messages were stored. |
| `classification` (ChatErrorContext) | `ChatErrorClassification \| undefined` | — | `"context_overflow"` on the terminal `onChatError` when overflow could not be recovered. |

## Notes

- Corrected from the official docs: the source's read-only mode blocks only `ctx.toolName === "delete"`, so `write`, `edit`, `exec`, `publish`, and any custom or MCP tool with side effects still run. A deny-list naming one mutating tool cannot make an agent read-only; the fence allows `read`, `ls`, `find`, and `grep` (the read-only workspace tools in think-tools.md) and blocks everything else. Add your own read-only tools to the set explicitly.
- Order: `configureSession()` once at startup, then per turn `beforeTurn()`, then per step `beforeStep()`, `onChunk()`, `beforeToolCall()`, tool executes, `afterToolCall()`, `onStepFinish()`, repeating while steps remain, then `onChatResponse()`.
- `beforeStep` is for decisions depending on step number or previous results; `output` cannot be toggled per step (the AI SDK `prepareStep` does not accept it).
- Hooks may reference your own fields (`this.cheapModel`, `this.isReadOnlyMode`, `this.weatherCache`, `this.env.ANALYTICS`); they are illustrative and must be defined by you.
- `ctx.body` fields come from the client request and are untrusted; for example, appending `ctx.body.selectedFile` to the system prompt is a prompt-injection surface, so validate or restrict it. Do not use `ctx.body` to make authorization decisions.
- If a wrapped tool returns an `AsyncIterable` for preliminary results, `beforeToolCall` collapses it to its final value. Blocked and substituted calls report `success: true` in `afterToolCall` because the model receives a valid result; only thrown errors are `success: false`.
- `onChatError`: partial assistant message is persisted before it fires; Think also emits `chat:request:failed` on the `agents:chat` observability channel. `classifyChatError` may receive an `Error`, an AI SDK `APICallError`, or the error message string (in-stream provider errors). Only `"context_overflow"` has an effect today; `"rate_limit"`, `"transient"`, `"fatal"`, `"unknown"` are reserved no-ops. `defaultContextOverflowClassifier` covers Anthropic, OpenAI, Google, Bedrock, and others.
- Distinction: AI SDK stream/step types are from the `vercel-ai-sdk` skill; `Agent` lifecycle (`onStart`, `onRequest`) is in the sibling agent-class category.

### More beforeTurn / beforeStep / tool-call examples

Adapted (not in the official docs): read-only mode allows only the read-only workspace tools and blocks every other tool, instead of blocking only `delete`. See Notes.

```ts
beforeTurn(ctx: TurnContext) {
	return { activeTools: ["read", "write", "getWeather"] };
}

import { Output } from "ai";
import { z } from "zod";

const ResultSchema = z.object({ severity: z.enum(["low", "high"]) });

beforeTurn(ctx: TurnContext) {
	if (ctx.body?.mode === "structured-answer") {
		return {
			output: Output.object({ schema: ResultSchema }),
			activeTools: [],
		};
	}
}

beforeStep(ctx: PrepareStepContext): StepConfig | void {
	if (ctx.stepNumber > 0) {
		return { activeTools: [] };
	}
}

// Allowlist: in read-only mode only these tools may run.
const READ_ONLY_TOOLS = new Set(["read", "ls", "find", "grep"]);

beforeToolCall(ctx: ToolCallContext): ToolCallDecision | void {
	if (this.isReadOnlyMode && !READ_ONLY_TOOLS.has(ctx.toolName)) {
		return {
			action: "block",
			reason: `${ctx.toolName} is disabled in read-only mode`,
		};
	}

	if (ctx.toolName === "weather") {
		const cached = this.weatherCache.get(JSON.stringify(ctx.input));
		if (cached) return { action: "substitute", output: cached };
	}
}

afterToolCall(ctx: ToolCallResultContext) {
	if (!ctx.success) return;

	this.env.ANALYTICS.writeDataPoint({
		blobs: [ctx.toolName],
		doubles: [JSON.stringify(ctx.output).length],
	});
}
```

(The `import` lines and module-level constants such as `READ_ONLY_TOOLS` belong at the top of your module; the methods belong in your `Think` subclass.)

### onStepFinish, onChatResponse, onChatError

```ts
onStepFinish(ctx: StepContext) {
	console.log(
		`Step ${ctx.stepNumber} (${ctx.finishReason}): ` +
			`${ctx.usage.inputTokens}in/${ctx.usage.outputTokens}out`,
	);
}

onChatResponse(result: ChatResponseResult) {
	if (result.status === "completed") {
		console.log(`Turn ${result.requestId}: ${result.message.parts.length} parts`);
	}
}

onChatError(error: unknown, ctx?: ChatErrorContext) {
	console.error("Chat turn failed:", ctx?.stage, error);
	if (ctx?.classification === "context_overflow") {
		return new Error("This conversation is too long to continue. Please start a new one.");
	}
	return new Error("Something went wrong. Please try again.");
}
```

### classifyChatError

```ts
import type { ChatErrorClassification } from "@cloudflare/think";
import { Think, defaultContextOverflowClassifier } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	override classifyChatError(error: unknown): ChatErrorClassification | void {
		if (error instanceof Error && /rate.?limit/i.test(error.message)) {
			return "rate_limit";
		}
		return defaultContextOverflowClassifier(error);
	}
}
```

## Related

- [think-recovery.md](./think-recovery.md)
- [think-tools.md](./think-tools.md)
- [think-configuration.md](./think-configuration.md)
- [think-client-tools.md](./think-client-tools.md)
