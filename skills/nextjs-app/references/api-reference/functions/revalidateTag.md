# revalidateTag

`revalidateTag` invalidates cached data on-demand for a specific cache tag, ideal for content where slightly stale data is acceptable (blog posts, catalogs, docs).

## Signature / Usage

```ts
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts', 'max')
}
```

```tsx
revalidateTag(tag: string, profile: string | { expire?: number }): void
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `tag` | `string` (≤ 256 chars, case-sensitive) | Cache tag associated with the data to revalidate. Assigned via `fetch`'s `next.tags` option or `cacheTag()` inside a `use cache` scope. |
| `profile` | `string \| { expire?: number }` | `'max'` (recommended) marks the tag stale for stale-while-revalidate semantics; other `cacheLife` profile names apply custom behavior; `{ expire: 0 }` forces immediate expiration (e.g. for webhooks). |

## Notes

- Callable only in Server Functions and Route Handlers — not in Client Components or Proxy.
- With `profile="max"`, marks data stale; fresh data fetches only when a page using that tag is next visited (not immediately on call).
- The single-argument form `revalidateTag(tag)` (no profile) is deprecated — immediately expires the entry and causes a blocking revalidate on next request; migrate to `updateTag` or `revalidateTag(tag, 'max')`.
- Distinct from `revalidatePath`, which invalidates by route path rather than by tag across all pages that use it.
- For immediate updates from a Server Action (read-your-own-writes), prefer `updateTag` over `{ expire: 0 }`.

## Related

- [cacheTag](./cacheTag.md)
- [updateTag](./updateTag.md)
- [revalidatePath](./revalidatePath.md)
- [fetch](./fetch.md)
