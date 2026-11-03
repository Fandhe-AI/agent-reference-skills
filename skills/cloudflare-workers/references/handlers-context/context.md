---
source: https://developers.cloudflare.com/workers/runtime-apis/context/
---

# Context (ctx)

The Context API provides methods to manage the lifecycle of your Worker or Durable Object. It is exposed as the third parameter in all handlers (`fetch(request, env, ctx)`) and as a class property of the `WorkerEntrypoint` class (`this.ctx`).

## Signature / Usage

```js
export default {
	async fetch(request, env, ctx) {
		// Forward / proxy original request
		let res = await fetch(request);

		// Add custom header(s)
		res = new Response(res.body, res);
		res.headers.set("x-foo", "bar");

		// Cache the response
		// NOTE: Does NOT block / wait
		ctx.waitUntil(caches.default.put(request, res.clone()));

		// Done
		return res;
	},
};
```

## Options / Props

| Name | Description |
|------|-------------|
| `ctx.props` | Additional configuration passed to a Worker based on the context in which it was invoked (e.g. from a Service Binding `props` value). Arbitrary JSON value; can only be set by someone with permission to edit and deploy the receiving Worker, so its content is authentic. |
| `ctx.exports` | Automatically-configured "loopback" bindings for all top-level exports. Requires the `enable_ctx_exports` compatibility flag. |
| `ctx.tracing` | Access to the custom spans API (same object as `import { tracing } from "cloudflare:workers"`). Tracing must be enabled on the Worker. |
| `ctx.waitUntil(promise)` | Extends the lifetime of the Worker so work can continue after the response is returned. |
| `ctx.passThroughOnException()` | Fail open: pass the request through to the origin server when the Worker throws an unhandled exception. |

## Notes

### props

Example Service Binding configuration with `props`:

```jsonc
{
	"services": [
		{
			"binding": "DOC_SERVICE",
			"service": "doc-worker",
			"entrypoint": "DocServiceApi",
			"props": {
				"clientId": "frontend-worker",
				"permissions": [
					"read",
					"write"
				]
			}
		}
	]
}
```

The `DocServiceApi` instance receiving the call can read this value as `this.ctx.props`. There is no need to use secret keys or cryptographic signatures in a `ctx.props` value. `ctx.props` can also configure an RPC interface to represent a specific resource (a "custom binding"), e.g. a `docId` property restricting access to one document.

### exports

Requires the `enable_ctx_exports` compatibility flag.

- For each top-level export that `extends WorkerEntrypoint` (or simply implements a fetch handler), `ctx.exports` contains a Service Binding.
- For each top-level export that `extends DurableObject` (and configured with storage via a migration), it contains a Durable Object namespace binding.
- For each top-level export that `extends WorkflowEntrypoint` (and declared as a Workflow in the `exports` field of your Wrangler configuration), it contains a Workflow binding.

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class Greeter extends WorkerEntrypoint {
	greet(name) {
		return `Hello, ${name}!`;
	}
}

export default {
	async fetch(request, env, ctx) {
		let greeting = await ctx.exports.Greeter.greet("World");
		return new Response(greeting);
	},
};
```

Loopback Service Bindings in `ctx.exports` let the caller specify the `ctx.props` delivered to the callee:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class Greeter extends WorkerEntrypoint {
	greet(name) {
		return `${this.ctx.props.greeting}, ${name}!`;
	}
}

export default {
	async fetch(request, env, ctx) {
		// Make a custom greeter that uses the greeting "Welcome".
		let greeter = ctx.exports.Greeter({ props: { greeting: "Welcome" } });

		// Greet the world. Returns "Welcome, World!"
		let greeting = await greeter.greet("World");

		return new Response(greeting);
	},
};
```

`props` values specified this way may contain any "persistently" serializable type (structured cloneable data types), including Service Bindings themselves. For TypeScript, use `wrangler types` to generate types so `ctx.exports` is typed, and declare entrypoints as `extends WorkerEntrypoint<Env, Props>`.

### tracing

```js
export default {
	async fetch(request, env, ctx) {
		return ctx.tracing.enterSpan("handleRequest", async (span) => {
			span.setAttribute("url.path", new URL(request.url).pathname);
			const data = await env.MY_KV.get("key");
			return new Response(data);
		});
	},
};
```

For full API details, see https://developers.cloudflare.com/workers/observability/traces/custom-spans/.

### waitUntil

- An async call that is neither awaited nor passed to `ctx.waitUntil()` can be canceled when the invocation ends (dropping logs, leaving writes unfinished, or failing silently).
- Use it for work that can run after the response is sent (logging, analytics, cache writes). If the client is still receiving the response, including a streamed body, the invocation remains active without `ctx.waitUntil()`. If the response depends on the work, `await` it before returning or stream the response as the work completes.
- For HTTP-triggered Workers, `ctx.waitUntil()` can extend execution for up to 30 seconds after the response is sent or the client disconnects. This is not a limit on total wall time of a request. The limit is shared across all `waitUntil()` calls within the same request; unsettled Promises are canceled and this warning is logged to Workers Logs and attached Tail Workers: `waitUntil() tasks did not complete within the allowed time after invocation end and have been cancelled.`
- If work cannot finish within that limit, send messages to a Queue and process them in a separate consumer Worker (Cloudflare Queues is covered by the cloudflare-stateful skill; https://developers.cloudflare.com/queues/).
- Multiple `waitUntil()` calls: like `Promise.allSettled`, a rejected promise does not stop promises passed to other calls.
- When using Workers Analytics Engine, you do not need `waitUntil`.
- To emit logs or exceptions, Tail Workers are recommended instead; they execute even if the Worker throws an uncaught exception.
- Durable Objects: do not use `waitUntil()` to keep a Durable Object alive during normal request or RPC handling; `DurableObjectState.waitUntil()` exists for API compatibility only.

### passThroughOnException

The Workers runtime streams request and response bodies without buffering. If an exception occurs after the body has been consumed, `passThroughOnException()` cannot send the body again. For a Worker that proxies requests to an origin, avoid relying on the fallback when the origin `fetch()` fails: if it throws after consuming the request body, the fallback request may reach your origin without the original body and fail with an unrelated `4xx` error. Catch origin fetch errors and return a `5xx` response instead. This protects against uncaught code exceptions only, not exceeding CPU or memory limits.

```js
export default {
	async fetch(request, env, ctx) {
		ctx.passThroughOnException();

		try {
			return await fetch(request);
		} catch (error) {
			console.error("Origin fetch failed", error);
			return new Response("Bad Gateway", { status: 502 });
		}
	},
};
```

### Durable Objects

The Context API is available strictly in stateless contexts, not Durable Objects. Durable Objects have a different object, the Durable Object State (`this.ctx` inside a Durable Object class), which provides some of the same functionality.

## Related

- [Fetch Handler](./fetch.md)
- [Scheduled Handler](./scheduled.md)
- [Handlers overview](./handlers-overview.md)
- [Bindings and RPC](../bindings-rpc/README.md)
