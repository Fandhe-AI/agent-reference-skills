---
source: https://developers.cloudflare.com/agents/concepts/workflows/
---

# Using Agents with Workflows

Cloudflare Workflows provide durable multi-step execution (survive failures, retry automatically, wait for events). Integrated with Agents, Workflows handle long-running background processing while Agents manage real-time communication, via `AgentWorkflow` from `agents/workflows`.

## Signature / Usage

```ts
// Inside a workflow's run() method
await this.agent.updateTaskStatus(taskId, "processing"); // RPC call
await this.reportProgress({ step: "process", percent: 0.5 }); // Progress (non-durable)
this.broadcastToClients({ type: "update", taskId }); // Broadcast (non-durable)
await step.mergeAgentState({ taskProgress: 0.5 }); // State update (durable)
```

Resilient external API call as a durable step:

```ts
const result = await step.do(
	"call-api",
	{
		retries: { limit: 5, delay: "10 seconds", backoff: "exponential" },
		timeout: "5 minutes",
	},
	async () => {
		const response = await fetch("https://api.example.com/process");
		if (!response.ok) throw new Error(`API error: ${response.status}`);
		return response.json();
	},
);
```

## Options / Props

Agents vs Workflows:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Execution model | Agents / Workflows | — | Long-lived identity that wakes on events / run to completion. |
| Real-time communication | Agents / Workflows | — | WebSockets, HTTP streaming / not supported. |
| State persistence | Agents / Workflows | — | Built-in SQL database / step-level persistence. |
| Failure handling | Agents / Workflows | — | Application-defined / automatic retries and recovery. |
| External events | Agents / Workflows | — | Direct handling / pause and wait for events. |
| User interaction | Agents / Workflows | — | Direct (chat, UI) / through Agent callbacks. |

Workflow to Agent: `this.agent` (typed RPC), `this.reportProgress()` (triggers Agent callbacks), `step.updateAgentState()` / `step.mergeAgentState()` (broadcast to clients), `this.broadcastToClients()`.

Agent to Workflow:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `runWorkflow()` | method | — | Start a workflow instance (tracked in the Agent's database). |
| `sendWorkflowEvent()` | method | — | Dispatch an event to a workflow. |
| `approveWorkflow()` / `rejectWorkflow()` | method | — | Answer an approval request (the workflow resumes or throws `WorkflowRejectedError`). |
| pause / resume / terminate / restart | methods | — | Workflow control. |
| `getWorkflow()` / `getWorkflows()` | method | — | Status queries (by ID, name, or metadata; cursor pagination). |
| `deleteWorkflow()` / `deleteWorkflows()` | method | — | Clean up completed records. |
| `onWorkflowProgress`, `onWorkflowComplete`, `onWorkflowError` | callbacks | — | Lifecycle callbacks on the Agent. |

Durability:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Non-durable (may repeat on retry) | operations | — | `this.reportProgress()`, `this.broadcastToClients()`, direct RPC calls to `this.agent`. |
| Durable (checkpointed; the source calls these idempotent, exactly once) | operations | — | `step.do()`, `step.reportComplete()` / `step.reportError()`, `step.sendEvent()`, `step.updateAgentState()` / `step.mergeAgentState()`. |

## Notes

- Use Agents alone for chat, quick API calls, real-time collaboration, tasks under 30 seconds, and one durable Think chat turn with `submitMessages()`. Use Agents with Workflows for pipelines, report generation, human-in-the-loop approval, guaranteed delivery, and multi-step operations with retries. Use Workflows alone for background jobs, scheduled sync, and event-driven pipelines.
- "Exactly once" describes a step that has completed and is recorded; a step that fails mid-way is retried (see the `retries` option), so side effects inside a `step.do()` callback (for example an external POST) can repeat unless the target is idempotent.
- Durability: a completed step never re-executes after restart; failed steps retry with configurable backoff; workflows can wait for events up to one year; workflow state survives infrastructure failures.
- Common patterns: background processing with progress (`reportProgress()` after each `step.do()` item), human-in-the-loop approval (`waitForApproval()` then `approveWorkflow()` / `rejectWorkflow()`), resilient external API calls, and state synchronization with `step.updateAgentState()` / `step.mergeAgentState()` (broadcast to clients without polling).
- The Workflows product itself (bindings, `WorkflowEntrypoint`, limits) is in the cloudflare-stateful skill (workflows; https://developers.cloudflare.com/workflows/). Agent-side API: [run-workflows.md](../agent-class/run-workflows.md).

## Related

- [Human-in-the-loop](./human-in-the-loop.md)
- [Long-running agents](./long-running-agents.md)
