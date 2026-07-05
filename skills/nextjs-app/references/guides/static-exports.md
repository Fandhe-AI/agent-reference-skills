# Static Exports

Next.js can start as a static site or SPA (`output: 'export'`) and later optionally upgrade to features that require a server.

## Signature / Usage

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  // distDir: 'dist',
}
module.exports = nextConfig
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `output` | `'export'` | Enables static export; `next build` emits HTML/CSS/JS into `out/` |
| `trailingSlash` | `boolean` | Emits `/me/index.html` for `/me` route instead of `/me.html` |
| `skipTrailingSlashRedirect` | `boolean` | Preserves `href` instead of auto-redirecting `/me` → `/me/` |
| `distDir` | `string` | Changes output directory name (default `out`) |
| `images.loader` / `images.loaderFile` | `'custom'` / `string` | Custom image loader required for `next/image` with static export |

## Notes

- Server Components run at build time (`next build`) like traditional SSG; Client Components can fetch data client-side (e.g. with SWR) for SPA-style behavior.
- Route Handlers only support `GET` and render to a static file at build time; they cannot read dynamic values from the incoming request.
- Unsupported features: Dynamic Routes with `dynamicParams: true` or without `generateStaticParams()`, Request-based Route Handlers, `cookies()`, rewrites/redirects/headers, Proxy, ISR, default `next/image` loader, Draft Mode, Server Actions, Intercepting Routes.
- Attempting unsupported features errors similarly to `export const dynamic = 'error'`.
- Deployable to any static file server (e.g. Nginx) using `try_files` rewrites for clean URLs.

## Related

- [ISR](./incremental-static-regeneration.md)
- [SPAs](./single-page-applications.md)
