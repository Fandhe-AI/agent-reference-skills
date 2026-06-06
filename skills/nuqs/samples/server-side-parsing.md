# Server-Side Parsing

Parse URL search params on the server using `createLoader` (shared parsers between client and server).

```tsx
// lib/search-params.ts — shared parser definitions
import { parseAsString, parseAsInteger, createLoader } from 'nuqs/server'

export const searchParsers = {
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(searchParsers)
```

```tsx
// app/products/page.tsx — Next.js App Router server component
import { loadSearchParams } from '@/lib/search-params'
import type { SearchParams } from 'nuqs/server'

type Props = { searchParams: Promise<SearchParams> }

export default async function ProductsPage({ searchParams }: Props) {
  const { q, page } = await loadSearchParams(searchParams)

  const results = await fetchProducts({ query: q, page })

  return <ProductList items={results} />
}
```

## Notes

- Import from `'nuqs/server'` (not `'nuqs'`) to avoid bundling client-only code in server components
- `createLoader` accepts strings, `URL`, `URLSearchParams`, `Request`, or their `Promise` wrappers
- Parser definitions in a shared file keep client and server types in sync automatically
- For strict validation (throw on invalid values instead of falling back), pass `{ strict: true }` as the second argument to the loader call
