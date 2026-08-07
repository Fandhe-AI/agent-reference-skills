# Route Segment Config

Configures the behavior of a Page, Layout, or Route Handler by directly exporting specific variables from the segment file.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx | route.ts"
export const dynamicParams = true
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
```

## Options / Props

| Option | Type | Default |
|------|------|-------------|
| [dynamicParams](./route-segment-config/dynamicParams.md) | `boolean` | `true` |
| [runtime](./route-segment-config/runtime.md) | `'nodejs' \| 'edge' (deprecated)` | `'nodejs'` |
| [preferredRegion](./route-segment-config/preferredRegion.md) (deprecated) | `'auto' \| 'global' \| 'home' \| string \| string[]` | `'auto'` |
| [maxDuration](./route-segment-config/maxDuration.md) | `number` | Set by deployment platform |

## Notes

- As of `v16.0.0`, `dynamic`, `dynamicParams`, `revalidate`, and `fetchCache` are removed when [Cache Components](../config/caching.md) is enabled — see the "Caching and Revalidating (Previous Model)" guide for the pre-Cache-Components behavior.
- `export const experimental_ppr = true` was removed in `v16.0.0` (a codemod is available).
- `runtime = 'experimental-edge'` was deprecated in `v15.0.0-RC` in favor of `'edge'` (a codemod is available); the Edge Runtime itself (`runtime = 'edge'`) is now deprecated — remove the `runtime` export from route files.
- `preferredRegion` is deprecated — remove the `preferredRegion` export from route files.
- Two additional segment config options exist in the current official docs but are not yet covered here: `instant` and `prefetch` (see the official Route Segment Config index for details).

## Related

- [dynamicParams](./route-segment-config/dynamicParams.md)
- [runtime](./route-segment-config/runtime.md)
- [preferredRegion](./route-segment-config/preferredRegion.md)
- [maxDuration](./route-segment-config/maxDuration.md)
- [page.js](./page.md)
- [layout.js](./layout.md)
- [route.js](./route.md)
