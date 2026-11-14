---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/
---

# EmDash

EmDash is an open-source, full-stack content management system (CMS) for Astro. An EmDash site runs on Workers, stores content in D1, and stores media in R2. It includes an admin panel, a plugin system, and a Model Context Protocol (MCP) server for editing content from AI tools. Requires Node.js 22.23.4 or later and a Cloudflare account.

## Signature / Usage

Create a project with `create-emdash`:

```sh
npm create emdash@latest -- my-emdash-site
```

To create a project without prompts, pass the template and platform as flags:

```sh
npm create emdash@latest -- my-emdash-site --template cloudflare:starter --yes
```

The template configures the D1, R2, and Cron Trigger bindings in `wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-emdash-site",
  "main": "./src/worker.ts",
  // Set this to today's date
  "compatibility_date": "2026-11-14",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-emdash-site"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MEDIA",
      "bucket_name": "my-emdash-media"
    }
  ],
  "triggers": {
    "crons": [
      "* * * * *"
    ]
  }
}
```

EmDash connects to these bindings by name in `astro.config.mjs`. The binding names in both files must match:

```js
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
});
```

Preview and deploy:

```sh
npm run build
npx wrangler dev
npm run deploy
```

## Options / Props

| Product | Binding | Purpose | Configured in |
| --- | --- | --- | --- |
| D1 | `DB` | Stores content, users, and settings | `wrangler.jsonc` |
| R2 | `MEDIA` | Stores uploaded media | `wrangler.jsonc` |
| Cron Triggers | — | Runs scheduled publishing, plugin tasks, and backups | `wrangler.jsonc` |
| Workers KV | `SESSION` | Stores Astro sessions | Added by `@astrojs/cloudflare` at build |
| Images | `IMAGES` | Resizes and optimizes media | Added by `@astrojs/cloudflare` at build |
| Workers Static Assets | `ASSETS` | Serves the built front end and admin panel files | Added by `@astrojs/cloudflare` at build |
| Dynamic Workers | `LOADER` | Runs sandboxed plugins in isolation (optional) | `wrangler.jsonc` |

## Notes

- The template pins an earlier compatibility date and sets the `nodejs_compat` flag. Keep the flag unless you update the compatibility date to `2026-08-04` or later, which turns on Node.js compatibility by default.
- The Worker entry point in `src/worker.ts` exports a `scheduled` handler that the Cron Trigger calls to publish scheduled content. Keep both the Cron Trigger and the handler, or scheduled entries do not go live.
- The scaffolder writes a generated `EMDASH_ENCRYPTION_KEY` to a `.env` file. Do not commit this file. To use encrypted plugin settings in production, upload the key as a secret: `npx wrangler secret put EMDASH_ENCRYPTION_KEY`.
- On the first deploy, Wrangler creates the D1 database, R2 bucket, and KV namespace that the site uses. Open the `workers.dev` URL, then go to `/_emdash/admin/` to complete setup. The first person to finish the setup wizard becomes the administrator, so complete setup right after you deploy. Passkeys only work on the hostname where you create them: to use a custom domain, run setup on that domain, or set `EMDASH_SITE_URL` to it before setup.
- Sandboxed plugins run in isolation with Dynamic Workers (Workers Paid plan only) and cannot access environment variables or the file system. To turn them on, uncomment the `worker_loaders` binding in `wrangler.jsonc` (`"worker_loaders": [{ "binding": "LOADER" }]`), import `sandbox` from `@emdash-cms/cloudflare` and pass `sandboxRunner: sandbox()` to `emdash({ ... })` in `astro.config.mjs`, then build and deploy again.
- Each EmDash template for Cloudflare includes an `AGENTS.md` file, agent skills, and an MCP configuration for the EmDash documentation; each deployed site also includes an MCP server for drafting, editing, and scheduling content.
- Astro itself: [astro.md](./astro.md). D1 / R2 / KV bindings: cloudflare-storage skill.
- Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [astro.md](./astro.md)
- [overview.md](./overview.md)
- [automatic-configuration.md](./automatic-configuration.md)
