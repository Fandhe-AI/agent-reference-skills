---
source: https://tanstack.com/table/latest/docs/framework/react/guide/fuzzy-filtering
---

# Global Filtering (with fuzzy search)

Wire a single search box across all columns, optionally using `@tanstack/match-sorter-utils` for fuzzy/approximate matching.

```tsx
import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn, RowData, TableFeatures } from '@tanstack/react-table'
import {
  columnFilteringFeature,
  createFilteredRowModel,
  globalFilteringFeature,
  metaHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

interface FuzzyFilterMeta { itemRank?: import('@tanstack/match-sorter-utils').RankingInfo }
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

// UI
<input
  value={table.state.globalFilter ?? ''}
  onChange={(e) => table.setGlobalFilter(String(e.target.value))}
  placeholder="Search all columns..."
/>
```

## Notes

- `globalFilteringFeature` depends on `columnFilteringFeature` — register filtering before global filtering, even if no per-column filter UI is shown.
- Fuzzy search requires the separate `@tanstack/match-sorter-utils` package; `rankItem` computes match quality, stored via `addMeta` for later use in rank-based sorting.
- Without fuzzy search, use a built-in `filterFn` (e.g. `filterFn_includesString`) as `globalFilterFn` instead of the custom function above.
- `column.getCanGlobalFilter()` tells whether a given column participates in the global filter; opt a column out with `enableGlobalFilter: false`.
