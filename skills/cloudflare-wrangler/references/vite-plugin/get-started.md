---
source: https://developers.cloudflare.com/workers/vite-plugin/get-started/
---

# Get started

Create a standalone Worker from scratch with Vite and the Cloudflare Vite plugin.

## Signature / Usage

`package.json` (include `"type": "module"`):

```json
{
	"name": "cloudflare-vite-get-started",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "npm run build && vite preview",
		"deploy": "npm run build && wrangler deploy"
	}
}
```

Install:

```
npm i -D vite @cloudflare/vite-plugin wrangler
```

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [cloudflare({ viteEnvironment: { name: "worker" } })],
	environments: {
		worker: { build: { sourcemap: true } },
	},
});
```

Worker config (`wrangler.jsonc`):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "cloudflare-vite-get-started",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./src/index.ts",
	"upload_source_maps": true
}
```

Equivalent `wrangler.toml`:

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "cloudflare-vite-get-started"
# Set this to today's date
compatibility_date = "2026-11-03"
main = "./src/index.ts"
upload_source_maps = true
```

`src/index.ts`:

```ts
export default {
	fetch() {
		return new Response(`Running in ${navigator.userAgent}!`);
	},
};
```

## Notes

- The plugin looks for `wrangler.jsonc`, `wrangler.json` or `wrangler.toml` in the application root.
- `name` is the Worker name. `viteEnvironment.name` sets the Worker's Vite Environment to `worker`; if omitted, the plugin uses the Worker name. `main` is the Worker entry file.
- The `worker` environment generates source maps; the client environment keeps its existing source map settings.
- A request to the Worker returns "Running in Cloudflare-Workers!".
- Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run deploy`.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [api.md](./api.md)
- [vite-environments.md](./vite-environments.md)
- [tutorial.md](./tutorial.md)
