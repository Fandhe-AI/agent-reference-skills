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

  // Mark every fetch tagged 'user' stale (stale-while-revalidate)
  revalidateTag('user', 'max')
}
```

## Notes

- Both functions can only be called from Server Actions or Route Handlers, never from Client Components.
- `revalidatePath(path)` invalidates a literal path; pass `revalidatePath('/blog/[slug]', 'page')` to invalidate every page matching a dynamic route pattern.
- `revalidateTag(tag, profile)` takes a required second argument (`"max"` recommended, or a cacheLife profile / `{ expire }` object). The single-argument form `revalidateTag(tag)` is deprecated and may be removed in a future version.
- For immediate expiration inside a Server Action (read-your-own-writes), use `updateTag(tag)` instead; `revalidateTag(tag, { expire: 0 })` is for webhooks / Route Handlers called by external systems.
- Data is not refetched immediately — the cache entry is marked stale and refreshed the next time the affected path/tag is visited.
