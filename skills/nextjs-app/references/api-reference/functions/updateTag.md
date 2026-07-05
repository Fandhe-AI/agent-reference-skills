# updateTag

`updateTag` updates cached data on-demand for a specific cache tag from within Server Actions, designed for read-your-own-writes scenarios.

## Signature / Usage

```ts
'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const post = await db.post.create({
    data: { title: formData.get('title'), content: formData.get('content') },
  })
  updateTag('posts')
  updateTag(`post-${post.id}`)
  redirect(`/posts/${post.id}`)
}
```

```tsx
updateTag(tag: string): void
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `tag` | `string` (≤ 256 chars, case-sensitive) | Cache tag to invalidate immediately. Assigned via `fetch`'s `next.tags` option or `cacheTag()` inside a `use cache` scope. |

## Notes

- Callable **only** within Server Actions — throws an error in Route Handlers, Client Components, or other contexts; use `revalidateTag` there instead.
- Immediately expires cached data for the tag — the next request waits for fresh data rather than serving stale content.
- Differs from `revalidateTag`: `revalidateTag` (with `profile="max"`) serves stale content while revalidating in the background; `updateTag` blocks for fresh data, ensuring the acting user sees their own change immediately.

## Related

- [revalidateTag](./revalidateTag.md)
- [revalidatePath](./revalidatePath.md)
- [cacheTag](./cacheTag.md)
