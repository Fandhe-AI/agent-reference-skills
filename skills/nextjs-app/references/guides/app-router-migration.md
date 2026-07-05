# Migrating from Pages Router to App Router (migration source)

Step-by-step guide to incrementally migrate an existing Next.js application from the `pages` directory to the `app` directory. Pages Router APIs are referenced here only as the migration source.

## Signature / Usage

```jsx filename="app/dashboard/page.js"
// app directory — replaces pages/dashboard.js's getServerSideProps
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  return res.json()
}

export default async function Dashboard() {
  const projects = await getProjects()
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

## Migration steps

1. **Update dependencies**: Node.js >= 18.17, `next@latest react@latest react-dom@latest`, `eslint-config-next@latest`.
2. **Upgrade shared features** (work in both directories first): `<Image>` (`next-image-to-legacy-image` / `next-image-experimental` codemods), `<Link>` (no longer needs a nested `<a>`; `new-link` codemod), `<Script>` (move `beforeInteractive` scripts to root layout; `onLoad`/`onReady`/`onError` need a Client Component), Font Optimization (`next/font` replaces inlined font CSS).
3. **Create the `app` directory** and a root `layout.tsx` — required, must render `<html>`/`<body>`, replaces `pages/_app.js` + `pages/_document.js`. Keep `_app`/`_document` until pages are fully migrated.
4. **Migrate `next/head`** to the [Metadata API](./../getting-started/metadata-and-og-images.md)'s exported `metadata` object.
5. **Migrate pages**: `pages/*.js` → `app/**/page.js`; pages in `app` are Server Components by default (vs Client Components in `pages`). Recommended path — move the page body into a Client Component (`'use client'`), then import it from a Server Component `page.js` that fetches data and forwards it as props.
6. **Migrate routing hooks**: `useRouter`/`usePathname`/`useSearchParams` now come from `next/navigation` (Client Components only) instead of `next/router`; `useRouter` no longer returns `pathname`, `query`, `isFallback`, `locale`/`locales`, `basePath`, `asPath`, `isReady`, or `route`.
7. **Migrate data fetching**: `getServerSideProps`/`getStaticProps`/`getInitialProps` → `fetch()` with `cache: 'no-store'` (SSR-like) / default `force-cache` (SSG-like) / `next: { revalidate }` (ISR-like); `getStaticPaths` → `generateStaticParams`; `fallback: true|false|'blocking'` → route segment config `dynamicParams = true|false`; request data (`req.cookies`/headers) → `cookies()`/`headers()` from `next/headers`; `pages/api/*` → Route Handlers (`route.js`).
8. **Migrate styling**: global stylesheets are no longer restricted to `_app.js`; add `./app` to `tailwind.config.js` `content` and import global CSS in `app/layout.js`.

## Notes

- The `app` and `pages` directories can coexist; migrate page by page.
- Navigating between routes served by different routers triggers a hard navigation; `next/link` prefetch does not cross routers.
- Codemods are available for most of the above transforms — see [Codemods](./codemods.md).

## Related

- [Codemods](./codemods.md)
- [Version 16 Upgrade](./version-16.md)
- [From Create React App](./from-create-react-app.md)
