# On-Demand Revalidation with revalidatePath and revalidateTag

Invalidate cached data after a mutation using `revalidatePath` (route-based) or `revalidateTag` (tag-based) inside a Server Action.

```ts
// app/lib/data.ts
export async function getUserById(id: string) {
  const data = await fetch(`https://api.example.com/users/${id}`, {
    next: { tags: ['user'] },
  })
  return data.json()
}
```

```ts
// app/actions.ts
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateUser(id: string) {
  await fetch(`https://api.example.com/users/${id}`, { method: 'PATCH' })

  // Refresh a specific route's cache on next visit
  revalidatePath('/profile')

  // Refresh every fetch tagged 'user' across the app
  revalidateTag('user')
}
```

## Notes

- Both functions can only be called from Server Actions or Route Handlers, never from Client Components.
- `revalidatePath(path)` invalidates a literal path; pass `revalidatePath('/blog/[slug]', 'page')` to invalidate every page matching a dynamic route pattern.
- `revalidateTag(tag)` invalidates every cached `fetch` (or `use cache` function) tagged with `next: { tags: [...] }` / `cacheTag(...)`, regardless of which route rendered it.
- Data is not refetched immediately — the cache entry is marked stale and refreshed the next time the affected path/tag is visited.
