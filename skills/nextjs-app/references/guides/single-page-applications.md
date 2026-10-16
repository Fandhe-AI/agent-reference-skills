# Single-Page Applications (SPAs)

Next.js fully supports SPA patterns — fast prefetched transitions, client-side data fetching, browser APIs, static routes — while allowing progressive adoption of server features.

## Signature / Usage

```tsx filename="app/layout.tsx"
import { UserProvider } from './user-provider'
import { getUser } from './user'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let userPromise = getUser() // do NOT await
  return (
    <html lang="en">
      <body>
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `use(promise)` | React API | Unwraps a Promise passed via context/props inside a Client Component, suspending until resolved |
| `next/dynamic({ ssr: false })` | function option | Renders a component browser-only (no prerendering) |
| `window.history.pushState` / `.replaceState` | browser API | Shallow-routes and integrates with the Next.js router (`usePathname`, `useSearchParams`) without a full navigation |
| `output: 'export'` | `next.config.js` | Generates a fully static site (per-route HTML instead of one `index.html`) |

## Notes

- Recommended pattern: fetch data in the root layout (or a parent component), don't `await` it, pass the Promise through a context provider, and unwrap with `use()` in the consuming Client Component — this hoists the request to start on the server early and avoids client waterfalls.
- The SWR and TanStack Query sections moved out of this guide: when a Client Component needs focus revalidation, polling, mutations or request deduplication, use a library such as SWR or TanStack Query. See the Client-side data fetching guides (`client-side-data-fetching.md`, `client-side-data-fetching-swr.md`, `client-side-data-fetching-tanstack-query.md`) for direct browser fetching, providing initial data from a Server Component, and coordinating the library cache with the Next.js server and client caches.
- The section "Examples" is now "Build common SPA patterns" (use within a Context Provider, rendering components only in the browser, shallow routing on the client, mutating data with Server Actions).
- Mutating data with Server Actions: call a Server Action inside a transition (`useTransition`) for pending feedback; for list-like state combine `useActionState` with `useOptimistic` using a shared pure reducer (e.g. a `todosReducer` with `add` / `toggle` / `edit` / `delete` actions) so client and server share one copy of the logic. A client data-fetching library can instead coordinate an optimistic browser update around the same Server Action.
- React 19.3 includes the `browser` API: use `use(browser())` only when a Client Component's first browser render cannot match server-rendered HTML; during prerendering it suspends to the closest `<Suspense>` boundary, so crawlers that do not execute JavaScript see the fallback instead of the component.
- Use `next/dynamic` with `ssr: false` for browser-only third-party libraries relying on `window`/`document`.
- Migrating from Create React App or Vite can be incremental; Server Actions can be called directly from Client Components like normal functions, replacing manual API route boilerplate.

## Related

- [Static Exports](./static-exports.md)
- [Prefetching](./prefetching.md)
