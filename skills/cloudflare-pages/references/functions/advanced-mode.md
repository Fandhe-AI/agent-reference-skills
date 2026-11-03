---
source: https://developers.cloudflare.com/pages/functions/advanced-mode/
---

# Advanced mode (`_worker.js`)

Develop Pages Functions with a `_worker.js` file in the output directory instead of the `/functions` directory.

## Signature / Usage

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname.startsWith("/api/")) {
			// TODO: Add your custom /api/* logic here.
			return new Response("Ok");
		}
		// Otherwise, serve the static assets.
		// Without this, the Worker will error and no assets will be served.
		return env.ASSETS.fetch(request);
	},
};
```

```ts
// Note: You would need to compile your TS into JS and output it as a `_worker.js` file. We do not read `_worker.ts`

interface Env {
	ASSETS: Fetcher;
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname.startsWith("/api/")) {
			// TODO: Add your custom /api/* logic here.
			return new Response("Ok");
		}
		// Otherwise, serve the static assets.
		// Without this, the Worker will error and no assets will be served.
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- When `_worker.js` exists, the entire `/functions` directory is ignored, including its routing and middleware. The file must use Module Worker syntax.
- The Function takes full control of all incoming HTTP requests to the domain and must make or forward requests to static assets, otherwise behavior is broken.
- `env` holds environment variables and bindings; `ASSETS` is a default binding to Pages' asset-serving resource; `env.ASSETS.fetch()` serves the requested asset.
- Migrating a Worker: copy its code into `_worker.js` and handle static assets with `return env.ASSETS.fetch(request);`.
- `passThroughOnException()` does not work in an advanced mode project.
- Place `_worker.js` in the project's output directory and deploy via Git integration for advanced mode to take effect.

## Related

- [api-reference.md](./api-reference.md)
- [get-started.md](./get-started.md)
- [smart-placement.md](./smart-placement.md)
