---
source: https://developers.cloudflare.com/workflows/build/workers-api/
---

# Workflow binding (create, createBatch, deleteBatch, get)

The `Workflow` type exposes methods on a Worker binding to create, fetch, and delete Workflow instances.

## Signature / Usage

```ts
interface Env {
	// The 'MY_WORKFLOW' variable should match the "binding" value set in the Wrangler config file
	MY_WORKFLOW: Workflow;
}
```

```ts
create(options?: WorkflowInstanceCreateOptions): Promise<WorkflowInstance>
createBatch(options: WorkflowBatchCreateOptions): Promise<WorkflowBatchCreateResult>
deleteBatch(instanceIds: string[]): Promise<WorkflowBatchDeleteResult>
get(id: string): Promise<WorkflowInstance>
```

Adapted (not in the official docs): the official typed-binding example writes the email as an unquoted token (`email: user@example.com`), which is not valid code; it is quoted here, and a fail-closed bearer-token check was added because the handler creates an instance for any caller. See Notes.

```ts
interface User {
	email: string;
	createdTimestamp: number;
}

interface Env {
	// Pass our User type as the type parameter to the Workflow definition
	MY_WORKFLOW: Workflow<User>;
	TRIGGER_TOKEN?: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
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

		// More likely to come from your database or via the request body!
		const user: User = {
			email: "user@example.com",
			createdTimestamp: Date.now(),
		};

		let instance = await env.MY_WORKFLOW.create({
			// params expects the type User
			params: user,
		});

		return Response.json({
			id: instance.id,
			details: await instance.status(),
		});
	},
} satisfies ExportedHandler<Env>;
```

`create` with your own ID and params, and `get` with error handling:

```ts
// Create a new Workflow instance with your own ID and pass params to the Workflow instance
let instance = await env.MY_WORKFLOW.create({
	id: myIdDefinedFromOtherSystem,
	params: { hello: "world" },
});
return Response.json({
	id: instance.id,
	details: await instance.status(),
});
```

```ts
// Fetch an existing Workflow instance by ID:
try {
	let instance = await env.MY_WORKFLOW.get(id);
	return Response.json({
		id: instance.id,
		details: await instance.status(),
	});
} catch (e: any) {
	// Handle errors
	// .get will throw an exception if the ID doesn't exist or is invalid.
	const msg = `failed to get instance ${id}: ${e.message}`;
	console.error(msg);
	return Response.json({ error: msg }, { status: 400 });
}
```

`createBatch` (same options for all, or per-instance options):

```ts
// Create 3 Workflow instances with generated IDs and the same params
const result = await env.MY_WORKFLOW.createBatch({
	count: 3,
	params: { hello: "world" },
});

// Create 3 Workflow instances, each with its own ID and params
const result2 = await env.MY_WORKFLOW.createBatch({
	instances: [
		{ id: "id-abc123", params: { hello: "world-0" } },
		{ id: "id-def456", params: { hello: "world-1" } },
		{ id: "id-ghi789", params: { hello: "world-2" } },
	],
});
```

`deleteBatch`:

```ts
const result = await env.MY_WORKFLOW.deleteBatch([
	"instance-abc",
	"instance-def",
]);
```

Types:

```ts
type WorkflowBatchCreateOptions =
	| {
			count: number;
			params?: unknown;
			retention?: {
				successRetention?: WorkflowRetentionDuration;
				errorRetention?: WorkflowRetentionDuration;
			};
	  }
	| {
			instances: WorkflowInstanceCreateOptions[];
	  };

type WorkflowBatchCreateResult = {
	created: WorkflowInstance[];
	errors: {
		index: number;
		id?: string;
		code: number;
		message: string;
	}[];
};

type WorkflowBatchDeleteResult = {
	deleted: { id: string }[];
	errors: {
		id: string;
		code: number;
		message: string;
	}[];
};

interface WorkflowInstanceCreateOptions {
	/**
	 * An id for your Workflow instance. Must be unique within the Workflow.
	 */
	id?: string;
	/**
	 * The event payload the Workflow instance is triggered with
	 */
	params?: unknown;
	/**
	 * The retention policy for the Workflow instance.
	 * Defaults to the maximum retention period available for the owner's account.
	 */
	retention?: {
		/**
		 * How long to retain instance state after the Workflow completes successfully
		 * or is terminated.
		 */
		successRetention?: WorkflowRetentionDuration;
		/**
		 * How long to retain instance state after the Workflow ends in an errored state.
		 */
		errorRetention?: WorkflowRetentionDuration;
	};
}

type WorkflowRetentionDuration = WorkflowSleepDuration;
```

Migrating from the deprecated array form of `createBatch`:

```ts
// Deprecated: array form
const instances = await env.MY_WORKFLOW.createBatch(listOfInstances);

// Object form
const { created, errors } = await env.MY_WORKFLOW.createBatch({
	instances: listOfInstances,
});
```

## Options / Props

`WorkflowInstanceCreateOptions` (and the per-entry options of `createBatch.instances`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | `string` | generated | Instance ID, unique within the Workflow; up to 100 characters, pattern `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` |
| params | `unknown` | — | Event payload (JSON-serializable) the instance is triggered with |
| retention.successRetention | `WorkflowRetentionDuration` | binding `default_retention`, else account maximum | State retention after success or termination |
| retention.errorRetention | `WorkflowRetentionDuration` | binding `default_retention`, else account maximum | State retention after an errored end |

`createBatch` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| count | `number` | — | Integer 1 to 100; instances share `params`/`retention` and get generated IDs. Cannot be combined with `instances` |
| params | `unknown` | — | Shared payload (with `count`) |
| retention | object | — | Shared `successRetention` / `errorRetention` (with `count`) |
| instances | `WorkflowInstanceCreateOptions[]` | — | 1 to 100 entries, each with its own options |

`createBatch` error codes:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| 10405 | `number` | — | An instance with this ID already exists |
| 10415 | `number` | — | An earlier entry in the same batch uses this ID; only the first entry is created |

## Notes

- `create` throws if the ID is already used by an instance still within its retention limit; to re-run with the same ID use `restart` on the existing instance. A type parameter on `Workflow<T>` does not validate params and does not propagate types into the Workflow itself.
- `createBatch` does not throw for an existing ID; it reports the entry in `errors`. It throws before creating anything if any entry has invalid options (invalid ID or retention duration). Each created instance still counts against the creation rate limit.
- Using the `count` form in local development and getting its types from `wrangler types` requires Wrangler 4.148.0 or later. Passing an array to `createBatch` is deprecated; the array form silently skips existing or repeated IDs.
- `deleteBatch` accepts 1 to 100 IDs; duplicates count toward the limit and are deleted once; missing IDs appear in `errors`; any invalid ID fails the call before deleting anything. Deleting a running instance stops execution without running rollback handlers.
- `get` throws if the instance ID does not exist or is invalid.
- Binding from a Worker requires compatibility date `2024-10-22` or later. Call `wrangler types` after editing the Wrangler config.
- Adapted from the official docs: the typed-binding example used an unquoted `user@example.com`, and it created an instance on every request from any caller; it now requires `Authorization: Bearer <TRIGGER_TOKEN>` (rejected when the secret is unset), the same check as [trigger-workflows.md](./trigger-workflows.md).

## Related

- [workflow-instance.md](./workflow-instance.md)
- [workflow-configuration.md](./workflow-configuration.md)
- [trigger-workflows.md](./trigger-workflows.md)
- [limits.md](./limits.md)
