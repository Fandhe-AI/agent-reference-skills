---
source: https://developers.cloudflare.com/workers/static-assets/
---

# Static Assets Overview

Upload static assets (HTML, CSS, images and other files) as part of your Worker; Cloudflare handles caching and serving them. Worker code and assets are deployed together in a single operation.

## Signature / Usage

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-spa",
  "main": "src/index.js",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  }
}
```

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

Scaffold a React SPA with an API Worker:

```sh
npm create cloudflare@latest -- my-react-app --framework=react
```

## Notes

- Routing behavior: if a requested URL matches a file in the assets directory, that file is served without invoking Worker code. If no asset matches and a Worker script is present, the Worker handles the request (and may defer to assets via `env.ASSETS.fetch(request)`). If there is no Worker script, a `404 Not Found` is returned.
- `not_found_handling = "single-page-application"` returns `200 OK` with `index.html` for non-matching requests. Pair it with `run_worker_first` patterns for advanced routing control.
- `not_found_handling = "404-page"` returns `404 Not Found` with the nearest `404.html`.
- `run_worker_first` can be `true` (Worker for all requests) or an array of route patterns (selective Worker-first routing), e.g. `["/api/*", "!/api/docs/*"]`.
- Caching: the first request fetches the asset from storage and caches it at the nearest Cloudflare location; other data centers can retrieve it from a nearby cache through tiered caching.
- With the Cloudflare Vite plugin you do not need to specify `assets.directory`; see the cloudflare-wrangler skill (vite-plugin category) for the plugin.
- The full `assets` key specification lives in the cloudflare-wrangler skill; this category documents the runtime behavior.
- Cloudflare Pages is covered by the cloudflare-pages skill (https://developers.cloudflare.com/pages/).

## Related

- [Get Started](./get-started.md)
- [Configuration and Bindings](./binding.md)
- [Single Page Application](./routing-single-page-application.md)
- [Static Site Generation and custom 404 pages](./routing-static-site-generation.md)
- [Worker script](./routing-worker-script.md)
- [Billing and Limitations](./billing-and-limitations.md)
