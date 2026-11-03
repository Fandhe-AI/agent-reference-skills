---
source: https://developers.cloudflare.com/workers/static-assets/binding/
---

# Configuration and Bindings

Configure a Worker with assets by specifying a `directory` and, optionally, an assets `binding` for fetching assets from Worker code (`env.ASSETS.fetch()`). Only one collection of static assets can be configured per Worker.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"main": "./src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "./public/",
		"binding": "ASSETS",
	},
}
```

```ts
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
		// Passes the incoming request through to the assets binding.
		// No asset matched this request, so this will evaluate `not_found_handling` behavior.
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `directory` | string | Folder of static assets to serve (often `./public/`, `./dist/`, or `./build/`). |
| `binding` | string | Optional. Makes the assets available as `env.<binding>` in the Worker. |
| `run_worker_first` | boolean or string[] | `false` (default) serves matching assets first; `true` invokes the Worker for every request; an array of route patterns invokes it only for matching routes. |

`env.ASSETS.fetch(request)`:

| Item | Type | Description |
|------|------|-------------|
| `request` (parameter) | `Request \| URL \| string` | Requests made through this method have `html_handling` and `not_found_handling` configuration applied. |
| return | `Promise<Response>` | A static asset response for the given request. |

## Notes

- Ignoring assets: create a `.assetsignore` file in the root of the assets directory (`.gitignore` format); matching files are not uploaded. Example for a Pages migration:

```txt
_worker.js
_redirects
_headers
```

- `run_worker_first` array patterns support `*` deep-matching globs and `!` negative patterns. Negative patterns take precedence; the Worker runs first when a non-negative pattern matches and no negative pattern matches. Order is not significant. At most 100 entries (duplicates count). Example:

```jsonc
{
	"name": "my-spa-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./src/index.ts",
	"upload_source_maps": true,
	"assets": {
		"directory": "./dist/",
		"not_found_handling": "single-page-application",
		"binding": "ASSETS",
		"run_worker_first": ["/api/*", "!/api/docs/*"]
	}
}
```

- In that configuration `/api/*` invokes the Worker first, except `/api/docs/*`, which follows asset-first routing. Common uses: authentication checks, A/B testing, injecting bootstrap data into an SPA shell.
- The hostname in the URL passed to `ASSETS.fetch()` (for example `assets.local`) is not meaningful; only the pathname is matched. Inside an RPC method (no incoming request) use `this.env.ASSETS.fetch(new Request('https://assets.local/path/to/asset'))`.
- Smart Placement only has an effect when `main` is set. With `run_worker_first = true`, all requests travel to the smart-placed Worker first, which can add latency for asset requests; with `run_worker_first = false` (default) assets are served near users while Worker logic is placed near backends. To mix both, split the app into multiple Workers connected through service bindings.
- The full `assets` key reference is in the cloudflare-wrangler skill.

## Related

- [Static Assets Overview](./overview.md)
- [Routing: Worker script](./routing-worker-script.md)
- [Routing: Single Page Application](./routing-single-page-application.md)
- [HTML handling](./routing-html-handling.md)
- [Billing and Limitations](./billing-and-limitations.md)
