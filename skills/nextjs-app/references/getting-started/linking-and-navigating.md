# Linking and Navigating

How Next.js navigation works, including prefetching, prerendering, streaming, and client-side transitions, and how to optimize navigation for dynamic routes and slow networks.

## Signature / Usage

```tsx
// app/layout.tsx
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/blog">Blog</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
```

```tsx
// app/blog/[slug]/loading.tsx — enables partial prefetching for a dynamic route
export default function Loading() {
  return <LoadingSkeleton />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prefetch` (on `<Link>`) | `boolean \| null` | `false` disables prefetching; `null` limits to hover-only prefetch |
| `generateStaticParams` | function export | Prerenders a dynamic segment at build time instead of falling back to dynamic rendering |
| `useLinkStatus` | hook (`next/link`) | Returns `{ pending }` to show feedback during slow-network navigations |

## Notes

- Static routes are fully prefetched; dynamic routes skip prefetching unless `loading.tsx` exists (partial prefetch)
- `<Link>` is a Client Component and must hydrate before prefetching starts; reduce bundle size to hydrate sooner
- `window.history.pushState`/`replaceState` integrate with the Next.js router and sync with `usePathname`/`useSearchParams`
- Disabling prefetch entirely trades off instant navigation for reduced resource usage

## Related

- [layouts-and-pages](./layouts-and-pages.md)
- [server-and-client-components](./server-and-client-components.md)
