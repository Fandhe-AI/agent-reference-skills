---
source: https://developers.cloudflare.com/agents/harnesses/think/recovery/
---

# Think durable recovery

Think wraps chat turns in recoverable fibers. If the Durable Object is evicted mid-stream, Think reconstructs buffered chunks, persists partial output, and schedules a continuation or retry. Recovery works without configuration; configure it for provider-specific recovery, a stall watchdog, or terminal behavior.

## Signature / Usage

```ts
export class MyAgent extends Think<Env> {
	override chatRecovery = {
		maxAttempts: 6,
		stableTimeoutMs: 10_000,
		terminalMessage: "The assistant was interrupted and could not recover.",
		async onExhausted(ctx) {
			console.warn("Chat recovery exhausted", ctx.incidentId);
		},
	};
}
```

Provider-specific recovery:

```ts
import type {
	ChatRecoveryContext,
	ChatRecoveryOptions,
} from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	override chatRecovery = {
		maxAttempts: 10,
		terminalMessage: "The assistant was interrupted. Please try again.",
	};

	override async onChatRecovery(
		ctx: ChatRecoveryContext,
	): Promise<ChatRecoveryOptions> {
		console.log("Recovering chat turn", ctx.incidentId, ctx.attempt);
		return {}; // persist partial output and continue/retry when possible
	}
}
```

## Options / Props

### `chatRecovery` fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxAttempts` | `number` | `10` | Attempt cap; resets on forward progress, so it catches a tight no-progress alarm loop. |
| `stableTimeoutMs` | `number` | `10_000` | How long an attempt waits for the isolate to reach stable state before rescheduling. |
| `noProgressTimeoutMs` | `number` | `300_000` | Primary stuck-turn bound; resets on every progress-bearing attempt. |
| `maxRecoveryWork` | `number` | `10,000` | Runaway-loop guard; use a higher value or `Infinity` for long agentic turns. |
| `maxInterruptedAttempts` | `number` | `5` | Attempts that may be interrupted (isolate died, e.g. memory-limit reset or deploy) before giving up; progress never resets the count. Replaces `maxOomRetries` (read as `maxOomRetries + 1`). |
| `shouldKeepRecovering` | `async (ctx) => boolean` | — | Consulted from the second attempt; return `false` to stop. Hook for token/cost budgets (`ctx.work` is a coarse segment count, not tokens). |
| `terminalMessage` | `string` | generic message | Shown when recovery is given up on. |
| `onExhausted` | `async (ctx) => void` | — | Called once when recovery is given up on; inspect `ctx.reason`. |

`ctx.reason` values: `no_progress_timeout`, `max_attempts_exceeded`, `work_budget_exceeded`, `interrupted_attempts_exceeded`, `out_of_memory`, `recovery_aborted`, `stable_timeout`.

### `ChatRecoveryContext`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `incidentId` | `string` | — | Stable id for the incident. |
| `attempt` | `number` | — | Current attempt, starting at 1. |
| `maxAttempts` | `number` | — | Configured cap. |
| `recoveryKind` | `"retry" \| "continue"` | — | Retry an unanswered user turn or continue a partial assistant turn. |
| `streamId`, `requestId` | `string` | — | Ids of the interrupted turn. |
| `partialText` | `string` | — | Text generated before interruption. |
| `partialParts` | `MessagePart[]` | — | Parts accumulated. |
| `recoveryData` | `unknown \| null` | — | Data from `this.stash()` during the turn. |
| `messages` | `UIMessage[]` | — | Current history. |
| `lastBody` | `Record<string, unknown>?` | — | Body from the interrupted turn. |
| `lastClientTools` | `ClientToolSchema[]?` | — | Client tools from the interrupted turn. |
| `createdAt` | `number` | — | Epoch ms when the turn started. |

### `ChatRecoveryOptions` (return of `onChatRecovery`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `persist` | `boolean?` | — | Persist the partial assistant message. |
| `continue` | `boolean?` | — | Auto-continue via `continueLastTurn()` once stable; `false` prevents another model call. |

### `contextOverflow`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `reactive` | `boolean` | off | On an error classified `"context_overflow"`, discard the partial, `session.compact()`, rerun the turn. |
| `maxRetries` | `number` | `1` | Reactive retry budget. |
| `proactive` | `{ maxInputTokens, headroom?, maxCompactions? }` | off | Compact in place when the previous step's `usage.inputTokens` (fallback `totalTokens`) crosses `maxInputTokens * (headroom ?? 0.9)`. `maxCompactions` default `1` per turn. |

## Notes

