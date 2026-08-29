---
source: https://tanstack.com/table/latest/docs/framework/react/guide/fuzzy-filtering
---

# Fuzzy Filtering

Approximate-match filtering via a custom `filterFn`, typically paired with global filtering and rank-based sorting.

## Signature / Usage

```tsx
import { rankItem } from '@tanstack/match-sorter-utils'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import type { FilterFn, RowData, TableFeatures } from '@tanstack/react-table'

interface FuzzyFilterMeta {
  itemRank?: RankingInfo
}
type FuzzyFeatures = TableFeatures & { filterMeta: FuzzyFilterMeta }

const fuzzyFilter: FilterFn<FuzzyFeatures, RowData> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta?.({ itemRank })
  return itemRank.passed
}

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { fuzzy: fuzzyFilter },
  filterMeta: metaHelper<FuzzyFilterMeta>(),
})

const table = useTable({ features, columns, data, globalFilterFn: 'fuzzy' })
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `filterFns.fuzzy` | `FilterFn` | Registered custom fuzzy filter function |
| `filterMeta` | `metaHelper<T>()` | Types the per-row filter meta (e.g. rank info) attached via `addMeta` |
| `globalFilterFn` | `'fuzzy'` | References the registered fuzzy function for global filtering |
| `filterFn` (column) | `'fuzzy'` | References the registered fuzzy function for a specific column |
| `sortFns.fuzzy` | `SortFn` | Optional companion sort function using the stored rank |

## Notes

- Requires the separate `@tanstack/match-sorter-utils` package (a fork of `match-sorter` tuned for row-by-row filtering).
- `rankItem` computes match quality; store it via the optional `addMeta` callback for later use in sorting.
- Sorting by rank reads `rowA.columnFiltersMeta[columnId]` and falls back to `sortFn_alphanumeric` when ranks are equal.
- No `declare module` augmentation needed — `filterFns`/`filterMeta`/`sortFns` are scoped per `tableFeatures()` call.
- Usable for both global filtering (`globalFilterFn: 'fuzzy'`) and individual column filtering (`filterFn: 'fuzzy'`).

## Related

- [Global Filtering](./global-filtering.md)
- [Column Filtering](./column-filtering.md)
- [Sorting](./sorting.md)
