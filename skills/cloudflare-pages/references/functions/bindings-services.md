---
source: https://developers.cloudflare.com/pages/functions/bindings/
---

# Service bindings: Workers AI, service bindings, Queues producers, Analytics Engine

Calling other Cloudflare services and Workers from a Pages Function.

## Signature / Usage

Workers AI bound as `AI`:

```js
export async function onRequest(context) {
	const input = { prompt: "What is the origin of the phrase Hello, World" };

	const answer = await context.env.AI.run(
		"@cf/meta/llama-3.1-8b-instruct",
		input,
	);

	return Response.json(answer);
}
```

```ts
interface Env {
	AI: Ai;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const input = { prompt: "What is the origin of the phrase Hello, World" };

	const answer = await context.env.AI.run(
		"@cf/meta/llama-3.1-8b-instruct",
		input,
	);

	return Response.json(answer);
};
```

Service binding named `SERVICE`:

```js
export async function onRequestGet(context) {
	return context.env.SERVICE.fetch(context.request);
}
```

```ts
interface Env {
	SERVICE: Fetcher;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	return context.env.SERVICE.fetch(context.request);
};
```

Queue producer named `MY_QUEUE`. Adapted (not in the official docs): uses `context.request` because the official code references an undefined `request`; see Notes.

```js
export async function onRequest(context) {
	const { request } = context;
	await context.env.MY_QUEUE.send({
		url: request.url,
		method: request.method,
		headers: Object.fromEntries(request.headers),
	});

	return new Response("Sent!");
}
```

```ts
interface Env {
	MY_QUEUE: Queue<any>;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const { request } = context;
	await context.env.MY_QUEUE.send({
		url: request.url,
		method: request.method,
		headers: Object.fromEntries(request.headers),
	});

	return new Response("Sent!");
};
```

Analytics Engine dataset named `ANALYTICS_ENGINE`:

```js
export async function onRequest(context) {
	const url = new URL(context.request.url);

	context.env.ANALYTICS_ENGINE.writeDataPoint({
		indexes: [],
		blobs: [url.hostname, url.pathname],
		doubles: [],
	});

	return new Response("Logged analytic");
}
```

```ts
interface Env {
	ANALYTICS_ENGINE: AnalyticsEngineDataset;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const url = new URL(context.request.url);

	context.env.ANALYTICS_ENGINE.writeDataPoint({
		indexes: [],
		blobs: [url.hostname, url.pathname],
		doubles: [],
	});

	return new Response("Logged analytic");
};
```

Run a Pages project and a bound Worker in one dev session (experimental):

```sh
wrangler pages dev -c wrangler.jsonc -c ../other-worker/wrangler.jsonc
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Workers AI local flag | `--ai=<BINDING_NAME>` | — | `npx wrangler pages dev --ai=<BINDING_NAME>` (or `wrangler pages dev --ai AI`) exposes `context.env.AI`. |
| Service local flag | `--service <BINDING_NAME>=<SCRIPT_NAME>` | — | Run the Worker with `npx wrangler dev` in its directory, then `npx wrangler pages dev <OUTPUT_DIR> --service MY_SERVICE=my-worker` in the Pages directory. Required for service bindings made in the dashboard. |
| Multi-config session | repeated `-c` | — | The first `-c` must be the Pages configuration file; later ones are reachable through a Service binding. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Workers AI always accesses your Cloudflare account, so it incurs usage charges even in local development. Only one AI binding is allowed per Pages Functions project.
- Corrected from the official docs: the Queue producer example used `request.url` without defining `request`; it now destructures `request` from `context`. The message includes all request headers (including `Authorization` and `Cookie`); strip sensitive headers before enqueuing in real code.
- Queues: sending to a queue works locally, but a Pages Function cannot consume a queue. Create a separate consumer Worker with a queue consumer handler. Wrangler cannot yet run separate producer Functions and consumer Workers bound to the same queue locally.
- Analytics Engine bindings cannot be used locally.
- Service binding cancellation: if the browser disconnects from your Pages Function, the Function can stop waiting for the Worker it calls, and that Worker may report Client Disconnected. See the cloudflare-workers skill (service bindings, "Choose when work should stop") to decide whether to stop the work or keep it running.
- Source: https://developers.cloudflare.com/pages/functions/bindings/ (fetched 2026-11-14, cloudflare-docs 34d908a)
- Running multiple Workers in one Wrangler dev session is experimental and subject to change.

## Related

- [bindings.md](./bindings.md)
- [bindings-data.md](./bindings-data.md)
- [bindings-env-secrets.md](./bindings-env-secrets.md)
