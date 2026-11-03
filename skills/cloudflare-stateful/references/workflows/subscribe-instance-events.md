---
source: https://developers.cloudflare.com/workflows/build/subscribe-to-instance-events/, https://developers.cloudflare.com/workflows/build/workers-api/
---

# Subscribe to instance events

`WorkflowInstance.subscribe()` delivers historical and live execution events without polling `status()`.

## Signature / Usage

```ts
subscribe(options?: WorkflowInstanceSubscribeOptions): Promise<WorkflowInstanceSubscription>

interface WorkflowInstanceSubscribeOptions {
	/**
	 * The event ID after which to start.
	 */
	cursor?: number;
	/**
	 * Emit only events with one of these types.
	 */
	filter?: WorkflowInstanceEventType[];
}

type WorkflowInstanceEventType = WorkflowInstanceEvent["type"];
```

Adapted (not in the official docs): a constant-time bearer-token check that fails closed when `TRIGGER_TOKEN` is unset was added, because the official handler creates an instance for any caller. See Notes.

```ts
interface Env {
	MY_WORKFLOW: Workflow;
	TRIGGER_TOKEN?: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Fail closed: reject when the secret is not configured or does not match
		const enc = new TextEncoder();
		const expected = env.TRIGGER_TOKEN;
		const provided = enc.encode(request.headers.get("Authorization") ?? "");
		const wanted = enc.encode(`Bearer ${expected ?? ""}`);
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		const instance = await env.MY_WORKFLOW.create({
			params: { reportId: "report-123" },
		});

		using subscription = await instance.subscribe();

		while (true) {
			const result = await subscription.next();
			if (result.done) {
				break;
			}

			console.log(result.value.type, result.value);
		}

		return Response.json({ instanceId: instance.id });
	},
} satisfies ExportedHandler<Env>;
```

Filter to terminal events:

```ts
const instance = await env.MY_WORKFLOW.get("report-123");

using subscription = await instance.subscribe({
	filter: ["workflow_completed", "workflow_errored", "workflow_terminated"],
});

const result = await subscription.next();
if (result.done) {
	throw new Error("The instance ended without a matching event.");
}

switch (result.value.type) {
	case "workflow_completed":
		console.log("Workflow output:", result.value.output);
		break;
	case "workflow_errored":
		console.error("Workflow errored:", result.value.error);
		break;
	case "workflow_terminated":
		console.log("Workflow terminated.");
		break;
}
```

Resume from a cursor (`processEvent` and `saveLastProcessedEventId` are placeholders for your own functions):

```ts
using subscription = await instance.subscribe({
	cursor: lastProcessedEventId,
	filter: ["step_completed", "workflow_completed", "workflow_errored"],
});

while (true) {
	const result = await subscription.next();
	if (result.done) {
		break;
	}

	await processEvent(result.value);
	await saveLastProcessedEventId(result.value.eventId);
}
```

Event shape:

