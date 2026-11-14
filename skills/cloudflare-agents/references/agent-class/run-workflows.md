---
source: https://developers.cloudflare.com/agents/agent-class/run-workflows/
---

# Run Workflows (AgentWorkflow / runWorkflow)

Integrate Cloudflare Workflows with an Agent: the Agent handles real-time communication and the Workflow does durable multi-step background work. Use an Agent alone for chat and quick API calls; add a Workflow for tasks over 30 seconds, pipelines and human approval.

## Signature / Usage

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";
import type { MyAgent } from "./agent";

type TaskParams = { taskId: string; data: string };

export class ProcessingWorkflow extends AgentWorkflow<MyAgent, TaskParams> {
	async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {
		const params = event.payload;

		const result = await step.do("process-data", async () => {
			return processData(params.data);
		});

		// Non-durable: progress reporting (may repeat on retry)
		await this.reportProgress({
			step: "process",
			status: "complete",
			percent: 0.5,
		});

		// Broadcast to connected WebSocket clients
		this.broadcastToClients({ type: "update", taskId: params.taskId });

		await step.do("save-results", async () => {
			// Call Agent methods via RPC
			await this.agent.saveResult(params.taskId, result);
		});

		// Durable: idempotent, won't repeat on retry
		await step.reportComplete(result);
		return result;
	}
}
```

Start from the Agent:

```ts
import { Agent } from "agents";

export class MyAgent extends Agent {
	async startTask(taskId: string, data: string) {
		const instanceId = await this.runWorkflow("PROCESSING_WORKFLOW", {
			taskId,
			data,
		});
		return { instanceId };
	}

	async onWorkflowProgress(
		workflowName: string,
		instanceId: string,
		progress: unknown,
	) {
		this.broadcast(JSON.stringify({ type: "workflow-progress", progress }));
	}

	async onWorkflowComplete(
		workflowName: string,
		instanceId: string,
		result?: unknown,
	) {
		console.log(`Workflow completed:`, result);
	}

	async saveResult(taskId: string, result: unknown) {
		this
			.sql`INSERT INTO results (task_id, data) VALUES (${taskId}, ${JSON.stringify(result)})`;
	}
}
```

Wrangler:

```jsonc
{
	"name": "my-app",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"durable_objects": {
		"bindings": [{ "name": "MY_AGENT", "class_name": "MyAgent" }],
	},
	"workflows": [
		{
			"name": "processing-workflow",
			"binding": "PROCESSING_WORKFLOW",
			"class_name": "ProcessingWorkflow",
		},
	],
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],
}
```

Management:

```ts
const instanceId = await this.runWorkflow(
	"MY_WORKFLOW",
	{ taskId: "123" },
	{
		metadata: { userId: "user-456", priority: "high" },
	},
);

await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {
	type: "custom-event",
	payload: { action: "proceed" },
});

const status = await this.getWorkflowStatus("MY_WORKFLOW", instanceId);
// { status: 'running', output: null, error: null }

// Get running workflows (default limit is 50, max is 100)
const { workflows, total } = this.getWorkflows({ status: "running" });

// Delete completed workflow instances older than 7 days
this.deleteWorkflows({
	status: "complete",
	createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
});

await this.approveWorkflow(instanceId, {
	reason: "Approved by admin",
	metadata: { approvedBy: userId },
});
await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

In the workflow, `const approval = await this.waitForApproval<{ approvedBy: string }>(step, { timeout: "7 days" });`.

## Options / Props

