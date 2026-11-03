---
source: https://developers.cloudflare.com/agents/harnesses/think/scheduled-tasks/, https://developers.cloudflare.com/agents/harnesses/think/workflows/
---

# Think scheduled tasks and Workflows

`getScheduledTasks()` declares recurring, timezone-aware Think turns or deterministic handlers; Think reconciles them on startup, stores a durable one-shot schedule for the next occurrence, and re-arms it after each run. `ThinkWorkflow` with `step.prompt()` runs one durable model-driven reasoning step inside a Cloudflare Workflow.

## Signature / Usage

Adapted (not in the official docs): the handler treats an already-created Workflow instance as success, so an at-least-once redelivery does not fail and retry. See Notes.

```ts
import { Think, defineScheduledTasks } from "@cloudflare/think";

export class DigestAgent extends Think<Env> {
	getDefaultTimezone() {
		return "Europe/London";
	}

	getScheduledTasks() {
		return defineScheduledTasks({
			weeklyCommitReport: {
				schedule: "every week on monday at 09:00",
				prompt:
					"Compile all my GitHub commits for the last week and send a concise summary.",
			},
			workout: {
				schedule: "every day at 08:00 in Europe/London",
				prompt: "Start my workout.",
			},
			customerDigest: {
				schedule: "every day at 09:00",
				timezone: "America/New_York",
				metadata: { workflowName: "customer-digest" },
				retry: { maxAttempts: 3 },
				handler: async ({
					idempotencyKey,
					scheduledFor,
					scheduleKind,
					timezone,
				}) => {
					try {
						await this.env.DIGEST_WORKFLOW.create({
							id: idempotencyKey,
							params: { scheduledFor, scheduleKind, timezone },
						});
					} catch (error) {
						// A redelivered occurrence finds the ID taken; get() confirms
						// the instance exists (and throws if the create really failed).
						await this.env.DIGEST_WORKFLOW.get(idempotencyKey);
					}
				},
			},
		});
	}
}
```

Workflow side:

```ts
import { z } from "zod";
import { ThinkWorkflow } from "@cloudflare/think/workflows";
import type { ThinkWorkflowStep } from "@cloudflare/think/workflows";
import type { AgentWorkflowEvent } from "agents/workflows";

const draftSchema = z.object({
	title: z.string(),
	summary: z.string(),
	labels: z.array(z.string()),
});

export class TriageWorkflow extends ThinkWorkflow<TriageAgent, Params> {
	async run(event: AgentWorkflowEvent<Params>, step: ThinkWorkflowStep) {
		const draft = await step.prompt("triage-issue", {
			prompt: `Triage issue #${event.payload.issueNumber}`,
			output: draftSchema,
			timeout: "3 days",
		});

		await step.do("apply-labels", async () => {
			await this.agent.applyLabels(draft.labels);
		});
	}
}

