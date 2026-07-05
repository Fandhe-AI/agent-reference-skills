# useRouter

`useRouter` allows programmatic route changes inside Client Components. Prefer `<Link>` for navigation unless `useRouter` is specifically required.

## Signature / Usage

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## Options / Props

| Method | Description |
| --- | --- |
| `push(href, { scroll?, transitionTypes? })` | Client-side navigation; adds a new browser history entry. |
| `replace(href, { scroll?, transitionTypes? })` | Client-side navigation without adding a new history entry. |
| `refresh()` | Re-fetches data requests and re-renders Server Components for the current route, clearing the client cache (but not server-side cache); preserves client-side/browser state. |
| `prefetch(href, { onInvalidate? })` | Prefetches a route for faster transitions; `onInvalidate` fires when prefetched data becomes stale. |
| `back()` | Navigates back in browser history. |
| `forward()` | Navigates forward in browser history. |

## Notes

- Must import from `next/navigation`, not `next/router`, in the App Router.
- Never pass untrusted/unsanitized URLs to `push`/`replace` — risk of XSS (e.g. `javascript:` URLs execute in page context).
- `refresh()` may reproduce the same result if `fetch` requests are cached; use `revalidatePath`/`revalidateTag` to invalidate server-side cache.
- `pathname` and `query` from the old `next/router` are replaced by `usePathname()` and `useSearchParams()`; `router.events` is replaced by composing `usePathname`/`useSearchParams` in an effect.
- Introduced (from `next/navigation`) in `v13.0.0`; `onInvalidate` for `prefetch` added in `v15.4.0`.

## Related

- [usePathname](./usePathname.md)
- [useSearchParams](./use-search-params.md)
- [redirect](./redirect.md)
