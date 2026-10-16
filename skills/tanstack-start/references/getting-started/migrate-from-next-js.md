---
source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js
---

# Migrate from Next.js

Guide to migrate a Next.js App Router application to TanStack Start while preserving routes, metadata, authentication, mutations, and deployment behavior. Start does not interpret Next.js route conventions or configuration: keep your application behavior, then translate each framework boundary. A runnable before-and-after example (`examples/react/start-next-migration` in `TanStack/router`) implements the same article site in both frameworks.

## Signature / Usage

Before / after layout (the Next.js app stays runnable while Start is set up alongside it):

```text
next-app/                 # Before: Next.js App Router
  app/
    layout.tsx
    page.tsx
    posts/[slug]/page.tsx
    actions.ts
src/                      # After: TanStack Start
  router.tsx
  routes/
    __root.tsx
    index.tsx
    posts.$slug.tsx
  server/account.ts
vite.config.ts
```

The Start Vite plugin generates `src/routeTree.gen.ts`. `src/router.tsx` returns a new router using that tree. The root route renders `HeadContent` in the document head and `Scripts` in the body; merge existing CSS, document attributes, and providers into that root.

## Steps

1. Run the reference application (Node 24+, pnpm 11; `pnpm dev:next` on port 3100, `pnpm dev` on port 3101; set `SESSION_PASSWORD` and `DEMO_PASSWORD`).
2. Inventory the application before changing it: paths, dynamic paths, query parameters, redirects, trailing slashes, locale prefixes, response status, title, description, canonical, robots, sitemap membership, and Next.js-specific code (`next/*` imports, `'use server'`, metadata exports, `generateStaticParams`, `revalidatePath`, `revalidateTag`, cache directives, Proxy or middleware, image/font configuration).
3. Set up Start alongside the existing app: keep Next.js runnable until migrated routes pass their checks. You do not need to remove Next.js first.
4. Preserve paths while changing route files.
5. Validate URL search state with `validateSearch`.
6. Move server reads into server functions.
7. Translate mutations and their invalidation.
8. Preserve authentication and session boundaries.
9. Preserve metadata and search responses.
10. Replace image and font services deliberately.
11. Rebuild caching and deployment behavior.
12. Cut over with a rollback path.

## Route mapping

| Next.js App Router             | Default Start route directory                  |
| ------------------------------ | ---------------------------------------------- |
| `app/layout.tsx`               | `src/routes/__root.tsx`                        |
| `app/page.tsx`                 | `src/routes/index.tsx`                         |
| `app/posts/page.tsx`           | `src/routes/posts.index.tsx`                   |
| `app/posts/[slug]/page.tsx`    | `src/routes/posts.$slug.tsx`                   |
| `app/docs/[...parts]/page.tsx` | `src/routes/docs.$.tsx`                        |
| `app/api/hello/route.ts`       | `src/routes/api.hello.ts` with server handlers |

`src/routes` is a source directory, not a URL prefix: a route for `/posts/example` uses `createFileRoute('/posts/$slug')`, not `/app/posts/$slug`.

```tsx
<Link to="/posts/$slug" params={{ slug: article.slug }}>
  {article.title}
</Link>
```

## URL search state

```tsx
export const Route = createFileRoute('/')({
  validateSearch: (search) => ({
    q: typeof search.q === 'string' ? search.q : '',
  }),
  component: Articles,
})

function Articles() {
  const { q } = Route.useSearch()
  return <p>Searching for: {q}</p>
}
```

If a loader depends on search state, declare the values in `loaderDeps`. Validate page numbers, sorting, and filters at runtime.

## Contract checks (reference example)

| Request                    | Required behavior                                                    |
| -------------------------- | -------------------------------------------------------------------- |
| `/`                        | Article list, title, description, self-referencing canonical         |
| `/?q=metadata`             | Filtered article list; canonical remains `/`                         |
| `/posts/keeping-your-urls` | Same article, title, description, canonical, and Open Graph title    |
| `/posts/missing`           | HTTP 404                                                             |
| `/old-notes`               | HTTP 308 to `/posts/keeping-your-urls`                               |
| `/saved`                   | Signed-out users reach sign-in; private HTML is not shared-cacheable |
| `/sitemap.xml`             | Public pages only                                                    |

## Notes

- Page rewritten for 1.169: the earlier step-by-step (`npm uninstall next` + Vite config + conversion list) was replaced by the 12-section flow above.
- Route loaders can run in the browser during navigation: do not move a database query, credential, or privileged SDK from an async Server Component into an ordinary loader; put the privileged read in a server function and call it from the loader.
- Next.js Server Action invalidation (`revalidatePath`, tags) maps to `router.invalidate()` (reloads active route data) plus Query key invalidation; `router.invalidate()` does not purge a CDN, clear a database cache, or revalidate statically generated pages. `useServerFn` returns a callable function.
- Start event-handler forms require JavaScript; for progressive enhancement use a FormData-compatible server function URL or a form POST to a server route, with validation and CSRF protection. `createServerFn` is not a drop-in for the React form Action protocol.
- Start does not provide a session API; the example keeps `iron-session` with an adapter over `getCookie` / `setCookie`. Private pages need `Cache-Control: private, no-store`.
- Next.js `metadata` / `generateMetadata` become a route's `head` configuration; `app/sitemap.ts` becomes a server route at `/sitemap.xml`; migrate `robots.txt`, icons, manifests, and social images explicitly.
- Start does not provide the Next.js image optimizer (plain `<img>` for preprocessed assets; Unpic needs a compatible image service); replace `next/font` with self-hosted fonts or Fontsource.
- Next.js cache directives, revalidation, and `generateStaticParams` do not carry across automatically; use static prerendering only for suitable public routes and review ISR against the host's behavior.
- If the app relies heavily on React Server Components, read Comparison and the Server Components guide first; Start's RSC support is experimental and opt-in.
- This is about migrating *into* TanStack Start; it does not document `nextjs-app` skill's own APIs.

## Related

- [Start vs Next.js](./start-vs-nextjs.md)
- [Getting Started](./getting-started.md)