- Wrapped in `runFiber`: WebSocket turns, sub-agent `chat()`, durable `submitMessages()`, automatic continuations, `saveMessages()`, `continueLastTurn()`. A stream-stall watchdog abort (`chatStreamStallTimeoutMs`) uses the same bounded recovery path and preserves the settled partial. Events: `agents/observability` `chat` channel; transcript repairs on `transcript` channel; `chat:recovery:exhausted` on exhaustion.
- Pre-stream interruptions (`streamId === ""`, `partialText === ""`, last persisted message still the unanswered user message) are retried automatically unless `continue` is `false`. Use `ctx.createdAt` to skip stale recoveries by returning `{ continue: false }`.
- `shouldKeepRecovering` is called as `config.shouldKeepRecovering(ctx)`, so it is not bound to the agent: track spend in your own store keyed by `ctx.recoveryRootRequestId`. `getSpendForTurn` and `MAX_SPEND` below are your own definitions.
- Interrupted tool calls: before the next provider call Think flips unsettled tool calls to an errored result so the model does not silently re-run them and the provider does not raise `AI_MissingToolResultsError`. Override the protected `repairInterruptedToolPart` to customize (a returned tool part must be `output-available`, `output-error`, or `output-denied`; returning text is fine). It runs before the repaired transcript is persisted and sent.
- Overflow recovery is opt-in, requires `classifyChatError` (Think ships no provider-specific matching in core) and `configureSession()` with `onCompaction()`. Reactive terminalizes through `onChatError` with `classification: "context_overflow"` rather than looping. Both layers apply to all turn entry paths and emit `chat:context:compacted`. A no-op compaction cannot rescue an over-budget turn; for tool-heavy histories configure a `tokenCounter` on `compactAfter()`. Runnable demo: https://github.com/cloudflare/agents/tree/main/examples/context-overflow-recovery.
- Stability detection: `hasPendingInteraction()` is true when any assistant message has pending tool calls or approvals; `waitUntilStable({ timeout })` resolves `true` when no pending tool results, approvals, or active turns, `false` on timeout.
- Think and `@cloudflare/ai-chat` share the same recovery configuration. Turns waiting on a human are parked, not sealed (see think-client-tools.md).
- Distinction: fibers (`runFiber`/`startFiber`) are documented in the sibling agent-class durable-execution page; the Pi harness has its own recovery model (pi.md).

### Budgets and spend guard

```ts
export class MyAgent extends Think<Env> {
	override chatRecovery = {
		maxAttempts: 10,
		noProgressTimeoutMs: 5 * 60 * 1000,
		maxRecoveryWork: 10_000,
		maxInterruptedAttempts: 5,
		terminalMessage: "The assistant was interrupted and could not recover.",
		// Consulted from the second recovery attempt onward. Return false to stop.
		// Called as `config.shouldKeepRecovering(ctx)`, so it is NOT bound to the
		// agent instance — track real token/cost spend in your own store keyed by
		// `ctx.recoveryRootRequestId`.
		async shouldKeepRecovering(ctx) {
			return (await getSpendForTurn(ctx.recoveryRootRequestId)) < MAX_SPEND;
		},
		async onExhausted(ctx) {
			console.warn("Recovery exhausted", ctx.incidentId, ctx.reason);
		},
	};
}
```

### Repair interrupted tool part

```ts
import type { UIMessage } from "ai";

export class MyAgent extends Think<Env> {
	protected override repairInterruptedToolPart(
		part: UIMessage["parts"][number],
	): UIMessage["parts"][number] {
		const record = part as Record<string, unknown>;
		if (record.type === "tool-ask_user") {
			const input = record.input as { prompt?: string } | undefined;
			if (input?.prompt) {
				return { type: "text", text: input.prompt };
			}
		}
		return super.repairInterruptedToolPart(part);
	}
}
```

### Context-window overflow

```ts
import { Think, defaultContextOverflowClassifier } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	override contextOverflow = {
		reactive: true,
		// Compact mid-turn once a step approaches 90% of a 200K window.
		proactive: { maxInputTokens: 200_000 },
	};

	override classifyChatError = defaultContextOverflowClassifier;
}
```

### Wait until stable

```ts
const stable = await this.waitUntilStable({ timeout: 30_000 });
if (stable) {
	await this.saveMessages([
		{
			id: crypto.randomUUID(),
			role: "user",
			parts: [{ type: "text", text: "Now that you are done, summarize." }],
		},
	]);
}
```

## Related

- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)
- [think-sub-agents-submissions.md](./think-sub-agents-submissions.md)
- [think-client-tools.md](./think-client-tools.md)
- [think-configuration.md](./think-configuration.md)
