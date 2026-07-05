# next.config.js

`next.config.js` (or `.mjs`/`.ts`) is a Node.js module in the project root that configures a Next.js application via a default export.

## Signature / Usage

```js filename="next.config.js"
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig
```

TypeScript config (typed, no JSDoc needed):

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
```

ESM (`next.config.mjs`):

```js filename="next.config.mjs"
// @ts-check
const nextConfig = {
  /* config options here */
}

export default nextConfig
```

Configuration as a function (receives the current build `phase`), including async:

```js filename="next.config.mjs"
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = async (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return { /* development only config options here */ }
  }
  return { /* config options for all phases except development here */ }
}
```

## Notes

- `next.config` with `.cjs` or `.cts` extensions is **not supported**.
- `phase` values are importable from `next/constants` (e.g. `PHASE_DEVELOPMENT_SERVER`); async config functions supported since `v12.1.0`.
- None of the config options are required — search for the feature you need rather than trying to understand every option.
- Avoid JS features unsupported by your target Node.js version — `next.config.js` is **not** parsed by Webpack or Babel.
- Since Next.js 15.1, `next/experimental/testing/server`'s `unstable_getResponseFromNextConfig` lets you unit-test `headers`/`redirects`/`rewrites` from `next.config.js` in isolation (does not account for proxy or filesystem routes, so production results may differ).

## Category Index

This directory groups the 60+ `next.config.js` options by functional area, plus the standalone TypeScript/ESLint config pages and CLI tools:

| Group | File |
|------|------|
| Images | [images.md](./images.md) |
| Headers / redirects / rewrites | [headers-redirects-rewrites.md](./headers-redirects-rewrites.md) |
| Routing (basePath, trailingSlash, etc.) | [routing.md](./routing.md) |
| Build & output | [build-output.md](./build-output.md) |
| Caching | [caching.md](./caching.md) |
| Bundling / compiler / CSS | [bundling.md](./bundling.md) |
| React runtime & experimental | [react-experimental.md](./react-experimental.md) |
| Dev environment | [dev-environment.md](./dev-environment.md) |
| Deployment & infrastructure | [deployment.md](./deployment.md) |
| Env vars & build checks | [env-and-checks.md](./env-and-checks.md) |
| TypeScript (project-wide) | [typescript.md](./typescript.md) |
| ESLint | [eslint.md](./eslint.md) |
| CLI: create-next-app | [create-next-app.md](./create-next-app.md) |
| CLI: next | [next-cli.md](./next-cli.md) |

## Related

- [README.md](./README.md)
