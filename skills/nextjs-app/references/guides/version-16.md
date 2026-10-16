# Upgrading to Version 16

Upgrade a Next.js application from version 15 to 16.

## Signature / Usage

```bash filename="Terminal"
npx @next/codemod@canary upgrade latest
```

Recommended: have a coding agent do the upgrade. Run the latest upgrade CLI from the app's directory; it prepares the Next.js 16 migration guides and codemod command for the agent, then asks it to apply the changes and verify the app (see the Upgrade with a coding agent guide, `agent-upgrade.md`):

```bash filename="Terminal"
npx next@canary upgrade --agent=latest
```

## Requirements

| Requirement | Detail |
| --- | --- |
| Node.js | `20.9.0`+ (LTS); Node.js 18 no longer supported |
| TypeScript | `5.1.0`+ |
| Browsers | Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+ |

## Breaking / notable changes

- **Turbopack by default** for `next dev` and `next build` (`--turbopack`/`--turbo` no longer needed). A project with a custom `webpack` config fails `next build` unless you pass `--turbopack` (ignore webpack config), migrate to Turbopack options, or pass `--webpack` to opt out. `experimental.turbopack` config moves to a top-level `turbopack` key.
- **Async Request APIs**: synchronous access to `cookies`, `headers`, `draftMode`, `params`, `searchParams` is fully removed (Next.js 15 allowed a temporary sync fallback). Use `npx next typegen` for `PageProps`/`LayoutProps`/`RouteContext` type helpers.
- **`opengraph-image`/`twitter-image`/`icon`/`apple-icon`**: the image-generating function's `params`/`id` are now Promises (`generateImageMetadata` params stay sync).
- **`sitemap`**: the `id` param from `generateSitemaps` is now a Promise.
- **`revalidateTag`**: requires a second `cacheLife` profile argument (e.g. `revalidateTag('posts', 'max')`); use the new `updateTag` for immediate read-your-writes semantics, and `refresh()` to refresh the client router from a Server Action.
- **`cacheLife`/`cacheTag`**: stable, `unstable_` prefix removed.
- **Partial Prerendering**: experimental PPR flag/`experimental_ppr` removed; opt in via the `cacheComponents` config instead.
- **`middleware` → `proxy`**: `middleware.*` file/export renamed to `proxy.*`; the `edge` runtime is not supported in `proxy` (stays `nodejs`); related config flags renamed (e.g. `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`).
- **`next/image`**: local images with query strings need `images.localPatterns[].search`; `minimumCacheTTL` default 60s → 4h; `imageSizes` no longer includes `16` by default; `qualities` default is now `[75]` only (a `quality` prop not in `images.qualities` is coerced to the closest value, e.g. 80 → 75; review custom qualities and add required values, and note that a direct `/_next/image` request with an unsupported `q` returns `400`); `dangerouslyAllowLocalIP` required for local IP optimization; `maximumRedirects` default now 3. `next/legacy/image` and `images.domains` are deprecated (use `next/image` / `images.remotePatterns`).
- **Removed**: AMP support entirely; the `next lint` command (`next-lint-to-eslint-cli` codemod, use ESLint/Biome directly); `serverRuntimeConfig`/`publicRuntimeConfig` (use env vars, `NEXT_PUBLIC_` prefix, and `connection()` for runtime reads); `devIndicators.appIsrStatus`/`buildActivity`/`buildActivityPosition`; `experimental.dynamicIO`/`experimental.useCache` (use `cacheComponents`); `unstable_rootParams`.
- Parallel route slots now require an explicit `default.js` (calling `notFound()` or returning `null`) or the build fails.
- `next dev` and `next build` use separate output directories (`next dev` → `.next/dev`), enabling concurrent execution; a lockfile prevents multiple concurrent instances on the same project.
- `@next/eslint-plugin-next` defaults to ESLint Flat Config.
- `scroll-behavior: smooth` on `<html>` is no longer overridden during navigation by default; add `data-scroll-behavior="smooth"` to restore the previous instant-scroll-then-restore behavior.
- `next build` output no longer reports `size`/`First Load JS` metrics; use Lighthouse or Vercel Analytics instead.
- Build Adapters API (alpha): `adapterPath` (promoted to stable top-level option in 16.2.0) lets platforms hook into the build process.

## Notes

- Set up AI agent docs (AGENTS.md): before upgrading, point `AGENTS.md` at version-matched docs (`npx @next/codemod@canary agents-md`); after upgrading, check `AGENTS.md` points at the docs bundled in `node_modules/next/dist/docs/`. On 16.2 and later, `next dev` keeps the managed block up to date when it detects a coding agent. Remove `.next-docs/` once nothing references it.
- Turbopack file system caching is enabled by default for both `next dev` and `next build`, through `experimental.turbopackFileSystemCacheForDev` and `experimental.turbopackFileSystemCacheForBuild`.
- Troubleshooting: if installation fails after upgrading to React 19, follow the React recovery checklist in the Version 15 guide. `next lint` is removed, but migrating to the ESLint CLI does not require upgrading ESLint: `eslint-config-next@16` requires ESLint 9 or later, and `eslint-config-next@16.4.0` or later supports ESLint 10. If an ESLint upgrade causes peer dependency conflicts, restore the previous compatible `eslint`, `eslint-config-next`, `@next/eslint-plugin-next` versions and lint configuration; if installation interrupted the upgrade, retry the same target with `--skip-eslint-upgrade`, replace `next lint` scripts with ESLint CLI commands, and confirm install and lint pass.
- Migration checklist: Node.js / TypeScript / React requirements met; dev and build scripts agree with the effective bundler configuration (plugins, loaders, aliases, Sass imports); middleware-to-proxy changes preserve the required runtime (edge middleware is not blindly renamed); affected image requests succeed under the new defaults; cache API calls follow the documented signatures (do not enable React Compiler or Cache Components merely to finish the upgrade); removed APIs/config have no remaining consumers; scripts and CI no longer invoke `next lint`; supported checks and runtime behavior pass. App Router additionally: Async Request API callers migrated (resolve codemod error comments and `UnsafeUnwrapped` casts), dynamic metadata image and sitemap functions handle async params, parallel route slots have defaults.
- The **Next.js DevTools MCP** (`next-devtools-mcp`) can automate the upgrade and Cache Components migration via natural-language prompts in MCP-compatible coding agents.
- `sass-loader` bumped to v16 (modern Sass API); Turbopack's Sass doesn't support the legacy `~` import prefix — use `turbopack.resolveAlias` if you can't update imports.

## Related

- [Codemods](./codemods.md)
- [Version 15 Upgrade](./version-15.md)
- [Migrating to Cache Components](https://nextjs.org/docs/app/guides/migrating-to-cache-components)
