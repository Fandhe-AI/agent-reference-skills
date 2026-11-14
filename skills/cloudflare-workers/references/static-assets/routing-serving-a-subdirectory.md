---
source: https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/
---

# Serving a subdirectory

Set `assets.base_path` to serve static assets from a URL subpath while files remain at the root of `assets.directory`.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "assets-on-a-path-example",
	"main": "src/index.js",
	"upload_source_maps": true,
	"route": "example.com/blog/*",
	"assets": {
		"directory": "dist",
		"base_path": "/blog"
	}
}
```

With `dist/index.html` and `dist/posts/post1.html`, `example.com/blog/` serves `dist/index.html` and `example.com/blog/posts/post1` serves `dist/posts/post1.html`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `assets.base_path` | string | URL subpath under which assets are mounted (for example `/blog`). |

## Notes

- Requires Wrangler 4.148.0 or later. With `cloudflare.config.ts` (https://developers.cloudflare.com/cf/projects/cloudflare-config/) use `worker.assets.basePath` and `cf` 1.0.0-beta.13 or later; the build configuration supplies the asset directory.
- Requests outside `/blog` do not resolve static assets.
- Requests through the assets binding also use the mounted public path: forwarding the original request works unchanged; when constructing a request include `/blog`, for example `env.ASSETS.fetch("https://assets.local/blog/posts/post1")`.
- Paths in `_headers`, `_redirects`, and `assets.run_worker_first` use the public URL path (include `/blog`).

- Your Worker's routes must include the base path. For example, if your Worker only runs on `example.com/api/*`, requests to `example.com/blog/` do not reach your Worker or its static assets.
- If you build with the Cloudflare Vite plugin, also set Vite's `base` option to `/blog/` (see Serve assets from a URL path prefix in the cloudflare-wrangler skill; https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/#serve-assets-from-a-url-path-prefix).
- Source: https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Configuration and Bindings](./binding.md)
- [Headers](./headers.md)
- [Redirects](./redirects.md)