`AgentWorkflow` type parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AgentType` | type | — | Agent class type for typed RPC |
| `Params` | type | — | Parameters passed to the workflow |
| `ProgressType` | type | `DefaultProgress` | Progress reporting type |
| `Env` | type | `Cloudflare.Env` | Environment type |

Properties: `agent` (stub for Agent RPC; RPC-only for sub-agent origins), `instanceId`, `workflowName`, `env`.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `reportProgress(progress)` | non-durable | — | Triggers `onWorkflowProgress`; may repeat on retry |
| `broadcastToClients(message)` | non-durable | — | Broadcast to WebSocket clients of the Agent |
| `waitForApproval(step, options?)` | non-durable | — | Waits for approval; throws `WorkflowRejectedError` if rejected |
| `step.reportComplete(result?)` | durable | — | Report successful completion |
| `step.reportError(error)` | durable | — | Report an error |
| `step.sendEvent(event)` | durable | — | Send a custom event to the Agent |
| `step.updateAgentState(state)` / `mergeAgentState(partial)` / `resetAgentState()` | durable | — | Replace / merge / reset Agent state (broadcasts to clients) |

```ts
type DefaultProgress = {
	step?: string;
	status?: "pending" | "running" | "complete" | "error";
	message?: string;
	percent?: number;
	[key: string]: unknown;
};
```

`runWorkflow(workflowName, params, options?)` returns `Promise<string>` (instance ID):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `workflowName` | `string` | — | Workflow binding name from `env` |
| `params` | object | — | Passed to the workflow |
| `options.id` | `string` | auto-generated | Custom workflow ID |
| `options.metadata` | object | — | Stored for querying; not passed to the workflow |
| `options.agentBinding` | `string` | auto-detected | Agent binding name; root binding when called from a sub-agent |

Agent methods: `sendWorkflowEvent(workflowName, instanceId, event)`, `getWorkflowStatus(workflowName, instanceId)`, `getWorkflow(instanceId)`, `getWorkflows(criteria?)` (cursor pagination: `status`, `metadata`, `limit`, `orderBy`, `cursor`; returns `{ workflows, total, nextCursor }`), `deleteWorkflow(instanceId)`, `deleteWorkflows(criteria?)`, `terminateWorkflow`, `pauseWorkflow`, `resumeWorkflow`, `restartWorkflow(instanceId, { resetTracking })`, `approveWorkflow`, `rejectWorkflow`, `migrateWorkflowBinding(oldName, newName)`.

Lifecycle callbacks:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onWorkflowProgress` | `workflowName, instanceId, progress` | — | Workflow reports progress |
| `onWorkflowComplete` | `workflowName, instanceId, result?` | — | Workflow completes |
| `onWorkflowError` | `workflowName, instanceId, error` | — | Workflow errors |
| `onWorkflowEvent` | `workflowName, instanceId, event` | — | Workflow sends an event |
| `onWorkflowCallback` | `callback: WorkflowCallback` | — | All callback types |

Status values: `queued`, `running`, `paused`, `waiting`, `complete`, `errored`, `terminated`.

Limits:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Maximum steps | limit | 10,000 (configurable up to 25,000) | Per workflow |
| State size | limit | 10 MB | Per workflow |
| Event wait time | limit | 1 year | Maximum |
| Step execution time | limit | 30 minutes | Per step |
| Concurrent instances | limit | Account limit by default | Configurable [per workflow](https://developers.cloudflare.com/workflows/build/concurrency-limits/#per-workflow-concurrency-limits) |

## Notes

- `terminate()`, `pause()`, `resume()` and `restart()` are not yet supported in local `wrangler dev`; they work when deployed.
- Workflows cannot open WebSocket connections; use `broadcastToClients()`.
- Sub-agents may call `runWorkflow()`; tracking lives in the child's `cf_agents_workflows` table and `getWorkflows()` only sees the calling agent's rows. Parents cannot call inherited methods on `SubAgentStub`, so add wrapper methods on the child. For sub-agent origins, `this.agent` is RPC-only; use `routeSubAgentRequest()` for HTTP/WebSocket.
- Routing constraints: the originating Agent is re-resolved by name via `getAgentByName`, so start workflows from name-addressed Agents (not raw DO IDs); preserve class names when bundling (esbuild `keepNames: true`); `agentBinding` from a sub-agent is the root binding.
- Use `metadata` for queryable info and a retention policy for the tracking table; rename bindings with `migrateWorkflowBinding()`.
- Workflows product docs: cloudflare-stateful skill (workflows; https://developers.cloudflare.com/workflows/). `processData` and `userId` in the snippets are placeholders.

## Related

- [State](./state.md)
- [Schedule tasks](./schedule-tasks.md)
- [Durable execution](./durable-execution.md)
- [Sub-agents](./sub-agents.md)