```ts
type WorkflowInstanceEvent = {
	instanceId: string;
	eventId: number;
	timestamp: number;
} & (
	| { type: "workflow_queued" }
	| { type: "workflow_started"; params?: unknown }
	| { type: "workflow_running" }
	| { type: "workflow_paused" }
	| { type: "workflow_waiting_for_pause" }
	| { type: "workflow_waiting" }
	| { type: "workflow_completed"; output?: unknown }
	| { type: "workflow_errored"; error: { name: string; message: string } }
	| { type: "workflow_terminated" }
	| {
			type: "step_started";
			stepName: string;
			config?: {
				retries: {
					limit: number;
					delay: WorkflowSleepDuration | "[dynamic]";
					backoff?: "constant" | "linear" | "exponential";
				};
				timeout: WorkflowSleepDuration;
				sensitive?: "output";
			};
	  }
	| { type: "step_completed"; stepName: string; output?: unknown }
	| { type: "step_errored"; stepName: string }
	| { type: "attempt_started"; stepName: string; attempt: number }
	| { type: "attempt_completed"; stepName: string; attempt: number }
	| {
			type: "attempt_errored";
			stepName: string;
			attempt: number;
			retryDelayMs?: number;
			error: { name: string; message: string };
	  }
	| { type: "sleep_started"; stepName: string; durationMs: number }
	| { type: "sleep_completed"; stepName: string }
	| { type: "wait_started"; stepName: string; eventType: string }
	| { type: "wait_completed"; stepName: string }
	| { type: "wait_timed_out"; stepName: string }
	| { type: "rollback_started" }
	| {
			type: "rollback_step_started";
			stepName: string;
			config?: {
				retries: {
					limit: number;
					delay: WorkflowSleepDuration | "[dynamic]";
					backoff?: "constant" | "linear" | "exponential";
				};
				timeout: WorkflowSleepDuration;
				sensitive?: "output";
			};
	  }
	| { type: "rollback_step_completed"; stepName: string }
	| {
			type: "rollback_step_errored";
			stepName: string;
			error: { name: string; message: string };
	  }
	| { type: "rollback_attempt_started"; stepName: string; attempt: number }
	| { type: "rollback_attempt_completed"; stepName: string; attempt: number }
	| {
			type: "rollback_attempt_errored";
			stepName: string;
			attempt: number;
			retryDelayMs?: number;
			error: { name: string; message: string };
	  }
	| { type: "rollback_completed" }
	| { type: "rollback_errored" }
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cursor | `number` | — | Last processed `eventId`; the subscription starts with the first event whose `eventId` is greater |
| filter | `WorkflowInstanceEventType[]` | all events | Emit only events with these types |

Event types by group:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| workflow_queued | event | — | Instance enters the execution queue |
| workflow_started | event | — | Instance starts |
| workflow_running | event | — | Instance starts or resumes execution |
| workflow_paused | event | — | Instance pauses |
| workflow_waiting_for_pause | event | — | Instance waits for current work before pause |
| workflow_waiting | event | — | Instance enters waiting state |
| workflow_completed | event | — | Instance completes successfully |
| workflow_errored | event | — | Instance ends with an error |
| workflow_terminated | event | — | Instance is terminated |
| step_started / step_completed / step_errored | event | — | A `step.do()` call starts / completes / errors |
| attempt_started / attempt_completed / attempt_errored | event | — | A step attempt starts / completes / errors |
| sleep_started / sleep_completed | event | — | A `step.sleep()` or `step.sleepUntil()` starts / finishes (completed: a sleep finishes) |
| wait_started / wait_completed / wait_timed_out | event | — | `step.waitForEvent()` starts / a matching event arrives / times out |
| rollback_started | event | — | Workflow starts a rollback |
| rollback_step_started / rollback_step_completed / rollback_step_errored | event | — | A rollback handler starts / completes / errors |
| rollback_attempt_started / rollback_attempt_completed / rollback_attempt_errored | event | — | A rollback attempt starts / completes / errors |
| rollback_completed | event | — | All required rollback handlers complete |
| rollback_errored | event | — | The rollback operation errors |

## Notes

- Adapted from the official docs: the first example creates an instance per request, so it now requires `Authorization: Bearer <TRIGGER_TOKEN>` (rejected when the secret is unset), the same check as [trigger-workflows.md](./trigger-workflows.md).
- A subscription first delivers retained events, then waits for new ones. Subscribe right after `create()` or later via `get()`; subscriptions remain available for the instance retention period.
- The subscription ends on `workflow_completed`, `workflow_errored`, or `workflow_terminated`, even when a filter excludes that event; then `next()` returns `done: true` without it.
- For steps marked sensitive, `step_completed` sets `output` to `"[REDACTED]"`.
- A subscription holds a Workers RPC resource. Declare it with `using` or call `subscription[Symbol.dispose]()` in a `finally` block (explicit resource management must be supported by your toolchain). Waiting for the full run inside one `fetch` request, as in the first example, ties up the request until the instance ends; for long-running instances subscribe from a longer-lived consumer with a stored cursor.

## Related

- [workflow-instance.md](./workflow-instance.md)
- [event-subscriptions.md](./event-subscriptions.md)
- [metrics-analytics.md](./metrics-analytics.md)
