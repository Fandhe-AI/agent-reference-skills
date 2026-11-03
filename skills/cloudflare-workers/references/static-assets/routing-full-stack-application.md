---
source: https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/
---

# Full-stack application

Full-stack apps span client and server: the build produces HTML files, client-side resources (JS bundles, CSS, images, fonts) and a Worker script that fetches data at request time, usually server-side rendering (SSR) before client hydration.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/static-assets/#how-it-works (Worker script combined with an assets binding).

```js
// index.js

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return new Response(JSON.stringify({ name: "Cloudflare" }), {
				headers: { "Content-Type": "application/json" },
			});
		}

		return env.ASSETS.fetch(request);
	},
};
```

## Notes

- Frameworks natively supported by Workers (framework guides under https://developers.cloudflare.com/workers/framework-guides/web-apps/): Astro, React Router (formerly Remix), Next.js, OpenNext adapter, RedwoodSDK, TanStack Start, Vike, Foldkit, fate; and under `more-web-frameworks/`: Analog, Angular, Nuxt, Qwik, Solid, Waku.
- The official page contains no configuration or code of its own; see the Worker script page for `run_worker_first` and `ASSETS` usage.

## Related

- [Routing: Worker script](./routing-worker-script.md)
- [Single Page Application](./routing-single-page-application.md)
- [Headers](./headers.md)
