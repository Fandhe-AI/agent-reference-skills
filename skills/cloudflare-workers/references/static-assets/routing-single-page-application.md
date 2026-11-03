---
source: https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/
---

# Single Page Application (SPA)

Serve a client-side rendered SPA (React, Vue, Svelte, ...) with `assets.not_found_handling = "single-page-application"`; navigation requests that match no asset get `/index.html`.

## Signature / Usage

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "./dist/",
		"not_found_handling": "single-page-application"
	}
}
```

Advanced routing control (explicit Worker-first paths):

```jsonc
{
	"name": "my-worker",
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

```ts
export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/name") {
			return new Response(JSON.stringify({ name: "Cloudflare" }), {
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `assets.directory` | string | Build output directory. |
| `assets.not_found_handling` | `"single-page-application"` | Non-matching requests are served `/index.html` with `200 OK`. |
| `assets.run_worker_first` | boolean \| string[] | Disables automatic `Sec-Fetch-Mode: navigate` detection; explicit control over Worker vs asset handling. |

## Notes

- Navigation requests: with a Worker script (`main`), `assets.not_found_handling` set, and the `assets_navigation_prefers_asset_serving` compatibility flag (or compatibility date `2025-04-01` or later), requests carrying `Sec-Fetch-Mode: navigate` do not invoke the Worker. This reduces billable invocations.
- Consequence: a Worker endpoint such as `/api/date` works from a client-side `fetch("/api/date")`, but navigating to it in the browser serves HTML. Disable with the `assets_navigation_has_no_effect` compatibility flag (https://developers.cloudflare.com/workers/configuration/compatibility-flags/#navigation-requests-prefer-asset-serving).
- To run the Worker ahead of assets (logging, authentication) also set `assets.run_worker_first`; `not_found_handling` is retained when no asset matches.
- Client-side callbacks (e.g. OAuth `/oauth/callback?code=...`): with the flag, HTML is served instead of the Worker. Serve a slim HTML page that forwards the query to an API route with client-side JS:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>OAuth callback</title>
	</head>
	<body>
		<p>Loading...</p>
		<script>
			(async () => {
				const response = await fetch("/api/oauth/callback" + window.location.search);
				if (response.ok) {
					window.location.href = '/';
				} else {
					document.querySelector('p').textContent = 'Error: ' + (await response.json()).error;
				}
			})();
		</script>
	</body>
</html>
```

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	async fetch(request: Request) {
		const url = new URL(request.url);
		if (url.pathname === "/api/oauth/callback") {
			const code = url.searchParams.get("code");

			const sessionId = await exchangeAuthorizationCodeForAccessAndRefreshTokensAndPersistToDatabaseAndGetSessionId(code);

			if (sessionId) {
				return new Response(null, {
					headers: {
						"Set-Cookie": `sessionId=${sessionId}; HttpOnly; SameSite=Strict; Secure; Path=/; Max-Age=86400`,
					},
				});
			} else {
				return Response.json(
					{ error: "Invalid OAuth code. Please try again." },
					{ status: 400 }
				);
			}
		}

		return new Response(null, { status: 404 });
	}
}
```

- The OAuth callback example does not verify an OAuth `state` parameter; in real code, validate `state` against a value stored before the redirect. The helper `exchangeAuthorizationCodeForAccessAndRefreshTokensAndPersistToDatabaseAndGetSessionId` is a placeholder not defined by the docs.
- Advanced routing control requires Wrangler v4.20.0+ and Cloudflare Vite plugin v1.7.0+. A SPA shell with HTMLRewriter bootstrap data example is at https://developers.cloudflare.com/workers/examples/spa-shell/.
- Routing decision order: if `run_worker_first` matches a path the Worker is invoked; a negative match or any asset match goes to asset serving; otherwise, with no Worker script assets serve; with a Worker script, navigation requests go to assets and others invoke the Worker. Within asset serving, an unmatched request is rewritten to `/index.html` (`200 OK`), or a `404 Not Found` null-body response if no HTML page exists. The Worker can reach assets through the binding. Only invocations of the Worker script are billable.
- With the Vite plugin, see the cloudflare-wrangler skill (vite-plugin category).

## Related

- [Routing: Worker script](./routing-worker-script.md)
- [Static Site Generation and custom 404 pages](./routing-static-site-generation.md)
- [HTML handling](./routing-html-handling.md)
- [Configuration and Bindings](./binding.md)
