---
source: https://developers.cloudflare.com/pages/functions/routing/
---

# Functions invocation routes (`_routes.json`)

On a purely static project Pages offers unlimited free requests, but once Functions are added every request invokes a Function by default. A `_routes.json` file in the build output directory controls which routes invoke Functions.

## Signature / Usage

Invoke Functions on all routes except `/build/*` (excluded routes incur no Functions invocation charge):

```json
{
	"version": 1,
	"include": ["/*"],
	"exclude": ["/build/*"]
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `version` | number | — | Schema version. Currently only version 1 exists. |
| `include` | string[] | — | Routes that will invoke Functions. Accepts wildcards. |
| `exclude` | string[] | — | Routes that will not invoke Functions. Accepts wildcards. `exclude` always takes priority over `include`. |

Limits:

| Limit | Value |
|-------|-------|
| Include rules | At least one |
| Include + exclude rules combined | No more than 100 |
| Characters per rule | No more than 100 |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- The file is placed in the project's build directory (for example `dist` for Vite/Vue/Astro, `public` for Hugo/Gatsby, `out` for Next.js static export, `build/client` for Remix, `.svelte-kit/cloudflare` for SvelteKit, `_site` for Jekyll/Eleventy).
- It is generated automatically when a `functions` directory is detected at publish with Pages CI or Wrangler. Some frameworks (Remix, SvelteKit) also generate it.
- Wildcards match any number of path segments (slashes): `/users/*` matches everything after `/users/`.
- Example that invokes Functions on all routes: `{"version": 1, "include": ["/*"], "exclude": []}`.
- Fail open / closed (Workers Free plan only): when the daily free allowance of Pages Functions requests is exhausted, choose via **Workers & Pages** > project > **Settings** > **Runtime** > **Fail open / closed**. "Fail open" keeps serving static assets; "Fail closed" returns an error page instead. The daily limit can be removed by upgrading to Workers Standard. Use fail closed if authentication or other critical logic lives in Functions.

## Related

- [routing.md](./routing.md)
- [pricing.md](./pricing.md)
