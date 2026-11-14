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
		return new Response(String(result));
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

- Adapted from the official docs: the Worker A example returns `new Response(result)` with a number, which is not a valid `BodyInit`; `String(result)` is used.
- Interfaces: RPC (recommended for most use cases, `await env.BINDING_NAME.myMethod(arg1)`), HTTP (`env.BINDING_NAME.fetch(request)`), and Connect (forwards a raw TCP connection to the `connect()` handler of another Worker, https://developers.cloudflare.com/workers/runtime-apis/handlers/connect/).
- Zero overhead: by default both Workers run on the same thread of the same server; no additional cost (https://developers.cloudflare.com/workers/platform/pricing/#service-bindings).
- Cloudflare Access does not propagate `ctx.access` from Worker A to Worker B (HTTP and RPC). Do not treat the downstream invocation as authenticated by the caller's Access context.
- Lifecycle: use `return` or `await` for service-binding calls needed to answer a request; otherwise work in the called Worker can stop when the caller finishes. For a short task that should continue after the response, pass the whole task to `ctx.waitUntil()`.
- Local development: run one `wrangler dev` per Worker (`npx wrangler@latest dev`); bindings show as `connected` / `not connected`. Multiple Workers in one command via multiple `-c` flags (first = primary at `http://localhost:8787`): `wrangler dev -c wrangler.json -c ../other-worker/wrangler.json`. This is experimental and subject to change.
- Deployment: Workers are deployed separately. On first deploy, deploy Worker B before Worker A, otherwise deploying A fails. For changes: deploy compatible B changes first (for example add a new method), then A, then remove unused code.
- Smart Placement can be combined with service bindings to split a Worker into two services (https://developers.cloudflare.com/workers/configuration/placement/#multiple-workers).
- Subrequest limit: each request made via a service binding counts toward the per-invocation subrequest limit (50 on Free, 10,000 on Paid by default; see the Workers limits page).
- Worker invocation limit (separate from the subrequest limit): a single incoming request can trigger at most 32 Worker invocations in total, counting the top-level Worker and every Worker reached through service bindings along the call chain. Calls beyond that throw an exception. This is a cap on how many Workers one request may fan into, not a second subrequest counter for the calling Worker.
- Service binding calls do not count toward simultaneous open connection limits.
- Clarified: the official page words the 32 limit as "each call to a Service binding counts towards this limit"; read it as invocations of Workers within one request's chain, and keep it separate from the subrequest limit above.
- The `wrangler.jsonc` key reference belongs to the cloudflare-wrangler skill.

### Request cancellation

- When a client disconnects, work handling its request may be canceled, including pending subrequests and open streams or connections tied to that request. If Worker A calls Worker B through an HTTP or RPC service binding, cancellation can continue down that chain: when Worker A's execution context ends, Worker B loses its caller, even though it has no direct connection to the original client. The calling Worker can also be a Pages Function.
- Using `await` does not prevent cancellation when the client disconnects. Use `ctx.waitUntil()` for short tasks that should continue after the request ends.
- RPC: when the caller's execution context ends, the called Worker's RPC execution context is canceled, even if RPC object references still exist (see [rpc-lifecycle.md](./rpc-lifecycle.md)). HTTP: see [service-bindings-http.md](./service-bindings-http.md).

### Choose when work should stop

| What you need | What to do |
| --- | --- |
| Work only needed to answer this request | Return or await the call. For HTTP calls, forward the response or finish reading its body. Let the work stop if the client disconnects. |
| A short task that should finish after the response, such as a cache update | Pass the whole task to `ctx.waitUntil()`, including any response-body processing it needs. For HTTP-triggered Workers, it can run for up to 30 seconds after the response is sent or the client disconnects. |
| A job that must finish even if the client disconnects | Send the job to Queues or start a Workflow (cloudflare-stateful skill). Wait for the message to be accepted or the workflow instance to be created before telling the client the job was accepted. |

- `waitUntil()` gives work more time. It does not guarantee completion or send a response to a disconnected client. For jobs that can retry, make it safe to run the same operation more than once; Queues can deliver the same message more than once.
- Source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [service-bindings-rpc.md](./service-bindings-rpc.md)
- [service-bindings-http.md](./service-bindings-http.md)
- [rpc.md](./rpc.md)
- [rpc-lifecycle.md](./rpc-lifecycle.md)