export class TriageAgent extends Think<Env> {
	async triageIssue(issueNumber: number): Promise<string> {
		return this.runWorkflow(
			"TRIAGE_WORKFLOW",
			{ issueNumber },
			{ metadata: { issueNumber } },
		);
	}
}
```

`Params`, `applyLabels`, and the `TRIAGE_WORKFLOW` binding are yours to define (`Params` has `issueNumber: number`).

## Options / Props

### Scheduled task fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `schedule` | string (DSL) | — | `every <n> minutes`, `every <n> hours`, `every day at HH:mm`, `every weekday at HH:mm`, `every week on monday,wednesday at HH:mm`; optional inline `in <timezone>`. |
| `timezone` | `string` | `getDefaultTimezone()` | Wall-clock schedules need an inline timezone, a task `timezone`, or `getDefaultTimezone()`. |
| `prompt` | `string` | — | Prompt task: creates a durable submission via `submitMessages()`. Exactly one of `prompt` / `handler`. |
| `handler` | `async ({ taskId, scheduledFor, scheduledForDate, occurrenceKey, idempotencyKey, schedule, scheduleKind, timezone, metadata })` | — | Deterministic app-owned work, at-least-once. |
| `metadata` | `object` | — | Passed to the handler. |
| `retry` | `{ maxAttempts }` | — | Retries the prompt/handler before the failure is logged. |

### `step.prompt()` options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| first argument | `string` | — | Step name (used in the inferred idempotency key). |
| `prompt` | `string` | — | Prompt text. |
| `output` | Zod object schema | — | Typed structured output; validated again on resume. |
| `timeout` | duration (for example `"3 days"`) | — | How long the Workflow waits for the terminal event. |
| `key` | `string` | — | Distinguishes repeated uses of one step name (loops). |
| `cancelOnTimeout` | `boolean` | `true` | `false` lets the submission continue after the Workflow stops waiting. |

## Notes

- Adapted from the official docs: handlers are delivered at least once and retried, and Workflows `create()` throws when the instance ID is already taken. In the source, a redelivery after a successful `create({ id: idempotencyKey })` therefore fails every retry and is logged as a failed occurrence. The fences catch the error and call `get(idempotencyKey)`, which succeeds when the instance exists and throws otherwise (the pattern used for child Workflows in the cloudflare-stateful skill).
- Late alarms: Think runs the intended occurrence once and schedules the next future one; no backfill. Delivery is at-least-once, so use `idempotencyKey` or `occurrenceKey` for your own idempotency. The next occurrence is scheduled after the action succeeds or exhausts retries, so failed occurrences do not block future runs.
- Static declarations reconcile on startup; if `getScheduledTasks()` reads data that can change while the object is live, call `internal_reconcileScheduledTasks()` after updating it. A missing `schedule_id` is only a pending reconcile state, repaired on the next reconcile.
- Use a handler task to start a Workflow when steps matter (multiple deterministic steps, long waits, human approval); keep simple recurring prompts as prompt tasks and one-off background turns on `submitMessages()`.
- Workflow `runWorkflow()` creates the instance and injects the Agent identity `ThinkWorkflow` needs to reconnect to `this.agent`; do not call the Workflows binding's `create()` directly for Agent workflows (`await this.env.TRIAGE_WORKFLOW.create({ params })` lacks Agent context). Use `sendWorkflowEvent()` to signal a waiting Workflow, e.g. `await this.sendWorkflowEvent("TRIAGE_WORKFLOW", workflowId, { type: "approval", payload: { approved: true } })`. Note the scheduled-task handler above uses the binding directly for a plain Workflow that does not use `this.agent`.
- `step.prompt()` runs a full agentic turn; the Agent may use tools across steps and returns the structured result by calling an internal `think_final_answer` tool whose arguments match the schema (ordinary tool calling, so it works on providers including Workers AI that reject JSON Schema responses on streaming requests). Allow `maxSteps` of at least 2 if tools are needed first. Do not override `toolChoice` from `beforeTurn` on such a turn. `think_final_answer` (and `think_final_answer_*`) is reserved and stripped from the persisted conversation.
- The model must emit a forced tool call while streaming. Verified: OpenAI `gpt-4o-mini`, Anthropic `claude-haiku-4-5`, Workers AI `@cf/moonshotai/kimi-k2.6`. Not working: Workers AI `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (fails with `Model ended the turn without calling the think_final_answer tool`). Unsupported Zod features fail at prompt-step creation; invalid model output is not repaired, and `step.prompt()` throws.
- How it runs: `step.do("<name>:submit")` creates/finds an idempotent submission; the turn runs through the submission queue; on `completed`/`error`/`aborted`/`skipped` Think records a pending notification, drains it via `sendWorkflowEvent()` and alarms, then `step.waitForEvent("<name>:wait")` resumes. The result lives in the notification/event payload, not a submission-ledger column. Default idempotency key: `think-workflow:<workflowName>:<workflowId>:<stepName>`. Timeout throws `ThinkPromptTimeoutError` (and cancels the submission unless `cancelOnTimeout: false`).
- Distinction: Cloudflare Workflows itself (`WorkflowEntrypoint`, `step.do`) is a separate Cloudflare product, covered by the cloudflare-stateful skill (workflows; https://developers.cloudflare.com/workflows/). Cron Triggers for plain Workers belong to `cloudflare-workers`; the base-class `schedule()` API is in the sibling agent-class category.

### Prompt vs handler tasks

Adapted (not in the official docs): the handler treats an already-created Workflow instance as success. See Notes.

```ts
getScheduledTasks() {
	return {
		dailySummary: {
			schedule: "every day at 09:00",
			timezone: "UTC",
			prompt: "Generate the daily report."
		},
		dailyWorkflow: {
			schedule: "every day at 09:00",
			timezone: "UTC",
			retry: { maxAttempts: 3 },
			handler: async ({ idempotencyKey, scheduledFor, timezone }) => {
				try {
					await this.env.REPORT_WORKFLOW.create({
						id: idempotencyKey,
						params: { scheduledFor, timezone }
					});
				} catch (error) {
					// Already created by an earlier delivery of this occurrence.
					await this.env.REPORT_WORKFLOW.get(idempotencyKey);
				}
			}
		}
	};
}
```

### Idempotency key and signalling

```ts
await step.prompt("summarize-file", {
	key: file.path,
	prompt: `Summarize ${file.path}`,
	output: summarySchema,
});

await this.sendWorkflowEvent("TRIAGE_WORKFLOW", workflowId, {
	type: "approval",
	payload: { approved: true },
});
```

## Related

- [think-sub-agents-submissions.md](./think-sub-agents-submissions.md)
- [think-recovery.md](./think-recovery.md)
- [think-overview.md](./think-overview.md)
