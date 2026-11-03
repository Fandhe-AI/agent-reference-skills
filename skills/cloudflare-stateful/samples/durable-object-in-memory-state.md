---
source: https://developers.cloudflare.com/durable-objects/examples/durable-object-in-memory-state/
---

# Durable Object In-Memory State

Keep the last access location in an instance field and observe that it is lost when the object is evicted.

## Signature / Usage

Adapted (not in the official docs): the official code builds the response text with `new String(...)` objects; plain strings are used instead. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

// Worker
export default {
	async fetch(request, env) {
		return await handleRequest(request, env);
	},
};

async function handleRequest(request, env) {
	let stub = env.LOCATION.getByName("A");
	// Forward the request to the remote Durable Object.
	let resp = await stub.fetch(request);
	// Return the response to the client.
	return new Response(await resp.text());
}

// Durable Object
export class Location extends DurableObject {
	constructor(state, env) {
		super(state, env);
		// Upon construction, you do not have a location to provide.
		// This value will be updated as people access the Durable Object.
		// When the Durable Object is evicted from memory, this will be reset.
		this.location = null;
	}

	// Handle HTTP requests from clients.
	async fetch(request) {
		let response = null;

		if (this.location == null) {
			response = `
This is the first request, you called the constructor, so this.location was null.
You will set this.location to be your city: (${request.cf.city}). Try reloading the page.`;
		} else {
			response = `
The Durable Object was already loaded and running because it recently handled a request.

Previous Location: ${this.location}
New Location: ${request.cf.city}`;
		}

		// You set the new location to be the new city.
		this.location = request.cf.city;
		console.log(response);
		return new Response(response);
	}
}
```

Wrangler configuration:

Adapted (not in the official docs): `main` points to `src/index.js` because the code above is the JavaScript variant (the official file uses `src/index.ts`), and a `compatibility_date` is added. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "durable-object-in-memory-state",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"durable_objects": {
		"bindings": [
			{
				"name": "LOCATION",
				"class_name": "Location"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"Location"
			]
		}
	]
}
```

## Notes

- Adapted from the official docs: the Wrangler `main` is `src/index.js` to match the JavaScript code shown; the official configuration names `src/index.ts`, which belongs to the TypeScript variant. A `compatibility_date` was added because the official snippet omits it; Wrangler needs one to deploy.
- In-memory fields persist across requests while the object stays loaded; after a period of inactivity the object is evicted and the constructor runs again. Use the Storage API for state that must survive eviction.
- Adapted from the official docs: `new String(...)` replaced with template strings (a `String` object is not a plain string body).
- `request.cf` can be absent in some local setups; `request.cf.city` is then undefined.
- Only the JavaScript variant is shown.

## Related

- [In-memory state](../references/durable-objects/in-memory-state.md)
- [Durable Object lifecycle](../references/durable-objects/durable-object-lifecycle.md)
- [Access storage](../references/durable-objects/access-storage.md)
