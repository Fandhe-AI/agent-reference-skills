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
| [runtime](./route-segment-config/runtime.md) | `'nodejs' \| 'edge'` | `'nodejs'` |
| [preferredRegion](./route-segment-config/preferredRegion.md) | `'auto' \| 'global' \| 'home' \| string \| string[]` | `'auto'` |
| [maxDuration](./route-segment-config/maxDuration.md) | `number` | Set by deployment platform |

## Notes

- As of `v16.0.0`, `dynamic`, `dynamicParams`, `revalidate`, and `fetchCache` are removed when [Cache Components](../config/next-config-js/cacheComponents.md) is enabled — see the "Caching and Revalidating (Previous Model)" guide for the pre-Cache-Components behavior.
- `export const experimental_ppr = true` was removed in `v16.0.0` (a codemod is available).
- `runtime = 'experimental-edge'` was deprecated in `v15.0.0-RC` in favor of `'edge'` (a codemod is available).

## Related

- [dynamicParams](./route-segment-config/dynamicParams.md)
- [runtime](./route-segment-config/runtime.md)
- [preferredRegion](./route-segment-config/preferredRegion.md)
- [maxDuration](./route-segment-config/maxDuration.md)
- [page.js](./page.md)
- [layout.js](./layout.md)
- [route.js](./route.md)
