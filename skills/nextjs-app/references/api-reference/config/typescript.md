# TypeScript

Next.js provides a TypeScript-first development experience: auto-installed dependencies, a custom IDE plugin/type-checker, and route-aware generated types.

## Signature / Usage

Renaming a file to `.ts`/`.tsx` and running `next dev` / `next build` auto-installs TypeScript deps and scaffolds `tsconfig.json` with recommended options.

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
}

export default nextConfig
```

## Notes

- **IDE plugin**: Next.js ships a custom TS plugin/type-checker (enable via VS Code "TypeScript: Select TypeScript Version" → "Use Workspace Version"). Warns on invalid [route segment config](/docs/app/api-reference/file-conventions/route-segment-config) values, ensures `'use client'` correctness and that client hooks aren't used in Server Components.
- **End-to-end type safety**: Server Components can `fetch` directly without serializing return values (e.g. `Date`, `Map`, `Set` pass through untouched) — no more manually typing the server/client boundary as in the Pages Router.
- **Route-Aware type helpers** (`PageProps`, `LayoutProps`, `RouteContext`): globally available without imports; generated during `next dev`/`next build`/`next typegen`.
- **`next-env.d.ts`**: auto-generated/managed file; add to `.gitignore`, never edit manually, must stay in `tsconfig.json`'s `include`.
- **`next.config.ts`**: fully typed config file; module resolution is CommonJS by default, though Node's native TS resolver (v22.10.0+, default from v22.18.0+) enables ESM syntax including top-level `await` (prefer `next.config.mts` for CommonJS projects using ESM syntax).
- **Statically typed links** (`typedRoutes: true`, requires TypeScript): types `next/link`'s `href` and, in App Router, `next/navigation`'s `push`/`replace`/`prefetch`. Literal `href` strings are validated automatically; non-literal strings need `as Route` casts. Generated into `.next/types` (must be in `tsconfig.json` `include` if not using `create-next-app`).
- **Environment variable IntelliSense** (`experimental.typedEnv: true`): generates `.d.ts` for loaded env vars in `.next/types` (dev-runtime vars only by default, excludes `.env.production*` unless run with `NODE_ENV=production`).
- **Async Server Components**: require TypeScript `5.1.3+` and `@types/react` `18.2.8+` to avoid `'Promise<Element>' is not a valid JSX element` errors.
- **Incremental type checking**: supported since `v10.2.1` via TypeScript's `incremental` `tsconfig` option.
- Build-error strictness (`ignoreBuildErrors`) and a custom `tsconfigPath` are configured via the [`typescript` next.config.js option](./env-and-checks.md#typescript-nextconfigjs-option).

## Related

- [env-and-checks.md](./env-and-checks.md) (`typescript` config option)
- [routing.md](./routing.md) (`typedRoutes`)
- [eslint.md](./eslint.md)
