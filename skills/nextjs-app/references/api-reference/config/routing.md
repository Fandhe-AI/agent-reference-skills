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
