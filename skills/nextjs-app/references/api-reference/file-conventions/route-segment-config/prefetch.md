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
| `'partial'` | Opts the segment into Partial Prefetching without enabling the global `partialPrefetching` flag; a `<Link>` to this segment loads the per-route App Shell instead of a legacy full prefetch. |
| `'force-disabled'` | Never prefetch this segment's data — segment data for it and all deeper segments is omitted from prefetching, though route metadata may still be prefetched. |

## Notes

- Only works when [Cache Components](../../config/caching.md) (`cacheComponents`) is enabled.
- Cannot be used when the segment is a Client Component.
- Set on the destination segment, not on the `<Link>`; `<Link prefetch={false}>` still skips prefetching regardless of the destination's config.
- With `'partial'`, a `<Link prefetch={true}>` may additionally trigger a runtime prefetch that resolves per-link data (`params`, `searchParams`, full URL); statically renderable pages are served from the static cache instead.
- When Next.js runtime-prefetches a segment, downstream segments are included in the same request even if configured `'force-disabled'`.
- Useful for incremental adoption: set `'partial'` per route, then enable the global `partialPrefetching` flag once every route in scope is covered.
- Introduced in `v16.x.x` (Cache Components only).

## Related

- [instant](./instant.md)
- [Route Segment Config overview](../route-segment-config.md)
- [Instant navigation guide](https://nextjs.org/docs/app/guides/instant-navigation)
