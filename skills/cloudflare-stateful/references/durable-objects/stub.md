---
source: https://developers.cloudflare.com/durable-objects/api/stub/
---

# DurableObjectStub

`DurableObjectStub` is the client used to invoke methods on a remote Durable Object. Its type is generic so RPC methods defined on the class can be called on the stub.

## Signature / Usage

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

```js
const id = env.MY_DURABLE_OBJECT.newUniqueId();
const stub = env.MY_DURABLE_OBJECT.get(id);
console.assert(id.equals(stub.id), "This should always be true");

const namedStub = env.MY_DURABLE_OBJECT.getByName("foo");
console.assert(namedStub.name === "foo", "This should always be true");
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `DurableObjectId` | — | The ID used to create the stub. |
| `name` | `string \| undefined` | — | Name given via `getByName` or an ID from `idFromName`. `undefined` if the ID came from `newUniqueId`. |

## Notes

- Durable Objects have E-order semantics: multiple calls to the same object are delivered in the order made, implemented by the Cap'n Proto RPC protocol. There are no ordering guarantees between different stubs.
- If a stub throws an exception, all in-flight and future calls on it fail; recreate the stub to continue.

## Related

- [DurableObjectNamespace](./namespace.md)
- [DurableObjectId](./id.md)
- [Create stubs and send requests](./create-stubs-and-send-requests.md)
- [Troubleshooting](./troubleshooting.md)
