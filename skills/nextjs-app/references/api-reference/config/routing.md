# Routing Options

`next.config.js` options that affect URL resolution and route typing.

## basePath

Deploys a Next.js app under a sub-path of a domain.

```js filename="next.config.js"
module.exports = {
  basePath: '/docs',
}
```

- Must be set at build time (inlined into client bundles); cannot change without rebuilding.
- `next/link` / `next/router` automatically prepend `basePath` (e.g. `/about` becomes `/docs/about`).
- `next/image` `src` must include `basePath` manually (e.g. `/docs/me.png`).

## trailingSlash

Configures whether URLs resolve with or without a trailing slash.

```js filename="next.config.js"
module.exports = {
  trailingSlash: true,
}
```

- Default: `/about/` redirects to `/about`. With `trailingSlash: true`, `/about` redirects to `/about/`.
- Exceptions (never get a trailing slash appended): static file URLs (with extensions) and paths under `.well-known/`.
- With `output: "export"`, `/about` outputs `/about/index.html` instead of `/about.html`.
- Added in `v9.5.0`.

## skipProxyUrlNormalize

Lets Proxy see the original request instead of Next.js's normalized version (internal URLs, query parameters and headers used during client-side navigation). Renamed from `skipMiddlewareUrlNormalize` in `v16.0.0` (added `v13.1.0`). Most projects do not need it; it is one of the advanced Proxy flags.

```js filename="next.config.js"
module.exports = {
  skipProxyUrlNormalize: true,
}
```

| Default | With `skipProxyUrlNormalize: true` |
|------|-------------|
| `request.nextUrl` resolves the internal data URL back to the route path and extracts the locale | Holds the requested pathname as sent |
| `request.url` is the normalized URL | The original request URL |
| The internal `_rsc` query parameter is stripped | Preserved |
| Internal navigation headers (`rsc`, `next-router-state-tree`, `next-router-prefetch`, `next-router-segment-prefetch`, `next-hmr-refresh`) are removed from `request.headers` | Preserved |
| `NextResponse.rewrite()` destinations are re-serialized with the build ID | Sent as written |
| `NextResponse.redirect()` `Location` is rewritten to a relative URL | Sent as written, trailing slash preserved |
| With `trailingSlash: true`, a trailing slash is appended before Proxy runs | Pathname passed through unchanged |

- The former name `skipMiddlewareUrlNormalize` still works and logs a deprecation warning; setting both throws. The version 16 codemod renames it.
- Only the request and response Proxy sees change; filesystem routing, `redirects` and `rewrites` from `next.config.js` behave the same. The Proxy `matcher` still matches the destination URL either way.

## skipTrailingSlashRedirect

Turns off the automatic redirects that add or remove a trailing slash (added `v13.1.0`); handle any redirecting you still want in Proxy. Most projects do not need it.

```js filename="next.config.js"
module.exports = {
  skipTrailingSlashRedirect: true,
}
```

- By default Next.js redirects (`308`) so the trailing slash matches `trailingSlash`. With the flag, both `/about` and `/about/` return `200` and client-side navigation (`<Link>`, router) keeps the path exactly as written. Your own `redirects` and `rewrites` still apply.
- A last path segment containing a dot is treated as a file (trailing slash removed regardless of `trailingSlash`); `.well-known/` is exempt from the default redirects when `trailingSlash` is `true`.
- Keep setting `trailingSlash` as before: it still controls generated URLs and `output: 'export'` filenames. Serving one page at both forms gives search engines two URLs, so set a canonical URL in metadata or redirect in Proxy.

## pageExtensions

Extends the default file extensions (`.tsx`, `.ts`, `.jsx`, `.js`) Next.js resolves as pages/routes, e.g. to allow markdown.

```js filename="next.config.js"
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)
```

## typedRoutes

Enables statically typed links (requires TypeScript). Stable — use `typedRoutes` instead of the old `experimental.typedRoutes`.

```js filename="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
}

module.exports = nextConfig
```

- See [TypeScript - Statically Typed Links](/docs/app/api-reference/config/typescript#statically-typed-links).

## appDir

**Legacy, no longer needed.** Historically enabled the App Router (`app` directory) for layouts, Server Components, streaming, and colocated data fetching.

- Not required since Next.js 13.4 (App Router is stable and always available).
- Using `app` automatically enables React Strict Mode.
- Kept only for backward compatibility.

## Related

- [images.md](./images.md)
- [build-output.md](./build-output.md)
