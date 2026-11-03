---
source: https://developers.cloudflare.com/workflows/build/trigger-workflows/
---

# Trigger Workflows

Create, inspect, and manage Workflow instances from Workers bindings, cron `schedules`, the REST API, or Wrangler.

## Signature / Usage

Adapted (not in the official docs): a bearer-token check that fails closed when the secret is unset was added, because the official handler creates instances and exposes instance status for any caller; see Notes.

```ts
interface Env {
	MY_WORKFLOW: Workflow;
	TRIGGER_TOKEN?: string;
}

export default {
	async fetch(req: Request, env: Env) {
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

		// Get instanceId from query parameters
		const instanceId = new URL(req.url).searchParams.get("instanceId");

		// If an ?instanceId=<id> query parameter is provided, fetch the status
		// of an existing Workflow by its ID.
		if (instanceId) {
			let instance = await env.MY_WORKFLOW.get(instanceId);
			return Response.json({
				status: await instance.status(),
			});
		}

		// Else, create a new instance of our Workflow, passing in any (optional)
		// params and return the ID.
		const newId = crypto.randomUUID();
		let instance = await env.MY_WORKFLOW.create({ id: newId });
		return Response.json({
			id: instance.id,
			details: await instance.status(),
		});
	},
};
```

Trigger from another Workflow (the parent does not wait for the child). Adapted (not in the official docs): the step returns the child's `id` instead of the `WorkflowInstance` stub, which is not serializable step state, and tolerates a retry after the child was already created; see Notes.

```ts
export class ParentWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		// Perform initial work
		const result = await step.do("initial processing", async () => {
			// ... processing logic
			return { fileKey: "output.pdf" };
		});

		// Trigger a child workflow for additional processing
		const childId = await step.do("trigger child workflow", async () => {
			const id = `child-${event.instanceId}`;
			try {
				await this.env.CHILD_WORKFLOW.create({
					id,
					params: { fileKey: result.fileKey },
				});
			} catch {
				// A retry after a create that already succeeded fails because the ID
				// is taken; get() confirms the child exists (and throws if it does not).
				await this.env.CHILD_WORKFLOW.get(id);
			}
			return id;
		});

		// Parent continues immediately - not blocked by child workflow
		await step.do("continue with other work", async () => {
			console.log(`Started child workflow: ${childId}`);
			// This runs right away, regardless of child workflow status
		});
	}
}
```

Pause, resume, terminate (with rollback), restart, delete:

```ts
let instance = await env.MY_WORKFLOW.get("abc-123");
await instance.pause(); // Returns Promise<void>
await instance.resume(); // Returns Promise<void>
await instance.terminate({ rollback: true }); // Returns Promise<void>
await instance.restart(); // Returns Promise<void>
```

Wrangler (run against a disposable or intended Workflow; `terminate` is irreversible and `delete` removes state):

```sh
npx wrangler workflows instances terminate <WORKFLOW_NAME> <INSTANCE_ID> --rollback
# For a local Workflows instance during wrangler dev:
npx wrangler workflows instances terminate <WORKFLOW_NAME> <INSTANCE_ID> --local --rollback
npx wrangler workflows instances delete <WORKFLOW_NAME> <INSTANCE_ID>
npx wrangler workflows instances delete <WORKFLOW_NAME> latest
npx wrangler workflows instances delete <WORKFLOW_NAME> --filename ./instance-ids.json
```

`instance-ids.json`:

```json
["instance-abc", "instance-def"]
```

Delete in bulk:

```ts
const result = await env.MY_WORKFLOW.deleteBatch([
	"instance-abc",
	"instance-def",
]);

console.log(result.deleted); // [{ id: "instance-abc" }, { id: "instance-def" }]
console.log(result.errors); // Per-instance failures, if any
```

## Options / Props

Trigger paths:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Workers `fetch` handler | binding | — | Trigger over HTTP |
| Queue consumer (`queue` handler) | binding | — | Trigger from a Queue consumer |
| `schedules` on the Workflow binding | `string[]` of cron expressions | — | Create instances on a recurring interval without a `scheduled` handler |
| Cron Trigger (`scheduled` handler) | binding | — | Trigger from a Cron Trigger |
| Durable Object | binding | — | Trigger from within a Durable Object |
| REST API | HTTP | — | https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/create/ |
| Wrangler CLI | command | — | `wrangler workflows trigger` |

## Notes

- `schedules` accepts up to 100 cron expressions per account; each matching expression creates a new instance and sets `event.schedule` (`cron` and `scheduledTime`). On Workers Paid, scheduled instances can run up to one hour per firing without consuming a concurrency slot, after which they enter the normal queue on resume. See [workflow-configuration.md](./workflow-configuration.md).
- `resume` on a non-paused instance has no effect; at the concurrency limit a resumed instance is queued.
- Once terminated, an instance cannot be resumed.
- `restart()` cancels in-progress steps, erases intermediate state, and keeps the previous concurrency slot; calling it recursively without a condition runs forever and effectively removes a slot. The official page also shows a long R2-chunk pipeline that restarts itself while keeping a cursor object in R2; its key point is to keep any state that must survive a restart outside the instance. See https://developers.cloudflare.com/workflows/build/trigger-workflows/#restart-a-workflow .
- `deleteBatch` accepts 1 to 100 IDs. Wrangler `instances delete` takes one or more IDs or a file with a top-level JSON array of strings (combined up to 100 IDs); `latest` deletes the most recent instance. With `--local` it targets a `wrangler dev` session.
- If creating the child instance fails inside a step, the step retries per its retry configuration; once created, the child runs independently.
- Adapted from the official docs: the child ID is deterministic (`child-<parent instance ID>`), and `create` throws when the ID already exists, so a step retried after a successful `create` would fail on every attempt. The step falls back to `get(id)` to confirm the existing child, which keeps it idempotent.
- Adapted from the official docs: the `fetch` example creates an instance and reveals instance status, so it now requires a bearer token (`TRIGGER_TOKEN`, rejected when unset). Never expose instance creation on an unauthenticated public route.
- Corrected from the official docs: the parent/child example returned the `WorkflowInstance` from `step.do`; step state must be serializable, so only the child ID is returned. `Params` is a placeholder type, and `WorkflowEntrypoint`/`WorkflowEvent`/`WorkflowStep` must be imported from `cloudflare:workers` (types via `import type`).

## Related

- [workflow-binding.md](./workflow-binding.md)
- [workflow-instance.md](./workflow-instance.md)
- [call-workflows-from-pages.md](./call-workflows-from-pages.md)
- [wrangler-commands.md](./wrangler-commands.md)
