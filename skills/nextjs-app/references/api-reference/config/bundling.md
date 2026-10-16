# Bundling, Compiler & CSS Options

`next.config.js` options for webpack/Turbopack customization, CSS processing, MDX compilation, package import optimization, and monorepo dependency handling.

## webpack

Customizes the webpack config (only used when not on Turbopack). Changes here are **not covered by semver**.

```js filename="next.config.js"
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Important: return the modified config
    return config
  },
}
```

| Parameter | Type | Description |
|------|------|-------------|
| `buildId` | `string` | Unique build identifier. |
| `dev` | `boolean` | `true` for development compilation. |
| `isServer` | `boolean` | `true` for server compilation, `false` for client. |
| `nextRuntime` | `'edge' \| 'nodejs' \| undefined` | Server runtime target; `undefined` on client. `isServer` is `true` for both `'edge'` and `'nodejs'`. |
| `defaultLoaders` | `object` | Next.js's internal default loaders (e.g. `defaultLoaders.babel`). |

- The function runs three times: twice for server (Node.js / Edge runtime), once for client.
- Check first whether built-in support (CSS/Sass imports and modules) or an official plugin (`@next/mdx`, `@next/bundle-analyzer`) already covers your use case.

## turbopack

Configures Turbopack's file transforms and module resolution (replaces `experimental.turbo`, removed in v16).

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
    rules: {
      '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' },
    },
    resolveAlias: { underscore: 'lodash' },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    debugIds: true,
  },
}
```

| Option | Description |
|------|-------------|
| `root` | Absolute path for the app root (auto-detected from lockfiles by default; set manually for non-workspace layouts or `npm/yarn/pnpm link`). |
| `rules` | Maps file glob → webpack loader(s) to run under Turbopack; supports advanced `condition` matching (`path`, `content`, `query`, `contentType`, built-ins `browser`/`foreign`/`development`/`production`/`node`/`edge-light`) and module `type` (`asset`, `ecmascript`, `typescript`, `css`, `css-module`, `json` (parse and export), `wasm`, `node` (native Node.js addon), `raw` (alias of `text`), `text` (contents as a string), `bytes` (contents as a `Uint8Array`)). |
| `resolveAlias` | Maps import specifiers to replacement modules (supports `browser` conditional aliasing). |
| `resolveExtensions` | Overrides resolved file extensions (must include defaults). |
| `debugIds` | Generates debug IDs in JS bundles/source maps. |

- Turbopack doesn't need `css-loader`/`postcss-loader`/`babel-loader` for built-ins.
- Supported webpack loaders (partial API via `loader-runner`): `babel-loader`, `@svgr/webpack`, `svg-inline-loader`, `yaml-loader`, `string-replace-loader`, `raw-loader`, `sass-loader`, `graphql-tag/loader`. Unsupported: `importModule`/`loadModule`, `emitFile`, most of `fs` (only `fs.readFile`), `version`/`mode`/`target`, `utils`/`resolve`.
- Per-import loader config via import attributes: `import x from './f.txt' with { turbopackLoader: 'raw-loader', turbopackAs: '*.js' }`.
- Migrate from `experimental.turbo`: `npx @next/codemod@latest next-experimental-turbo-to-turbopack .`
- `experimental.turbopackAdditionalRoots` (added `16.4.0`): lets Turbopack follow symbolic links whose targets are outside `turbopack.root` (e.g. `npm link`, pnpm global virtual store). Each key identifies one root, with `path` absolute or relative to where Next.js runs, e.g. `turbopackAdditionalRoots: { linkedPackages: { path: path.join(__dirname, '../packages') } }`. Roots can only be crossed at symlink boundaries (direct relative imports that escape a root are unsupported); the symlink and its target must exist on the build machine before `next dev` / `next build`; on Windows builds need Developer Mode or elevated permissions for symlinks.

## turbopackChunking

**Experimental.** Configures Turbopack's production client JavaScript chunker (`experimental.turbopackChunking`). Defaults:

```ts filename="next.config.ts"
const nextConfig = {
  experimental: {
    turbopackChunking: {
      minChunkSize: 50000,
      maxChunkCountPerGroup: 40,
      maxMergeChunkSize: 200000,
      minComponentChunkSize: 20000,
      generateComponentChunks: false,
    },
  },
} satisfies NextConfig
```

| Option | Default | Description |
|------|---------|-------------|
| `minChunkSize` | `50000` | Avoids creating more than one chunk smaller than this by merging small chunks (bytes of uncompressed, unminified code, roughly 5x the compressed minified size). |
| `maxChunkCountPerGroup` | `40` | Max chunks per chunk group (a route or dynamic import); lower = more merging and fewer requests, higher = smaller chunks and more cache hits on navigation. |
| `maxMergeChunkSize` | `200000` | A chunk larger than this is never merged with others. |
| `generateComponentChunks` (App Router) | `false` | Each merged production chunk also emits its constituent component chunks, so the runtime can fetch only the ones it lacks. |
| `minComponentChunkSize` (App Router) | `20000` | Component chunks smaller than this are folded into a single component. |
| `clusters` | — | Arrays of `RegExp` of routes commonly visited together; chunks shared within a cluster merge more eagerly. |
| `firstPageLoadPriority` | — | Number `0`-`1`: weight of merging for a single page load (bounce rate is a good approximation). |
| `priorityRoutes` | — | `RegExp[]` of routes often landed on first (e.g. homepage); merged more eagerly. |
| `priorityBoost` | `1.5` | Multiplier on the single-request probability of `priorityRoutes`. |
| `requestCost` | `200000` | Estimated cost of an additional request in bytes of uncompressed, unminified code; larger biases toward fewer, larger chunks. |

## turbopackGc

**Experimental** (added `v16.4.0`). Enables garbage collection of unreachable work in Turbopack's in-memory and persistent caches, for both `next dev` and `next build` on Turbopack.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: { turbopackGc: { minProgressMs: 200, rootTtlMs: 24 * 60 * 60 * 1000 } },
}
```

