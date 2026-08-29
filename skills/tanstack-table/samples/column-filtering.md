---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-filtering
---

# Column Filtering

Filter rows by a single column's value using a registered `filterFn`, driven by a per-column text input.

```tsx
import {
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
})

const table = useTable({ features, columns, data })

// per-column filter input
function Filter({ column }: { column: ReturnType<typeof table.getColumn> }) {
  return (
    <input
      value={(column?.getFilterValue() ?? '') as string}
      onChange={(e) => column?.setFilterValue(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

## Notes

- Set a column's filter function via `columnHelper.accessor('age', { filterFn: 'inNumberRange' })`, referencing a name registered in `filterFns`, or pass a function inline.
- `table.getColumn(id)?.getFilterValue()` / `setFilterValue()` read and write the per-column entry of the `columnFilters` state array.
- For server-side filtering, set `manualFiltering: true` and skip `filteredRowModel` — the table assumes `data` is already filtered.
- Distinct from Global Filtering (single search box across columns) — see the `global-filtering` sample for that.
