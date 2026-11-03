---
source: https://developers.cloudflare.com/containers/configuration/workers-connections/
---

# Connect to Workers and bindings

Containers reach Workers bindings (KV, R2, D1, Durable Objects) through outbound handlers: the container makes a plain HTTP request to a virtual hostname such as `http://my.kv/some-key`, and a handler running in the Workers runtime resolves it. No SDK is needed in the container.

## Signature / Usage

Adapted (not in the official docs): `Container` and `ContainerProxy` import and the `ContainerProxy` export added so the snippet is self-contained (without the export, outbound interception does not work); the `my.kv` handler scopes keys to this container's ID (the official version let the container read any key in the namespace) and returns 404 for a missing key; see Notes.

```js
import { Container, ContainerProxy } from "@cloudflare/containers";
export { ContainerProxy };

export class MyContainer extends Container {}

MyContainer.outboundByHost = {
	"my.kv": async (request, env, ctx) => {
		const url = new URL(request.url);
		// Scope access to this container's ID
		const key = `${ctx.containerId}${url.pathname}`;
		const value = await env.KV.get(key);
		return new Response(value, { status: value === null ? 404 : 200 });
	},
	"my.r2": async (request, env, ctx) => {
		const url = new URL(request.url);
		// Scope access to this container's ID
		const path = `${ctx.containerId}${url.pathname}`;
		const object = await env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	},
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| request | Request | — | The container's outbound HTTP request. |
| env | object | — | Every binding declared in the Wrangler configuration. |
| ctx.containerId | string | — | The container's Durable Object ID; use it to scope access or apply per-instance rules. |

## Notes

- `outboundByHost` handlers key on a virtual hostname. `ctx.containerId` also lets a handler reach the container's own Durable Object, for example `env.MY_CONTAINER.idFromString(ctx.containerId)` then `env.MY_CONTAINER.get(id)`.
- Adapted from the official docs: a handler is exposed to anything running in the container, so each virtual host should scope what it can read or write. The official `my.kv` handler used the raw path as the key (any key in the namespace was readable) and returned `new Response(null)` with status 200 for missing keys; the snippet prefixes keys with `ctx.containerId` like `my.r2` and returns 404 when the key is absent. Writes to the KV namespace must then use the same `<containerId>/<key>` layout.
- Adapted from the official docs: the snippet also imports and exports `ContainerProxy` from the Worker entry point, which outbound interception requires (see outbound-traffic.md).
- The official Durable Object example is a fragment relying on an undefined `getStateForKey` method and is omitted.
- Full outbound mechanics: outbound-traffic.md.

## Related

- [Outbound traffic](./outbound-traffic.md)
- [Environment variables](./environment-variables.md)
- [Durable Object Container API](./durable-object-container.md)
