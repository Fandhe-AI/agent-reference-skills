---
source: https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
---

# Worker script

How the presence of a Worker script influences static asset routing, and how to run the Worker first with `assets.run_worker_first`.

## Signature / Usage

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./worker/index.ts",
	"upload_source_maps": true,
	"assets": {
		"directory": "./dist/",
		"binding": "ASSETS",
		"run_worker_first": true
	}
}
```

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request) {
		// You can perform checks before fetching assets
		const user = await checkIfRequestIsAuthenticated(request);

		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}

		// You can then just fetch the assets as normal, or you could pass in a custom Request object here if you wanted to fetch some other specific asset
		const assetResponse = await this.env.ASSETS.fetch(request);

		// You can return static asset response as-is, or you can transform them with something like HTMLRewriter
		return new HTMLRewriter()
			.on("#user", {
				element(element) {
					element.setInnerContent(JSON.stringify({ name: user.name }));
				},
			})
			.transform(assetResponse);
	}
}
```

Selective Worker-first routing:

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./worker/index.ts",
	"upload_source_maps": true,
	"assets": {
		"directory": "./dist/",
		"not_found_handling": "single-page-application",
		"binding": "ASSETS",
		"run_worker_first": ["/oauth/callback"]
	}
}
```

Adapted (not in the official docs): the redirect response sets `status: 302`; see Notes.

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request) {
		// The only thing this Worker script does is handle an OAuth callback.
		// All other requests either serve an asset that matches or serve the index.html fallback, without ever hitting this code.
		const url = new URL(request.url);
		const code = url.searchParams.get("code");
		const state = url.searchParams.get("state");

		const accessToken = await exchangeCodeForToken(code, state);
		const sessionIdentifier = await storeTokenAndGenerateSession(accessToken);

		// Redirect back to the index, but set a cookie that the front-end will use.
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
				"Set-Cookie": `session_token=${sessionIdentifier}; HttpOnly; Secure; SameSite=Lax; Path=/`,
			},
		});
	}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `assets.run_worker_first` | boolean or string[] | `true` runs the Worker before every request; an array of route patterns runs it first only for those routes. |

## Notes

- With both assets and a Worker script, Cloudflare first tries to serve a matching static asset; if none matches, the Worker is invoked. This combines into full-stack apps, or SPA/SSG apps with an API.
- `run_worker_first` can implement "middleware" (logging, auth checks, HTMLRewriter transformations).
- Smart Placement with `run_worker_first`: placement may not be optimized because the entire Worker script is placed as a single unit rather than split edge-first vs smart-placed (a limitation Cloudflare says it is working to resolve).
- Cloudflare Access: when a Worker has static assets, the internal assets router does not pass `ctx.access` to the user Worker. Access still protects the Worker and its assets. See https://developers.cloudflare.com/workers/configuration/cloudflare-access/#ctxaccess-limitations.
- Corrected from the official docs: the OAuth callback example sets a `Location` header on a `new Response(null, ...)` without a status, which returns `200` and does not redirect; `status: 302` was added.
- The OAuth callback example passes the `state` query parameter to `exchangeCodeForToken` without comparing it to a value stored before the redirect. In real code, generate `state` per login, store it (for example in a short-lived cookie), and reject the callback if it does not match.
- In the examples, `checkIfRequestIsAuthenticated`, `exchangeCodeForToken` and `storeTokenAndGenerateSession` are placeholders and are not defined by the docs.

## Related

- [Configuration and Bindings](./binding.md)
- [Single Page Application](./routing-single-page-application.md)
- [Full-stack application](./routing-full-stack-application.md)
- [Billing and Limitations](./billing-and-limitations.md)
