---
source: https://developers.cloudflare.com/workers/runtime-apis/rpc/typescript/
---

# RPC TypeScript

How TypeScript types for RPC methods of a Worker or Durable Object are generated and exposed to clients.

## Signature / Usage

Generate types for the client Worker's `env`, passing the config of each Worker or Durable Object being called:

```
npx wrangler types -c ./client/wrangler.jsonc -c ../sum-worker/wrangler.jsonc -c ../counter/wrangler.jsonc
```

Produces `worker-configuration.d.ts`:

```ts
interface Env {
	SUM_SERVICE: Service<import("../sum-worker/src/index").SumService>;
	COUNTER_OBJECT: DurableObjectNamespace<
		import("../counter/src/index").Counter
	>;
}
```

Client usage in `src/index.ts`:

```ts
export default {
	async fetch(req, env, ctx): Promise<Response> {
		const result = await env.SUM_SERVICE.sum(1, 2);
		return new Response(result.toString());
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- `wrangler types` generates `Service` and `DurableObjectNamespace` types, each taking one type parameter (the `WorkerEntrypoint` or `DurableObject` type). Higher-order types generate client-side stub types (for example forcing all methods to be async).
- `wrangler types` details belong to the cloudflare-wrangler skill; see also https://developers.cloudflare.com/workers/languages/typescript/#generate-types

## Related

- [rpc.md](./rpc.md)
- [service-bindings-rpc.md](./service-bindings-rpc.md)
