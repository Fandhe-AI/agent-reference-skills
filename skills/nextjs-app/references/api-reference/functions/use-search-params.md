# useSearchParams

`useSearchParams` is a Client Component hook that reads the current URL's query string, returning a read-only `URLSearchParams`-like object.

## Signature / Usage

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  return <>Search: {search}</>
}
```

## Options / Props

| Method | Description |
| --- | --- |
| `get(name)` | Returns the first value for the param, or `null` if absent. |
| `has(name)` | Returns whether the param exists. |
| `getAll(name)`, `keys()`, `values()`, `entries()`, `forEach()`, `toString()` | Other read-only `URLSearchParams` methods. |

## Notes

- Not supported in Server Components (would risk stale values during partial rendering) — use the Page's `searchParams` prop instead and pass values down.
- Calling it in a prerendered route client-side-renders the component tree up to the nearest `<Suspense>` boundary; wrap components using it in `<Suspense>` so the rest of the page can still prerender. Production builds fail with a "Missing Suspense boundary" error otherwise.
- In dynamically rendered routes, values are available during the initial server render too (e.g. after calling `connection()` in a Server Component parent).
- Layouts (Server Components) do not receive a `searchParams` prop (to avoid staleness since layouts aren't re-rendered on navigation) — use the Page's `searchParams` prop or this hook in a Client Component instead.
- In apps with a `/pages` directory, may return `ReadonlyURLSearchParams | null`.
- Introduced in `v13.0.0`.

## Related

- [usePathname](./usePathname.md)
- [useRouter](./useRouter.md)
- [connection](./connection.md)
