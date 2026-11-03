---
source: https://developers.cloudflare.com/durable-objects/examples/build-a-counter/
---

# Durable Object Counter (RPC)

A Worker routes `?name=A` to a named Durable Object that increments, decrements, and reads a counter through RPC methods.

## Signature / Usage

```js
import { DurableObject } from "cloudflare:workers";

// Worker
export default {
	async fetch(request, env) {
		let url = new URL(request.url);
		let name = url.searchParams.get("name");
		if (!name) {
			return new Response(
				"Select a Durable Object to contact by using" +
					" the `name` URL query string parameter, for example, ?name=A",
			);
		}

		// A stub is a client Object used to send messages to the Durable Object.
		let stub = env.COUNTERS.getByName(name);

		// Send a request to the Durable Object using RPC methods, then await its response.
		let count = null;
		switch (url.pathname) {
			case "/increment":
				count = await stub.increment();
				break;
			case "/decrement":
				count = await stub.decrement();
				break;
			case "/":
				// Serves the current value.
				count = await stub.getCounterValue();
				break;
			default:
				return new Response("Not found", { status: 404 });
		}

		return new Response(`Durable Object '${name}' count: ${count}`);
	},
};

// Durable Object
export class Counter extends DurableObject {
	async getCounterValue() {
		let value = (await this.ctx.storage.get("value")) || 0;
		return value;
	}

	async increment(amount = 1) {
		let value = (await this.ctx.storage.get("value")) || 0;
		value += amount;
		// You do not have to worry about a concurrent request having modified the value in storage.
		// "input gates" will automatically protect against unwanted concurrency.
		// Read-modify-write is safe.
		await this.ctx.storage.put("value", value);
		return value;
	}

	async decrement(amount = 1) {
		let value = (await this.ctx.storage.get("value")) || 0;
		value -= amount;
		await this.ctx.storage.put("value", value);
		return value;
	}
}
```

Wrangler configuration (binding and migration):

Adapted (not in the official docs): `main` points to `src/index.js` because the code above is the JavaScript variant (the official file uses `src/index.ts`), and a `compatibility_date` is added. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-counter",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"durable_objects": {
		"bindings": [
			{
				"name": "COUNTERS",
				"class_name": "Counter"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"Counter"
			]
		}
	]
}
```

## Notes

- Adapted from the official docs: the Wrangler `main` is `src/index.js` to match the JavaScript code shown; the official configuration names `src/index.ts`, which belongs to the TypeScript variant. A `compatibility_date` was added because the official snippet omits it; Wrangler needs one to deploy, and the RPC calls in this sample require 2024-04-03 or later.
- Each distinct `name` maps to its own Durable Object instance with its own storage.
- Methods on the class are called directly on the stub (Workers RPC); no HTTP plumbing is needed.
- Only the JavaScript variant is shown; the official page also has TypeScript and Python versions. The official TypeScript variant calls `env.COUNTERS.get(name)` with a string, which does not match `getByName`; use `getByName(name)` as above.
- The `name` query parameter is used as-is; validate or authenticate it in a real application.

## Related

- [Stub](../references/durable-objects/stub.md)
- [Namespace](../references/durable-objects/namespace.md)
- [Migrations](../references/durable-objects/migrations.md)
- [Access storage](../references/durable-objects/access-storage.md)
