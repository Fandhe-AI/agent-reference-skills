---
source: https://developers.cloudflare.com/pages/how-to/add-custom-http-headers/
---

# Add custom HTTP headers

Use a Worker on the same custom domain to add, delete or change headers on responses from a Pages project, including Pages Functions responses.

## Signature / Usage

```js
export default {
	async fetch(request) {
		// This proxies your Pages application under the condition that your Worker script is deployed on the same custom domain as your Pages project
		const response = await fetch(request);

		// Clone the response so that it is no longer immutable
		const newResponse = new Response(response.body, response);

		// Add a custom header with a value
		newResponse.headers.append(
			"x-workers-hello",
			"Hello from Cloudflare Workers",
		);

		// Delete headers
		newResponse.headers.delete("x-header-to-delete");
		newResponse.headers.delete("x-header2-to-delete");

		// Adjust the value for an existing header
		newResponse.headers.set("x-header-to-change", "NewValue");

		return newResponse;
	},
};
```

Adapted (not in the official docs): the official Wrangler file has no `main` or `compatibility_date`, which `wrangler deploy` needs; added with placeholders. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "custom-headers-example",
	// Path to the Worker entry file above
	"main": "./src/index.js",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"account_id": "FILL-IN-YOUR-ACCOUNT-ID",
	"workers_dev": false,
	"route": {
		"pattern": "FILL-IN-YOUR-WEBSITE.com/*",
		"zone_id": "FILL-IN-YOUR-ZONE-ID"
	}
}
```

```sh
npx wrangler deploy
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `account_id` | string | — | Your account ID. |
| `workers_dev` | boolean | — | `false` here: the Worker runs only on the route. |
| `route.pattern` | string | — | Route on the custom domain of your Pages project. |
| `route.zone_id` | string | — | Zone ID of that domain. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The Pages project must be connected to a custom domain. For static assets the simpler option is the `_headers` file; a Worker is for more advanced customization and is the way to change headers on Pages Functions responses.
- Responses are immutable; clone with `new Response(response.body, response)` before changing headers.
- Corrected from the official docs: the page's Wrangler config omitted `main` and `compatibility_date`. The page also links the template at `kristianfreeman/custom-headers-example` but clones `cloudflare/custom-headers-example`; verify the repository you clone. The official TOML variant is equivalent and not repeated.
- The Workers docs have a ready-made security-headers example (https://developers.cloudflare.com/workers/examples/security-headers/).

## Related

- [Headers](../configuration/headers.md)
- [Custom domains](../configuration/custom-domains.md)
