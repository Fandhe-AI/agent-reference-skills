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
- SWR 2.3.0+ (with React 19+) supports the same pattern via `<SWRConfig value={{ fallback: { key: getUser() } }}>` combined with `useSWR(key, fetcher)` in Client Components, unchanged from existing SWR code.
- React Query is also supported on both client and server (see its SSR guide).
- Use `next/dynamic` with `ssr: false` for browser-only third-party libraries relying on `window`/`document`.
- Migrating from Create React App or Vite can be incremental; Server Actions can be called directly from Client Components like normal functions, replacing manual API route boilerplate.

## Related

- [Static Exports](./static-exports.md)
- [Prefetching](./prefetching.md)