| Value | Description |
|------|-------------|
| `false` (default) | Disables garbage collection. |
| `true` | Enables it with default timings. |
| `{ minProgressMs?, rootTtlMs? }` | `minProgressMs` (default `100`): minimum time a GC pass runs before honoring an interruption. `rootTtlMs` (default `259200000`, 3 days): time a GC root may stay unanchored before removal. |

- Requires the Turbopack FileSystem Cache (no effect when it is disabled for the current command). In long-running read-write sessions, GC is disabled when `turbopackMemoryEviction` is `false`.

## turbopackLazyDynamicImports

**Experimental** (added `v16.4.0`). Defers compiling client-side dynamic `import()` targets until the browser first requests their chunk during `next dev`.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: { turbopackLazyDynamicImports: true },
}
```

- Default `false`; affects only Turbopack in `next dev`, not production builds. Errors in a deferred module appear when it is first compiled. Some `next/dynamic` targets are still compiled eagerly.

## turbopackLazyDynamicImportsSSR

**Experimental** (added `v16.4.0`). Defers compiling dynamic imports (for example React `lazy` in Client Components) until server rendering first reaches them during `next dev`.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: { turbopackLazyDynamicImportsSSR: true },
}
```

- Default `false`; affects only the Node.js runtime with Turbopack in `next dev`. To defer client-side dynamic imports until the browser requests them, use `turbopackLazyDynamicImports`.

## turbopackMemoryEviction

**Experimental** (released in `v16.3.0`). Controls whether Turbopack reclaims memory while the persistent (FileSystem) cache is enabled: after a snapshot is written to disk it can evict in-memory copies and reload them on demand.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: { turbopackMemoryEviction: 'auto' },
}
```

| Value | Description |
|------|-------------|
| `false` | Never evict; data stays in memory for the process lifetime. |
| `'auto'` (default) | Evict after a snapshot only once enough memory has been allocated since the last eviction, using thresholds and OS memory-pressure feedback. |
| `'full'` | Evict all possible data every time it saves to disk. |

- Only has an effect in `next dev` sessions with the FileSystem Cache enabled.

## turbopackPluginRuntimeStrategy

**Experimental** (added `v16.4.0`). Chooses whether Turbopack runs Node.js evaluation (webpack loaders, Babel, PostCSS) in child processes or worker threads.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: { turbopackPluginRuntimeStrategy: 'workerThreads' },
}
```

