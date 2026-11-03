---
source: https://developers.cloudflare.com/workflows/build/workers-api/, https://developers.cloudflare.com/workflows/build/trigger-workflows/, https://developers.cloudflare.com/workflows/reference/limits/
---

# Workflow binding and exports configuration

Wrangler configuration for Workflows: the `workflows` binding, cross-script binding, step/CPU/subrequest limits, default retention, schedules, jurisdiction, and the `exports` form with `ctx.exports`.

## Signature / Usage

Binding a Workflow:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "workflows-starter",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"workflows": [
		{
			// name of your workflow
			"name": "workflows-starter",
			// binding name env.MY_WORKFLOW
			"binding": "MY_WORKFLOW",
			// this is class that extends the Workflow class in src/index.ts
			"class_name": "MyWorkflow",
		},
	],
}
```

Cross-script binding (Workflow defined in another Worker):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "web-api-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"workflows": [
		{
			// name of your workflow
			"name": "billing-workflow",
			// binding name env.MY_WORKFLOW
			"binding": "MY_WORKFLOW",
			// this is class that extends the Workflow class in src/index.ts
			"class_name": "MyWorkflow",
			// the script name where the Workflow is defined.
			// required if the Workflow is defined in another script.
			"script_name": "billing-worker",
		},
	],
}
```

Steps limit:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "workflows": [
    {
      "name": "my-workflow",
      "binding": "MY_WORKFLOW",
      "class_name": "MyWorkflow",
      "limits": {
        "steps": 25000
      }
    }
  ]
}
```

Default retention:

```jsonc
{
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"default_retention": {
				"success_retention": "3 days",
				"error_retention": "7 days",
			},
		},
	],
}
```

Cron schedules:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "workflows-tutorial",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"workflows": [
		{
			"name": "workflows-tutorial",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"schedules": ["0 * * * *"]
		}
	]
}
```

Declaring the Workflow in `exports` (Wrangler 4.139.0 or above):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "billing-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"exports": {
		"MyWorkflow": {
			"type": "workflow",
			"name": "billing-workflow",
			"schedules": ["0 * * * *"],
		},
	},
}
```

Calling an exported Workflow through `ctx.exports`:

Adapted (not in the official docs): a constant-time bearer-token check that fails closed when `TRIGGER_TOKEN` is unset was added, because the official handler creates instances and returns instance status for any caller. See Notes.

```ts
import {
	WorkflowEntrypoint,
	WorkflowEvent,
	WorkflowStep,
} from "cloudflare:workers";

type Params = { name: string };

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		return await step.do("greet", async () => `Hello, ${event.payload.name}!`);
	}
}

export default {
	async fetch(request, env: Env & { TRIGGER_TOKEN?: string }, ctx): Promise<Response> {
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

		const id = new URL(request.url).searchParams.get("id");

		// Get the status of an existing instance
		if (id !== null) {
			const instance = await ctx.exports.MyWorkflow.get(id);
			return Response.json(await instance.status());
		}

		// Create a new instance
		const instance = await ctx.exports.MyWorkflow.create({
			params: { name: "World" },
		});
		return Response.json({ id: instance.id });
	},
} satisfies ExportedHandler<Env>;
```

CPU limit (top-level Wrangler key):

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"cpu_ms": 300000, // 300,000 milliseconds = 5 minutes
	},
	// ...rest of your configuration...
}
```

Subrequest limit (top-level Wrangler key):

```jsonc
{
	// ...rest of your configuration...
	"limits": {
		"subrequests": 10000000, // 10 million (maximum)
	},
	// ...rest of your configuration...
}
```

## Options / Props

`workflows` entry:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | — | Workflow name (up to 64 characters; unique per account) |
| binding | `string` | — | Variable name on `env`; must be a valid JavaScript variable name |
| class_name | `string` | — | Class extending `WorkflowEntrypoint` (must match the exported class) |
| script_name | `string` | — | Worker that defines the Workflow; required for cross-script binding |
| limits.steps | `number` | `10000` | Maximum steps per instance on Workers Paid; configurable up to 25,000 |
| default_retention.success_retention | duration string or ms number | account maximum | Retention for completed and terminated instances |
| default_retention.error_retention | duration string or ms number | account maximum | Retention for errored instances |
| schedules | `string[]` | — | Cron expressions that create instances (up to 100 per account, 256 characters each) |
| jurisdiction | `"eu" \| "us" \| "fedramp"` | — | Restrict instances and their data to a region; see [data-location.md](./data-location.md) |

`exports` entry (keyed by the `WorkflowEntrypoint` class name):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | `"workflow"` | — | Marks the export as a Workflow |
| name | `string` | — | Workflow name |
| limits, schedules, default_retention, jurisdiction | — | — | Same settings as a `workflows` binding |

## Notes

- `default_retention` cannot be combined with `script_name`; set it on the Worker that defines the Workflow. Precedence: instance-level `retention` > binding `default_retention` > account default; retention cannot exceed the account limit.
- `step.sleep` does not count toward the steps limit. Workers Free is limited to 1,024 steps.
- Workflows declared in `exports` are called from the declaring Worker through `ctx.exports`, keyed by class name (same API as a binding). Other Workers use a cross-script binding with `script_name` and `class_name` set to the export key. Local development of `ctx.exports.<Workflow>` needs Wrangler 4.142.0+, `@cloudflare/vite-plugin` 1.61.0+, or `@cloudflare/vitest-plugin` 1.3.0+. `wrangler types` (4.142.0+) types it as `Workflow<Params>`.
- A binding and an export with the same `name` share instances, so a Workflow can move from binding to export without losing instances. Both declarations must use the same class and must not set the same setting to different values. A binding to a Workflow in another Worker cannot use the same `name` as an export in this Worker.
- `schedules` instances on Workers Paid can run up to one hour per cron firing without taking a concurrency slot. Use the latest Wrangler if the schema rejects `schedules`.
- `limits.cpu_ms` raises CPU time up to 5 minutes (default 30 seconds) for invocations of the Workflow definition; `limits.subrequests` raises subrequests up to 10 million (default 10,000 on Workers Paid).
- Vitest introspection of Workflows declared in `exports` is in the cloudflare-wrangler skill (vitest-integration).
- Workflows cannot be deployed to Workers for Platforms namespaces.
- Adapted from the official docs: the `ctx.exports` handler now requires `Authorization: Bearer <TRIGGER_TOKEN>` (set with `npx wrangler secret put TRIGGER_TOKEN`; rejected when unset), the same check as [trigger-workflows.md](./trigger-workflows.md); the official handler creates an instance for any caller and returns instance status by ID.
- Apart from the token check, the `ctx.exports` snippet is the official one; `WorkflowEvent` and `WorkflowStep` are types, so with `verbatimModuleSyntax` import them with `import type`.

## Related

- [workflow-binding.md](./workflow-binding.md)
- [trigger-workflows.md](./trigger-workflows.md)
- [limits.md](./limits.md)
- [data-location.md](./data-location.md)
