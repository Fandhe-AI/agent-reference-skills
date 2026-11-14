---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/
---

# Migrate TanStack Start from Vercel

Move a TanStack Start application from Vercel to Cloudflare Workers. On Vercel, TanStack Start runs through the Nitro Vite plugin; on Workers, the Cloudflare Vite plugin replaces it. Server functions, server routes, and client-only routes work without code changes.

## Signature / Usage

Remove the Nitro package and install the Cloudflare Vite plugin and Wrangler:

```sh
npm uninstall nitro
npm i -D @cloudflare/vite-plugin wrangler
```

In `vite.config.ts`, remove `nitro()` and its import. Add the Cloudflare plugin as the first plugin:

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tanstackStart(),
		viteReact(),
	],
});
```

Create a Wrangler configuration file. Do not set `assets`, because the Cloudflare Vite plugin generates it:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<YOUR_PROJECT_NAME>",
	"main": "@tanstack/react-start/server-entry",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"observability": {
		"enabled": true,
	},
}
```

Add a `public/_headers` file so hashed assets keep a one-year cache:

```txt
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Add these scripts to `package.json` (remove any script that starts a Node.js server, such as `node .output/server/index.mjs`):

```json
{
	"scripts": {
		"preview": "vite preview",
		"deploy": "npm run build && wrangler deploy",
		"cf-typegen": "wrangler types"
	}
}
```

Generate types, build, preview, and deploy:

```sh
npm run cf-typegen
npm run build
npm run preview
npm run deploy
```

## Notes

- Your project must use `@tanstack/react-start` 1.132.0 or later (earlier versions do not export `@tanstack/react-start/server-entry`); upgrade all `@tanstack/*` packages to the same version. Your project must build with Vite; Rsbuild is not supported.
- Read bindings in server functions and routes with `import { env } from "cloudflare:workers"`. The preview runs in the Workers runtime. Delete `vercel.json` before deploying.
- To add Cron Triggers, Queues, or Durable Objects, create a custom server entrypoint ([../framework-guides/tanstack-start.md](../framework-guides/tanstack-start.md)).
- Troubleshooting: without `public/_headers`, Workers serves files in `/assets/` with `max-age=0, must-revalidate`; re-resolving dependencies can upgrade `seroval`, which changes the server function wire format (convert old lockfiles instead); runtime file system writes fail on Workers and in `vite dev`, which now runs in the Workers runtime (use KV, D1, or R2); `wrangler setup` removes the `nitro()` plugin call but not the package; Vitest fails with `module is not defined` because it loads `vite.config.ts` with the Cloudflare plugin (give Vitest its own configuration file).
- Shared steps: [migrate-from-vercel.md](./migrate-from-vercel.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [../framework-guides/tanstack-start.md](../framework-guides/tanstack-start.md)
