---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/microfrontends/
---

# Microfrontends

Split an app into independently deployable frontends behind a router Worker that forwards requests through service bindings.

## Signature / Usage

The router matches the request path against the `ROUTES` environment variable (longest path wins), forwards to the bound microfrontend, strips the mount prefix, and rewrites HTML, CSS, `Location`, and `Set-Cookie` so assets load from the mount path.

```json
{
	"routes": [
		{ "path": "/app-a", "binding": "MICROFRONTEND_A", "preload": true },
		{ "path": "/app-b", "binding": "MICROFRONTEND_B", "preload": true },
		{ "path": "/", "binding": "MICROFRONTEND_HOME" }
	],
	"smoothTransitions": true
}
```

Add a microfrontend: deploy it as its own Worker, bind it in the router's Wrangler config, add the route to `ROUTES`, redeploy the router.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "services": [
    {
      "binding": "MICROFRONTEND_C",
      "service": "my-new-microfrontend"
    }
  ]
}
```

```sh
npx wrangler deploy
```

Run one microfrontend remotely during local dev:

```jsonc
{
"services": [
	{
	"binding": "<BINDING_NAME>",
	"service": "<WORKER_NAME>",
	"remote": true
	}
]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `path` | string | Mount path (distinct per route). Supports `/dashboard`, `/users/:id`, `/docs/:path*` (zero or more segments), `/api/:path+` (one or more) |
| `binding` | string | Service binding name in the router's Wrangler config |
| `preload` | boolean (optional) | Prefetch the microfrontend for faster navigation |
| `smoothTransitions` | boolean | Enable View Transitions API animations between microfrontends |
| `ASSET_PREFIXES` | env var, JSON array | Asset path prefixes to rewrite; default `/assets/`, `/static/`, `/build/`, `/_astro/`, `/fonts/` (for example `["/_next/", "/public/"]` for Next.js) |

## Notes

- Template: deploy button / `cloudflare/templates` `microfrontend-template`.
- Preloading on Chromium browsers uses the Speculation Rules API (`<script type="speculationrules">` injected in `<head>`).
- Each microfrontend deploys independently; the router reaches the latest version through the service binding.
- Each microfrontend can be a framework app, or a static site with Workers Static Assets.

## Related

- [overview.md](./overview.md)
