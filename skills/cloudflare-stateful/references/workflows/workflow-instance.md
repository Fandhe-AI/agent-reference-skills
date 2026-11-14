---
source: https://developers.cloudflare.com/workflows/build/workers-api/, https://developers.cloudflare.com/workflows/build/trigger-workflows/
---

# WorkflowInstance (status, pause, resume, restart, terminate, delete, sendEvent)

A `WorkflowInstance` represents one run of a Workflow and provides methods to inspect and manage it.

## Signature / Usage

```ts
declare abstract class WorkflowInstance {
	public id: string;
	/**
	 * Pause the instance.
	 */
	public pause(): Promise<void>;
	/**
	 * Resume the instance. If it is already running, an error will be thrown.
	 */
	public resume(): Promise<void>;
	/**
	 * Terminate the instance. If it is errored, terminated or complete, an error will be thrown.
	 */
	public terminate(options?: WorkflowInstanceTerminateOptions): Promise<void>;
	/**
	 * Restart the instance from the beginning, or from a specific step.
	 */
	public restart(options?: WorkflowInstanceRestartOptions): Promise<void>;
	/**
	 * Delete the instance and its stored state.
	 */
	public delete(): Promise<void>;
	/**
	 * Returns the current status of the instance.
	 */
	public status(): Promise<InstanceStatus>;
	/**
	 * Subscribe to events from this Workflow instance.
	 */
	public subscribe(
		options?: WorkflowInstanceSubscribeOptions,
	): Promise<WorkflowInstanceSubscription>;
}
```

```ts
let instance = await env.MY_WORKFLOW.get("abc-123");
let status = await instance.status(); // Returns an InstanceStatus
await instance.pause(); // Returns Promise<void>
await instance.resume(); // Returns Promise<void>
```

Restart and terminate:

```ts
let instance = await env.MY_WORKFLOW.get("abc-123");

// Restart the instance from the beginning.
await instance.restart();

// Restart the instance from the step named "aggregate".
await instance.restart({ from: { name: "aggregate" } });

// Restart the instance from the third call to a step named "process".
await instance.restart({ from: { name: "process", count: 3 } });

// Terminate without running rollback handlers.
await instance.terminate();

// Run registered rollback handlers before terminating.
await instance.terminate({ rollback: true });
```

Adapted (not in the official docs): the official `sendEvent` handler forwards any caller's JSON to an instance without authentication and does not check that `instanceId` is present. This version fails closed on a missing secret, compares the bearer token in constant time, validates `instanceId`, and caps the body at the 1 MiB event payload limit before parsing it. Also, the body is read with `readTextWithLimit()`, which counts bytes while streaming and cancels past the limit, instead of `await req.text()` followed by a size check (which buffers the whole body first). See Notes.

```ts
interface Env {
	MY_WORKFLOW: Workflow;
	WEBHOOK_SECRET?: string;
}

// Reads the body while counting bytes; cancels and returns null past `limit`.
async function readTextWithLimit(
	req: Request,
	limit: number,
): Promise<string | null> {
	if (!req.body) return "";
	const reader = req.body.getReader();
	const chunks: Uint8Array[] = [];
	let total = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		total += value.byteLength;
		if (total > limit) {
			await reader.cancel();
			return null;
		}
		chunks.push(value);
	}
	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return new TextDecoder().decode(bytes);
}

export default {
	async fetch(req: Request, env: Env) {
		// Fail closed: reject when the secret is not configured or does not match
		const enc = new TextEncoder();
		const expected = env.WEBHOOK_SECRET;
		const provided = enc.encode(req.headers.get("Authorization") ?? "");
		const wanted = enc.encode(`Bearer ${expected ?? ""}`);
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		const instanceId = new URL(req.url).searchParams.get("instanceId");
		if (!instanceId) {
			return Response.json({ error: "instanceId required" }, { status: 400 });
		}
		// Event payloads are limited to 1 MiB; reject larger bodies before parsing.
		const raw = await readTextWithLimit(req, 1024 * 1024);
		if (raw === null) {
			return Response.json({ error: "payload too large" }, { status: 413 });
		}
		let webhookPayload: unknown;
		try {
			webhookPayload = JSON.parse(raw);
		} catch {
			return Response.json({ error: "payload not valid JSON" }, { status: 400 });
		}
		// Validate the shape your waitForEvent step expects before forwarding it.
		if (typeof webhookPayload !== "object" || webhookPayload === null) {
			return Response.json({ error: "payload must be an object" }, { status: 400 });
		}

		let instance = await env.MY_WORKFLOW.get(instanceId);
		// Send our event, with `type` matching the event type defined in
		// our step.waitForEvent call
		await instance.sendEvent({
			type: "stripe-webhook",
			payload: webhookPayload,
		});

		return Response.json({
			status: await instance.status(),
		});
	},
} satisfies ExportedHandler<Env>;
```

