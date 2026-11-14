---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/
---

# Static Assets

Static asset handling that is unique to the Vite plugin. The plugin includes assets based on whether the `client` environment is built, so the `assets` field is not required.

## Signature / Usage

Single-page application fallback:

```jsonc
{
	"assets": {
		"not_found_handling": "single-page-application"
	}
}
```

```toml
[assets]
not_found_handling = "single-page-application"
```

Fetching an asset imported as a URL through the assets binding:

```ts
import myImage from "./my-image.png";

export default {
	fetch(request, env) {
		return env.ASSETS.fetch(new URL(myImage, request.url));
	},
};
```

## Notes

- The `client` environment is built by default if any of these hold: an `index.html` exists in the project root; `build.rollupOptions.input` or `environments.client.build.rollupOptions.input` is set in the Vite config; there is a non-empty `public` directory; the Worker imports assets as URLs.
- `vite build` generates an output `wrangler.json` whose `assets.directory` is populated automatically with the `client` build output path; do not provide `assets.directory` in the input config.
- Use the `assets` config to set routing configuration or enable the assets binding.
- To serve built assets from a URL path prefix, set `assets.base_path` in the Wrangler config or `worker.assets.basePath` in `cloudflare.config.ts`. You must also set Vite's `base` option to the same path, with a trailing slash; otherwise your built HTML references JavaScript and CSS files at the root of your domain, and those requests do not match your static assets. For example, to serve your application from `/app/`, set `"assets": { "base_path": "/app" }` and:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/app/",
	plugins: [cloudflare()],
});
```

- Cloudflare Access: the plugin can add Static Assets to the generated deployment config even when the input config has no `assets`. Workers with Static Assets do not receive `ctx.access` in the user Worker. This affects frameworks using the plugin, including TanStack Start.
- All Vite static asset handling features are supported in the Worker as well as the frontend (import as URL, import as string, `public` directory, inlining).
- The binding's `fetch` requires a full URL; use the request URL as the `base`.
- Assets imported as URLs in the Worker are moved to the client build output; moved paths are printed during `vite build`.
- In a multi-Worker application, assets can only be accessed on the client and in the entry Worker.
- Headers and redirects: add `_headers` and `_redirects` files to the `public` directory; supported at build, preview and deploy time. Paths should reflect the client build output structure (generated assets are typically in an assets subdirectory).
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.
- Source: https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [tutorial.md](./tutorial.md)
- [non-javascript-modules.md](./non-javascript-modules.md)
