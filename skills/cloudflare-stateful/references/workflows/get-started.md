---
source: https://developers.cloudflare.com/workflows/get-started/guide/
---

# Build your first Workflow

Create, configure, run locally, and deploy a Workflow that fetches data, sleeps, and processes the result.

## Signature / Usage

Project creation (C3) and the quick-start template:

```sh
npm create cloudflare@latest -- my-workflow
npm create cloudflare@latest workflows-starter -- --template "cloudflare/workflows-starter"
```

`src/workflow.ts`:

```ts
import { WorkflowEntrypoint, WorkflowStep } from "cloudflare:workers";
import type { WorkflowEvent } from "cloudflare:workers";

type Params = { name?: string };
type IPResponse = { result: { ipv4_cidrs: string[] } };

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		const data = await step.do("fetch data", async () => {
			const response = await fetch(
				"https://api.cloudflare.com/client/v4/ips",
			);
			return await response.json<IPResponse>();
		});

		await step.sleep("pause", "20 seconds");

		const result = await step.do(
			"process data",
			{ retries: { limit: 3, delay: "5 seconds", backoff: "linear" } },
			async () => {
				return {
					name: event.payload.name ?? "World",
					ipCount: data.result.ipv4_cidrs.length,
				};
			},
		);

		return result;
	}
}
```

`wrangler.jsonc` Workflow configuration:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "my-workflow",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"observability": {
		"enabled": true
	},
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow"
		}
	]
}
```

`src/index.ts` (start and check instances):

Adapted (not in the official docs): a constant-time bearer-token check that fails closed when `TRIGGER_TOKEN` is unset was added, because the tutorial handler creates instances and returns instance status for any caller. See Notes.

```ts
export { MyWorkflow } from "./workflow";

export default {
	async fetch(request: Request, env: Env & { TRIGGER_TOKEN?: string }): Promise<Response> {
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

		const url = new URL(request.url);
		const instanceId = url.searchParams.get("instanceId");

		if (instanceId) {
			const instance = await env.MY_WORKFLOW.get(instanceId);
			return Response.json(await instance.status());
		}

		const instance = await env.MY_WORKFLOW.create();
		return Response.json({ instanceId: instance.id });
	},
} satisfies ExportedHandler<Env>;
```

Generate types, then develop locally with the token in an untracked `.dev.vars` file (`TRIGGER_TOKEN=<long-random-value>`; add `.dev.vars` to `.gitignore`) and the same value exported as `TRIGGER_TOKEN` in your shell:

Adapted (not in the official docs): the `curl` calls send the bearer token, and the secret is stored before deploying. See Notes.

```sh
npx wrangler types
npx wrangler dev
curl -H "Authorization: Bearer ${TRIGGER_TOKEN}" http://localhost:8787
curl -H "Authorization: Bearer ${TRIGGER_TOKEN}" "http://localhost:8787?instanceId=abc-123-def"
npx wrangler secret put TRIGGER_TOKEN
npx wrangler deploy
npx wrangler workflows instances describe my-workflow latest
```

## Options / Props

C3 prompts selected by the guide:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| What would you like to start with? | choice | — | `Hello World example` |
| Which template would you like to use? | choice | — | `Worker only` |
| Which language do you want to use? | choice | — | `TypeScript` |
| Do you want to use git for version control? | choice | — | `Yes` |
| Do you want to add an AGENTS.md file ...? | choice | — | `Yes` |
| Do you want to deploy your application? | choice | — | `No` (changes are made before deploying) |

## Notes

- `class_name` must match the exported class; `binding` is the variable name on `env` (`env.MY_WORKFLOW`). `wrangler types` generates `worker-configuration.d.ts` with the `Env` type including the binding.
- The local instance completes after about 20 seconds (the sleep duration).
- `wrangler workflows instances describe` shows each step's status, emitted state (streamed output is shown as a preview or summary), sleep state and wake-up time, retries, and errors.
- Add `schedules` (for example `["0 * * * *"]`) to the Workflow definition to create instances on a recurring interval; see [trigger-workflows.md](./trigger-workflows.md).
- Bindings such as KV, R2, or D1 are reachable through `this.env` inside a Workflow.
- Adapted from the official docs: the tutorial `fetch` handler created an instance for any caller and exposed instance status by ID. It now requires `Authorization: Bearer <TRIGGER_TOKEN>` (rejected when the secret is unset), compared in constant time as in [trigger-workflows.md](./trigger-workflows.md), and the `curl` examples send that header.
- Guide for deciding step boundaries: "Do I want all of this code to run again if just one part fails?"

## Related

- [workflow-entrypoint.md](./workflow-entrypoint.md)
- [workflow-step.md](./workflow-step.md)
- [rules-of-workflows.md](./rules-of-workflows.md)
- [local-development.md](./local-development.md)
- [sleeping-and-retrying.md](./sleeping-and-retrying.md)
