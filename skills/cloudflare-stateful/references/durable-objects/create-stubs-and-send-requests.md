---
source: https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/
---

# Invoke methods

Invoke methods on a Durable Object from a Worker through a stub: prefer RPC methods (compatibility date 2024-04-03 or later), or send `Request`/`Response` via the `fetch()` handler.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";

export interface Env {
	MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
}

// Durable Object
export class MyDurableObject extends DurableObject {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
	}

	async sayHello(): Promise<string> {
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
} satisfies ExportedHandler<Env>;
```

`fetch()` handler (pre-2024-04-03 compatibility dates or when you need `Request`/`Response`):

```ts
import { DurableObject } from "cloudflare:workers";

export interface Env {
	MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
}

// Durable Object
export class MyDurableObject extends DurableObject {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
	}

	private hello(name: string) {
		return new Response(`Hello, ${name}!`);
	}

	private goodbye(name: string) {
		return new Response(`Goodbye, ${name}!`);
	}

	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		let name = url.searchParams.get("name");
		if (!name) {
			name = "World";
		}

		switch (url.pathname) {
			case "/hello":
				return this.hello(name);
			case "/goodbye":
				return this.goodbye(name);
			default:
				return new Response("Bad Request", { status: 400 });
		}
	}
}

// Worker
export default {
	async fetch(_request, env, _ctx) {
		// A stub is a client used to invoke methods on the Durable Object
		const stub = env.MY_DURABLE_OBJECT.getByName("foo");

		// Invoke the fetch handler on the Durable Object stub
		let response = await stub.fetch("http://do/hello?name=World");

		return response;
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Public methods on a class extending `DurableObject` are exposed as RPC methods. All RPC calls are asynchronous, accept and return serializable types, and propagate exceptions to the caller without a stack trace (see Workers RPC in the cloudflare-workers skill).
- With RPC, `DurableObject` defines `ctx` and `env` as class properties; what was previously called `state` is `ctx`, consistent with `WorkerEntrypoint`.
- The URL of a `Request` passed to a Durable Object `fetch()` must be well-formed but need not be publicly resolvable (e.g. `http://do/hello`).
- Corrected from the official docs: the page's second `fetch` example is shown in a `js` fence containing TypeScript syntax (`private`, type annotations); only the TypeScript version is kept here.
- Without RPC, people dispatched private methods through URL paths in `fetch()`; RPC is more ergonomic for that.

## Related

- [DurableObjectStub](./stub.md)
- [DurableObjectNamespace](./namespace.md)
- [Error handling](./error-handling.md)
- [Durable Object base class](./base-class.md)
