---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/
---

# Service bindings

Service bindings let one Worker call another without going through a publicly-accessible URL: call a method on Worker B (RPC) or forward a request to it (HTTP).

## Signature / Usage

Add the binding to the caller's Wrangler configuration:

```jsonc
{
	"services": [
		{
			"binding": "<BINDING_NAME>",
			"service": "<WORKER_NAME>"
		}
	]
}
```

Worker B exposes `add(a, b)`:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class WorkerB extends WorkerEntrypoint {
	// Currently, entrypoints without a named handler are not supported
	async fetch() {
		return new Response(null, { status: 404 });
	}

	async add(a, b) {
		return a + b;
	}
}
```

Worker A calls it:

```js
export default {
	async fetch(request, env) {
		const result = await env.WORKER_B.add(1, 2);
		return new Response(result);
	},
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| binding | string | The name of the key you want to expose on the `env` object. |
| service | string | The name of the target Worker (must be on your Cloudflare account). If the target Worker uses an environment, use `<WORKER_NAME>-<ENVIRONMENT_NAME>`. |
| entrypoint | string | Optional named `WorkerEntrypoint` export to bind to (see [service-bindings-rpc.md](./service-bindings-rpc.md)). |

## Notes

- Interfaces: RPC (recommended for most use cases, `await env.BINDING_NAME.myMethod(arg1)`), HTTP (`env.BINDING_NAME.fetch(request)`), and Connect (forwards a raw TCP connection to the `connect()` handler of another Worker, https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/).
- Zero overhead: by default both Workers run on the same thread of the same server; no additional cost (https://developers.cloudflare.com/workers/platform/pricing/#service-bindings).
- Cloudflare Access does not propagate `ctx.access` from Worker A to Worker B (HTTP and RPC). Do not treat the downstream invocation as authenticated by the caller's Access context.
- Lifecycle: the API is asynchronous; you must `await` any method you call. If Worker A does not await Worker B's completion, Worker B is terminated early.
- Local development: run one `wrangler dev` per Worker (`npx wrangler@latest dev`); bindings show as `connected` / `not connected`. Multiple Workers in one command via multiple `-c` flags (first = primary at `http://localhost:8787`): `wrangler dev -c wrangler.json -c ../other-worker/wrangler.json`. This is experimental and subject to change.
- Deployment: Workers are deployed separately. On first deploy, deploy Worker B before Worker A, otherwise deploying A fails. For changes: deploy compatible B changes first (for example add a new method), then A, then remove unused code.
- Smart Placement can be combined with service bindings to split a Worker into two services (https://developers.cloudflare.com/workers/configuration/placement/#multiple-workers).
- Limits: each request via a service binding counts toward the subrequest limit; a single request has a maximum of 32 Worker invocations (each service binding call counts; subsequent calls throw); service binding calls do not count toward simultaneous open connection limits.
- The `wrangler.jsonc` key reference belongs to the cloudflare-wrangler skill.

## Related

- [service-bindings-rpc.md](./service-bindings-rpc.md)
- [service-bindings-http.md](./service-bindings-http.md)
- [rpc.md](./rpc.md)
- [rpc-lifecycle.md](./rpc-lifecycle.md)
