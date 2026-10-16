# Adapters

Since nuqs v2, the library works in several React frameworks by wrapping the app with a `NuqsAdapter` context provider. Each framework has its own import path.

## Signature / Usage

```tsx
// Next.js app router: src/app/layout.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```

Adapter import paths:

| Framework | Import | Where to mount |
|-----------|--------|----------------|
| Next.js (app router) | `nuqs/adapters/next/app` | Wrap `{children}` in the root layout |
| Next.js (pages router) | `nuqs/adapters/next/pages` | Wrap `<Component {...pageProps} />` in `_app.tsx` |
| Next.js (unified) | `nuqs/adapters/next` | Either router; ~100B larger bundle |
| React SPA (e.g. Vite) | `nuqs/adapters/react` | Wrap `<App />` in `createRoot(...).render(...)` |
| Remix | `nuqs/adapters/remix` | Wrap `<Outlet />` in `app/root.tsx` |
| React Router v6 | `nuqs/adapters/react-router/v6` | Wrap `<RouterProvider />` |
| React Router v7 | `nuqs/adapters/react-router/v7` | Wrap `<Outlet />` in `app/root.tsx` |
| React Router v8 | `nuqs/adapters/react-router/v8` | Wrap `<Outlet />` in `app/root.tsx` |
| TanStack Router | `nuqs/adapters/tanstack-router` | Wrap `<Outlet />` in the root route component |

React SPA with props:

```tsx
// src/main.tsx
createRoot(document.getElementById('root')!).render(
  <NuqsAdapter fullPageNavigationOnShallowFalseUpdates>
    <App />
  </NuqsAdapter>
)
```

```tsx
// src/islands/SearchIsland.tsx (Astro, Fastify, Hono, Elysia, ...)
import { NuqsAdapter } from 'nuqs/adapters/react'

export function SearchIsland({ serverSearch }: { serverSearch: string }) {
  return (
    <NuqsAdapter serverSearch={serverSearch}>
      {/* useQueryState works here, on the server & the client */}
    </NuqsAdapter>
  )
}
```

TanStack Router type-safe routing:

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  createStandardSchemaV1,
  parseAsIndex,
  parseAsString,
  useQueryStates
} from 'nuqs'

const searchParams = {
  searchQuery: parseAsString.withDefault(''),
  pageIndex: parseAsIndex.withDefault(0),
}

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: createStandardSchemaV1(searchParams, {
    partialOutput: true
  })
})
```

## Options / Props

`NuqsAdapter` props (React SPA adapter):

| Name | Type | Description |
|------|------|-------------|
| `fullPageNavigationOnShallowFalseUpdates` | `boolean` | Perform a full-page navigation when updating state configured with `shallow: false`, to notify a non-JS web server (Django, Rails, Laravel, Phoenix, ...). Since 2.4.0. |
| `serverSearch` | `string \| URLSearchParams` | Request URL query string (with or without leading `?`) for server-rendered islands, to avoid a flash of default values. Read only during SSR and hydration. Since 2.10.0. |

## Notes

- Next.js unified adapter: use it when the app uses both the app and pages routers and the adapter must be mounted in either.
- React SPA: with no known server, `shallow: false` has no effect unless `fullPageNavigationOnShallowFalseUpdates` is set. Multiple islands on the same page each get their own `NuqsAdapter` and stay in sync through the History API.
- Remix (deprecated): Remix v2 has reached end of life; `nuqs/adapters/remix` will be removed in nuqs@3.0.0. Migrate to React Router v7 or v8 and use the matching adapter.
- React Router v6 (deprecated): only `BrowserRouter` is supported. `HashRouter` may be supported in the future (issue #810); `MemoryRouter` is not planned. React Router v6 has reached end of life and `nuqs/adapters/react-router/v6` will be removed in nuqs@3.0.0.
- The generic import `nuqs/adapters/react-router` (pointing to v6) is deprecated and will be removed in nuqs@3.0.0. Pin to `/v6`, `/v7` or `/v8`. Hooks come from `react-router-dom` for v6, and `react-router` for v7 and v8.
- React Router v8 adapter currently re-exports the v7 adapter (same `react-router` hooks); pinning to `/v8` avoids import changes if implementations diverge.
- TanStack Router support is experimental and does not yet cover TanStack Start.
- TanStack Router `validateSearch`: `partialOutput` allows specifying a subset of search params and does not reflect them in the URL automatically. Only trivial state types (string-based, number-based, boolean, JSON parsers) are supported for type-safe linking; the `urlKeys` feature is not supported.
- Testing: `NuqsTestingAdapter` is documented on the official testing page (https://nuqs.dev/docs/testing).
- Source: https://nuqs.dev/docs/adapters (nuqs v2.10.2).

## Related

- [createStandardSchemaV1](../utilities/createStandardSchemaV1.md)
- [Options](../options/options.md)
- [Server-side](../server/server-side.md)
