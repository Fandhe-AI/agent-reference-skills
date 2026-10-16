# prefetch

The `prefetch` route segment config overrides, per segment, how the segment is prefetched during client-side navigation.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx"
export const prefetch = 'partial'

export default function Page() {
  return <div>...</div>
}
```

## Options / Props

| Value | Description |
| --- | --- |
| `'auto'` (default) | Framework manages the strategy based on the app's `partialPrefetching` setting. Equivalent to omitting the export. |
| `'partial'` | Opts the segment into Partial Prefetching without enabling the global `partialPrefetching` flag; a `<Link>` to this segment loads the per-route App Shell instead of a legacy full prefetch. A `<Link prefetch={true}>` additionally resolves URL data (`params`, `searchParams`, full URL) and the cached content behind it. |
| `'force-disabled'` | Never prefetch this segment's data — segment data for it and all deeper segments is omitted from prefetching, though route metadata may still be prefetched. |

## Notes

- Only works when [Cache Components](../../config/caching.md) (`cacheComponents`) is enabled.
- Cannot be used when the segment is a Client Component.
- Set on the destination segment, not on the `<Link>`; `<Link prefetch={false}>` still skips prefetching regardless of the destination's config.
- With `'partial'`, a `<Link prefetch={true}>` uses per-link prefetching: the server renders a fresh response that resolves URL data (`params`, `searchParams`, full URL). Statically renderable pages are served from the static cache (or a CDN); a page that accesses non-static data (cookies, headers) is prefetched with a fresh server render, which costs server CPU per page view.
- When Next.js performs a per-link prefetch for a segment, downstream segments are included in the same request even if configured `'force-disabled'`.
- The meaningful values are `'partial'` and `'force-disabled'`; `'auto'` is the default, equivalent to omitting the export, so do not write `prefetch = 'auto'` explicitly.
- A page or layout that also calls the `prefetch()` function must import it under another name, for example `import { prefetch as prefetchStage } from 'next/cache'`.
- Useful for incremental adoption: set `'partial'` per route, then enable the global `partialPrefetching` flag once every route in scope is covered.
- Version history: `v16.3.0` stabilized `prefetch`, replacing `unstable_prefetch` (Cache Components only).

## Related

- [instant](./instant.md)
- [Route Segment Config overview](../route-segment-config.md)
- [Instant navigation guide](../../../guides/instant-navigation.md)
