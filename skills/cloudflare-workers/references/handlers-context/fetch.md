---
source: https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/
---

# Fetch Handler

Incoming HTTP requests to a Worker are passed to the `fetch()` handler as a `Request` object. To respond, return a `Response` object.

## Signature / Usage

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `request` | Request | The incoming HTTP request. |
| `env` | object | The bindings available to the Worker. As long as the environment has not changed, the same object (equal by identity) may be passed to multiple requests. You can also import `env` from `cloudflare:workers` to access bindings from anywhere in your code. |
| `ctx.waitUntil(promisePromise)` | void | See [Context (ctx)](./context.md#waituntil). |
| `ctx.passThroughOnException()` | void | See [Context (ctx)](./context.md#passthroughonexception). |

## Notes

- The Workers runtime does not support `XMLHttpRequest` (XHR). Learn the difference between `XMLHttpRequest` and `fetch()` in the MDN documentation.
- For routing/middleware frameworks running on Workers (e.g. Hono), see the hono skill.

## Related

- [Context (ctx)](./context.md)
- [Handlers overview](./handlers-overview.md)
- [Bindings and RPC](../bindings-rpc/README.md)
- [Web APIs (Request / Response)](../web-apis/README.md)
