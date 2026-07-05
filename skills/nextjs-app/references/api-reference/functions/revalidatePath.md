# revalidatePath

`revalidatePath` invalidates cached data on-demand for a specific path (page, layout, or Route Handler).

## Signature / Usage

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')
```

```tsx
revalidatePath(path: string, type?: 'page' | 'layout'): void
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `path` | `string` (≤ 1024 chars, case-sensitive) | Literal path (e.g. `/product/123`) or route pattern with dynamic segments (e.g. `/product/[slug]`). No trailing `/page`/`/layout` suffix; no trailing slash needed. |
| `type` | `'page' \| 'layout'` (optional) | Required when `path` contains a dynamic segment; distinguishes revalidating a page vs. its layout (and nested pages beneath it). |

## Notes

- Callable only in Server Functions and Route Handlers — not in Client Components or Proxy.
- In Server Functions: updates UI immediately if viewing the affected path (currently also refreshes all previously visited pages on next navigation — temporary behavior).
- In Route Handlers: marks the path for revalidation on its *next* visit (does not immediately trigger many revalidations).
- Invalidating a layout also invalidates all nested layouts and pages beneath it.
- With rewrites, pass the **destination** path (actual route file location), not the source path shown in the browser.
- `revalidatePath('/', 'layout')` purges the client cache and invalidates all cached data.
- Distinct from `revalidateTag`/`updateTag`, which invalidate by cache tag across all pages using that tag rather than by route path — often used together for full consistency.

## Related

- [revalidateTag](./revalidateTag.md)
- [updateTag](./updateTag.md)
- [refresh](./refresh.md)
