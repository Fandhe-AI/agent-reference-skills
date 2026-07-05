# Caching and Revalidating (Previous Model)

How to cache and revalidate data using `fetch` options, `unstable_cache`, and route segment configs, for projects **not** using Cache Components (`cacheComponents` flag, introduced in v16).

## Signature / Usage

```tsx filename="app/page.tsx"
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

```ts filename="app/lib/data.ts"
import { unstable_cache } from 'next/cache'

export const getCachedUser = unstable_cache(
  async (id: string) => db.select().from(users).where(eq(users.id, id)),
  ['user'],
  { tags: ['user'], revalidate: 3600 }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dynamic` (route segment) | `'auto' \| 'force-dynamic' \| 'error' \| 'force-static'` | Controls static/dynamic rendering of a layout/page/route |
| `fetchCache` (route segment) | `'auto' \| 'default-cache' \| 'only-cache' \| 'force-cache' \| 'default-no-store' \| 'only-no-store' \| 'force-no-store'` | Overrides default `cache` option for all `fetch` in a segment |
| `revalidate` (route segment) | `false \| 0 \| number` | Default revalidation seconds for a layout/page; must be statically analyzable |
| `next.revalidate` (fetch option) | `number` | Time-based revalidation seconds for a single `fetch` |
| `next.tags` (fetch option) | `string[]` | Tags for on-demand revalidation via `revalidateTag` |

## Notes

- `unstable_cache` wraps non-`fetch` async functions (e.g. DB queries) for caching; third argument accepts `tags` and `revalidate`.
- Cross-segment rules: `force-cache`/`force-no-store` win over `only-cache`/`only-no-store`; combining `only-cache` + `only-no-store` or `force-cache` + `force-no-store` in one route is disallowed.
- The lowest `revalidate` across a route's segments determines the whole route's revalidation frequency.
- `revalidateTag` / `revalidatePath` trigger on-demand invalidation, typically called from a Server Action or Route Handler.
- Use React `cache()` to dedupe non-`fetch` data access within a single render pass; combine with `server-only` for a preload utility pattern.

## Related

- [ISR](./incremental-static-regeneration.md)
- [Server Actions and Mutations](./server-actions.md)
