---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/astro/
---

# Migrate Astro from Vercel

Move an Astro application from Vercel to Cloudflare Workers by replacing `@astrojs/vercel` with `@astrojs/cloudflare`. A fully static Astro site does not need an adapter: a Wrangler configuration file that points to `./dist` is enough ([migrate-from-vercel-static-site.md](./migrate-from-vercel-static-site.md)).

## Signature / Usage

Delete the `@astrojs/vercel` import and the `adapter: vercel(...)` option from `astro.config.*`, then replace the adapter:

```sh
npm uninstall @astrojs/vercel
npx astro add cloudflare --yes
npm i -D wrangler
```

Edit the Wrangler configuration file that `astro add` created. Change `name` from `example` to your project name. You do not need `nodejs_compat` in `compatibility_flags`, because a compatibility date of `2026-08-04` or later enables Node.js compatibility by default:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "<YOUR_PROJECT_NAME>",
	"main": "@astrojs/cloudflare/entrypoints/server",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"compatibility_flags": ["global_fetch_strictly_public"],
	"assets": {
		"binding": "ASSETS",
		"directory": "./dist",
	},
	"observability": {
		"enabled": true,
	},
}
```

Replace Vercel ISR and `s-maxage` caching with Astro route caching. Add the Cloudflare cache provider to `astro.config.ts`:

```ts
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	cache: { provider: cacheCloudflare() },
});
```

Then cache each route that set `s-maxage`:

```astro
---
Astro.cache.set({ maxAge: 10, swr: 31536000 });
---
```

Replace `Astro.locals.runtime.env` with `import { env } from "cloudflare:workers"`, generate types, build, preview, and deploy:

```sh
npx wrangler types
npx astro build
npx astro preview
npx wrangler deploy
```

## Options / Props

| Astro version | Adapter |
| --- | --- |
| 5 | `@astrojs/cloudflare@12` |
| 6 | `@astrojs/cloudflare@13` |
| 7 | `@astrojs/cloudflare@14` |

| Vercel adapter option | Cloudflare equivalent |
| --- | --- |
| `edgeMiddleware`, `maxDuration` | Remove. Middleware runs in the same Worker. |
| `imageService` | The default `imageService: 'cloudflare-binding'` uses the Images binding. |
| `isr` | Astro route caching with `cacheCloudflare()`, or prerendering |
| `webAnalytics`, `speedInsights` | Web Analytics. On a `workers.dev` URL, add the beacon script to your layout. |

## Notes

- The guide targets Astro 7; route caching, which replaces Vercel ISR, requires Astro 7. If your project uses Astro 5 or 6, upgrade first (`npm i astro@latest`), build once with the Vercel adapter, fix errors (for example replace `astro/client-image` with `astro/client` in `src/env.d.ts`), and commit the upgrade separately.
- Remove the `@astrojs/vercel` import from `astro.config.*` before you run `astro add cloudflare`, otherwise the command fails because it cannot load your configuration. `astro add` and `@astrojs/upgrade` prompt for confirmation and exit when no terminal is attached; pass `--yes` to `astro add` and install `astro@latest` directly.
- Astro 7 runs `astro preview` in the background; stop it with `npx astro preview stop`.
- On the first deploy, Wrangler creates a KV namespace for the `SESSION` binding and attaches an `IMAGES` binding. To skip the KV namespace, set `session: false` in your Astro configuration. Delete `vercel.json` before deploying.
- Pages that set `s-maxage` are rendered on every request unless you use route caching: Workers does not cache a Worker's own responses based on `Cache-Control`. `astro add cloudflare` on Astro 5 fails with `ERESOLVE` because it installs the latest adapter, which requires Astro 7; upgrade Astro or install `@astrojs/cloudflare@12` manually.
- The official page also provides a prompt for a coding agent (stops before it deploys); see the source.
- Shared steps: [migrate-from-vercel.md](./migrate-from-vercel.md). Astro on Workers: [../framework-guides/astro.md](../framework-guides/astro.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/astro/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [../framework-guides/astro.md](../framework-guides/astro.md)
