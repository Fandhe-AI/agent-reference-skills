# Build & Output Options

`next.config.js` options controlling build artifacts, output format, and response headers related to the build/serving pipeline.

## output

Controls the build output mode; enables minimal, portable deployment artifacts.

```js filename="next.config.js"
module.exports = {
  output: 'standalone',
}
```

- `'standalone'`: copies only the files needed for production (including select `node_modules`) into `.next/standalone`, plus a minimal `server.js` you can run with `node .next/standalone/server.js` instead of `next start`. Does not copy `public` or `.next/static` by default — copy manually or serve via CDN.
- Output File Tracing (via `@vercel/nft`) statically analyzes `import`/`require`/`fs` usage per page to determine deployment-needed files; traces are written to `.next/*.nft.json`.
- `outputFileTracingRoot`: sets the tracing root for monorepos (files outside it are excluded by default).
- `outputFileTracingExcludes` / `outputFileTracingIncludes`: per-route-glob maps of glob patterns to exclude/include in the trace; only affect server traces (not Edge Runtime routes or fully static pages).
- Use `PORT` / `HOSTNAME` env vars to configure the standalone server's listen address.
- Turbopack `.nft.json` extensions: `fileHashes` (parallel array to `files`, a content identifier per file), `symlinks` (maps indexes in `files` to their immediate targets), and, for traces using `experimental.turbopackAdditionalRoots`, `additionalRoots` (ordered named source roots, each with its own `files` / `fileHashes` / `symlinks`; `path` is relative to the `.nft.json` file's directory).

## distDir

Custom build output directory name (default `.next`).

```js filename="next.config.js"
module.exports = {
  distDir: 'build',
}
```

- Next.js takes ownership of `distDir` and may delete its contents; point it at a directory used only by Next.js.
- Resolved relative to the directory holding `next.config.js`, and may point to a dedicated directory inside the workspace that contains it (in a monorepo, an app at `apps/web` can build into `../.next`).
- Next.js fails with an `Invalid distDir` error when `distDir` resolves outside the application and workspace, or is the application directory itself or one of its ancestors (this replaces the older "must stay inside the project directory" rule).

## generateBuildId

Customizes the build ID used to identify a deployed version (useful for reusing one build ID across multiple containers).

```js filename="next.config.js"
module.exports = {
  generateBuildId: async () => process.env.GIT_HASH,
}
```

- When `deploymentId` is set, Next.js uses a constant build ID unless you explicitly configure `generateBuildId`; version skew is detected from the deployment ID instead.

## outputHashSalt

Incorporates a configurable salt string into every content-addressed output filename (chunks, assets); changing it changes all output hashes, invalidating cached assets across deployments without source changes. Works with webpack and Turbopack. Added `16.3.0`.

```js filename="next.config.js"
module.exports = {
  outputHashSalt: 'my-deployment-salt',
}
```

- The `NEXT_HASH_SALT` environment variable does the same; when both are set they are concatenated (`outputHashSalt + NEXT_HASH_SALT`), e.g. `NEXT_HASH_SALT=my-deployment-salt next build`.

## enablePrerenderSourceMaps

Lets Node.js use existing source maps during the prerender phase of `next build`, so error stack traces point to original source. Type `boolean`, default `true`. It does not generate source maps (webpack does not generate server source maps by default; use `next build --debug-prerender` when investigating prerender errors).

```js filename="next.config.js"
module.exports = {
  enablePrerenderSourceMaps: false,
}
```

- Disabling reduces build memory usage but makes prerender errors harder to debug.
- Version history: `v16.3.0` default changed to `true` regardless of `cacheComponents`; `v16.0.0` moved from `experimental.enablePrerenderSourceMaps` to top-level.

## generateEtags

Toggles ETag generation for pages (enabled by default).

```js filename="next.config.js"
module.exports = {
  generateEtags: false,
}
```

## poweredByHeader

Toggles the `x-powered-by` response header (enabled by default).

```js filename="next.config.js"
module.exports = {
  poweredByHeader: false,
}
```

## productionBrowserSourceMaps

Enables browser source map generation in production builds (disabled by default to avoid leaking source).

```js filename="next.config.js"
module.exports = {
  productionBrowserSourceMaps: true,
}
```

- Source maps are emitted alongside the JS files and served automatically.
- Increases `next build` time and memory usage.

## compress

Toggles Next.js's built-in gzip compression for `next start` / custom servers (enabled by default).

```js filename="next.config.js"
module.exports = {
  compress: false,
}
```

Disable only if compression is already handled externally (e.g. nginx doing brotli).

## assetPrefix

Sets a CDN origin prefix for `_next/static` JS/CSS asset URLs.

```js filename="next.config.mjs"
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

export default (phase) => ({
  assetPrefix: phase === PHASE_DEVELOPMENT_SERVER ? undefined : 'https://cdn.mydomain.com',
})
```

- Only the contents of `.next/static/` need to be uploaded to the CDN (as `_next/static/`) — never the rest of `.next/`.
- Does not affect files in the `public` folder; prefix those yourself if needed.
- For sub-path hosting, prefer [`basePath`](./routing.md#basepath) instead.

## crossOrigin

Adds a `crossOrigin` attribute to `<script>` tags generated by `next/script`.

```js filename="next.config.js"
module.exports = {
  crossOrigin: 'anonymous', // or 'use-credentials'
}
```

## exportPathMap

**Legacy, deprecated, Pages Router only.** Historically mapped request paths to page destinations for `next export`. Superseded by `getStaticPaths` (`pages`) / `generateStaticParams` (`app`). Not relevant to App Router projects; kept only for backward compatibility with the Pages Router.

## Related

- [caching.md](./caching.md)
- [routing.md](./routing.md)
