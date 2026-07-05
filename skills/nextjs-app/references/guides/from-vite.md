# Migrating from Vite

Migrate an existing Vite (React) application to Next.js, starting as a client-only SPA and incrementally adopting Next.js features.

## Signature / Usage

```ts filename="next.config.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA)
  distDir: './dist',
}

export default nextConfig
```

## Migration steps

1. Install `next@latest`.
2. Create `next.config.mjs` with `output: 'export'` and `distDir: './dist'`.
3. Update `tsconfig.json`: remove the `tsconfig.node.json` project reference, add `./dist/types/**/*.ts` and `./next-env.d.ts` to `include`, add `./node_modules` to `exclude`, add the `next` TS plugin, and set `esModuleInterop`, `jsx: "react-jsx"`, `allowJs`, `forceConsistentCasingInFileNames`, `incremental` to `true`.
4. Create `app/layout.tsx` as a root layout, porting `index.html`'s `<html>`/`<head>`/`<body>` and replacing the mount div with `<div id="root">{children}</div>`; remove default charset/viewport meta tags and move remaining metadata to an exported `metadata` object.
5. Create `app/[[...slug]]/page.tsx` (optional catch-all route) importing global CSS and returning `generateStaticParams: () => [{ slug: [''] }]`, plus a `client.tsx` Client Component that dynamically imports the Vite `App` with `ssr: false`.
6. Update static image imports: Next.js returns an object (use `.src`) instead of a URL string.
7. Migrate environment variables: `VITE_` prefix → `NEXT_PUBLIC_`; `import.meta.env.MODE` → `process.env.NODE_ENV`; `.PROD`/`.DEV` → `process.env.NODE_ENV === 'production'` checks; `.SSR` → `typeof window !== 'undefined'`; recreate `BASE_URL` via `NEXT_PUBLIC_BASE_PATH` + `basePath` config.
8. Update `package.json` scripts to `next dev` / `next build` / `next start`; add `.next`, `next-env.d.ts`, `dist` to `.gitignore`.
9. Remove Vite artifacts: `main.tsx`, `index.html`, `vite-env.d.ts`, `tsconfig.node.json`, `vite.config.ts`, Vite dependencies.

## Notes

- Client Components in the App Router are still prerendered to HTML on the server by default; `ssr: false` on the dynamic import disables this for a true client-only start.
- Next.js defaults to Turbopack for `next dev`/`next build`; a Vite/Webpack-style setup isn't required to migrate.

## Related

- [From Create React App](./from-create-react-app.md)
- [App Router Migration](./app-router-migration.md)
