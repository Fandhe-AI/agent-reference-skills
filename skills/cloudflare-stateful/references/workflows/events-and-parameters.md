---
source: https://developers.cloudflare.com/workflows/build/events-and-parameters/
---

# Events and parameters

Pass data to a Workflow when triggering it, wait for external events with `step.waitForEvent`, and send events with `instance.sendEvent`.

## Signature / Usage

Adapted (not in the official docs): a bearer-token check that fails closed when the secret is unset was added, because the official handler creates an instance for any caller; see Notes.

```ts
export default {
	async fetch(req: Request, env: Env & { TRIGGER_TOKEN?: string }) {
		// Fail closed: reject when the secret is not configured or does not match
		const enc = new TextEncoder();
		const expected = env.TRIGGER_TOKEN;
		const provided = enc.encode(req.headers.get("Authorization") ?? "");
		const wanted = enc.encode(`Bearer ${expected ?? ""}`);
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		let someEvent = { url: req.url, createdTimestamp: Date.now() };
		// Trigger our Workflow
		// Pass our event as the second parameter to the `create` method
		// on our Workflow binding.
		let instance = await env.MY_WORKFLOW.create({
			id: crypto.randomUUID(),
			params: someEvent,
		});

		return Response.json({
			id: instance.id,
			details: await instance.status(),
		});
	},
};
```

```sh
npx wrangler@latest workflows trigger workflows-starter '{"some":"data"}'
```

Wait for an event with a custom timeout, continuing when it times out:

```ts
try {
	const event = await step.waitForEvent("wait for approval", {
		type: "approval",
		timeout: "1 hour",
	});
	// Handle the received event
} catch (e) {
	// Timeout occurred - handle the case where no event was received
	console.log("No approval received, proceeding with default action");
}
```

Typing the payload:

```ts
// Define a type that conforms to the events your Workflow instance is
// instantiated with
interface YourEventType {
	userEmail: string;
	createdTimestamp: number;
	metadata?: Record<string, string>;
}
```

```ts
// Import the Workflow definition
import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent} from 'cloudflare:workers';

export class MyWorkflow extends WorkflowEntrypoint {
	// Pass your type as a type parameter to WorkflowEvent
	// The 'payload' property will have the type of your parameter.
	async run(event: WorkflowEvent<YourEventType>, step: WorkflowStep) {
		let state = await step.do("my first step", async () => {
			// Access your properties via event.payload
			let userEmail = event.payload.userEmail
			let createdTimestamp = event.payload.createdTimestamp
		})

		await step.do("my second step", async () => { /* your code here */ })
	}
}
```

Reading the cron schedule metadata:

```ts
export class MyWorkflow extends WorkflowEntrypoint<Env> {
	async run(event: WorkflowEvent<unknown>, step: WorkflowStep) {
		if (event.schedule) {
			console.log(event.schedule.cron);
			console.log(new Date(event.schedule.scheduledTime));
		}
	}
}
```

Sending events to a waiting instance: use the authenticated handler in [workflow-instance.md](./workflow-instance.md) (the official page shows the same handler without authentication).

## Options / Props

Ways to pass parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `create({ params })` | any JSON-serializable object | — | Optional argument to `create` on a Workflow binding |
| `--params` / second positional of `workflows trigger` | JSON string | — | Pass from the Wrangler CLI |
| `step.waitForEvent` | event + optional payload | — | Receive data while the instance runs, via `instance.sendEvent` or the REST Events endpoint |

## Notes

- `WorkflowEvent` and `payload` are immutable; changes are not persisted across steps or restarts. Return state from `step.do`.
- A type parameter on `WorkflowEvent` does not validate input, and typing the `Workflow` binding does not propagate types into the Workflow itself.
- `waitForEvent` `type` accepts only letters, digits, `-`, and `_` (up to 100 characters); including `.` fails with `workflow.invalid_event_type`. Timeout range is 1 second to 365 days, default 24 hours. A timeout throws and fails the instance unless caught.
- Events can be sent before the instance reaches `waitForEvent` (buffered, delivered on the matching `type`), but the instance must already exist. Events can also be sent with the REST API Events endpoint: https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/events/methods/create/ .
- Calling `waitForEvent` multiple times with different `type` values lets you wait for several events; use control flow to wait conditionally.
- Adapted from the official docs: the first `fetch` example now requires a bearer token (`TRIGGER_TOKEN`, rejected when unset) because the official handler creates an instance for any caller.
- Treat `event.payload` and `waitForEvent` payloads as untrusted input: validate their shape at run time (inside a step) before acting on them.
- The typing snippet above is verbatim from the official page; `WorkflowEntrypoint` is shown without type arguments there, so add `<Env>` if you read bindings.

## Related

- [workflow-step.md](./workflow-step.md)
- [workflow-instance.md](./workflow-instance.md)
- [workflow-entrypoint.md](./workflow-entrypoint.md)
