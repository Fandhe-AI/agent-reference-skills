---
source: https://developers.cloudflare.com/agents/agent-class/agent-tools/
---

# Agents as tools (agentTool / runAgentTool)

Run Think or `AIChatAgent` sub-agents as retained, streaming tools. The child is a real sub-agent with its own storage and messages; the parent keeps a run registry so clients can render, replay and clean up child timelines.

## Signature / Usage

```ts
import { Think } from "@cloudflare/think";
import { agentTool } from "agents/agent-tools";
import { z } from "zod";

export class Researcher extends Think<Env> {
	getSystemPrompt() {
		return "Research the user's topic and end with a concise summary.";
	}
}

export class Assistant extends Think<Env> {
	getTools() {
		return {
			research: agentTool(Researcher, {
				description: "Research one topic in depth.",
				displayName: "Researcher",
				inputSchema: z.object({
					query: z.string().min(3),
				}),
			}),
		};
	}
}
```

Imperative:

```ts
const [a, b] = await Promise.allSettled([
	this.runAgentTool(Researcher, {
		input: { query: "HTTP/3" },
		parentToolCallId: toolCallId,
		displayOrder: 0,
	}),
	this.runAgentTool(Researcher, {
		input: { query: "gRPC" },
		parentToolCallId: toolCallId,
		displayOrder: 1,
	}),
]);
```

Failure shape returned instead of an empty success:

```ts
type AgentToolFailure = {
	ok: false;
	status: "error" | "aborted" | "interrupted";
	error: string; // human-readable, safe to surface
	retryable: boolean;
	// Present only when `status` is "interrupted":
	reason?: AgentToolInterruptedReason;
	childStillRunning?: boolean;
};

type AgentToolInterruptedReason =
	| "no-progress"
	| "window-exceeded"
	| "not-tailable"
	| "inspect-timeout"
	| "inspect-failed"
	| "recovery-deadline"
	| "budget-exceeded";
```

Detached runs:

```ts
export class Importer extends Think<Env> {
	async startImport(input: ImportInput) {
		const { runId } = await this.runAgentTool(ImportAgent, {
			input,
			detached: { onFinish: "onImportDone", maxBudgetMs: 60 * 60 * 1000 },
		});
		return runId;
	}

	// Fires once, even if the Durable Object was evicted and rehydrated while the
	// child ran. Referenced by METHOD NAME (like schedule()) — never a closure,
	// which cannot survive eviction.
	async onImportDone(run: AgentToolRunInfo, result: AgentToolLifecycleResult) {
		switch (result.status) {
			case "completed":
				await this.markImportReady(run.runId, result.summary);
				break;
			case "error":
				await this.markImportFailed(run.runId, result.error);
				break;
			case "interrupted":
				// reason "budget-exceeded" ⇒ the run hit its maxBudgetMs ceiling.
				// interrupted is soft: a child that finishes anyway re-fires this
				// hook with "completed", so make the handler idempotent.
				break;
		}
	}
}
```

```ts
await this.runAgentTool(ResearchAgent, { input, detached: { notify: true } });
await this.cancelAgentTool(runId); // idempotent; delivers onFinish "aborted"
```

Progress and milestones (chat agents only):

```ts
reportProgress<T>(
	progress: {
		fraction?: number; // 0..1 — drives a progress bar
		message?: string; // human-readable status line
		phase?: string; // coarse phase label, e.g. "ingesting"
		milestone?: string; // present ⇒ a durable milestone
		data?: T; // app-specific payload; live-only unless persisted
	},
	options?: { persist?: boolean },
): Promise<void>;
```

React and gating:

```tsx
import { useAgent, useAgentToolEvents } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

const agent = useAgent({ agent: "Assistant", name: userId });
const { messages } = useAgentChat({ agent });
const agentTools = useAgentToolEvents({ agent });

for (const message of messages) {
	for (const part of message.parts) {
		if (part.type === "tool-call") {
			const runs = agentTools.getRunsForToolCall(part.toolCallId);
			// Render the child runs beside this tool call.
		}
	}
}
```

```ts
override async onBeforeSubAgent(_request, child) {
	if (!this.hasAgentToolRun(child.className, child.name)) {
		return new Response("Not found", { status: 404 });
	}
}
```

