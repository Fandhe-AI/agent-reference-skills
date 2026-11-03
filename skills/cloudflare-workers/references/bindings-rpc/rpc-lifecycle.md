---
source: https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/
---

# RPC lifecycle

Memory and resource management for RPC stubs: explicit disposal with `using`, automatic disposal rules, `dup()`, and `RpcTarget` disposers.

## Signature / Usage

```js
{
	using counter = await env.COUNTER_SERVICE.newCounter();
	await counter.increment(2);
	await counter.increment(4);
}
```

is equivalent to:

```js
{
	const counter = await env.COUNTER_SERVICE.newCounter();
	try {
		await counter.increment(2);
		await counter.increment(4);
	} finally {
		counter[Symbol.dispose]();
	}
}
```

### Disposer on an `RpcTarget`

```js
class Foo extends RpcTarget {
	[Symbol.dispose]() {
		// ...
	}
}
```

### `dup()`

```js
let stub = await env.SOME_SERVICE.getThing();

// Create a duplicate.
let stub2 = stub.dup();

// Call some function that will dispose the stub.
await func(stub);

// stub2 is still valid
```

Sending the same object several times with independent stubs:

```js
import { RpcTarget, RpcStub } from "cloudflare:workers";

class Foo extends RpcTarget {
	// ...
}

let obj = new Foo();
let stub = new RpcStub(obj);
await rpc1(stub.dup()); // sends a dup of `stub`
await rpc2(stub.dup()); // sends another dup of `stub`
stub[Symbol.dispose](); // disposes the original stub

// obj's disposer will be called when the other two stubs
// are disposed remotely.
```

## Notes

- While a stub exists on the caller, the remote object cannot be garbage collected; isolates cannot see each other's GC, so callers should dispose stubs explicitly for best performance.
- Explicit Resource Management is a TC39 proposal (described as Stage 3 in the source; check current status) (`using`, `Symbol.dispose`, `Symbol.asyncDispose`). Wrangler v4+ supports `using` natively; with earlier versions dispose manually.
- Automatic disposal: (1) at the end of an event handler / execution context (for `fetch()`, when the response is sent; it ends early if the client disconnects, or can be extended by `ctx.waitUntil()`); (2) stubs received as RPC parameters are disposed when the call returns (use `dup()` to keep them longer); (3) disposing a returned object disposes the stubs inside it.
- An RPC-invoked `WorkerEntrypoint` context ends when the RPC returns, unless stubs were passed, in which case it is extended until all such stubs are disposed and their calls have returned. If the client disconnects, the server context is canceled immediately.
- Store RPC results that are objects in a `using` declaration (`using result = stub.foo();`), even if no stubs are returned today. Primitive results cannot have disposers.
- An `RpcTarget` disposer runs after the last stub is disposed, asynchronously: exceptions are reported as uncaught exceptions and do not propagate to the client. It must be `Symbol.dispose`; `Symbol.asyncDispose` is not supported.
- A disposer is invoked once per time the same `RpcTarget` instance was sent, since each send creates a new stub; duplicates only count when created with `dup()` from the same stub. When passing a stub over RPC, ownership transfers, so `dup()` for each send.

## Related

- [rpc.md](./rpc.md)
- [service-bindings-rpc.md](./service-bindings-rpc.md)
