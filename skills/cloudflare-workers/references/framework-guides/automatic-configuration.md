---
source: https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/
---

# Automatic configuration (deploy an existing project)

Wrangler detects the framework of an existing project, installs adapters, generates `wrangler.jsonc`, and deploys. Minimum Wrangler version: 4.68.0.

## Signature / Usage

```sh
npx wrangler deploy
```

```sh
npx wrangler setup
npx wrangler setup --dry-run
npx wrangler setup --yes
```

When `wrangler deploy` or `wrangler setup` runs without a Wrangler configuration file, Wrangler: detects the framework, prompts for confirmation, installs adapters, generates `wrangler.jsonc`, adds `deploy` / `preview` / `cf-typegen` scripts to `package.json`, and adds Wrangler entries to `.gitignore`.

## Options / Props

| Framework | Adapter / tool | Notes |
| --- | --- | --- |
| Next.js | OpenNext or vinext | Wrangler configures OpenNext. `cf init` configures vinext for Next.js 16 and later. |
| Astro | `@astrojs/cloudflare` | Runs `astro add cloudflare` automatically |
| SvelteKit | `@sveltejs/adapter-cloudflare` | Runs `sv add sveltekit-adapter` automatically |
| Nuxt | Built-in Cloudflare preset | |
| React Router | Cloudflare Vite plugin | |
| Solid Start | Built-in Cloudflare preset | |
| TanStack Start | Cloudflare Vite plugin | |
| Angular | | |
| Analog | Built-in Cloudflare preset | |
| Vite | Cloudflare Vite plugin | |
| Vike | | |
| Waku | | |
| Static sites | None | Any directory with an `index.html` |

Example generated `wrangler.jsonc` (exact content varies per framework):

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "my-project",
	"main": "dist/_worker.js/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"assets": {
		"binding": "ASSETS",
		"directory": "dist",
	},
	"observability": {
		"enabled": true,
	},
}
```

Scripts added to `package.json`:

```json
{
	"scripts": {
		"deploy": "npm run build && wrangler deploy",
		"preview": "npm run build && wrangler dev",
		"cf-typegen": "wrangler types"
	}
}
```

`.gitignore` entries and `.assetsignore` (for frameworks that emit worker files into the output directory):

```txt
# wrangler files
.wrangler
.dev.vars*
!.dev.vars.example
```

```txt
_worker.js
_routes.json
```

## Notes

- `--yes` skips confirmation (CI/CD). After setup, deploy with the generated `deploy` script (`npm run deploy`); without a `package.json`, run `wrangler deploy`.
- Importing a GitHub / GitLab repo in the dashboard runs autoconfig non-interactively; Workers Builds opens a pull request with the configuration and a preview deployment.
- If a Wrangler configuration file already exists (`wrangler.toml`, `wrangler.json`, `wrangler.jsonc`), autoconfig does not run; delete it to reconfigure.
- Multiple frameworks detected: Workers Builds fails (set the root directory to a single-framework path); locally Wrangler prompts you to choose.
- Framework not detected: ensure `package.json` lists it as a dependency. Workspaces / monorepos have limited support (root-level dependencies are not detected).
- Next.js: the adapter depends on the tool you run (see below). vinext supports ISR, `"use cache"`, and `unstable_cache`; configure the cache backend your app requires.
- Node.js compatibility: for compatibility dates before `2026-08-04`, automatic configuration also adds the `nodejs_compat` compatibility flag; the generated configuration for newer dates omits it (the official framework guide tables no longer list `compatibility_flags`).
- React and Vue SPAs may also be detected; try `wrangler deploy` or `wrangler setup`.

### Next.js adapter by tool

| Tool | Next.js 16 and later | Next.js 15 and earlier |
| --- | --- | --- |
| `wrangler setup` or `wrangler deploy` | OpenNext | OpenNext |
| `cf init` | vinext | OpenNext |

- When automatic configuration uses vinext, it runs `vinext init`; the generated configuration adds the vinext and Vite dependencies, creates the Cloudflare Workers configuration, and adds package scripts for development, builds, and deployment. To use vinext with Wrangler, run `vinext init` directly ([nextjs-vinext.md](./nextjs-vinext.md)). OpenNext: [opennext.md](./opennext.md).
- Superseded wording: the 2026-11-03 snapshot of this guide said automatic configuration uses vinext as the default path for Next.js; the page now documents the table above.
- Source: https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
- [nextjs-vinext.md](./nextjs-vinext.md)
- [opennext.md](./opennext.md)
