# cacheLife

`cacheLife` sets the cache lifetime (stale, revalidate, expire) of a function or component, used alongside the `use cache` directive.

## Signature / Usage

```tsx
'use cache'
import { cacheLife } from 'next/cache'

export default async function BlogPage() {
  cacheLife('days') // Blog content updated daily
  const posts = await getBlogPosts()
  return <div>{/* render posts */}</div>
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| profile | `string` | `'default'` | Preset profile name (`seconds`, `minutes`, `hours`, `days`, `weeks`, `max`) or a custom profile name defined in `next.config.ts`. |
| profile (inline) | `{ stale?: number; revalidate?: number; expire?: number }` | — | Inline object for one-off cache timing. |

### Cache profile properties

| Property | Description |
| --- | --- |
| `stale` | How long the client can use cached data without checking the server. |
| `revalidate` | After this time, the next request triggers a background refresh. |
| `expire` | After this time with no requests, the next request waits for fresh content. |

### Preset profiles

| Profile | `stale` | `revalidate` | `expire` |
| --- | --- | --- | --- |
| `default` | 5 minutes | 15 minutes | never |
| `seconds` | 30 seconds | 1 second | 1 minute |
| `minutes` | 5 minutes | 1 minute | 1 hour |
| `hours` | 5 minutes | 1 hour | 1 day |
| `days` | 5 minutes | 1 day | 1 week |
| `weeks` | 5 minutes | 1 week | 30 days |
| `max` | 5 minutes | 30 days | 1 year |

## Notes

- Requires the `cacheComponents` flag enabled in `next.config.ts`.
- Must be called within a `use cache` directive scope; calling at module scope throws an error.
- Optional — if omitted, the `default` profile applies.
- Only one call should execute per function invocation (conditional branches are fine).
- Custom profiles are defined via `cacheLife` in `next.config.ts` and can override the built-in preset names.
- `stale` controls client cache via the `x-nextjs-stale-time` header; minimum 30 seconds enforced.
- Caches with zero `revalidate` or `expire` under 5 minutes are excluded from prerenders and become dynamic holes (wrap in `<Suspense>`).
- With an explicit outer `cacheLife`, that lifetime takes precedence over nested cache lifetimes; without one, shorter inner lifetimes can reduce the outer default.

## Related

- [cacheTag](./cacheTag.md)
- [revalidateTag](./revalidateTag.md)
- [updateTag](./updateTag.md)
- [refresh](./refresh.md)
