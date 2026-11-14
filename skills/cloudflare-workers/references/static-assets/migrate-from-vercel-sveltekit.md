---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/
---

# Migrate SvelteKit from Vercel

Move a SvelteKit application from Vercel to Cloudflare Workers by replacing `@sveltejs/adapter-vercel` or `@sveltejs/adapter-auto` with `@sveltejs/adapter-cloudflare`.

## Signature / Usage

Remove whichever of these adapters your project uses, then install the Cloudflare adapter that matches your SvelteKit version. On SvelteKit 2:

```sh
npm uninstall @sveltejs/adapter-vercel @sveltejs/adapter-auto
npm i -D @sveltejs/adapter-cloudflare@^7 wrangler
```

On SvelteKit 3:

```sh
npm i -D @sveltejs/adapter-cloudflare@^8 wrangler
```

Configure the adapter. On SvelteKit 2, edit `svelte.config.js` (on SvelteKit 3, pass the adapter to the `sveltekit()` plugin in `vite.config.js` instead):

```js
import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter(),
	},
};
```

Create a Wrangler configuration file:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<YOUR_PROJECT_NAME>",
	"main": ".svelte-kit/cloudflare/_worker.js",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"assets": {
		"binding": "ASSETS",
		"directory": ".svelte-kit/cloudflare",
	},
	"observability": {
		"enabled": true,
	},
}
```

Generate types for your bindings before the first build:

```sh
npx wrangler types
```

On SvelteKit 2, reference the generated types and declare the platform type in `src/app.d.ts`:

```ts
/// <reference path="../worker-configuration.d.ts" />

declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
```

Build, run locally, and deploy:

```sh
npm run build
npx wrangler dev
npx wrangler deploy
```

## Options / Props

| SvelteKit version | Adapter | Configured in | Bindings |
| --- | --- | --- | --- |
| Earlier than 2 | None. Upgrade to SvelteKit 2 first. | — | — |
| 2 | `@sveltejs/adapter-cloudflare@^7` | `svelte.config.js` | `event.platform.env` |
| 3 | `@sveltejs/adapter-cloudflare@^8` | `vite.config.js` | `import { env } from "cloudflare:workers"` |

## Notes

- Migrate hosting on your current SvelteKit major version; do not combine the move with a major upgrade, unless your version is earlier than 2. On SvelteKit 2, do not use automatic project configuration or `npx sv add`: both install adapter version 8, which only works with SvelteKit 3. Make sure `package.json` has a `name` field, otherwise `sv add` fails and automatic configuration does not install the adapter.
- Delete `vercel.json` and every Vercel `export const config` block. Replace ISR routes with prerendering or `Cache-Control` headers.
- Pre-1.0 SvelteKit applications need extra changes when upgrading to SvelteKit 2 (for example `kit.methodOverride` to named form actions, `$app/env` to `$app/environment`, `src/hooks.js` to `src/hooks.server.js`, `throw error()` to `error()`); see the source for the checklist. After the upgrade, cookies set by SvelteKit include `Secure` and `SameSite=Lax`, and cross-site form submissions return `403`.
- Troubleshooting: `Cannot read properties of undefined (reading 'assets')` means adapter version 8 on SvelteKit 2 (install `@sveltejs/adapter-cloudflare@^7`); `Unexpected option config.kit.methodOverride` means you should delete it and use named form actions; `Types file not found` means run `npx wrangler types` before you build.
- Cron jobs have no scheduled handler: `adapter-cloudflare` does not export a `scheduled()` handler, so use a separate Worker with a Cron Trigger that calls an authenticated endpoint. Prerendered pages are served as static assets, so `hooks.server.js` does not run for them (Vercel behaves the same way).
- Shared steps: [migrate-from-vercel.md](./migrate-from-vercel.md). SvelteKit on Workers: [../framework-guides/sveltekit.md](../framework-guides/sveltekit.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [../framework-guides/sveltekit.md](../framework-guides/sveltekit.md)
