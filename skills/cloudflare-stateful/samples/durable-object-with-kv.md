---
source: https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/
---

# Use Workers KV from a Durable Object

Read and write a Workers KV namespace from inside a Durable Object, for example to serialize writes or fan out one read to many clients.

## Signature / Usage

Adapted (not in the official docs): the official snippet references an undefined `roomId`, calls `put` without a value, returns nothing when `roomId` is missing, and omits the Durable Object migration. See Notes.

```ts
import { DurableObject } from "cloudflare:workers";

interface Env {
	YOUR_KV_NAMESPACE: KVNamespace;
	YOUR_DO_CLASS: DurableObjectNamespace;
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		// Assume each Durable Object is mapped to a roomId in a query parameter
		// In a production application, this will likely be a roomId defined by your application
		// that you validate (and/or authenticate) first.
		let url = new URL(req.url);
		let roomIdParam = url.searchParams.get("roomId");

		if (roomIdParam) {
			// Get a stub that allows you to call that Durable Object
			let durableObjectStub = env.YOUR_DO_CLASS.getByName(roomIdParam);

			// Pass the request to that Durable Object and await the response
			// This invokes the constructor once on your Durable Object class (defined further down)
			// on the first initialization, and the fetch method on each request.
			let response = await durableObjectStub.fetch(
				`http://do/${encodeURIComponent(roomIdParam)}`,
			);

			// This would return the value you read from KV *within* the Durable Object.
			return response;
		}

		return new Response("roomId must be provided", { status: 400 });
	},
};

export class YourDurableObject extends DurableObject<Env> {
	constructor(
		public state: DurableObjectState,
		env: Env,
	) {
		super(state, env);
	}

	async fetch(request: Request) {
		// Error handling elided for brevity.
		// Write to KV
		await this.env.YOUR_KV_NAMESPACE.put("some-key", "some-value");

		// Fetch from KV
		let val = await this.env.YOUR_KV_NAMESPACE.get("some-other-key");

		return Response.json(val);
	}
}
```

Wrangler configuration:

Adapted (not in the official docs): a `migrations` entry and a `compatibility_date` are added. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"kv_namespaces": [
		{
			"binding": "YOUR_KV_NAMESPACE",
			"id": "<id_of_your_namespace>"
		}
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "YOUR_DO_CLASS",
				"class_name": "YourDurableObject"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"YourDurableObject"
			]
		}
	]
}
```

## Notes

- Corrected from the official docs: `${roomId}` (undefined) became `roomIdParam`; `put("some-key")` now passes a value; a 400 response is returned when `roomId` is missing instead of `undefined`.
- Adapted from the official docs: a `migrations` entry was added; a Durable Object class needs a migration before it can be deployed. A `compatibility_date` was also added because the official configuration omits it and Wrangler needs one to deploy.
- KV is eventually consistent; this sample demonstrates binding access, not strong consistency for KV data. The `roomId` should be validated or authenticated in production.
- Only the TypeScript variant is shown; Python is also on the official page.

## Related

- [Environments](../references/durable-objects/environments.md)
- [Base class](../references/durable-objects/base-class.md)
- [Migrations](../references/durable-objects/migrations.md)
