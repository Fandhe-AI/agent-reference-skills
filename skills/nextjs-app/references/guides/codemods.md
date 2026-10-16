# Codemods

Programmatic transformations to help upgrade a Next.js codebase when an API is updated or deprecated.

## Signature / Usage

```bash filename="Terminal"
npx @next/codemod <transform> <path>       # run a single named transform
npx @next/codemod upgrade [revision]       # upgrade Next.js/React and run relevant codemods
```

`transform`: name of the transform. `path`: files/directory to transform. Flags: `--dry` (no edits), `--print` (show diff).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `revision` (for `upgrade`) | `patch` \| `minor` \| `major` \| dist-tag (`latest`, `canary`, `rc`) \| exact version | Upgrade target; defaults to `minor` for stable versions |
| `--verbose` (for `upgrade`) | flag | Show detailed output during the upgrade |
| `--skip-react-upgrade` (for `upgrade`) | flag | Preserve React dependencies, types and overrides, and skip React codemods |
| `--skip-eslint-upgrade` (for `upgrade`) | flag | Preserve `eslint`, `eslint-config-next`, `@next/eslint-plugin-next`, and skip `next-lint-to-eslint-cli`; complete required lint migrations manually before verification |
| `-y, --yes` (for `upgrade`) | flag | Skip every interactive prompt and accept defaults; auto-enabled when stdin is not a TTY (CI, an AI coding agent, any non-interactive shell) |

## Codemod reference by version

| Version | Codemod | Purpose |
| --- | --- | --- |
| 16.3 | `cache-components-instant-false` | Adds `export const instant = false` to every `{page,layout,default}` file that does not already export `instant` (skips Client Components); `npx @next/codemod@canary cache-components-instant-false ./app` (pass `./src/app` for `src/` projects) |
| 16.3 | `remove-partial-prefetch` | Removes `export const prefetch = 'partial'` from `{page,layout}` files (only the `'partial'` value; other values like `'force-disabled'` stay); `npx @next/codemod@canary remove-partial-prefetch ./app` |
| 16.0 | `remove-experimental-ppr` | Removes `experimental_ppr` route segment config |
| 16.0 | `remove-unstable-prefix` | Removes `unstable_` prefix from stabilized APIs (e.g. `cacheTag`) |
| 16.0 | `middleware-to-proxy` | Renames `middleware.*`/`middleware` export/related config to `proxy.*`/`proxy` |
| 16.0 | `next-lint-to-eslint-cli` | Migrates `next lint` to ESLint CLI + `eslint.config.mjs` |
| 15.0 | `app-dir-runtime-config-experimental-edge` | `runtime = 'experimental-edge'` → `'edge'` (App Router) |
| 15.0 | `next-async-request-api` | Wraps `cookies()`/`headers()`/`draftMode()`/`params`/`searchParams` for async access |
| 15.0 | `next-request-geo-ip` | Replaces `NextRequest.geo`/`.ip` with `@vercel/functions` |
| 14.0 | `next-og-import` | `next/server` `ImageResponse` import → `next/og` |
| 14.0 | `metadata-to-viewport-export` | Splits viewport fields out of `metadata` into a `viewport` export |
| 13.2 | `built-in-next-font` | `@next/font` imports → built-in `next/font` |
| 13.0 | `next-image-to-legacy-image` | `next/image` → `next/legacy/image` (safe rename for v10-12 code) |
| 13.0 | `next-image-experimental` | Migrates `next/legacy/image` to new `next/image` (adds inline styles, drops unused props) |
| 13.0 | `new-link` | Removes nested `<a>` tags inside `<Link>` |
| 11 | `cra-to-next` | Migrates a CRA project to the Pages Router |
| 10 | `add-missing-react-import` | Adds missing `React` imports for the new JSX transform |
| 9+ | `name-default-component` | Names anonymous components for Fast Refresh compatibility |
| 8 | `withamp-to-config` | `withAmp` HOC → page `config.amp` (AMP removed entirely in Next.js 16) |
| 6 | `url-to-withrouter` | Deprecated injected `url` prop → `withRouter` |

## Notes

- `upgrade` exits without changes if the target version is the same as or lower than the current one.
- During an `upgrade` run you may be prompted to pick which codemods to apply, and React 19 codemods run automatically when upgrading React.
- When `next-async-request-api` can't auto-migrate a callsite, it adds an `@next-codemod-error` comment and may add a temporary `UnsafeUnwrapped*` typecast (e.g. `UnsafeUnwrappedCookies`); builds error until these are resolved manually. If the suggested change does not apply, replace the directive with `@next-codemod-ignore` and explain why.
- Agent-driven upgrades: to have a coding agent run the codemods, finish the migration work and verify the app, run `npx next@canary upgrade --agent=latest` instead (see the Upgrade with a coding agent guide, `agent-upgrade.md`). When invoked by an AI agent or in CI, `upgrade` runs non-interactively and accepts every default.
- The `cache-components-instant-false` and `remove-partial-prefetch` codemods report `0 ok` instead of failing on a wrong path, so check the file count.

## Related

- [Version 16 Upgrade](./version-16.md)
- [Version 15 Upgrade](./version-15.md)
- [App Router Migration](./app-router-migration.md)
