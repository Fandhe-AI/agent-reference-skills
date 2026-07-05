# cacheTag

`cacheTag` tags cached data (inside a `use cache` scope) for on-demand invalidation via `revalidateTag` or `updateTag`.

## Signature / Usage

```tsx
import { cacheTag } from 'next/cache'

export async function getData() {
  'use cache'
  cacheTag('my-data')
  const data = await fetch('/api/data')
  return data
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| ...tags | `string[]` | One or more tag strings to associate with the cache entry. |

## Notes

- Requires the `cacheComponents` flag enabled in `next.config.ts`.
- Idempotent — applying the same tag multiple times has no additional effect.
- A single `cacheTag()` call accepts up to 128 tags, each up to 256 characters; excess/overlong tags are dropped with a console warning.
- Use `updateTag` inside a Server Function for read-your-own-writes; use `revalidateTag` when stale data is acceptable while revalidation happens in the background.
- Tags can be derived from data returned by the cached function itself.

## Related

- [revalidateTag](./revalidateTag.md)
- [updateTag](./updateTag.md)
- [cacheLife](./cacheLife.md)
