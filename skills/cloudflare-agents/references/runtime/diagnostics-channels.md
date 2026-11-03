---
source: https://developers.cloudflare.com/agents/runtime/observability/diagnostics-channels/
---

# Diagnostics channels

The Lifecycle, its capabilities, and the `Agent` class publish structured events to diagnostics channels (RPC calls, schedules, job queue warnings, MCP connections, chat, workflows, email). Publishing has no overhead when nobody is listening.

## Signature / Usage

```ts
import { subscribe } from "agents/observability";

const unsub = subscribe("rpc", (event) => {
	if (event.type === "rpc") {
		console.log(`RPC call: ${event.payload.method}`);
	}
	if (event.type === "rpc:error") {
		console.error(
			`RPC failed: ${event.payload.method} — ${event.payload.error}`,
		);
	}
});

// Clean up when done
unsub();
```

Raw subscription, and emitting from your own capability:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle, LifecycleCapability } from "agents/lifecycle";

class Orders extends LifecycleCapability {
	constructor() {
		super("orders");
	}

	place(orderId: string) {
		// Unknown prefix, so this lands on agents:lifecycle
		this.lifecycle.events.emit("order:placed", { orderId });
	}
}

export class Shop extends DurableObject<Env> {
	readonly orders = new Orders();
	readonly lifecycle = Lifecycle.install(this).use(this.orders);
}
```

```ts
import { subscribe } from "node:diagnostics_channel";

subscribe("agents:lifecycle", (message) => {
	const event = message as { type: string; source?: string; payload: unknown };
	if (event.type === "order:placed") {
		console.log(event.source, event.payload);
	}
});
```

Production: Tail Worker (diagnostics channel messages are forwarded automatically):

Adapted (not in the official docs): the `events` parameter is typed as `TraceItem[]` so the handler compiles under `strict`.

```ts
export default {
	async tail(events: TraceItem[]) {
		for (const event of events) {
			for (const msg of event.diagnosticsChannelEvents) {
				// msg.channel is "agents:rpc", "agents:lifecycle", etc.
				// msg.message is the event
				console.log(msg.timestamp, msg.channel, msg.message);
			}
		}
	},
};
```

Replace or disable observability on an `Agent`:

```ts
import { Agent } from "agents";
import type { Observability } from "agents/observability";

const myObservability: Observability = {
	emit(event) {
		// Send to your logging service, filter events, etc.
		if (event.type === "rpc:error") {
			console.error(event.payload.method, event.payload.error);
		}
	},
};

class MyAgent extends Agent {
	override observability = myObservability;
}
// To disable all event emission: override observability = undefined;
```

## Options / Props

Every event: `{ type, source, agent, name, payload, timestamp }` (`agent` = Durable Object class name, `name` = instance name, `source` = capability ID or `lifecycle`; events via the `Agent` class's `observability` property have no `source`; `timestamp` is ms since epoch).

Channels (chosen by event `type` prefix):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agents:state` | `state:*` | — | State sync events. |
| `agents:rpc` | `rpc`, `rpc:*` | — | RPC method calls and failures. |
| `agents:message` | `message:*`, `tool:*`, `submission:*`, `action:*` | — | Chat message, tool, Think submission and action lifecycle. |
| `agents:chat` | `chat:*` except `chat:transcript:*` | — | Chat turns, requests, recovery, stream stalls, context handling. |
| `agents:transcript` | `transcript:*`, `chat:transcript:*` | — | Transcript repair. |
| `agents:fiber` | `fiber:*` | — | Durable fiber lifecycle. |
| `agents:agent_tool` | `agent_tool:*` | — | Parent and child agent-tool runs (typed helper key `agentTool`). |
| `agents:schedule` | `schedule:*`, `queue:*` | — | Scheduled and queued callbacks. |
| `agents:workflow` | `workflow:*` | — | Workflow state transitions. |
| `agents:mcp` | `mcp:*` | — | MCP client operations. |
| `agents:email` | `email:*` | — | Email processing. |
| `agents:task`, `agents:stream`, `agents:channel` | `task:*`; `stream:*`; `channel:*`, `notice:*` | — | Experimental capabilities; not covered by the official page. |
| `agents:lifecycle` | `connect`, `disconnect`, `destroy`, `job:*`, `alarm:*`, and any unmatched type | — | Fallback channel, including custom capability events. |

