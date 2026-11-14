---
source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nuxt/
---

# Migrate Nuxt from Vercel

Move a Nuxt application from Vercel to Cloudflare Workers. Nuxt selects its Vercel preset automatically on Vercel; on Workers, you set the Nitro `cloudflare_module` preset instead. Nuxt 3 and Nuxt 4 run on Nitro v2 (`nitropack`), so use the Nitro v2 Cloudflare documentation, not the Nitro v3 documentation.

## Signature / Usage

In `nuxt.config.ts`, update `compatibilityDate` and set the Nitro preset (use today's date, or any date after `2025-07-17`):

```ts
export default defineNuxtConfig({
	compatibilityDate: "2025-07-17",
	nitro: {
		preset: "cloudflare_module",
		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
	},
});
```

Create a Wrangler configuration file without `main` or `assets`. Nitro generates both when you build:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<YOUR_PROJECT_NAME>",
	// Set this to today's date
	"compatibility_date": "2026-11-14",
	"observability": {
		"enabled": true,
	},
}
```

Add these scripts to `package.json`:

```json
{
	"scripts": {
		"preview": "npm run build && wrangler dev",
		"deploy": "npm run build && wrangler deploy",
		"cf-typegen": "wrangler types"
	}
}
```

Cloudflare applies every `_headers` rule that matches a path. The rules that Nitro generates for `/_nuxt/` overlap, so files such as `latest.json` receive two `Cache-Control` values. This hook rewrites the generated file so the most specific rule wins:

```ts
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export default defineNuxtConfig({
	hooks: {
		"nitro:init"(nitro) {
			nitro.hooks.hook("compiled", async () => {
				const base = nitro.options.baseURL.replace(/\/$/, "");
				const rules = Object.entries(nitro.options.routeRules)
					.filter(([, rule]) => rule.headers)
					.sort(([a], [b]) => a.split("/").length - b.split("/").length)
					.map(([path, rule]) =>
						[
							base + path.replace("/**", "/*"),
							...Object.entries(rule.headers!).flatMap(([name, value]) => [
								`  ! ${name}`,
								`  ${name}: ${value}`,
							]),
						].join("\n"),
					);
				await writeFile(
					join(nitro.options.output.publicDir, "_headers"),
					rules.join("\n") + "\n",
				);
			});
		},
	},
});
```

## Notes

- Set `compatibilityDate` in `nuxt.config.ts` to `2025-07-17` or later; with an earlier date, `nuxt dev` does not emulate Cloudflare bindings (check that `.nuxt/nitro.json` contains `"preset": "cloudflare-dev"`).
- Do not install `nitro-cloudflare-dev` on `nitropack` 2.12 or later: Nitro includes the same development emulation, and both together start two proxies.
- Install Wrangler (`npm i -D wrangler`), replace any `isr` route rules, switch `@nuxt/image` to the Cloudflare provider, and read bindings with `event.context.cloudflare.env`. Preview with `npm run preview`, delete `vercel.json`, and deploy with `npm run deploy`. If your project has a `public/_headers` file, merge its rules into the generated file instead of overwriting them.
- Troubleshooting: the build warns that `main` and `assets` are overridden (remove them from your Wrangler configuration file); `wrangler dev` reports `Missing entry-point to Worker script` (build first, because Nitro generates the Worker entry file when you build); the `ASSETS` binding is missing from generated types (`wrangler types` reads your root Wrangler configuration file, not the one Nitro generates; you can ignore this).
- Shared steps: [migrate-from-vercel.md](./migrate-from-vercel.md). Nuxt on Workers: [../framework-guides/nuxt.md](../framework-guides/nuxt.md).
- Source: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nuxt/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [migrate-from-vercel.md](./migrate-from-vercel.md)
- [../framework-guides/nuxt.md](../framework-guides/nuxt.md)
