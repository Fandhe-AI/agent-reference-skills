---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#workers-sites
---

# Workers Sites (`site`, deprecated)

Workers Sites hosts static or framework-based websites on Workers. Use Workers Static Assets instead; Workers Sites is deprecated in Wrangler v4 and not supported by the Cloudflare Vite plugin. Do not use for new projects.

## Signature / Usage

```jsonc
{
	"site": {
		"bucket": "./public",
		"include": ["upload_dir"],
		"exclude": ["ignore_dir"],
	},
}
```

```toml
[site]
bucket = "./public"
include = [ "upload_dir" ]
exclude = [ "ignore_dir" ]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bucket` | `string` required | Directory containing your static assets, relative to your Wrangler configuration file. |
| `include` | `string[]` optional | Exclusive list of `.gitignore`-style patterns matching file or directory names in the bucket. Only matched items are uploaded. |
| `exclude` | `string[]` optional | `.gitignore`-style patterns for files or directories in the bucket to exclude from uploads. |

## Notes

- `site` is a top-level only key.
- Support will be removed in a future Wrangler version (see [deprecations.md](./deprecations.md)).

## Related

- [assets.md](./assets.md)
- [deprecations.md](./deprecations.md)
