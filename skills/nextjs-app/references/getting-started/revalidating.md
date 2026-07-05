# Revalidating

Revalidate cached data using time-based and on-demand strategies, used with Cache Components.

## Signature / Usage

```ts
// app/lib/data.ts — time-based revalidation
import { cacheLife, cacheTag } from 'next/cache'

export async function getProducts() {
  'use cache'
  cacheLife('hours')
  cacheTag('products')
  return db.query('SELECT * FROM products')
}
```

```ts
// app/lib/actions.ts — on-demand revalidation after a mutation
'use server'
import { updateTag } from 'next/cache'

export async function createPost(formData: FormData) {
  const post = await db.post.create({ data: { title: formData.get('title') } })
  updateTag('posts')
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cacheLife(profile \| object)` | `next/cache` | Sets `stale`/`revalidate`/`expire` durations; profiles: `default`, `seconds`, `minutes`, `hours`, `days`, `weeks`, `max` |
| `cacheTag(tag)` | `next/cache` | Tags cached data for later on-demand invalidation |
| `revalidateTag(tag, profile?)` | `next/cache` | Stale-while-revalidate invalidation; usable in Server Actions and Route Handlers |
| `updateTag(tag)` | `next/cache` | Immediately expires cache for read-your-own-writes; Server Actions only |
| `revalidatePath(path)` | `next/cache` | Invalidates all cached data for a route path when tags aren't known |

## Notes

- Prefer tag-based revalidation (`revalidateTag`/`updateTag`) over `revalidatePath` for precision
- A cache is "short-lived" (uses `seconds` profile, `revalidate: 0`, or `expire` under 5 minutes) and is automatically excluded from prerenders, becoming a dynamic hole
- `updateTag` works only in Server Actions; `revalidateTag` works in both Server Actions and Route Handlers
- This page applies to the Cache Components model (`cacheComponents: true`); a separate guide covers the previous caching model

## Related

- [caching](./caching.md)
- [mutating-data](./mutating-data.md)
