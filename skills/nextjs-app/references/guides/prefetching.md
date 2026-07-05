# Prefetching

Next.js prefetches route assets ahead of navigation so client-side transitions feel instant, using `<Link>` by default.

## Signature / Usage

```tsx filename="app/ui/nav-link.tsx"
import Link from 'next/link'

export default function NavLink() {
  return <Link href="/about">About</Link>
}
```

```tsx
'use client'
import { useRouter } from 'next/navigation'

export function PricingCard() {
  const router = useRouter()
  return <div onMouseEnter={() => router.prefetch('/pricing')}>...</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prefetch` (`Link` prop) | `boolean \| null` | `false` disables prefetch; `null` restores default (static) prefetching |
| `router.prefetch(href)` | function | Manual prefetch via `useRouter` from `next/navigation` |
| `router.prefetch(href, { onInvalidate })` | function | Re-prefetch callback invoked when cached data is suspected stale |

## Notes

- Static pages: full route prefetched, 5 min client cache TTL by default (`staleTimes.static`). Dynamic pages: not prefetched unless `loading.js` exists (only layout-to-boundary is prefetched), no client cache TTL unless `staleTimes.dynamic` set.
- Automatic prefetching only runs in production.
- Prefetch scheduling order: viewport links, then hover/touch-intent links; newer links replace older; off-screen links are discarded.
- With PPR enabled, the static shell is prefetched and streams immediately; the dynamic section streams separately.
- Side effects (e.g. analytics) in a layout/page body run during prefetch too — move them to `useEffect` or a triggered Server Action.
- Disable prefetch for large link lists (e.g. infinite scroll) with `prefetch={false}`, or defer to hover with `prefetch={active ? null : false}`.

## Related

- [Streaming](./streaming.md)
- [Static Exports](./static-exports.md)
