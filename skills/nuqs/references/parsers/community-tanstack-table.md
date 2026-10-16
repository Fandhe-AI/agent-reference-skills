# TanStack Table Parsers

Store TanStack Table state (pagination) in the URL. By default TanStack Table keeps its state in memory, losing all filters, sorts and pagination when the page is refreshed.

## Signature / Usage

TanStack Table stores pagination under two pieces of state:

- `pageIndex`: a zero-based integer representing the current page
- `pageSize`: an integer representing the number of items per page

The URL should follow the UI and be one-based for the page index (`?page=1` maps to `pageIndex: 0`). `parseAsIndex` does this mapping. Parser from the official interactive example (default URL keys `page` / `perPage`, configurable via `urlKeys`):

```ts
import {
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryStates
} from 'nuqs'

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(10)
}
const paginationUrlKeys = {
  pageIndex: 'page',
  pageSize: 'perPage'
}

export function usePaginationSearchParams() {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys
  })
}
```

## Notes

- The Filtering and Sorting sections of the official page are empty for now (contributions welcome).
- The code above is taken from the string template in the page's interactive demo source (`tanstack-table.generator.tsx`); the page itself renders it as an interactive widget.
- The `'perPage'` / `'page'` values are the demo's defaults; the demo lets you edit them.
- Source: https://nuqs.dev/docs/parsers/community/tanstack-table (nuqs v2.10.2).

## Related

- [Built-in parsers](./built-in.md)
- [Custom parsers](./custom.md)
