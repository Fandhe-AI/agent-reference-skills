# Migrating from Create React App

Migrate an existing Create React App (CRA) site to Next.js, starting as a client-only SPA and incrementally adopting Next.js features.

## Signature / Usage

```tsx filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA)
  distDir: 'build',
}

export default nextConfig
```

```tsx filename="app/[[...slug]]/client.tsx"
'use client'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```

## Migration steps

1. Install `next@latest`.
2. Create `next.config.ts` with `output: 'export'` (SPA mode; remove later to use server features) and `distDir: 'build'`.
3. Create `app/layout.tsx` as a root layout, porting `public/index.html`'s `<html>`/`<head>`/`<body>` content and replacing the app mount div with `<div id="root">{children}</div>`.
4. Remove redundant `<meta charset>`/`<meta viewport>` tags (added automatically); move remaining metadata into an exported `metadata` object ([Metadata API](./../getting-started/metadata-and-og-images.md)); place favicon/icon files at the top of `app` for automatic detection.
5. Import global CSS into `app/layout.tsx` (CSS Modules and global CSS work like CRA).
6. Create an optional catch-all route `app/[[...slug]]/page.tsx` with `generateStaticParams` returning `[{ slug: [''] }]`, and a `client.tsx` Client Component that dynamically imports the CRA `App` with `ssr: false`.
7. Update static image imports: Next.js returns an object (`.src` property) instead of a URL string; convert `/public`-absolute imports to relative imports.
8. Rename `REACT_APP_` environment variable prefixes to `NEXT_PUBLIC_`.
9. Update `package.json` scripts to `next dev` / `next build` / `serve ./build`; add `.next` and `next-env.d.ts` to `.gitignore`.
10. Remove CRA artifacts: `public/index.html`, `src/index.tsx`, `src/react-app-env.d.ts`, `reportWebVitals`, `react-scripts`.

## Notes

- A custom `homepage` field maps to `basePath` in `next.config.ts`; a CRA service worker maps to the [PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps); the `proxy` field in `package.json` maps to `rewrites()`; custom webpack/Babel config can be replicated in `next.config.ts`'s `webpack()` (requires `--webpack`).
- `output: 'export'` does not support `useParams` or other server features; remove it to use all Next.js features.
- Next.js defaults to Turbopack for `next dev`; use `--webpack` to match CRA's webpack-based bundler.

## Related

- [From Vite](./from-vite.md)
- [App Router Migration](./app-router-migration.md)
- [Static Exports](./static-exports.md)
