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
| `rules` | Maps file glob → webpack loader(s) to run under Turbopack; supports advanced `condition` matching (`path`, `content`, `query`, `contentType`, built-ins `browser`/`foreign`/`development`/`production`/`node`/`edge-light`) and module `type` (`asset`, `ecmascript`, `typescript`, `css`, `css-module`, `wasm`, `raw`, `bytes`). |
| `resolveAlias` | Maps import specifiers to replacement modules (supports `browser` conditional aliasing). |
| `resolveExtensions` | Overrides resolved file extensions (must include defaults). |
| `debugIds` | Generates debug IDs in JS bundles/source maps. |

- Turbopack doesn't need `css-loader`/`postcss-loader`/`babel-loader` for built-ins.
- Supported webpack loaders (partial API via `loader-runner`): `babel-loader`, `@svgr/webpack`, `svg-inline-loader`, `yaml-loader`, `string-replace-loader`, `raw-loader`, `sass-loader`, `graphql-tag/loader`. Unsupported: `importModule`/`loadModule`, `emitFile`, most of `fs` (only `fs.readFile`), `version`/`mode`/`target`, `utils`/`resolve`.
- Per-import loader config via import attributes: `import x from './f.txt' with { turbopackLoader: 'raw-loader', turbopackAs: '*.js' }`.
- Migrate from `experimental.turbo`: `npx @next/codemod@latest next-experimental-turbo-to-turbopack .`

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
