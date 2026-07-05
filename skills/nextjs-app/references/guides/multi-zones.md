# Multi-zones

Build micro-frontends using Next.js Multi-Zones to deploy multiple Next.js apps under a single domain, each serving a set of paths.

## Signature / Usage

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/blog-static',
}
```

```js filename="next.config.js"
// Routing requests from the default zone to another zone
async rewrites() {
  return [
    { source: '/blog', destination: `${process.env.BLOG_DOMAIN}/blog` },
    { source: '/blog/:path+', destination: `${process.env.BLOG_DOMAIN}/blog/:path+` },
    { source: '/blog-static/:path+', destination: `${process.env.BLOG_DOMAIN}/blog-static/:path+` },
  ]
}
```

## Key topics

- A zone is a normal Next.js app; set `assetPrefix` so its JS/CSS (served under `/assetPrefix/_next/...`) doesn't conflict with other zones. The default (catch-all) zone doesn't need one.
- Route requests to the correct zone with `rewrites` (recommended, lowest latency) or with `proxy.js` (`NextResponse.rewrite`) for dynamic routing decisions such as feature-flag-based migrations.
- Use `<a>` tags (not `<Link>`) for links across zones — `<Link>` prefetch/soft-navigation doesn't work cross-zone.
- Navigating within the same zone is a soft navigation; navigating across zones is a hard navigation (full reload).
- Zones can live in one repo (monorepo, easier code sharing) or separate repos (share code via npm packages); use feature flags to coordinate releases across zones.
- Using Server Actions with Multi-Zones requires explicitly allowing the user-facing origin via `experimental.serverActions.allowedOrigins` in `next.config.js`.

## Notes

- URL paths must be unique to a single zone; two zones serving the same path creates a routing conflict.
- In Next.js versions older than 15, an additional rewrite was needed to route static assets; no longer necessary since 15.

## Related

- [Multi-tenant](./multi-tenant.md)