Event reference (type: payload):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rpc` / `rpc:error` | `{ method, streaming? }` / `{ method, error }` | — | A client calls a `callables` or `@callable` method / it throws. |
| `state:update` | `{}` | — | `setState()` called on an `Agent`. |
| `message:request`, `message:response`, `message:clear` | `{}` | — | Chat message received / response stream completes / history cleared. |
| `message:cancel`, `message:error` | `{ requestId }`, `{ error }` | — | Streaming request cancelled / chat stream fails. |
| `tool:result`, `tool:approval` | `{ toolCallId, toolName }`, `{ toolCallId, approved }` | — | Client tool result / tool call approved or rejected. |
| `submission:create`, `submission:status`, `submission:error` | `{ submissionId }`, `{ submissionId, status }`, `{ submissionId, error }` | — | Think submissions. |
| `chat:turn:start` / `chat:turn:finish` | `{ requestId, trigger, admission, continuation?, generation? }` / plus `status, durationMs, error?` | — | Chat turn boundaries. |
| `chat:request:failed` | `{ requestId?, stage, messagesPersisted?, error }` | — | A Think chat request fails. |
| `chat:recovery:detected`, `:attempt`, `:scheduled`, `:completed` | `{ incidentId, requestId, attempt, maxAttempts, recoveryKind }` | — | Chat recovery steps (`recoveryKind` `"retry"` or `"continue"`). |
| `chat:recovery:skipped`, `:failed`, `:exhausted` | above plus `reason?` (required for `exhausted`) | — | Recovery skipped / failed / exceeded attempts. |
| `chat:stream:stalled` | `{ requestId, timeoutMs }` | — | Inactivity watchdog fired (`chatStreamStallTimeoutMs`); routes into durable recovery. |
| `chat:context:compacted` | `{ reason, shortened, requestId?, attempt? }` | — | Think compacted the session for a context overflow (`reason` `"proactive"` or `"reactive"`). |
| `chat:transcript:repaired` | `{ requestId?, removedToolCalls, normalizedInputs, toolCallIds? }` | — | Think repaired a persisted transcript. |
| `fiber:run:started`, `:completed`, `:failed`, `:interrupted` | `{ fiberId, fiberName, managed?, ... }` | — | Durable fiber lifecycle. |
| `fiber:recovery:detected`, `:attempt`, `:handled`, `:skipped`, `:failed` | `{ fiberId, fiberName, managed?, ... }` | — | Fiber recovery. |
| `agent_tool:recovery:begin`, `:row`, `:deadline`, `:complete`, `:failed` | `{ runCount, ... }`, `{ runId, agentType, status, ... }` | — | Parent recovery of stale agent-tool runs. |
| `schedule:create`, `:execute`, `:cancel` | `{ callback, id }` | — | Schedule lifecycle. |
| `schedule:retry`, `schedule:error` | `{ callback, id, attempt, maxAttempts }`, `{ callback, id, error, attempts }` | — | Retried / failed after all retries. |
| `schedule:duplicate_warning` | `{ callback, count, type }` | — | Non-idempotent schedule may duplicate work. |
| `queue:create`, `queue:retry`, `queue:error` | `{ callback, id, ... }` | — | Queued callbacks. |
| `connect`, `disconnect`, `destroy` | `{ connectionId }`, `{ connectionId, code, reason }`, `{}` | — | Emitted by the `Agent` class. |
| `job:slow_dispatch`, `job:backlog_warning`, `alarm:memory_limit_reset` | `{ capability, fn, id, thresholdMs }`, `{ capability, count }`, `{ strikes, limit, sealed, error }` | — | Job queue events from any Lifecycle object (source `lifecycle`). |
| `workflow:start`, `:event`, `:approved`, `:rejected`, `:terminated`, `:paused`, `:resumed`, `:restarted` | `{ workflowId, workflowName? / eventType? / reason? }` | — | Workflow transitions. |
| `mcp:client:preconnect`, `:connect`, `:authorize`, `:discover`, `:close` | `{ serverId }`, `{ url, transport, state, error? }`, `{ serverId, authUrl, clientId? }`, ... | — | MCP client operations. |
| `email:receive`, `email:reply`, `email:send` | `{ from, to, subject? }` | — | Email processing. |

## Notes

- Adapted from the official docs: the Tail Worker `tail(events)` parameter is typed `TraceItem[]` (the page leaves it implicit `any`).

- The typed `subscribe()` helper narrows `event` to the event types of that channel and uses camelCase keys (`subscribe("agentTool", ...)`); events from your own capabilities are not in those types, so read them with the raw API. Raw subscribers use the emitted channel name (`agents:agent_tool`).
- Events are best effort. Events emitted while the Lifecycle is starting are held and published after startup, and dropped if startup fails.
- A Durable Object that installs the Lifecycle directly has no `observability` property; its events always go to the channels and you filter in the subscriber. Setting `observability` to `undefined` on an `Agent` disables emission.
- Diagnostics channel API itself: cloudflare-workers (Node.js compat). Tail Workers: see Workers observability docs.

## Related

- [Tracing](./tracing.md)
- [Jobs and alarms](./job-queue.md)
- [Build a capability](./build-a-capability.md)
- [Scheduler](./scheduler.md)
