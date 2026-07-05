# Upgrading to Version 16

Upgrade a Next.js application from version 15 to 16.

## Signature / Usage

```bash filename="Terminal"
npx @next/codemod@canary upgrade latest
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
- **`next/image`**: local images with query strings need `images.localPatterns[].search`; `minimumCacheTTL` default 60s → 4h; `imageSizes` no longer includes `16` by default; `qualities` default is now `[75]` only; `dangerouslyAllowLocalIP` required for local IP optimization; `maximumRedirects` default now 3. `next/legacy/image` and `images.domains` are deprecated (use `next/image` / `images.remotePatterns`).
- **Removed**: AMP support entirely; the `next lint` command (`next-lint-to-eslint-cli` codemod, use ESLint/Biome directly); `serverRuntimeConfig`/`publicRuntimeConfig` (use env vars, `NEXT_PUBLIC_` prefix, and `connection()` for runtime reads); `devIndicators.appIsrStatus`/`buildActivity`/`buildActivityPosition`; `experimental.dynamicIO`/`experimental.useCache` (use `cacheComponents`); `unstable_rootParams`.
- Parallel route slots now require an explicit `default.js` (calling `notFound()` or returning `null`) or the build fails.
- `next dev` and `next build` use separate output directories (`next dev` → `.next/dev`), enabling concurrent execution; a lockfile prevents multiple concurrent instances on the same project.
- `@next/eslint-plugin-next` defaults to ESLint Flat Config.
- `scroll-behavior: smooth` on `<html>` is no longer overridden during navigation by default; add `data-scroll-behavior="smooth"` to restore the previous instant-scroll-then-restore behavior.
- `next build` output no longer reports `size`/`First Load JS` metrics; use Lighthouse or Vercel Analytics instead.
- Build Adapters API (alpha): `adapterPath` (promoted to stable top-level option in 16.2.0) lets platforms hook into the build process.

## Notes

- The **Next.js DevTools MCP** (`next-devtools-mcp`) can automate the upgrade and Cache Components migration via natural-language prompts in MCP-compatible coding agents.
- `sass-loader` bumped to v16 (modern Sass API); Turbopack's Sass doesn't support the legacy `~` import prefix — use `turbopack.resolveAlias` if you can't update imports.

## Related

- [Codemods](./codemods.md)
- [Version 15 Upgrade](./version-15.md)
- [Migrating to Cache Components](https://nextjs.org/docs/app/guides/migrating-to-cache-components)
