# Search Params Cache

Avoid prop drilling in deeply nested Next.js App Router server components using `createSearchParamsCache`.

```tsx
// lib/search-params.ts
import { parseAsString, parseAsInteger, createSearchParamsCache } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10),
})
```

```tsx
// app/search/page.tsx — parse once at the page boundary
import { searchParamsCache } from '@/lib/search-params'
import type { SearchParams } from 'nuqs/server'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  await searchParamsCache.parse(searchParams)
  return <Results />
}
```

```tsx
// app/search/results.tsx — access anywhere in the tree without props
import { searchParamsCache } from '@/lib/search-params'

export function Results() {
  const q = searchParamsCache.get('q')
  const maxResults = searchParamsCache.get('maxResults')
  return <div>Showing up to {maxResults} results for "{q}"</div>
}
```

## Notes

- `createSearchParamsCache` relies on React's `cache` function — valid only within the current page render
- Call `.parse()` exactly once per request, at the highest server component in the tree
- `.all()` returns all cached values as an object: `const { q, maxResults } = searchParamsCache.all()`
- For React Router / Remix, use `createLoader` inside a `loader` function instead
