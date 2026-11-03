---
source: https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
---

# HTML handling

`assets.html_handling` controls redirects and rewrites for HTML requests, defining canonical URLs with or without trailing slashes.

## Signature / Usage

```jsonc
{
	"name": "my-worker",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"assets": {
		"directory": "./dist/",
		"html_handling": "auto-trailing-slash"
	}
}
```

Example directory: `dist/file.html` and `dist/folder/index.html`.

## Options / Props

| Value | Behavior |
|-------|----------|
| `auto-trailing-slash` (default) | Individual files (`foo.html`) served without a trailing slash; folder index files (`foo/index.html`) served with one. |
| `force-trailing-slash` | Trailing slashes forced. |
| `drop-trailing-slash` | Trailing slashes dropped. |
| `none` | Built-in HTML handling disabled. |

Responses per incoming request:

| Incoming Request | auto-trailing-slash | force-trailing-slash | drop-trailing-slash | none |
|------------------|---------------------|----------------------|---------------------|------|
| /file | 200 `/dist/file.html` | 307 to /file/ | 200 `/dist/file.html` | per `not_found_handling` |
| /file.html | 307 to /file | 307 to /file/ | 307 to /file | 200 `/dist/file.html` |
| /file/ | 307 to /file | 200 `/dist/file.html` | 307 to /file | per `not_found_handling` |
| /file/index | 307 to /file | 307 to /file/ | 307 to /file | per `not_found_handling` |
| /file/index.html | 307 to /file | 307 to /file/ | 307 to /file | per `not_found_handling` |
| /folder | 307 to /folder/ | 307 to /folder/ | 200 `/dist/folder/index.html` | per `not_found_handling` |
| /folder.html | 307 to /folder | 307 to /folder/ | 307 to /folder | per `not_found_handling` |
| /folder/ | 200 `/dist/folder/index.html` | 200 `/dist/folder/index.html` | 307 to /folder | per `not_found_handling` |
| /folder/index | 307 to /folder | 307 to /folder/ | 307 to /folder | per `not_found_handling` |
| /folder/index.html | 307 to /folder | 307 to /folder/ | 307 to /folder | 200 `/dist/folder/index.html` |

## Notes

- Trailing-slash consistency matters for SEO because search engines may treat URLs with and without a trailing slash as separate pages.
- `html_handling` also applies to requests made through the assets binding (`env.ASSETS.fetch()`).

## Related

- [Static Site Generation and custom 404 pages](./routing-static-site-generation.md)
- [Single Page Application](./routing-single-page-application.md)
- [Configuration and Bindings](./binding.md)
