---
source: https://developers.cloudflare.com/containers/configuration/outbound-traffic/
---

# Handle outbound traffic

Outbound handlers intercept and modify HTTP(S) traffic from a container using trusted Worker code: allow or deny destinations, inject credentials, reroute traffic, apply policy, or reach Workers bindings. They run on the same machine as the container with access to all bindings.

## Signature / Usage

Adapted (not in the official docs): two official snippets combined into one class; `interceptHttps` and `allowedHosts` are documented individually below.

```js
import { Container, ContainerProxy } from "@cloudflare/containers";
export { ContainerProxy };

export class MyContainer extends Container {
	// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
	interceptHttps = true;

	// default internet access to off unless overridden by 'allowedHosts' or outbound proxy
	enableInternet = false;

	// overrides enableInternet = false
	allowedHosts = ["allowed.com"];
}

MyContainer.outbound = async (request, env, ctx) => {
	if (request.method !== "GET") {
		console.log(`Blocked ${request.method} to ${request.url}`);
		return new Response("Method Not Allowed", { status: 405 });
	}
	return fetch(request);
};
```

## Options / Props

Class properties (`Container` class):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| enableInternet | boolean | `true` | `false` blocks public internet by default; only `allowedHosts` or an outbound handler can let traffic out, and only ports 80 and 443 are available. Takes effect at container start. |
| allowedHosts | string[] | — | Deny-by-default allowlist (supports `*` globs). Hosts not listed are denied; only matching destinations reach handlers. Overrides `enableInternet = false`. |
| deniedHosts | string[] | — | Denylist of hosts, IPs or CIDRs (supports `*` globs). Applies to HTTP on port 80, and to HTTPS on 443 when `interceptHttps = true`. |
| interceptHttps | boolean | — | Opt in to HTTPS interception. Creates an ephemeral CA at `/etc/cloudflare/certs/cloudflare-containers-ca.crt` when the container starts, only if a handler is also defined. |
| outbound | `(request, env, ctx) => Response \| Promise<Response>` | — | Catch-all handler for HTTP on port 80 and HTTPS on 443. |
| outboundByHost | Record<string, handler> | — | Maps domain names or IPs to handlers; takes precedence over `outbound`. |
| outboundHandlers | Record<string, handler> | — | Named handlers assigned to hosts at runtime. |

Runtime-policy methods: `setOutboundByHost()`, `removeOutboundByHost()`, `setOutboundHandler()`, `setOutboundByHosts()`, `setAllowedHosts()`, `setDeniedHosts()`, `allowHost()`, `denyHost()`, `removeAllowedHost()`, `removeDeniedHost()`.

