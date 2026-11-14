---
source: https://developers.cloudflare.com/containers/configuration/outbound-traffic/
---

# Handle outbound traffic

Outbound intercepts let you intercept and modify HTTP traffic from a container with trusted code: allow or deny destinations, inject credentials, reroute traffic, add custom policy, or connect to Workers bindings.

## Signature / Usage

An intercept sends matching requests from the container to a `WorkerEntrypoint` in your Worker. Register intercepts on `ctx.container` with an entrypoint from `ctx.exports`. An intercept lasts until the container stops, so register intercepts each time the Durable Object starts the container. `ctx.exports` requires a compatibility date of `2025-11-17` or later, or the `enable_ctx_exports` compatibility flag.

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

export class OutboundHandler extends WorkerEntrypoint {
	fetch(request) {
		if (request.method !== "GET") {
			console.log(`Blocked ${request.method} to ${request.url}`);
			return new Response("Method Not Allowed", { status: 405 });
		}
		return fetch(request);
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

		const handler = this.ctx.exports.OutboundHandler;
		await container.interceptAllOutboundHttp(handler);
		// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
		await container.interceptOutboundHttps("*", handler);

		container.start({
			image: container.images.base,
			enableInternet: false,
		});
	}
}
```

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```ts
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

export class OutboundHandler extends WorkerEntrypoint<Env> {
	fetch(request: Request): Promise<Response> | Response {
		if (request.method !== "GET") {
			console.log(`Blocked ${request.method} to ${request.url}`);
			return new Response("Method Not Allowed", { status: 405 });
		}
		return fetch(request);
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

		const handler = this.ctx.exports.OutboundHandler;
		await container.interceptAllOutboundHttp(handler);
		// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
		await container.interceptOutboundHttps("*", handler);

		container.start({
			image: container.images.base,
			enableInternet: false,
		});
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| enableInternet | boolean | — | Option of `ctx.container.start()`. `false` blocks public Internet access; only traffic that an intercept handles can leave the container. Takes effect when the container starts. |
| interceptOutboundHttp(target, entrypoint) | method | — | Intercepts HTTP to a hostname, hostname glob (such as `*.example.com`, `*` matches any sequence of characters), IP address or CIDR range. |
| interceptOutboundHttps(target, entrypoint) | method | — | Intercepts HTTPS to a hostname, hostname glob, or `*` for every hostname. Requires the container to trust the ephemeral CA. |
| interceptAllOutboundHttp(entrypoint) | method | — | Intercepts every HTTP request on port `80`. Does not intercept HTTPS. |
| props | object | — | Passed to the entrypoint through `this.ctx.props` (for example the Durable Object ID, to scope credentials to one container instance). |

## Notes

- Adapted from the official docs: each `startContainer()` example shares one startup promise between concurrent callers (the official version checks `running`, awaits the intercept registrations and then calls `start()`, so overlapping calls can both pass the check and the second `start()` throws).
- Source: https://developers.cloudflare.com/containers/configuration/outbound-traffic/ (cloudflare-docs production 34d908a, fetched 2026-11-14).
- `enableInternet` takes effect when the container starts. You can register intercepts before or after `start()`, and changes to intercepts affect a running container without a restart.
- Handler precedence: (1) `interceptOutboundHttp()` and `interceptAllOutboundHttp()` handle HTTP, `interceptOutboundHttps()` handles HTTPS. (2) A hostname intercept registered before `interceptAllOutboundHttp()` or a `*` target receives requests for that hostname; one registered after the broader rule on the same protocol and port receives no requests, so register specific hostnames first. (3) If no intercept matches, the request reaches the public Internet when the container started with `enableInternet: true`, otherwise it is denied.
- A container has a limit of 128 intercept entries.
- HTTP requests to the outbound handler remain secure because they run on the same machine as the container. You can upgrade requests to HTTPS from the Worker itself to prevent plain-text traffic from reaching the internet.
- Calls to `http://my.worker` (a hostname that need not exist in public DNS) invoke the handler, which runs inside the Workers runtime, outside the container sandbox.
- Credentials: check the hostname and protocol of every request before you add a credential. The intercept matches the TLS server name, but the request URL comes from the `Host` header, which code in the container controls. `redirect: "manual"` returns redirects to the container, so the credential does not follow a redirect to another host.
- With the credential-injection pattern: no token is exposed to the container, no token rotation inside the container, and per-host and per-instance rules are possible via `props`.
- `interceptOutboundHttp()` and `interceptAllOutboundHttp()` do not intercept HTTPS. When HTTPS interception is active, an ephemeral CA file is created at `/etc/cloudflare/certs/cloudflare-containers-ca.crt`; register HTTPS intercepts before `start()` so the file exists when the entrypoint runs.
- The CA is ephemeral and only exists at runtime, so do not bake it into the image during `docker build`. Copy it into the distro trust store and refresh the trust store from the container `entrypoint` before the application starts; install the distro's `ca-certificates` package first if the base image lacks the tooling. Most runtimes then trust it through the system root store; runtimes with their own bundle can point at the CA file, for example with `NODE_EXTRA_CA_CERTS` or `REQUESTS_CA_BUNDLE`. Replace `node server.js` with your start command.
- Non-HTTP traffic: outbound intercepts only handle HTTP and HTTPS; other traffic never reaches a handler and is denied with `enableInternet: false`. DNS lookups never reach a public resolver; the container network answers only for hostnames your intercepts cover, with a placeholder address routing to your Worker. With `interceptAllOutboundHttp()` or a `*` target every hostname resolves; with only hostname intercepts only those resolve; other lookups time out.
- Runtime changes: registering a target again replaces its handler and open connections use the new handler without being dropped. You cannot remove an intercept while the container runs, so replace it with a handler that denies requests. To change per-request behavior without a new target, register the target again with new `props`.
- Uploads: an HTTP upload forwarded through an outbound handler can fail with `413 Payload Too Large` when its body exceeds the 100 MiB default outbound limit (see limits.md); raising Maximum Upload Size on the custom domain does not help. Check the incoming and outbound legs and the destination's limits; send smaller multipart or resumable parts, or contact Cloudflare for larger single requests. `Can't read from request stream after responding with an exception.` can accompany an upload failure or follow unrelated exceptions.
- Local development: `wrangler dev` supports outbound interception. A sidecar process is spawned inside the container's network namespace and applies `TPROXY` rules to route matching traffic to the local Workerd instance.
- Migration: the deprecated `Container` class from `@cloudflare/containers` is replaced by the Durable Object Container API; see api-comparison.md.

### Block outbound traffic

Set `enableInternet` to `false` when you start the container. Only HTTP and HTTPS traffic can be intercepted; your intercepts decide which DNS lookups resolve.

```ts
const container = this.ctx.container!;
container.start({
	image: container.images.base,
	enableInternet: false,
});
```

### Allow traffic to specific hosts

Start the container with `enableInternet: false`, then intercept each allowed host with an entrypoint that forwards the request. For HTTPS, the intercept matches the TLS server name and the request URL always comes from the Host header.

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

const ALLOWED_HOSTS = ["allowed.com"];

export class AllowHosts extends WorkerEntrypoint {
	fetch(request) {
		// For HTTPS, the intercept matches the TLS server name. The request URL always comes from the Host header.
		if (!ALLOWED_HOSTS.includes(new URL(request.url).hostname)) {
			return new Response("Forbidden", { status: 403 });
		}
		return fetch(request);
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

		for (const host of ALLOWED_HOSTS) {
			await container.interceptOutboundHttp(host, this.ctx.exports.AllowHosts);
			// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
			await container.interceptOutboundHttps(host, this.ctx.exports.AllowHosts);
		}

		container.start({
			image: container.images.base,
			enableInternet: false,
		});
	}
}
```

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```ts
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

const ALLOWED_HOSTS = ["allowed.com"];

export class AllowHosts extends WorkerEntrypoint<Env> {
	fetch(request: Request): Promise<Response> | Response {
		// For HTTPS, the intercept matches the TLS server name. The request URL always comes from the Host header.
		if (!ALLOWED_HOSTS.includes(new URL(request.url).hostname)) {
			return new Response("Forbidden", { status: 403 });
		}
		return fetch(request);
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

		for (const host of ALLOWED_HOSTS) {
			await container.interceptOutboundHttp(host, this.ctx.exports.AllowHosts);
			// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
			await container.interceptOutboundHttps(host, this.ctx.exports.AllowHosts);
		}

		container.start({
			image: container.images.base,
			enableInternet: false,
		});
	}
}
```

### Block traffic to specific hosts

By default, a container started with `enableInternet: true` can reach any host. To block specific hosts or IP ranges, intercept them with an entrypoint that rejects every request. These intercepts cover HTTP and HTTPS requests to the denied hostnames and HTTP requests to the denied IP ranges; while `enableInternet` is `true`, all other connections (including other ports) reach the Internet directly. To block a destination on every port, use `enableInternet: false` and allow only what the container needs.

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

const DENIED_HOSTS = ["some-nefarious-website.com"];
const DENIED_RANGES = ["141.101.64.0/18"];

export class DenyHost extends WorkerEntrypoint {
	fetch() {
		return new Response("Forbidden", { status: 403 });
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

		const deny = this.ctx.exports.DenyHost;
		for (const host of DENIED_HOSTS) {
			await container.interceptOutboundHttp(host, deny);
			await container.interceptOutboundHttps(host, deny);
		}
		for (const range of DENIED_RANGES) {
			await container.interceptOutboundHttp(range, deny);
		}

		container.start({
			image: container.images.base,
			enableInternet: true,
		});
	}
}
```

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```ts
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

const DENIED_HOSTS = ["some-nefarious-website.com"];
const DENIED_RANGES = ["141.101.64.0/18"];

export class DenyHost extends WorkerEntrypoint<Env> {
	fetch(): Response {
		return new Response("Forbidden", { status: 403 });
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

		const deny = this.ctx.exports.DenyHost;
		for (const host of DENIED_HOSTS) {
			await container.interceptOutboundHttp(host, deny);
			await container.interceptOutboundHttps(host, deny);
		}
		for (const range of DENIED_RANGES) {
			await container.interceptOutboundHttp(range, deny);
		}

		container.start({
			image: container.images.base,
			enableInternet: true,
		});
	}
}
```

### Map a hostname to a Worker

`interceptOutboundHttp()` maps a specific domain name or IP address to a handler.

```ts
export class MyWorkerHandler extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		// Run arbitrary Workers logic for this hostname
		return await someWorkersFunction(request.body);
	}
}

