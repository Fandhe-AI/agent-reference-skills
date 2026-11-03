---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/
---

# TanStack Start

Deploy TanStack Start on Workers with the Cloudflare Vite plugin.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-tanstack-start-app --framework=tanstack-start
```

Configure an existing app:

```sh
npm i -D @cloudflare/vite-plugin wrangler
```

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tanstackStart(),
		react(),
	],
});
```

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<YOUR_PROJECT_NAME>",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"main": "@tanstack/react-start/server-entry",
	"observability": {
		"enabled": true,
	},
}
```

```json
{
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"deploy": "npm run build && wrangler deploy",
		"cf-typegen": "wrangler types"
	}
}
```

Bindings via the `env` import:

```ts
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

const getData = createServerFn().handler(() => {
	// Access bindings via env
	// For example: env.MY_KV, env.MY_BUCKET, or env.AI
});
```

Custom entrypoint (for Queues, Cron Triggers, Durable Object / Workflow exports):

```ts
import handler from "@tanstack/react-start/server-entry";

// Export Durable Objects as named exports
export { MyDurableObject } from "./my-durable-object";

export default {
    fetch: handler.fetch,

    // Handle Queue messages
    async queue(batch, _env, _ctx) {
        for (const message of batch.messages) {
            console.log("Processing message:", message.body);
            message.ack();
        }
    },

    // Handle Cron Triggers
    async scheduled(event, _env, _ctx) {
        console.log("Cron triggered:", event.cron);
    },
} satisfies ExportedHandler<Env>;
```

```jsonc
{
	"main": "src/server.ts",
    "upload_source_maps": true,
}
```

Test scheduled handlers locally:

```sh
curl "http://localhost:3000/cdn-cgi/local/scheduled?cron=*+*+*+*+*"
```

Static prerendering:

```ts
tanstackStart({
	prerender: {
		enabled: true,
	},
}),
```

## Notes

- Rsbuild-based TanStack Start projects are not supported; migrate to Vite first.
- If the Vite config has another deployment adapter such as `nitro()`, remove it and its import before adding the Cloudflare plugin.
- Run `npm run cf-typegen` before adding a custom entrypoint in TypeScript.
- Service binding example: add a `services` entry (`binding` `AUTH_SERVICE`, `service` `auth-worker`); the target Worker must extend `WorkerEntrypoint`; generate types with `npx wrangler types -c ./wrangler.jsonc -c ../auth-worker/wrangler.jsonc`.
- Prerendering runs at build time using local environment variables, secrets, and bindings storage. Use remote bindings for production data. In CI set `CLOUDFLARE_INCLUDE_PROCESS_ENV=true` and provide values as environment variables (or update Workers Builds build settings).
- TanStack Start APIs: see the tanstack-start skill.

## Related

- [overview.md](./overview.md)
- [automatic-configuration.md](./automatic-configuration.md)
