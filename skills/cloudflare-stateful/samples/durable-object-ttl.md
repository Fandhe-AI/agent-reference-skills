---
source: https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/
---

# Durable Object Time To Live (TTL)

Delete a Durable Object's storage after a period without requests by re-arming an alarm on every request.

## Signature / Usage

Adapted (not in the official docs): the official snippet contains a literal `...` placeholder inside `fetch()` (a syntax error) and returns no `Response`. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class MyDurableObject extends DurableObject {
  // Time To Live (TTL) in milliseconds
  timeToLiveMs = 1000;

  constructor(ctx, env) {
    super(ctx, env);
  }

  async fetch(_request) {
    // Extend the TTL immediately following every fetch request to a Durable Object.
    await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);
    // Handle the request here, then return a Response.
    return new Response("ok");
  }

  async alarm() {
    await this.ctx.storage.deleteAll();
  }
}

// Worker
export default {
  async fetch(request, env) {
    const stub = env.MY_DURABLE_OBJECT.getByName("foo");
    return await stub.fetch(request);
  },
};
```

Wrangler configuration:

Adapted (not in the official docs): `main` points to `src/index.js` because the code above is the JavaScript variant (the official file uses `src/index.ts`), and a `compatibility_date` is added. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "durable-object-ttl",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_DURABLE_OBJECT",
				"class_name": "MyDurableObject"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"MyDurableObject"
			]
		}
	]
}
```

## Notes

- Adapted from the official docs: the Wrangler `main` is `src/index.js` to match the JavaScript code shown; the official configuration names `src/index.ts`, which belongs to the TypeScript variant. A `compatibility_date` was added because the official snippet omits it; Wrangler needs one to deploy.
- Corrected from the official docs: `...` replaced by a comment and a returned `Response`.
- Extend the TTL in `fetch`, not in the constructor. If an alarm wakes a hibernated object, the constructor runs before `alarm()`; extending the TTL there would keep pushing the alarm out so the handler never runs. If you must call `setAlarm` in the constructor, check that no alarm is already set.
- The 1000 ms TTL is a demonstration value; pick one for your use case.
- Only the JavaScript variant is shown.

## Related

- [Alarms](../references/durable-objects/alarms.md)
- [Durable Object lifecycle](../references/durable-objects/durable-object-lifecycle.md)