// In the Durable Object, before you start the container:
await this.ctx.container!.interceptOutboundHttp(
	"my.worker",
	this.ctx.exports.MyWorkerHandler,
);
```

### Securely inject credentials

Outbound handlers run in the Workers runtime outside the container sandbox, so they can hold secrets the container never sees.

```ts
export class GitHubAuth extends WorkerEntrypoint<Env> {
	fetch(request: Request): Promise<Response> | Response {
		// For HTTPS, the intercept matches the TLS server name. The request URL always comes from the Host header.
		const url = new URL(request.url);
		if (url.protocol !== "https:" || url.hostname !== "github.com") {
			return new Response("Forbidden", { status: 403 });
		}

		const requestWithAuth = new Request(url, request);
		requestWithAuth.headers.set("x-auth-token", this.env.SECRET);
		return fetch(requestWithAuth, { redirect: "manual" });
	}
}

// In the Durable Object, before you start the container:
// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
await this.ctx.container!.interceptOutboundHttps(
	"github.com",
	this.ctx.exports.GitHubAuth,
);
```

Here, `props` carries the Durable Object ID, and the handler looks up a per-instance key from KV:

```ts
type Props = { containerId: string };

export class InternalVcsAuth extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		if (url.protocol !== "https:" || url.hostname !== "my-internal-vcs.dev") {
			return new Response("Forbidden", { status: 403 });
		}

		const authKey = await this.env.KEYS.get(this.ctx.props.containerId);
		if (authKey === null) {
			return new Response("Forbidden", { status: 403 });
		}

		const requestWithAuth = new Request(url, request);
		requestWithAuth.headers.set("x-auth-token", authKey);
		return fetch(requestWithAuth, { redirect: "manual" });
	}
}

