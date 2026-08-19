# instant

The `instant` route segment config tells Next.js to validate that navigations into this segment produce an instant UI, surfacing code that would block the navigation from updating immediately.

## Signature / Usage

```tsx filename="layout.tsx | page.tsx"
export const instant = true

export default function Page() {
  return <div>...</div>
}
```

## Options / Props

| Value | Description |
| --- | --- |
| `true` | Opts the segment into validation at the globally configured level (dev-only warning by default). |
| `false` | Opts the segment out; a `false` set on an ancestor also disables static-shell validation for the routes beneath it. |
| `{ level: 'warning' }` | Opts in explicitly with an option object; `'warning'` (dev-only) is currently the only supported level. |

## Notes

- Only works when [Cache Components](../../config/caching.md) (`cacheComponents`) is enabled.
- Cannot be used in Client Components — throws an error.
- Triggers validation at every shared layout boundary in the route; errors appear in the dev overlay and identify the blocking component (fix by caching with `"use cache"` or wrapping in `<Suspense>`).
- Global default behavior is tuned via `experimental.instantInsights.validationLevel` (`'warning'` validates every Page/Default segment; `'manual-warning'` validates only segments with an explicit `instant`).
- Framework-synthesized routes (`/_global-error`, `/_not-found`) are excluded from implicit validation unless opted in explicitly.
- Next.js does not prefetch in development, so navigations feel less instant there than in `next start`, which is what validation reflects.
- `@next/playwright` exports an `instant()` test helper for e2e regression tests.
- Introduced in `v16.x.x` (Cache Components only).

## Related

- [prefetch](./prefetch.md)
- [Route Segment Config overview](../route-segment-config.md)
- [Instant navigation guide](https://nextjs.org/docs/app/guides/instant-navigation)
- [use cache](../../directives/use-cache.md)
