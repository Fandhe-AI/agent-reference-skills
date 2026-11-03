---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#assets
---

# Assets

Configure static assets served by a Worker: the directory, an optional runtime binding, and routing options. Only one collection of assets can be configured per Worker.

## Signature / Usage

```jsonc
{
	"assets": {
		"directory": "./public",
		"binding": "ASSETS",
		"base_path": "/docs",
		"html_handling": "force-trailing-slash",
		"not_found_handling": "404-page",
	},
}
```

```toml
[assets]
directory = "./public"
binding = "ASSETS"
base_path = "/docs"
html_handling = "force-trailing-slash"
not_found_handling = "404-page"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `directory` | `string` optional | Folder of static assets to be served. Not required with the Cloudflare Vite plugin, which points to the client build output automatically. |
| `binding` | `string` optional | Binding name used to refer to the assets. Only useful when a Worker script is set with `main`. |
| `base_path` | `string` optional, default `"/"` | URL path prefix where static assets are available. E.g. `/docs` serves the root of `assets.directory` from `/docs/`. |
| `run_worker_first` | `boolean \| string[]` optional, default `false` | Whether static assets are fetched directly or a Worker script is invoked. Boolean, or an array of route pattern strings supporting globs (`*`) and exception patterns (`!` prefix). Patterns must begin with `/` or `!/`. At most 100 entries (duplicates count toward the limit). |
| `html_handling` | `"auto-trailing-slash" \| "force-trailing-slash" \| "drop-trailing-slash" \| "none"` optional, default `"auto-trailing-slash"` | Redirects and rewrites for HTML content requests. |
| `not_found_handling` | `"single-page-application" \| "404-page" \| "none"` optional, default `"none"` | Handling of requests that do not map to an asset. |

`run_worker_first` with an array of route patterns:

```jsonc
{
	"assets": {
		"directory": "./public",
		"binding": "ASSETS",
		"run_worker_first": [
			"/api/*", // API calls go to Worker first
			"!/api/docs/*", // EXCEPTION: For /api/docs/*, try static assets first
		],
	},
}
```

## Notes

- `main` is optional for assets-only Workers.
- Asset routing behavior (html handling, SPA fallback, worker-first) is documented by the cloudflare-workers skill.

## Related

- [top-level-keys.md](./top-level-keys.md)
- [workers-sites.md](./workers-sites.md)
