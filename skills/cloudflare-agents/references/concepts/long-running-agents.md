---
source: https://developers.cloudflare.com/agents/concepts/agentic-patterns/long-running-agents/
---

# Long-running agents

Agents persist for days to months as durable identities: they exist continuously but run intermittently, surviving restarts and waking on demand. Examples use the `Agent` class (a project manager agent).

## Signature / Usage

Wake sources and schedules:

```ts
export class ProjectManager extends Agent<Env, ProjectState> {
	async onStart() {
		// Daily deadline check at 9am UTC — idempotent, safe across restarts
		await this.schedule(
			"0 9 * * *",
			"checkDeadlines",
			{},
			{
				idempotent: true,
			},
		);

		// Progress sync every 30 minutes
		await this.scheduleEvery(1800, "syncProgress");
	}
}
```

Staying alive, and crash-recoverable fibers:

```ts
export class ProjectManager extends Agent<Env, ProjectState> {
	async generateProjectPlan(goal: string) {
		const result = await this.keepAliveWhile(async () => {
			const plan = await this.callLLM(`Create a project plan for: ${goal}`);
			const tasks = await this.callLLM(
				`Break this into tasks: ${JSON.stringify(plan)}`,
			);
			return { plan, tasks };
		});

		this.setState({
			...this.state,
			status: "active",
			plan: result.plan,
			tasks: result.tasks,
		});
	}

	async executeTask(task: Task) {
		await this.runFiber(`task:${task.id}`, async (ctx) => {
			const resources = await this.gatherResources(task);
			ctx.stash({ phase: "prepared", resources, task });

			const result = await this.runSubAgent(task, resources);
			ctx.stash({ phase: "executed", result, task });

			await this.updateTaskStatus(task.id, "complete", result);
		});
	}

	async onFiberRecovered(ctx: FiberRecoveryContext) {
		if (!ctx.name.startsWith("task:")) return;
		const { phase, task } = ctx.snapshot as { phase: string; task: Task };

		if (phase === "prepared") {
			await this.executeTask(task);
		} else if (phase === "executed") {
			await this.updateTaskStatus(
				task.id,
				"complete",
				(ctx.snapshot as { result: unknown }).result,
			);
		}
	}
}
```

Long async operations (workflow delegation) and sub-agents:

```ts
export class ProjectManager extends Agent<Env, ProjectState> {
	async startDeployment(task: Task) {
		const instanceId = await this.runWorkflow("DEPLOY_WORKFLOW", {
			taskId: task.id,
			environment: "production",
		});
		this.updateTask(task.id, {
			status: "in_progress",
			externalJobId: instanceId,
		});
	}

	async onWorkflowComplete(
		workflowName: string,
		instanceId: string,
		result?: unknown,
	) {
		const task = this.state.tasks.find((t) => t.externalJobId === instanceId);
		if (task) this.updateTask(task.id, { status: "complete" });
	}

	async delegateTask(task: Task) {
		const researcher = await this.subAgent(
			ResearchAgent,
			`research-${task.id}`,
		);

		const findings = await researcher.research(task.title);

		this.updateTask(task.id, { status: "complete" });
		return findings;
	}
}
```

End of life:

```ts
export class ProjectManager extends Agent<Env, ProjectState> {
	async completeProject() {
		const schedules = await this.listSchedules();
		for (const schedule of schedules) {
			await this.cancelSchedule(schedule.id);
		}

		this.setState({ ...this.state, status: "complete" });

		// All SQLite data, schedules, and state are permanently deleted
		await this.destroy();
	}
}
```

## Options / Props

What survives and what does not:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `this.state` | survives | — | Persisted to SQLite on every `setState()`. |
| `this.sql` data, scheduled tasks | survives | — | SQLite tables; schedules trigger alarms to wake the agent. |
| `connection.setState()` data, fiber checkpoints (`stash()`), retained `startFiber()` status rows | survives | — | Durable storage. |
| In-memory class fields, `setTimeout`/`setInterval` timers, open fetches, local closures | lost | — | Lost on hibernation or eviction; persist or make recoverable anything that matters. |

