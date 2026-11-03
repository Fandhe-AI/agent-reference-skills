---
source: https://developers.cloudflare.com/workers/runtime-apis/rpc/
---

# Remote-procedure call (RPC)

The built-in, JavaScript-native RPC system for Workers and Durable Objects. Public methods on a Worker (via Service bindings) or a Durable Object can be called by other Workers on the same account, designed to feel like a local function call.

## Signature / Usage

Worker B implements `add(a, b)`:

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	add(a: number, b: number) {
		return a + b;
	}
}
```

Worker A calls it through a Service binding:

```ts
export default {
	async fetch(_request, env): Promise<Response> {
		const result = await env.WORKER_B.add(1, 2);
		return new Response(result.toString());
	},
} satisfies ExportedHandler<Env>;
```

### Functions as return values

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	async fetch() {
		return new Response("Hello from counter-service");
	}

	async newCounter() {
		let value = 0;
		return (increment = 0) => {
			value += increment;
			return value;
		};
	}
}
```

```js
export default {
	async fetch(request, env) {
		using f = await env.COUNTER_SERVICE.newCounter();
		await f(2); // returns 2
		await f(1); // returns 3
		const count = await f(-5); // returns -2

		return new Response(String(count));
	},
};
```

### Class instances (`RpcTarget`)

```js
import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";

class Counter extends RpcTarget {
	#value = 0;

	increment(amount) {
		this.#value += amount;
		return this.#value;
	}

	get value() {
		return this.#value;
	}
}

export class CounterService extends WorkerEntrypoint {
	async newCounter() {
		return new Counter();
	}
}
```

```js
export default {
	async fetch(request, env) {
		using counter = await env.COUNTER_SERVICE.newCounter();

		await counter.increment(2); // returns 2
		await counter.increment(1); // returns 3
		await counter.increment(-5); // returns -2

		const count = await counter.value; // returns -2

		return new Response(String(count));
	},
};
```

### Promise pipelining

```js
// Two round trips.
using counter = await env.COUNTER_SERVICE.getCounter();
await counter.increment();
```

```js
// Only one round trip! Note the missing `await`.
using promiseForCounter = env.COUNTER_SERVICE.getCounter();
await promiseForCounter.increment();
```

### Forwarding stubs

```js
using counter = env.COUNTER_SERVICE.getCounter();
await env.ANOTHER_SERVICE.useCounter(counter);
```

## Notes

- Adapted from the official docs: the two counter examples return `new Response(count)` with a number, which is not a valid `BodyInit`; `String(count)` is used. The two counter `fetch` blocks above carry this change.
- Requires a compatibility date of `2024-04-03` or higher, or the `rpc` compatibility flag.
- All calls are asynchronous: you must `await`. RPC results are custom thenables (implement `then()`), not real Promises.
- Supported types: nearly all Structured Cloneable types; plus functions (replaced by stubs), classes extending `RpcTarget` (stubs), `ReadableStream` / `WritableStream` (with flow control), `Request` / `Response`, and RPC stubs themselves. Application-defined classes (custom prototypes) not extending `RpcTarget` cannot be sent at all, unlike Structured Clone.
- Prefer returning a class instance (one stub) over a plain object of functions (one stub per function). Non-function properties of plain objects are sent by value when the object is sent; `RpcTarget` properties are fetched on demand by awaiting them.
- Pipelining: if the initial RPC throws, pipelined calls fail with the same exception.
- Streams: only byte-oriented streams (`type: "bytes"`) are supported; ownership transfers to the recipient. Use `tee()` / `clone()` to keep a copy (may buffer and lose flow control). This allows messages larger than the 32 MiB limit.
- Forwarding stubs: calls on a forwarded stub are proxied through the introducer Worker; proxying lasts only until the end of the execution contexts.
- Prefer "caller" / "callee" over "client" / "server" since RPCs can flow both ways (functions can be sent as parameters).
- Limitations: Smart Placement is ignored for RPC calls (the callee runs locally on the same machine); the maximum serialized RPC size is 32 MiB (use `ReadableStream` for more data).
- The `using` declaration is explained in [rpc-lifecycle.md](./rpc-lifecycle.md).

### Error handling (merged from https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/)

- An error thrown by an RPC method, or used to reject its returned Promise, propagates to the caller as a new error object. With enhanced error serialization, Workers preserves the effective `name` and `message` and serializable own properties, including non-enumerable ones such as `cause`.
- Enhanced error serialization uses the `enhanced_error_serialization` compatibility flag, on by default for compatibility dates on or after `2026-04-21`. For earlier dates add the flag to both the RPC provider and consumer. A Worker can opt out with `legacy_error_serialization`; without enhanced serialization, RPC uses legacy error reconstruction and does not preserve custom own properties.
- The provider must be able to serialize the error and its own property values. Keep public error properties small and serializable; if an own property is non-serializable, delivery of enhanced details is not guaranteed.
- Treat the error's serializable fields as the RPC contract. Not preserved: source object identity, custom prototype or constructor, `instanceof` results (especially for custom error classes), prototype methods or property descriptors, the provider's original stack trace (the consumer may see a new stack), non-serializable property values. For example a `ProviderError extends Error` arrives with `name` `"ProviderError"` and serializable fields such as `code`, but not as an instance of a consumer-side class. Check `name` and `code` instead of class identity.
- For some remote exceptions the runtime may add properties (such as retry or Durable Object metadata), separate from custom properties. Durable Objects error handling is covered by the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/best-practices/error-handling).

### Reserved methods (merged from https://developers.cloudflare.com/workers/runtime-apis/rpc/reserved-methods/)

- Special methods apply when extending `WorkerEntrypoint` or `DurableObject` (for backwards compatibility), not `RpcTarget`, where they behave like any other RPC method.
- `fetch()`: can only handle an HTTP request (equivalent to the fetch handler). On `WorkerEntrypoint` it must accept only one parameter of type `Request` and return a `Response` or a Promise of one. On the client, `fetch()` on a service binding or Durable Object stub has global `fetch()` semantics: one or two parameters; if not a single `Request`, a new `Request` is constructed. Some `Request` properties (for example `redirect: "auto"`, the default) control client-side behavior and are not sent; redirects are followed to the public internet. `fetch()` has Fetch API semantics, not RPC semantics.
- `connect()`: reserved on `WorkerEntrypoint` for accepting a socket-like connection forwarded from another Worker (https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/). See also TCP sockets (https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) and Hyperdrive (https://developers.cloudflare.com/hyperdrive/get-started/).
- Disallowed on every RPC type (`WorkerEntrypoint`, `DurableObject`, `RpcTarget`): `dup` (reserved for duplicating a stub) and `constructor`.
- Disallowed on `WorkerEntrypoint` and `DurableObject` but allowed on `RpcTarget`: `alarm`, `webSocketMessage`, `webSocketClose`, `webSocketError`.

## Related

- [service-bindings-rpc.md](./service-bindings-rpc.md)
- [rpc-lifecycle.md](./rpc-lifecycle.md)
- [rpc-visibility.md](./rpc-visibility.md)
- [rpc-typescript.md](./rpc-typescript.md)
