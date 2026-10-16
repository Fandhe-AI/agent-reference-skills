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
| `profile` | `string \| { expire?: number }` | How long stale content may be served (stale-while-revalidate window). `'max'` (recommended): a one-year window, so requests are always served stale content while revalidation runs. Any other `cacheLife` profile (default or custom) or an object with `expire` (seconds): only `expire` is read. `{ expire: 0 }`: stale content is never served, so the next request is a blocking revalidate (use when the caller needs the data gone immediately and `updateTag` cannot be used, e.g. webhooks). Omitted: deprecated, behaves like `{ expire: 0 }`. |

## Notes

- Callable only in Server Functions and Route Handlers — not in Client Components or Proxy.
- Calling `revalidateTag` only marks the tagged data as stale. The next request for that data kicks off a revalidation and is served stale content while it runs (stale-while-revalidate); past the `profile` window, a request blocks until revalidation completes. A revalidation is triggered by a request, not by the call, so pages using the tag revalidate as they are visited rather than all at once.
- A tag longer than 256 characters is never assigned to cached data, so revalidating it does nothing.
- The single-argument form `revalidateTag(tag)` (no profile) is deprecated — behaves like `{ expire: 0 }` (blocking revalidate on next request); it works only if TypeScript errors are suppressed and may be removed. Migrate to `updateTag` in Server Actions, or `revalidateTag(tag, 'max')`.
- Distinct from `revalidatePath`, which invalidates by route path rather than by tag across all pages that use it.
- For immediate updates from a Server Action (read-your-own-writes), prefer `updateTag` over `{ expire: 0 }`.

## Related

- [cacheTag](./cacheTag.md)
- [updateTag](./updateTag.md)
- [revalidatePath](./revalidatePath.md)
- [fetch](./fetch.md)
