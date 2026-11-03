---
source: https://developers.cloudflare.com/workers/configuration/sites/
---

# Workers Sites (legacy)

Workers Sites deploys static applications to Workers (built on Workers KV). It is deprecated in Wrangler v4 and the Cloudflare Vite plugin does not support it. Use Workers Static Assets instead; do not use Workers Sites for new projects.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "docs-site-blah",
	"site": {
		"bucket": "./public"
	},
	"env": {
		"production": {
			"name": "docs-site",
			"route": "https://example.com/docs*"
		},
		"staging": {
			"name": "docs-site-staging",
			"route": "https://staging.example.com/docs*"
		}
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "docs-site-blah"

[site]
bucket = "./public"

[env.production]
name = "docs-site"
route = "https://example.com/docs*"

[env.staging]
name = "docs-site-staging"
route = "https://staging.example.com/docs*"
```

Worker entry (module syntax) using `@cloudflare/kv-asset-handler`:

```js
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

export default {
	async fetch(request, env, ctx) {
		try {
			// Add logic to decide whether to serve an asset or run your original Worker code
			return await getAssetFromKV(
				{
					request,
					waitUntil: ctx.waitUntil.bind(ctx),
				},
				{
					ASSET_NAMESPACE: env.__STATIC_CONTENT,
					ASSET_MANIFEST: assetManifest,
				},
			);
		} catch (e) {
			let pathname = new URL(request.url).pathname;
			return new Response(`"${pathname}" not found`, {
				status: 404,
				statusText: "not found",
			});
		}
	},
};
```

Service Worker syntax (deprecated but supported):

```js
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
	event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
	try {
		// Add logic to decide whether to serve an asset or run your original Worker code
		return await getAssetFromKV(event);
	} catch (e) {
		let pathname = new URL(event.request.url).pathname;
		return new Response(`"${pathname}" not found`, {
			status: 404,
			statusText: "not found",
		});
	}
}
```

## Options / Props

`[site]` settings in the Wrangler configuration file:

| Name | Type | Description |
| --- | --- | --- |
| `bucket` (required) | string | Directory containing the static assets, relative to the Wrangler configuration file. Example: `bucket = "./public"`. |
| `include` (optional) | array of gitignore-style patterns | Files or directories in `bucket` to exclusively upload. Example: `include = ["upload_dir"]`. |
| `exclude` (optional) | array of gitignore-style patterns | Files or directories in `bucket` to exclude from uploads. Example: `exclude = ["ignore_dir"]`. |

Default output directories of popular static site generators: Hugo `public`, Gatsby `public`, Jekyll `_site`, Eleventy `_site`.

## Notes

Aggregated from: https://developers.cloudflare.com/workers/configuration/sites/ (overview), https://developers.cloudflare.com/workers/configuration/sites/configuration/, https://developers.cloudflare.com/workers/configuration/sites/start-from-scratch/, https://developers.cloudflare.com/workers/configuration/sites/start-from-existing/, https://developers.cloudflare.com/workers/configuration/sites/start-from-worker/.

- Workers Sites requires the latest Wrangler. It is built on Workers KV; usage rates may apply.
- Three starting approaches: from scratch, from an existing static site, from an existing Worker.
- Start from scratch: `git clone --depth=1 --branch=wrangler2 https://github.com/cloudflare/worker-sites-template my-site`, `npm install`, preview with `wrangler dev`, deploy with `npx wrangler deploy`. Template layout: `public` (assets, default `index.html` and `favicon.ico`), `src` (the serving Worker, `src/index.ts`), `wrangler.jsonc` (with `site = { bucket = "./public" }`), `package.json` / `package-lock.json`. Customize `name`, set `compatibility_date` to today, and optionally add `"route": "https://example.com/*"` for a custom domain you own and attached as a zone.
- Start from an existing static site: run `wrangler init -y` in the project root (adds or updates `wrangler.jsonc`, `package.json`, `tsconfig.json`, `src/index.ts`); set `site.bucket` to the build output directory; install with `npm i -D @cloudflare/kv-asset-handler`; replace `src/index.ts` with the entry above; run `wrangler dev` or `npx wrangler deploy`; optionally add a `route`.
- Start from an existing Worker: create an assets directory (for example `./public`), set `site.bucket`, install `@cloudflare/kv-asset-handler`, import `getAssetFromKV()` into the entry point, then deploy with `npx wrangler deploy`. Options of `getAssetFromKV()` are documented in the kv-asset-handler package docs (https://github.com/cloudflare/workers-sdk/tree/main/packages/kv-asset-handler).
- With environments, place `site` above any environment-specific configuration blocks.
- Limit: 25 MiB per page or file.
- Ignoring assets uses gitignore semantics (like Cargo's include and exclude fields). If both `include` and `exclude` are given, `include` is used and `exclude` is ignored. Wrangler always ignores `node_modules`, hidden files and directories, and symlinks.
- Service Workers are deprecated but still supported; prefer Module Workers.

## Related

- [Routes](./routes.md)
- [Custom Domains](./custom-domains.md)
- [Compatibility dates](./compatibility-dates.md)