| Value | Default | Description |
|------|---------|-------------|
| `'childProcesses'` | Yes | Pool of child processes communicating over sockets. |
| `'workerThreads'` | No | Worker threads within the Next.js process; can reduce memory and CPU overhead. |
| `'forceWorkerThreads'` | No | Uses worker threads even on Node.js versions affected by a worker-thread teardown issue (can abort the process). |

- On Node.js 24.13.1 and newer, a worker-thread teardown issue can abort the process; `'workerThreads'` on an affected version prints a warning and falls back to `'childProcesses'`.

## turbopackRustReactCompiler

**Experimental** (introduced `v16.3.0`). Runs the native Rust port of the React Compiler inside Turbopack instead of the Babel transform.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: { turbopackRustReactCompiler: true },
}
```

- Requires `reactCompiler` to be enabled (it only selects the implementation); Turbopack only (webpack throws an error); no need to install `babel-plugin-react-compiler`.

## instrumentationClientInject

Introduced `v16.3.0`. A list of modules imported on the client for side effects before the project's `instrumentation-client.{js,ts}` runs, ahead of React hydration. Primarily for `next.config.js` plugins (e.g. `withSentry`); application code should use the `instrumentation-client` file convention directly.

```js filename="next.config.js"
module.exports = {
  instrumentationClientInject: ['my-analytics-package', './lib/sentry-client.js'],
}
```

- Each entry is a bare npm package name (resolved from `node_modules`) or a path relative to the project root.
- Run order: each entry in array order, then `instrumentation-client.{js,ts}`, then React hydration.
- An injected module may export `onRouterTransitionStart` (same signature as in `instrumentation-client`); Next.js composes one hook calling them in array order, with the user file's hook last.

## turbopackFileSystemCache

Persists Turbopack build data to `.next` between `next dev` / `next build` runs to speed up subsequent builds.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
  },
}
```

- Stable for development; experimental for production builds.
- Enabled by default for development since `v16.1.0`.

## turbopackIgnoreIssue

Suppresses specific Turbopack errors/warnings from CLI output and the error overlay (Turbopack only, `next dev --turbopack`).

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  turbopack: {
    ignoreIssue: [{ path: '**/vendor/**', title: 'Module not found' }],
  },
}
```

| Field | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string \| RegExp` | Yes | Glob or regex matched against the issue's file path. |
| `title` | `string \| RegExp` | No | Matched against the issue title. |
| `description` | `string \| RegExp` | No | Matched against the issue description. |

An issue is suppressed only if `path` **and** all other specified fields match. Introduced `v16.2.0`.

## turbopackLocalPostcssConfig

Changes Turbopack's `postcss.config.js` resolution order to prefer per-directory configs over the project root.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    turbopackLocalPostcssConfig: true,
  },
}
```

| Setting | Resolution order |
|------|-------------|
| `false` (default) | project root → CSS file's directory |
| `true` | CSS file's directory → project root |

Useful in monorepos with multiple apps/packages needing different PostCSS transforms. Introduced `v16.3.0`.

## useLightningcss

Enables [Lightning CSS](https://lightningcss.dev) (Rust-based) as the CSS transformer/minifier for **webpack** builds, instead of the PostCSS + `postcss-preset-env` default.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    useLightningcss: true,
  },
}
```

- No effect on Turbopack — Turbopack always uses Lightning CSS by default since `v14.2.0`.
- `lightningCssFeatures.include` / `.exclude` force-transpile or force-skip specific CSS features (e.g. `nesting`, `oklab-colors`, `light-dark`) regardless of browserslist targets; composite groups `selectors`, `media-queries`, `colors` available. Applies to both webpack (with `useLightningcss`) and Turbopack.

## cssChunking

**Experimental.** Controls how CSS files are split/re-ordered into chunks per route.

```ts filename="next.config.ts"
const nextConfig = {
  experimental: {
    cssChunking: true, // default
  },
}
```