```ts
await this.clearAgentToolRuns();
await this.clearAgentToolRuns({
	status: ["completed", "error", "aborted", "interrupted"],
});
await this.clearAgentToolRuns({ olderThan: Date.now() - 7 * 24 * 60 * 60_000 });
```

## Options / Props

`runAgentTool(ChildClass, options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `input` | — | — | Input passed to the child |
| `runId` | `string` | — | Idempotency key; the same `runId` never starts a duplicate child turn |
| `parentToolCallId` | `string` | — | Groups sibling runs under a parent tool call |
| `displayOrder` | `number` | — | Ordering among siblings |
| `detached` | `true` or object | — | Return a handle immediately instead of awaiting terminal. Object keys: `onFinish` (method name), `maxBudgetMs`, `noProgressBudgetMs`, `notify` (`true` or `{ source }`), `onMilestones` (names array or `{ names, mode: "narrate" or "react" }`) |

Detached result: `{ runId, agentType, status: "running" | "error" }` (`error` only if dispatch was rejected).

Static options / hooks:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `detachedMaxBudgetMs` | static option | 24 h | Absolute ceiling for a detached run |
| `detachedNoProgressBudgetMs` | static option | 1 hour | Give-up window after the child has reported at least one signal; `0` or `Infinity` disables per run via `noProgressBudgetMs` |
| `agentToolReattachNoProgressTimeoutMs` | static option | `120000` | Parent wait with no forward progress before giving up on re-attach |
| `agentToolReattachMaxWindowMs` | static option | `Infinity` | Optional hard wall-clock ceiling on a re-attach |
| `maxConcurrentAgentTools` | static option | — | Concurrent agent-tool slot cap (value not stated in the source) |
| `formatAgentToolInput(input, request)` | method | — | `AIChatAgent` child: builds the user message from tool input |
| `getAgentToolOutput(runId)` / `getAgentToolSummary(runId, output)` | method | — | Think child: structured output and display summary |
| `formatDetachedCompletion(run, result)` / `formatDetachedMilestone(run, milestone)` | method | — | Customize injected chat text; return `""` to suppress |
| `onProgress(run, progress)` | method | — | Parent hook for child progress (best effort, not durable) |
| `cancelAgentTool(runId)` | method | — | Cancel a detached run |
| `hasAgentToolRun(className, name)` | method | — | Registry check for gating |
| `clearAgentToolRuns({ status, olderThan })` | method | — | Delete retained runs; cancels still-running children first |

## Notes

- Supports `@cloudflare/think` agents and `AIChatAgent` subclasses. `AIChatAgent` children run headlessly through `saveMessages()`, so use server-side tools; browser client tools are unavailable during an agent-tool turn.
- `retryable` is `true` only for `interrupted` runs. Branch on `reason` and `childStillRunning` rather than the `error` prose. Both are mirrored onto `agent-tool-event` frames and `useAgentToolEvents()` state.
- Detached completion is exactly-once on the happy path and at-least-once under a crash: `onFinish` handlers must be idempotent. A detached run does not inherit the spawning turn's signal. `interrupted` is soft: a late child completion re-fires `onFinish` with `completed`.
- `inspectAgentToolRun(runId)` returning `null` means "no record yet", not failure.
- `reportProgress()` is a no-op (dev warning) on the base `Agent` and outside an active run. Ephemeral progress rides a transient `data-agent-progress` part with coalescing; naming a `milestone` persists a `data-agent-milestone` part with a monotonic `sequence`. `data` is live-only unless `{ persist: true }`.
- Use `subAgent(...).chat()` when you want direct streaming RPC and own forwarding/replay; use `agentTool()`/`runAgentTool()` for retained runs, replay and UI drill-in.
- Drill in with `useAgent({ agent, name, sub: [{ agent: "Researcher", name: runId }] })`; gate external access with `onBeforeSubAgent` so guessed run IDs cannot spawn child facets.
- Observability channel `agentTool` (raw `diagnostics_channel` name `agents:agent_tool`), event `agent_tool:recovery:row`.
- Placeholders in snippets (`ImportInput`, `markImportReady`, `userId`, `toolCallId`) are defined elsewhere in the application.
- Think harness docs: think-overview.md (https://developers.cloudflare.com/agents/harnesses/think/).

## Related

- [Sub-agents](./sub-agents.md)
- [Chat agents](./chat-agents.md)
- [Client SDK](./client-sdk.md)
