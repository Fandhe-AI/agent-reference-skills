---
source: https://developers.cloudflare.com/containers/, https://developers.cloudflare.com/containers/concepts/
---

# Containers overview

Cloudflare Containers run any container image (any language or runtime) next to a Worker. Container instances start on demand and are controlled by Worker and Durable Object code. Available on the Workers Paid plan.

## Signature / Usage

Minimal project: a Durable Object that owns the container, and a Worker that routes to it.

```js
import { DurableObject } from "cloudflare:workers";
import { rewriteRequestForContainer, startAndWaitForPort } from "./utils";

export class MyContainer extends DurableObject {
	async fetch(request) {
		const container = this.ctx.container;
		await startAndWaitForPort(container, {
			port: 4000,
			inactivityTimeout: 10 * 60 * 1000,
		});

		const forwarded = rewriteRequestForContainer(request);
		const response = await container.getTcpPort(4000).fetch(forwarded);
		return response;
	}
}
```

Adapted (not in the official docs): the official Worker entry derives the instance name from an unverified request body; this uses a fixed name. See Notes.

```js
export default {
	async fetch(request, env) {
		// Fixed name: one shared instance. Derive a name from request data only after authenticating the caller.
		return env.MY_CONTAINER.getByName("main").fetch(request);
	},
};
```

`src/utils.js` (helpers used above):

```js
export function rewriteRequestForContainer(request) {
	const url = new URL(request.url);
	url.protocol = "http:";
	url.host = "container";
	const forwarded = new Request(url, request);
	forwarded.headers.delete("host");
	return forwarded;
}

export async function startAndWaitForPort(container, options) {
	await container.setInactivityTimeout(options.inactivityTimeout);
	if (!container.running) {
		container.start();
	}

	// start() returns before the container is ready, so poll its health endpoint.
	const port = container.getTcpPort(options.port);
	let lastError;
	for (let attempt = 0; attempt < 100; attempt++) {
		try {
			const response = await port.fetch("http://container/health");
			if (!response.ok) {
				throw new Error(`Health check returned ${response.status}`);
			}
			return;
		} catch (error) {
			lastError = error;
			await scheduler.wait(200);
		}
	}
	throw new Error(`Container did not become ready on port ${options.port}`, {
		cause: lastError,
	});
}
```

Wrangler configuration (`wrangler.jsonc`; `compatibility_date` is the date the docs were written, set it to today):

```jsonc
{
	"name": "container-starter",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"containers": [
		{
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"max_instances": 5,
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "MyContainer",
				"name": "MY_CONTAINER",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

## Notes

- Use cases: resource-intensive applications (many CPU cores, large memory or disk), software needing a full filesystem, specific runtime or Linux-like environment, and existing tools distributed as container images.
- Runtime model: each instance runs in its own VM. A Worker receives inbound HTTP and routes it to the container, so the container is not exposed directly to end users. See architecture.md.
- A container can start on its first request, so that request may take longer. Treat the local disk as temporary; persist data in Durable Object storage or KV, R2, D1 bindings (see workers-connections.md).
- Sizing and placement: pick a predefined or custom instance size (see limits.md, pricing.md); constrain placement by region or jurisdiction (see placement.md).
- The Worker snippet is `Adapted from the official docs`: the original did `const { "session-id": sessionId } = await request.json()` and used it as the instance name, which trusts an unverified identity. If you need per-session instances, authenticate the caller first and validate or sign the session ID.
- `startAndWaitForPort` calls `container.start()` without options, which is valid only with the `default` scheduling policy; with `durable_object` pass `image` and `enableInternet` (see durable-object-container.md).
- Wrangler `containers` config keys are summarized in wrangler-configuration.md; the cloudflare-wrangler skill owns the full key table.
- Two APIs exist: the Durable Object Container API (recommended for new applications) and the `Container` class (existing applications). See api-comparison.md.

## Related

- [Architecture and lifecycle](./architecture.md)
- [Placement](./placement.md)
- [API comparison](./api-comparison.md)
- [Get started](./get-started.md)
- [Wrangler configuration](./wrangler-configuration.md)
