# layout.js

Defines shared UI for a route segment. `layout.js` is the outermost component in a segment, wrapping `template.js`, `error.js`, `loading.js`, `not-found.js`, and `page.js`.

## Signature / Usage

```tsx filename="app/dashboard/layout.tsx"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

```tsx filename="app/layout.tsx"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` (required) | `React.ReactNode` | Populated with the child Layout or Page (or `loading`/`error`) the layout wraps. |
| `params` (optional) | `Promise<object>` | Resolves to [dynamic route parameters](./dynamic-routes.md) from the root segment down to this layout. |

Use the globally available `LayoutProps<'/route'>` helper (generated during `next dev`/`build`/`typegen`) to strongly type `params` and named parallel-route slots.

## Notes

- The `app` directory must include a **root layout** (`app/layout.js`) defining `<html>` and `<body>`; do not manually add `<title>`/`<meta>` there — use the Metadata API instead.
- Multiple root layouts are possible via [route groups](./route-groups.md) or by omitting `app/layout.js`; navigating across root layouts causes a full page load, not a client-side transition.
- Layouts do not rerender on navigation, so they cannot access the raw request, query params, or pathname directly — use `headers()`/`cookies()` (Server) or `useSearchParams()`/`usePathname()` (Client) instead.
- Layouts cannot pass data to `children`; dedupe repeated fetches with React `cache` or Next.js's automatic `fetch` deduplication.
- `loading.js` cannot show a fallback for uncached/runtime data accessed inside the layout itself; wrap such access in its own `<Suspense>` boundary or move it into `page.js`.
- To access child route segments, use `useSelectedLayoutSegment`/`useSelectedLayoutSegments` in a Client Component.
- `params` is a promise — use `async/await` or React's `use()`. Was synchronous through v14; still works synchronously in v15 for backwards compatibility but is deprecated (`v15.0.0-RC` made it a promise).

## Related

- [page.js](./page.md)
- [template.js](./template.md)
- [loading.js](./loading.md)
- [error.js](./error.md)
- [Dynamic Segments](./dynamic-routes.md)
- [Route Groups](./route-groups.md)
