---
source: https://developers.cloudflare.com/workflows/build/call-workflows-from-pages/
---

# Call Workflows from Pages

Pages Functions cannot bind a Workflow directly: deploy a separate Worker that contains the Workflow, then reach it through a service binding (recommended) or `fetch()`.

## Signature / Usage

Service binding in the Pages project (the `service` must match the Worker that defines the Workflow):

```jsonc
{
	"services": [
		{
			"binding": "WORKFLOW_SERVICE",
			"service": "workflows-starter"
		}
	]
}
```

The Worker exposes an RPC method. Adapted (not in the official docs): the official method returns a `Response` over RPC; this version returns plain data.

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class WorkflowsService extends WorkerEntrypoint {
	// Currently, entrypoints without a named handler are not supported
	async fetch() {
		return new Response(null, { status: 404 });
	}

	async createInstance(payload) {
		let instance = await this.env.MY_WORKFLOW.create({
			params: payload,
		});

		return {
			id: instance.id,
			details: await instance.status(),
		};
	}
}
```

Adapted (not in the official docs): the official Pages Function reads `context.env.WORKFLOWS_SERVICE` while the binding is named `WORKFLOW_SERVICE`; the name is aligned.

```js
export const onRequest = async (context) => {
	// This payload could be anything from within your app or from your frontend
	let payload = { hello: "world" };
	return Response.json(await context.env.WORKFLOW_SERVICE.createInstance(payload));
};
```

Calling the Worker over HTTP instead. Adapted (not in the official docs): the official Worker uses an undefined `payload`, and the Pages Function returns the `Response` object as JSON; this version reads the request body (capped at 1 MiB, parsed inside `try`, and required to be a JSON object), fails closed on a shared secret compared in constant time, and returns the parsed body only for a successful upstream response. `YOUR_WORKER` is a placeholder host and the secret is set with `npx wrangler secret put`. See Notes.

```js
// Worker (same file as your Workflow definition)
export default {
	async fetch(req, env) {
		// Fail closed: reject when the secret is not configured or does not match
		const enc = new TextEncoder();
		const expected = env.SHARED_SECRET;
		const provided = enc.encode(req.headers.get("X-Shared-Secret") ?? "");
		const wanted = enc.encode(expected ?? "");
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return new Response("Unauthorized", { status: 401 });
		}
		// Workflow params are limited to 1 MiB; reject larger bodies up front.
		const raw = await req.text();
		if (enc.encode(raw).byteLength > 1024 * 1024) {
			return new Response("Payload too large", { status: 413 });
		}
		let payload;
		try {
			payload = JSON.parse(raw);
		} catch {
			return new Response("Body must be JSON", { status: 400 });
		}
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			return new Response("Body must be a JSON object", { status: 400 });
		}
		let instance = await env.MY_WORKFLOW.create({
			params: payload,
		});
		return Response.json({
			id: instance.id,
			details: await instance.status(),
		});
	},
};

// Pages Function (functions/request.js)
export const onRequest = async (context) => {
	let payload = { hello: "world" };
	const upstream = await fetch("https://YOUR_WORKER.workers.dev/", {
		method: "POST",
		headers: { "X-Shared-Secret": context.env.SHARED_SECRET },
		body: JSON.stringify(payload), // Send a payload for our Worker to pass to the Workflow
	});

	if (!upstream.ok) {
		// The Worker answers 401/400/413 with plain text, not JSON.
		return new Response("Failed to start the Workflow", { status: 502 });
	}
	return Response.json(await upstream.json());
};
```

## Notes

- Corrected from the official docs: binding name mismatch (`WORKFLOWS_SERVICE` vs `WORKFLOW_SERVICE`), undefined `payload`, and returning a `Response` object through `Response.json`.
- Adapted from the official docs: the HTTP Worker compares the shared secret in constant time, rejects bodies over 1 MiB (the Workflow event payload limit), invalid JSON, and non-object payloads, and the Pages Function only parses the upstream body as JSON when the response is successful (error responses are plain text).
- The Pages Function examples create an instance for every request to the route; protect the route (and keep the payload server-defined or validated) before deploying.
- Cloudflare recommends Static Assets (Workers) over Pages, which lets you add Workflows directly to the same Worker; migration guide: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/ .
- Service bindings are recommended for same-account calls: no public endpoint, no authentication to configure, direct method calls. The Workflow must be deployed as a standalone Workers project first.
- Both the Pages project service binding and the HTTP approach require a deployed Worker; bind via dashboard as described in the cloudflare-pages skill (functions category, bindings-services; https://developers.cloudflare.com/pages/).

## Related

- [trigger-workflows.md](./trigger-workflows.md)
- [workflow-binding.md](./workflow-binding.md)
- [workflow-configuration.md](./workflow-configuration.md)
