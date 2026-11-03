---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
---

# Astro

Deploy Astro (static or on-demand rendering) to Workers with `@astrojs/cloudflare` and Workers Assets.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-astro-app --framework=astro
```

On-demand rendering, existing project:

```sh
npx astro add cloudflare
```

`public/.assetsignore`:

```txt
_worker.js
_routes.json
```

```jsonc
{
	"name": "my-astro-app",
	"main": "./dist/_worker.js/index.js",
    "upload_source_maps": true,
	// Update to today's date
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"assets": {
		"binding": "ASSETS",
		"directory": "./dist"
	},
	"observability": {
		"enabled": true
	}
}
```

```sh
npx astro build
npx wrangler@latest deploy
```

Static site (no `main`):

```jsonc
{
	"name": "my-astro-app",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "./dist"
	}
}
```

Custom 404 page:

```jsonc
{
	"assets": {
		"directory": "./dist",
		"not_found_handling": "404-page"
	}
}
```

Sessions (KV `SESSION` is provisioned automatically on deploy):

```astro
---
export const prerender = false;
const cart = await Astro.session?.get("cart");
---

<a href="/checkout">{cart?.length ?? 0} items</a>
```

## Notes

- The adapter sets `output: 'server'`; use `export const prerender = true` for pages that do not need SSR. For a purely static site the adapter is not needed.
- Bindings are not usable for a purely static site. Access them through Astro `locals` (Astro Cloudflare integration docs).
- Customize the session KV binding name with the adapter option `sessionKVBindingName`.
- Autoconfig generates `main` `dist/_worker.js/index.js`, assets `./dist` binding `ASSETS`, and the `@astrojs/cloudflare` adapter in `astro.config.mjs`.
- Node.js: Astro 5.x supports 18.20.8, 20.3.0+, or 22.0.0+; Astro 6.x and 7.x require 22.12.0+.

## Related

- [overview.md](./overview.md)
- [automatic-configuration.md](./automatic-configuration.md)
