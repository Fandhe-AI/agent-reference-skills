---
source: https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/
---

# Connect Handler

Export a `connect()` handler to let a Worker accept an inbound TCP connection and read and write raw bytes on it. The handler receives a `Socket` object, the same type returned by `connect()` from `cloudflare:sockets` for outbound connections.

## Signature / Usage

```ts
interface Env {}

export default {
	async connect(socket: Socket, env: Env, ctx: ExecutionContext) {
		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("hello"));
		await writer.close();
	},
} satisfies ExportedHandler<Env>;
```

A Worker receives a connection when another Worker forwards a TCP connection to it over a service binding, by calling `connect()` on the binding:

```js
// Worker A forwards a TCP connection to Worker B over a service binding
export default {
	async fetch(request, env) {
		const socket = env.BACKEND.connect("example.com:1234");
		// Read from and write to socket.readable / socket.writable
		return new Response(socket.readable);
	},
};
```

`connect()` can also be a method on a `WorkerEntrypoint` class:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class Backend extends WorkerEntrypoint {
	async connect(socket) {
		const writer = socket.writable.getWriter();
		await writer.write(new TextEncoder().encode("hello"));
		await writer.close();
	}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `socket` | Socket | The inbound `Socket` used to read and write raw bytes. `socket.opened` resolves with a `SocketInfo` object; on a `connect()` handler, `localAddress` is set to the address the caller passed to `connect()` on the service binding. |
| `env` | object | The bindings available to the Worker. |
| `ctx` | object | The context, containing `waitUntil()` and `passThroughOnException()`. |

## Notes

- Direct inbound TCP connections from the public Internet, for example by using the HTTP `CONNECT` method against a Worker's public URL, are not supported at present. A `connect()` handler only receives connections forwarded from another Worker over a service binding.
- A Worker that does not export a `connect()` handler rejects any connection forwarded to it.

## Related

- [Context (ctx)](./context.md)
- [Handlers overview](./handlers-overview.md)
- [TCP sockets and service bindings](../bindings-rpc/README.md)
- [Web APIs](../web-apis/README.md)
