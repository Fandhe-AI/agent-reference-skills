---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/programmatic-configuration/
---

# Programmatic configuration

The Wrangler config file is optional with the plugin. Customize Worker configuration with the `config` option, useful when the plugin runs inside another plugin or framework.

## Signature / Usage

Configuration object (merged with defaults and Wrangler config file values; `config` takes precedence):

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: {
				compatibility_date: "2025-01-01",
				vars: {
					API_URL: "https://api.example.com",
				},
			},
		}),
	],
});
```

Dynamic configuration function (receives current config; return an object to merge):

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: (userConfig) => ({
				vars: {
					WORKER_NAME: userConfig.name,
					BUILD_TIME: new Date().toISOString(),
				},
			}),
		}),
	],
});
```

In-place editing (mutate directly, e.g. to delete properties or remove array items; do not return a value):

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: (userConfig) => {
				// Replace all existing compatibility flags
				userConfig.compatibility_flags = ["nodejs_compat"];
			},
		}),
	],
});
```

Auxiliary Workers defined without config files:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			config: {
				name: "entry-worker",
				main: "./src/entry.ts",
				compatibility_date: "2025-01-01",
				services: [{ binding: "API", service: "api-worker" }],
			},
			auxiliaryWorkers: [
				{
					config: {
						name: "api-worker",
						main: "./src/api.ts",
						compatibility_date: "2025-01-01",
					},
				},
			],
		}),
	],
});
```

Override a config file with `config`:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			configPath: "./wrangler.jsonc",
			auxiliaryWorkers: [
				{
					configPath: "./workers/api/wrangler.jsonc",
					config: {
						vars: {
							ENDPOINT: "https://api.example.com/v2",
						},
					},
				},
			],
		}),
	],
});
```

Inherit from the entry Worker (auxiliary `config` receives the resolved entry Worker config as the second parameter):

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			auxiliaryWorkers: [
				{
					config: (_, { entryWorkerConfig }) => ({
						name: "auxiliary-worker",
						main: "./src/auxiliary-worker.ts",
						// Inherit compatibility settings from entry Worker
						compatibility_date: entryWorkerConfig.compatibility_date,
						compatibility_flags: entryWorkerConfig.compatibility_flags,
					}),
				},
			],
		}),
	],
});
```

## Notes

- Primarily designed for frameworks and plugin developers; users should normally use Wrangler config files. Config set via `config` is not included when running `wrangler types` or resource-based Wrangler CLI commands such as `wrangler kv` or `wrangler d1`.
- Default configuration without a config file: defaults for an assets-only Worker. `name` comes from `package.json` or the project directory name; `compatibility_date` is the latest date supported by the installed Miniflare version.
- Any Wrangler config property can be set, though some are ignored or replaced by Vite equivalents.
- Cloudflare environments cannot be defined via `config`, as they are resolved before this option is applied.
- Merging uses defu: object properties merge recursively; arrays concatenate (`config` values first, then existing values); primitives from `config` override existing values; `undefined` values in `config` do not override existing values.
- Vite itself (config, Environment API, build): see the vite skill. This plugin only adds the Cloudflare Workers runtime integration.

## Related

- [api.md](./api.md)
- [migrating-from-wrangler-dev.md](./migrating-from-wrangler-dev.md)
- [cloudflare-environments.md](./cloudflare-environments.md)