Delete:

```ts
const instance = await env.MY_WORKFLOW.get("instance-abc");
await instance.delete();
```

`InstanceStatus`, restart and terminate options:

```ts
type InstanceStatus = {
	status:
		| "queued" // means that instance is waiting to be started (see concurrency limits)
		| "running"
		| "paused"
		| "errored"
		| "terminated" // user terminated the instance while it was running
		| "complete"
		| "waiting" // instance is hibernating and waiting for sleep or event to finish
		| "waitingForPause" // instance is finishing the current work to pause
		| "unknown";
	error?: {
		name: string;
		message: string;
	};
	output?: unknown;
	rollback: {
		outcome: "complete" | "failed";
		error: {
			name: string;
			message: string;
		} | null;
	} | null;
};

interface WorkflowInstanceRestartOptions {
	/**
	 * The step to restart the instance from.
	 * If omitted, the instance restarts from the beginning.
	 */
	from?: {
		/**
		 * The name of the step.
		 */
		name: string;
		/**
		 * The 1-based index of the step, used when multiple steps share the same name and type. Defaults to 1 (the first occurrence).
		 */
		count?: number;
		/**
		 * The step type. Use this to disambiguate when the same name is shared across step types. Defaults to "do".
		 */
		type?: "do" | "sleep" | "waitForEvent";
	};
}

interface WorkflowInstanceTerminateOptions {
	/**
	 * If true, run registered rollback handlers before terminating the instance.
	 */
	rollback?: boolean;
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | `string` | — | Instance ID |
| restart `from.name` | `string` | — | Step name to restart from (required inside `from`) |
| restart `from.count` | `number` | `1` | 1-based occurrence; corresponds to `step.count` |
| restart `from.type` | `"do" \| "sleep" \| "waitForEvent"` | `"do"` | Disambiguates a name shared across step types |
| terminate `rollback` | `boolean` | — | Run registered rollback handlers before terminating |
| sendEvent `type` | `string` | — | Event type (up to 100 characters); must match the Workflow's `waitForEvent` type |
| sendEvent `payload` | — | — | Event payload to deliver |

## Notes

- Adapted from the official docs: the request body is read with `readTextWithLimit()`, which counts bytes while reading the stream and cancels it once the limit is exceeded; `await req.text()` followed by a byte-length check would already have buffered an arbitrarily large body.
- `sendEvent` returns `void` on success and throws if the Workflow is not running or is in an errored state. Call it repeatedly with different `type` values to feed multiple `waitForEvent` calls, or use `Promise.race` in the Workflow to let the first event proceed.
- Adapted from the official docs: the webhook-forwarding example had no authentication, `instanceId` check, or payload validation; it now fails closed, rejects bodies over 1 MiB and non-JSON or non-object bodies, and leaves schema checks specific to your event type to you.
- `resume` on an instance that is not paused has no effect (trigger-workflows page) while the class comment says an error is thrown if it is already running; handle both. If the account or the Workflow's own concurrency limit is reached, the resumed instance is queued.
- `terminate` throws for instances that are errored, terminated, or complete; a terminated instance cannot be resumed.
- `restart()` immediately cancels in-progress steps, erases intermediate state, and treats the run as new, but keeps the previous instance's concurrency slot. A recursive unconditional `restart()` runs forever and effectively removes a concurrency slot. Restarting from a step reuses cached results of earlier steps; it throws if no matching step exists in the history. State that must survive a restart (for example a pagination cursor) must be kept outside the instance, such as in R2.
- `delete()` removes stored state; deleting a running instance stops it without running rollback handlers, and if a Workflow deletes itself, code after `await instance.delete()` does not run.
- While rollback runs the Workers API still reports `status: "running"`; check `rollback` once the instance is terminal.
- A Workflow can create another Workflow instance from inside a `step.do`; the parent continues without waiting, and a failed creation retries the step.

## Related

- [workflow-binding.md](./workflow-binding.md)
- [rollback.md](./rollback.md)
- [subscribe-instance-events.md](./subscribe-instance-events.md)
- [events-and-parameters.md](./events-and-parameters.md)
- [trigger-workflows.md](./trigger-workflows.md)