Handler arguments: `request` (Request), `env` (all bindings), `ctx.containerId` (string, the container's Durable Object ID).

## Notes

- Export `ContainerProxy` from your Worker entrypoint, otherwise outbound interception does not work.
- `deniedHosts` applies to ports 80 (and 443 with `interceptHttps`). While `enableInternet` is `true`, connections to other ports bypass it; to block a destination on every port set `enableInternet = false` and allow only what the container needs.
- Changes to `outbound` handlers and related policies can affect a live container without a restart; `enableInternet` applies at start.
- Handler precedence: (1) `deniedHosts` denies immediately; (2) `allowedHosts`, when set, denies anything not listed; (3) instance-level `setOutboundByHost()` rules before class-level `outboundByHost`; (4) per-host handlers before catch-all handlers; (5) instance-level `setOutboundHandler()` before class-level `outbound`; (6) with no matching handler the request can still egress if it matched `allowedHosts` or `enableInternet = true`, otherwise it is denied. With `allowedHosts`, include the hostname there for `outbound` / `outboundByHost` to run.
- Handlers run in the Workers runtime outside the container sandbox, so they can hold secrets the container never sees (no token in the container, central rotation, per-host and per-instance rules via `ctx.containerId`). Useful when code in the container is untrusted.
- Plain HTTP between container and handler stays on the same machine; traffic within the Cloudflare Developer Platform is encrypted by the networking stack.
- Non-HTTP traffic: only HTTP(S) is intercepted; other ports are never routed through handlers and are denied when `enableInternet = false`. DNS never reaches a public resolver in that mode. With `allowedHosts`, `deniedHosts`, or `outbound` set every hostname resolves (the Worker allows or blocks each request); with only `outboundByHost` only its hostnames resolve; other lookups time out.
- Trusting the CA: it exists only at runtime, so do not bake it into the image. Copy it into the distro trust store in the entrypoint and refresh the store before starting the app (install `ca-certificates` in the image if missing). Runtimes with their own bundle can use `NODE_EXTRA_CA_CERTS` or `REQUESTS_CA_BUNDLE` pointing at the CA file. Debian/Ubuntu example (this entrypoint runs inside the container, never on the host); for RHEL-family images copy to `/etc/pki/ca-trust/source/anchors/` and run `update-ca-trust`; for Arch copy to `/etc/ca-certificates/trust-source/anchors/` and run `trust extract-compat`; replace `node server.js` with your start command.

Adapted (not in the official docs): a minimal catch-all `outbound` handler is added, because the CA file is created only when a handler is also defined; without one the `cp` fails and the `&&` chain never starts the app. Replace the handler with your own policy.

```js
import { Container, ContainerProxy } from "@cloudflare/containers";
export { ContainerProxy };

export class MyContainer extends Container {
	interceptHttps = true;
	entrypoint = [
		"sh",
		"-lc",
		[
			"cp /etc/cloudflare/certs/cloudflare-containers-ca.crt /usr/local/share/ca-certificates/cloudflare-containers-ca.crt",
			"update-ca-certificates",
			"exec node server.js",
		].join(" && "),
	];
}

MyContainer.outbound = async (request, env, ctx) => {
	return fetch(request);
};
```

- Credential injection, with `outboundByHost` plus a per-instance key from KV. Adapted (not in the official docs): fail closed when no key is stored instead of sending an empty or `null` header.

```js
export class MyContainer extends Container {
	// Make sure the container trusts /etc/cloudflare/certs/cloudflare-containers-ca.crt
	interceptHttps = true;
}

MyContainer.outboundByHost = {
	"my-internal-vcs.dev": async (request, env, ctx) => {
		const authKey = await env.KEYS.get(ctx.containerId);
		if (!authKey) {
			return new Response("Forbidden", { status: 403 });
		}

		const requestWithAuth = new Request(request);
		requestWithAuth.headers.set("x-auth-token", authKey);
		return fetch(requestWithAuth);
	},
};
```

- Adapted from the official docs: the CA-trust entrypoint example gained a minimal `MyContainer.outbound` handler (the CA is generated only when a handler is defined, so without it the entrypoint's `cp` fails).
- Adapted from the official docs: the original sent `authKey` unchecked (a missing key would be sent as a null header); the 403 branch was added. Fragments that referenced undefined helpers (`someWorkersFunction`, `authenticateGitHttpsRequest`) are omitted.
- Direct API on `ctx.container` (`WorkerEntrypoint`, see durable-object-container.md): in-flight connections pick up a new handler without being dropped.

Adapted (not in the official docs): the "inside your Container DurableObject" fragment is wrapped in a Durable Object class and method (the source used `this` and `await` at top level), and the entrypoint only passes `GET` requests on.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

export class MyOutboundWorker extends WorkerEntrypoint {
	async fetch(request) {
		// Inspect, modify, or deny the request before passing it on
		if (request.method !== "GET") {
			return new Response("Method Not Allowed", { status: 405 });
		}
		return fetch(request);
	}
}

export class MyContainer extends DurableObject {
	async startWithInterception() {
		this.ctx.container.start({ enableInternet: false });
		const worker = this.ctx.exports.MyOutboundWorker({ props: {} });
		await this.ctx.container.interceptAllOutboundHttp(worker);
	}
}
```

- Troubleshooting uploads: an outbound request body over the 100 MiB default outbound limit fails with `413 Payload Too Large`; raising "Maximum Upload Size" on the custom domain does not help. Check both the incoming and outbound legs and the destination's limits; use multipart or resumable uploads, or contact Cloudflare for larger single requests (see limits.md). `Can't read from request stream after responding with an exception.` can accompany it or follow unrelated exceptions.
- Local development: `wrangler dev` supports interception via a sidecar in the container's network namespace applying `TPROXY` rules to the local workerd.

## Related

- [Container class](./container-class.md)
- [Durable Object Container API](./durable-object-container.md)
- [Connect to Workers and bindings](./workers-connections.md)
- [Limits](./limits.md)
