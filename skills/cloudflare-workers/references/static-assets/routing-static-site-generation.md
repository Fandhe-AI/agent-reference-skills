---
source: https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/
---

# Static Site Generation (SSG) and custom 404 pages

Serve prerendered sites (Gatsby, Docusaurus, ...) and custom 404 pages with `assets.not_found_handling = "404-page"`.

## Signature / Usage

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "./dist/",
		"not_found_handling": "404-page",
		"html_handling": "auto-trailing-slash"
	}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `assets.directory` | string | Build output directory. |
| `assets.not_found_handling` | `"404-page"` | Unmatched requests get the nearest `404.html` with `404 Not Found`. |
| `assets.html_handling` | string | Defaults to `auto-trailing-slash`; alternatives `force-trailing-slash`, `drop-trailing-slash`. |

## Notes

- With `404-page`, a request not matching a file serves the contents of the nearest `404.html` with `404 Not Found`.
- Navigation requests: with a Worker script (`main`), `assets.not_found_handling` set, and the `assets_navigation_prefers_asset_serving` flag (or compatibility date `2025-04-01` or later), requests with `Sec-Fetch-Mode: navigate` do not invoke the Worker. Navigating to a Worker endpoint such as `/api/date` in the browser then serves HTML; disable with the `assets_navigation_has_no_effect` flag (https://developers.cloudflare.com/workers/configuration/compatibility-flags/#navigation-requests-prefer-asset-serving).
- To run the Worker before assets (logging, auth) also set `assets.run_worker_first`; `not_found_handling` still applies when no asset matches. If `run_worker_first` is an array, automatic `Sec-Fetch-Mode: navigate` detection is disabled, so requests matching neither the array nor an asset reach the Worker; have the Worker pass non-matching requests to `env.ASSETS.fetch(request)` to get the `404.html` behavior.
- Routing decision (diagram summarized): `run_worker_first` match invokes the Worker; negative match or asset match goes to asset serving; no Worker script means asset serving; navigation requests go to assets, other requests invoke the Worker (with an array `run_worker_first`, navigation detection is disabled and all unmatched non-asset requests invoke the Worker). In asset serving, a miss is rewritten to `../404.html` (walking up directories); if found, `404.html` is served with `404`; if not found at root, a null-body `404 Not Found` is served. Only Worker invocations are billable; the Worker can serve assets via the binding.
- OAuth-style client-side callbacks: pass the query to an API route from a slim HTML page, same pattern as in the SPA page (HTML + `WorkerEntrypoint` handler for `/api/oauth/callback`).
- With the Vite plugin, see the cloudflare-wrangler skill (vite-plugin category).
- Doc typo in source: "your HTML assets will be server" means "served".

## Related

- [HTML handling](./routing-html-handling.md)
- [Single Page Application](./routing-single-page-application.md)
- [Routing: Worker script](./routing-worker-script.md)
