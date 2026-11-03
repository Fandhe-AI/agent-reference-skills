---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/
---

# Vite Environments

The Vite Environment API (Vite 6) lets the plugin integrate Vite directly with the Workers runtime. End users need only a high-level understanding.

## Signature / Usage

Worker `my-worker` maps to the Vite environment `my_worker`:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./src/index.ts",
	"upload_source_maps": true
}
```

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	environments: {
		my_worker: {
			define: {
				__APP_VERSION__: JSON.stringify("v1.0.0"),
			},
		},
	},
	plugins: [cloudflare()],
});
```

Full-stack frameworks (assign the Worker to `ssr`):

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
	plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter()],
});
```

## Notes

- Vite creates `client` and `ssr` environments by default. Adding a Worker with the plugin creates an additional environment named after the Worker with dashes replaced by underscores.
- The default Vite environment name for a Worker is always the top-level Worker name, so it is stable across multiple Cloudflare Environments.
- The Worker-named default suits standalone Workers (such as an API called from the front end) and auxiliary Workers accessed via service bindings.
- With TanStack Start or React Router v8, the Worker is used for SSR and tightly integrated with the framework: set `viteEnvironment.name` to `ssr`. This merges the Worker's environment configuration with the framework's SSR configuration and includes the Worker in the framework's build output.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [api.md](./api.md)
- [cloudflare-environments.md](./cloudflare-environments.md)