Strategy by duration:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Seconds | strategy | — | Normal request handling. |
| Minutes | strategy | — | `keepAlive()` / `keepAliveWhile()` (idle eviction window is about 70 to 140 seconds); `startFiber()` when retryable acceptance matters. |
| Minutes to hours | strategy | — | Workflows. |
| Hours to days | strategy | — | Start a job, hibernate, wake on completion. |

Wake sources: HTTP request (`onRequest()`), WebSocket connection (`onConnect()`), RPC call (service binding or `@callable`), scheduled alarm, email (`onEmail()`).

Recovery for interrupted chat streams (`AIChatAgent`/Think):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Workers AI | strategy | — | Continue from partial with `continueLastTurn()` (assistant prefill); low token cost. |
| OpenAI (Responses API) | strategy | — | Stash `responseId` during streaming and retrieve the completed response; zero token cost. |
| Anthropic | strategy | — | Persist partial and send a synthetic user message asking the model to continue; medium cost. |
| Other | strategy | — | Try prefill, fall back to synthetic message. |

## Notes

- `keepAliveWhile()` is recommended over manual `keepAlive()` (which returns a disposer; call it in `finally`); it guarantees heartbeat cleanup.
- `runFiber()` is not automatic replay: checkpoint before expensive work with `stash()` and decide in `onFiberRecovered()` what recovery means. `startFiber()` adds an idempotency key, retained status, inspection, cancellation, and cleanup; by default it returns after acceptance (`waitForCompletion: true` keeps the request open), a good fit for retried webhooks. In `wrangler dev`, killing and restarting the process triggers recovery as in production.
- Long operations: webhook callback (register your own URL as the callback and persist the job ID), polling with `schedule()` and backoff (`Math.min(60 * attempt, 600)` seconds), or workflow delegation. Webhook endpoints like `/ci-callback` and `/github-webhook` in the page's examples are unauthenticated; verify signatures or tokens in real use.
- Reconstructing context after a wait: replay the persisted history, stash a continuation summary, or use a structured plan in state (`plan.currentStep`) which is both a recovery mechanism and a context reconstruction strategy (the page's `createPlan()`/`executeNextStep()` schedules each step with `this.schedule(0, "executeNextStep")`).
- Sub-agents have their own state, schedules, durable fibers, and lifecycle, colocated under the parent; the top-level parent owns the physical Durable Object alarm and the SDK routes callbacks into the child. See the Agent class sub-agents docs for the full `subAgent()` API.
- Chat recovery: `AIChatAgent` and Think always use durable recovery; override `onChatRecovery(ctx)` (`partialText`, `recoveryData`, `messages`, `createdAt`) and tune `chatRecovery = { maxAttempts, terminalMessage, onExhausted }`. Use `ctx.createdAt` to suppress stale recoveries; if no assistant chunk was written the unanswered user turn is retried unless `{ continue: false }` is returned.
- Housekeeping: schedule a periodic cleanup (archive completed tasks to SQL, `deleteWorkflows({ status: ["complete", "errored"], createdBefore })`); manage conversation size with a sliding window, summarization, or selective retention.
- `this.destroy()` is permanent; archive to R2, D1, or an API first. Agents that may be reactivated can simply be marked complete and left to hibernate (zero idle cost).
- Choose agent-internal primitives (schedules, fibers, queues; minutes per activation with `keepAlive`) for the agent's own lifecycle; Workflows (30 minutes per step, unlimited steps, built-in `waitForApproval()`) for discrete retryable pipelines.
- The page's helper methods (`callLLM`, `gatherResources`, `runSubAgent`, `updateTask`, `updateTaskStatus`, `ProjectState`, `Task`) are application-defined and not shown; the snippets are not runnable standalone. Agent-class APIs (`runFiber`, `startFiber`, `keepAlive`, `subAgent`) are documented in [durable-execution.md](../agent-class/durable-execution.md) and [sub-agents.md](../agent-class/sub-agents.md). Durable Object hibernation: cloudflare-stateful.

## Related

- [Workflows](./workflows.md)
- [Human-in-the-loop](./human-in-the-loop.md)
- [Scheduler](../runtime/scheduler.md)
- [Jobs and alarms](../runtime/job-queue.md)
