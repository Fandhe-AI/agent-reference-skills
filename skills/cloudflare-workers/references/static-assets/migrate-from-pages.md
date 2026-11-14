---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
---

# Migrate from Pages to Workers

Guide for migrating a Cloudflare Pages project (cloudflare-pages skill; https://developers.cloudflare.com/pages/) to Workers with static assets, plus a feature compatibility matrix.

## Signature / Usage

Before (Pages):

```jsonc
{
	"name": "my-pages-project",
	"pages_build_output_dir": "./dist/client/"
}
```

After (Workers):

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./worker/index.ts",
	"upload_source_maps": true,
	"assets": {
		"directory": "./dist/client/",
		"binding": "ASSETS"
	}
}
```

Serving behavior is explicit in Workers (Pages auto-detected it):

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "./dist/client/",
		"not_found_handling": "single-page-application"
	}
}
```

Use `"not_found_handling": "404-page"` for custom 404 pages.

## Notes

- Frameworks: switch Pages-specific adapters for the Workers equivalent.
- Mandatory config fields: `name` and `compatibility_date` (use the Pages Functions date if you had one, otherwise today's date). Replace `pages_build_output_dir` with `assets.directory`.
- If the Worker has only assets and no `main`, remove `"binding": "ASSETS"` (valid only with a Worker script). In Workers the binding name is customizable and must be configured manually.
- Pages auto-excluded `node_modules`, `.DS_Store`, `.git`; replicate with `.assetsignore` in the assets directory:

```txt
**/node_modules
**/.DS_Store
**/.git
```

- Pages Functions "advanced mode" `_worker.js`: move it out of the assets directory (recommended) or list it in `.assetsignore`, then point `main` at it.
- Pages Functions `functions/` folder: compile with `wrangler pages functions build`, then point `main` at the output:

```sh
npx wrangler pages functions build --outdir=./dist/worker/
```

- `_routes.json` / Functions middleware: Pages served Functions ahead of assets; Workers serves assets first unless `assets.run_worker_first` is set (required for auth checks, request logging).

Adapted (not in the official docs): added `"binding": "ASSETS"`, which Pages Functions code reaching `env.ASSETS` depends on; see Notes.

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"main": "./dist/worker/index.js",
	"upload_source_maps": true,
	"assets": {
		"directory": "./dist/client/",
		"binding": "ASSETS",
		"run_worker_first": true
	}
}
```

- Adapted from the official docs: the official Pages Functions config omits `"binding": "ASSETS"`. Pages Functions call `env.ASSETS.fetch()` to reach static assets, and in Workers the binding is not created automatically, so it is kept here (valid because `main` is set).

- Starting from scratch: use `WorkerEntrypoint` from `cloudflare:workers`.

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	async fetch(request: Request) {
		return new Response("Hello, world!");
	}
}
```

- Placement, `compatibility_date` and `compatibility_flags` from Pages are redefined in the Wrangler config (e.g. `"compatibility_flags": ["nodejs_compat"]`, `"placement": { "mode": "smart" }`).
- Variables/secrets/bindings go in the Wrangler config, secrets via Wrangler/dashboard and `.dev.vars` locally. With Workers Builds, configure build-time variables separately; Workers does not share runtime and build-time variables.
- Commands: `wrangler pages dev` / `wrangler pages deploy` become `wrangler dev` / `wrangler deploy`. Default dev port changes from `8788` to `8787` (`--port` to customize).
- Builds: connect the repo to Workers Builds, then disable automatic deployments on the Pages project.
- Preview environment: add `preview_urls` and a `previews` block, enable preview builds in Workers Builds:

```jsonc
{
    "name": "my-worker",
    // Set this to today's date
    "compatibility_date": "2026-11-03",
    "main": "./worker/index.ts",
    "upload_source_maps": true,
    "assets": {
        "directory": "./dist/client/"
    },
    "preview_urls": true,
    "previews": {}
}
```

- `_headers` and `_redirects` are supported natively; keep them in the assets directory.
- `pages.dev` becomes a personalized `workers.dev` subdomain; opt in with `"workers_dev": true`.
- Custom domains: Workers does not support domains whose nameservers are not managed by Cloudflare.
- Rollout: delete the Pages project with `npx wrangler pages project delete`.
- AI-assisted migration: an experimental prompt is at https://developers.cloudflare.com/workers/prompts/pages-to-workers.txt.
- Compatibility matrix highlights (Workers vs Pages): Workers only: Cloudflare Vite plugin, Gradual Deployments, `--remote` dev, Workers Logs, Logpush, Tail Workers, Source Maps, Cron Triggers, Email Workers, Image Resizing, Queue Consumers, Rate Limiting, assets on a path, non-root routes. Pages only: custom domains outside Cloudflare zones; Early Hints (Workers: workaround with `Link` headers); Branch Deploy Controls and File-based Routing / Pages Plugins (Workers: workaround). Durable Objects in Pages require a separate Worker. Supported in both: custom headers, redirects, Smart Placement, Node.js compatibility, D1, KV, R2, Hyperdrive, Vectorize, AI, Analytics Engine, service bindings, secrets, mTLS, custom domains.

### Deployments and asset availability

- Each Worker version has its own set of static assets. HTML and asset requests can use different versions while a deployment change spreads across the network, or during a gradual deployment; older pages can also request files after a newer release starts serving traffic. Review Version skew and static assets (https://developers.cloudflare.com/workers/versions-and-deployments/version-skew/) when migrating your release process. How long a file stays cached is separate from which versions can serve it; the Pages cache-retention description does not tell you how long Workers stores assets.
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Migrate from Netlify](./migrate-from-netlify.md)
- [Migrate from Vercel](./migrate-from-vercel.md)
- [Configuration and Bindings](./binding.md)
- [Headers](./headers.md)
- [Redirects](./redirects.md)