| Value | Behavior |
|------|-------------|
| `true` (default) | Merges CSS files where possible based on import order; fewer chunks/requests. |
| `false` | No merging/re-ordering. |
| `'strict'` | Loads CSS files in exact import order (more chunks/requests); use if you hit unexpected CSS ordering bugs from implicit cross-file dependencies. |

## inlineCss

**Experimental.** Inlines CSS into `<style>` tags in `<head>` instead of generating `<link>` tags (production builds only, not dev).

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
}
```

- Best for atomic CSS (Tailwind) and optimizing first-load/FCP/LCP for first-time or slow-connection visitors.
- Trade-off: no cross-page/cross-visit caching of styles (every load re-downloads CSS); worse for large CSS bundles or many pages sharing styles/returning visitors.
- Applied globally (no per-page config); styles duplicate during initial load (SSR `<style>` + RSC payload); prerendered-page navigations use `<link>` instead to avoid duplication.

## sassOptions

Configures the Sass compiler.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: 'sass-embedded',
  },
}
```

- Only `implementation` is typed; other Sass compiler options are passed through untyped.
- The `functions` property (custom Sass functions) only works with webpack — unsupported on Turbopack (Rust-based, can't execute JS functions).

## mdxRs

**Experimental.** Compiles MDX files using the Rust compiler (for use with `@next/mdx`).

```js filename="next.config.js"
const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: { mdxRs: true },
})
```

## optimizePackageImports

**Experimental.** Loads only the modules actually used from packages with many named exports, while keeping convenient named-import syntax.

```js filename="next.config.js"
module.exports = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
}
```

Optimized by default: `lucide-react`, `date-fns`, `lodash-es`, `ramda`, `antd`, `react-bootstrap`, `ahooks`, `@ant-design/icons`, `@headlessui/react`, `@heroicons/react/*`, `@visx/visx`, `@tremor/react`, `rxjs`, `@mui/material`, `@mui/icons-material`, `recharts`, `react-use`, `@material-ui/*`, `@tabler/icons-react`, `react-icons/*`, `effect`, `@effect/*`, and more.

## serverExternalPackages

Opts specific dependencies **out** of Server Components bundling, using native Node.js `require` instead (for packages relying on Node.js-specific features).

```js filename="next.config.js"
module.exports = {
  serverExternalPackages: ['@acme/ui'],
}
```

- Next.js auto-excludes a curated list of known-incompatible packages (e.g. `@prisma/client`, `sharp`, `bcrypt`, `puppeteer`, `sqlite3`, `canvas`, `pino`, `jsdom`, etc. — see official page for the full list).
- Renamed from `serverComponentsExternalPackages` and stabilized in `v15.0.0`.
- Cannot list the same package in both `serverExternalPackages` and `transpilePackages` (build error).

## transpilePackages

Compiles/bundles specified dependencies instead of treating them as untouched runtime code (replaces `next-transpile-modules`).

```js filename="next.config.js"
module.exports = {
  transpilePackages: ['package-name', '@scope/pkg'],
}
```

- Values must be exact package names (no paths/globs).
- Needed when a `node_modules` package ships raw TypeScript/JSX, or (Pages Router + webpack) when bundling a monorepo workspace package's source into the route.
- Packages already in `optimizePackageImports` or Next's `default-transpiled-packages.json` are auto-included — no need to repeat them.
- Introduced `v13.0.0`.

## urlImports

**Experimental.** Allows importing modules directly from an allow-listed external URL instead of local disk.

```js filename="next.config.js"
module.exports = {
  experimental: {
    urlImports: ['https://example.com/assets/', 'https://cdn.skypack.dev'],
  },
}
```

- Creates a `next.lock` directory (lockfile + fetched assets) that **must be committed to Git**.
- `next dev` downloads/adds new URL imports to the lockfile; `next build` uses only the lockfile (fails if outdated), except resources with `Cache-Control: no-cache` which are always refetched.
- Only use trusted domains — imported code executes on your machine.

## Related

- [caching.md](./caching.md)
- [react-experimental.md](./react-experimental.md)