// In the Durable Object, before you start the container:
await this.ctx.container!.interceptOutboundHttps(
	"my-internal-vcs.dev",
	this.ctx.exports.InternalVcsAuth({
		props: { containerId: this.ctx.id.toString() },
	}),
);
```

### Intercept HTTPS and trust the CA

```ts
// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
await this.ctx.container!.interceptOutboundHttps(
	"*",
	this.ctx.exports.OutboundHandler,
);
```

Pass the entrypoint for your distro to `start()`:

```ts
const container = this.ctx.container!;
await container.interceptOutboundHttps("*", this.ctx.exports.OutboundHandler);
container.start({
	image: container.images.base,
	enableInternet: false,
	entrypoint,
});
```

Debian and Ubuntu:

```ts
const entrypoint = [
	"sh",
	"-lc",
	[
		"cp /etc/cloudflare/certs/cloudflare-containers-ca.crt /usr/local/share/ca-certificates/cloudflare-containers-ca.crt",
		"update-ca-certificates",
		"exec node server.js",
	].join(" && "),
];
```

RHEL-family:

```ts
const entrypoint = [
	"sh",
	"-lc",
	[
		"cp /etc/cloudflare/certs/cloudflare-containers-ca.crt /etc/pki/ca-trust/source/anchors/cloudflare-containers-ca.crt",
		"update-ca-trust",
		"exec node server.js",
	].join(" && "),
];
```

Arch:

```ts
const entrypoint = [
	"sh",
	"-lc",
	[
		"cp /etc/cloudflare/certs/cloudflare-containers-ca.crt /etc/ca-certificates/trust-source/anchors/cloudflare-containers-ca.crt",
		"trust extract-compat",
		"exec node server.js",
	].join(" && "),
];
```

### Change policies at runtime

Adapted (not in the official docs): `startContainer()` is wrapped so that concurrent calls share one startup promise (the official version can start twice when several requests arrive while the container is stopped, and `start()` throws on a running container); the original body is unchanged inside `#startContainer()`.

```ts
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

		await container.interceptOutboundHttps(
			"github.com",
			this.ctx.exports.DenyHost,
		);
		container.start({
			image: container.images.base,
			enableInternet: false,
		});
	}

	// Give the container access to github.com during setup
	async allowGitHub(): Promise<void> {
		await this.ctx.container!.interceptOutboundHttps(
			"github.com",
			this.ctx.exports.GitHubAuth,
		);
	}

	// Remove access to GitHub
	async denyGitHub(): Promise<void> {
		await this.ctx.container!.interceptOutboundHttps(
			"github.com",
			this.ctx.exports.DenyHost,
		);
	}
}
```

Call these methods from your Worker:

```ts
const container = env.MY_CONTAINER.getByName("my-instance");

await container.allowGitHub();
// Do something with github.com in your container...
await container.denyGitHub();
```

## Related

- [Durable Object Container API](./durable-object-container.md)
- [Connect to Workers and bindings](./workers-connections.md)
- [Environment variables](./environment-variables.md)
- [Limits](./limits.md)
- [Container class to Durable Object Container API](./api-comparison.md)
