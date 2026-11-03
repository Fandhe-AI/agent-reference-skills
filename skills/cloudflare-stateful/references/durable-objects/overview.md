---
source: https://developers.cloudflare.com/durable-objects/
---

# Cloudflare Durable Objects

Durable Objects are a building block for stateful applications and distributed systems (AI agents, collaborative apps, real-time chat, multiplayer games) that combine compute with strongly consistent storage. Available on Free and Paid plans.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/api/stub/

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class MyDurableObject extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
	}

	async sayHello() {
		return "Hello, World!";
	}
}

// Worker
export default {
	async fetch(request, env) {
		// A stub is a client used to invoke methods on the Durable Object
		const stub = env.MY_DURABLE_OBJECT.getByName("foo");

		// Methods on the Durable Object are invoked via the stub
		const rpcResponse = await stub.sayHello();

		return new Response(rpcResponse);
	},
};
```

## Notes

- A Durable Object is a special kind of Worker that combines compute with storage: it has a globally-unique name (so any Worker can address it) and attached strongly consistent durable storage. This enables stateful serverless applications.
- SQLite-backed Durable Objects are available on the Workers Free plan with the limits on the pricing page. SQLite storage and `sql.exec` are generally available; new classes should use the SQLite storage configuration.
- Headline features: in-memory state, Storage API, WebSocket Hibernation, Alarms, and RPC.
- Related products by plain URL: Workers https://developers.cloudflare.com/workers/ (cloudflare-workers skill), D1 https://developers.cloudflare.com/d1/ and R2 https://developers.cloudflare.com/r2/ (cloudflare-storage skill), storage options https://developers.cloudflare.com/workers/platform/storage-options/.
- The Agents SDK is built on Durable Objects and is covered by the cloudflare-agents skill; `wrangler` configuration and local development are in cloudflare-wrangler.

## Related

- [What are Durable Objects?](./what-are-durable-objects.md)
- [Get started](./get-started.md)
- [Limits](./limits.md)
- [Pricing](./pricing.md)
- [SQLite-backed storage API](./sqlite-storage-api.md)
- [WebSockets](./websockets.md)
- [Alarms](./alarms.md)
- [In-memory state](./in-memory-state.md)
