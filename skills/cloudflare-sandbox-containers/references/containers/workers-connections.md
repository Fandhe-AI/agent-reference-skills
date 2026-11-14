---
source: https://developers.cloudflare.com/containers/configuration/workers-connections/
---

# Connect to Workers and bindings

Containers reach Workers bindings (KV, R2, D1, Durable Objects, and others) through outbound intercepts: the container makes a plain HTTP request to a virtual hostname such as `http://my.kv/some-key`, and a `WorkerEntrypoint` running in the Workers runtime resolves it. No SDK or client library is required inside the container.

## Signature / Usage

Define a `WorkerEntrypoint` for each virtual hostname. `this.env` gives you access to every binding declared in your Wrangler configuration. Pass per-instance values, such as the Durable Object ID, in `props`. `ctx.exports` requires a compatibility date of `2025-11-17` or later, or the `enable_ctx_exports` compatibility flag.

Adapted (not in the official docs): `KvGateway` scopes keys to this container's ID with the `props.containerId` prefix, as `R2Gateway` does (the official version reads any key of the shared KV namespace), and returns 404 for a missing key (the official version answers 200 with an empty body); and `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

export class KvGateway extends WorkerEntrypoint {
	async fetch(request) {
		const key = `${this.ctx.props.containerId}${new URL(request.url).pathname}`;
		const value = await this.env.KV.get(key);
		return new Response(value, { status: value === null ? 404 : 200 });
	}
}

export class R2Gateway extends WorkerEntrypoint {
	async fetch(request) {
		const url = new URL(request.url);
		// Scope access to this container's ID
		const path = `${this.ctx.props.containerId}${url.pathname}`;
		const object = await this.env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	}
}

export class MyContainer extends DurableObject {
	#starting;

	startContainer() {
		this.#starting ??= this.#startContainer().finally(() => {
			this.#starting = undefined;
		});
		return this.#starting;
	}

	async #startContainer() {
		const container = this.ctx.container;
		if (container.running) return;

		const props = { containerId: this.ctx.id.toString() };
		await container.interceptOutboundHttp(
			"my.kv",
			this.ctx.exports.KvGateway({ props }),
		);
		await container.interceptOutboundHttp(
			"my.r2",
			this.ctx.exports.R2Gateway({ props }),
		);

		container.start({ image: container.images.base, enableInternet: false });
	}
}
```

Adapted (not in the official docs): `KvGateway` scopes keys to this container's ID with the `props.containerId` prefix, as `R2Gateway` does (the official version reads any key of the shared KV namespace), and returns 404 for a missing key (the official version answers 200 with an empty body); and `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```ts
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

type Props = { containerId: string };

export class KvGateway extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const key = `${this.ctx.props.containerId}${new URL(request.url).pathname}`;
		const value = await this.env.KV.get(key);
		return new Response(value, { status: value === null ? 404 : 200 });
	}
}

export class R2Gateway extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		// Scope access to this container's ID
		const path = `${this.ctx.props.containerId}${url.pathname}`;
		const object = await this.env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	}
}

export class MyContainer extends DurableObject<Env> {
	#starting: Promise<void> | undefined;

	startContainer(): Promise<void> {
		this.#starting ??= this.#startContainer().finally(() => {
			this.#starting = undefined;
		});
		return this.#starting;
	}

	async #startContainer(): Promise<void> {
		const container = this.ctx.container!;
		if (container.running) return;

		const props = { containerId: this.ctx.id.toString() };
		await container.interceptOutboundHttp(
			"my.kv",
			this.ctx.exports.KvGateway({ props }),
		);
		await container.interceptOutboundHttp(
			"my.r2",
			this.ctx.exports.R2Gateway({ props }),
		);

		container.start({ image: container.images.base, enableInternet: false });
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| this.env | object | — | Every binding declared in your Wrangler configuration, available inside the entrypoint. |
| this.ctx.props | object | — | Per-instance values passed with `this.ctx.exports.<Entrypoint>({ props })`, such as the Durable Object ID. |
| interceptOutboundHttp(hostname, entrypoint) | method | — | Maps a virtual hostname such as `my.kv` to the entrypoint. |

## Notes

- Adapted from the official docs: `KvGateway` prefixes keys with `props.containerId` (the official version lets the container read any key in the shared namespace); keys are therefore stored as `<containerId>/<key>`; a missing key returns 404. Without scoping, one container could read other instances' data.
- Source: https://developers.cloudflare.com/containers/configuration/workers-connections/ (cloudflare-docs production 34d908a, fetched 2026-11-14).
- The container calls `http://my.kv/some-key` and the entrypoint resolves it using the KV binding. A call to `http://my.r2/file.png` reads from R2, scoped to the current container instance.
- An intercept lasts until the container stops. Register intercepts each time you start the container.
- Use `props` to apply different rules per container instance, for example to look up per-instance configuration from KV.
- Migration: the deprecated `Container` class from `@cloudflare/containers` and its options (`outbound`, `outboundByHost`, `allowedHosts`, `deniedHosts`, `interceptHttps`) are replaced by `interceptOutboundHttp()`, `interceptAllOutboundHttp()` and `interceptOutboundHttps()` with a `WorkerEntrypoint`; see api-comparison.md.

### Access Durable Object state

Pass the Durable Object ID in `props` to call the container's own Durable Object from an entrypoint.

```ts
export class StateGateway extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const id = this.env.MY_CONTAINER.idFromString(this.ctx.props.containerId);
		const stub = this.env.MY_CONTAINER.get(id);
		// Assumes getStateForKey is defined on your Durable Object
		return Response.json(await stub.getStateForKey(await request.text()));
	}
}
```

The twin comments that `getStateForKey` is assumed to be defined on your Durable Object.

## Related

- [Outbound traffic](./outbound-traffic.md)
- [Environment variables](./environment-variables.md)
- [Durable Object Container API](./durable-object-container.md)
- [Container class to Durable Object Container API](./api-comparison.md)
