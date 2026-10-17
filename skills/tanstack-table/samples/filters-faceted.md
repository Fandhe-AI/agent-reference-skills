---
source: https://tanstack.com/table/latest/docs/framework/react/examples/filters-faceted
---

# Faceted Filters

Drive per-column filter UIs (range, select, autocomplete) from faceted min/max and unique values.

```tsx
import React from 'react'
import {
  columnFacetingFeature,
  columnFilteringFeature,
  createColumnHelper,
  createFacetedMinMaxValues,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_equalsString,
  filterFn_inNumberRange,
  filterFn_includesString,
  metaHelper,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { Column } from '@tanstack/react-table'
import type { Person } from './makeData'

// allows us to define custom properties for our columns
interface MyColumnMeta {
  filterVariant?: 'text' | 'range' | 'select'
}

const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    equalsString: filterFn_equalsString,
  },
  columnMeta: metaHelper<MyColumnMeta>(),
})

const columnHelper = createColumnHelper<typeof features, Person>()

function App() {
  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('age', {
          header: () => 'Age',
          meta: {
            filterVariant: 'range',
          },
        }),
        columnHelper.accessor('status', {
          header: 'Status',
          filterFn: 'equalsString', // filterFn string to pick from filterFns
          meta: {
            filterVariant: 'select',
          },
        }),
        columnHelper.accessor('progress', {
          header: 'Profile Progress',
          meta: {
            filterVariant: 'range',
          },
          filterFn: filterFn_inNumberRange, // or just reference static filterFn from import
          // you could also write your own custom filter function here
        }),
      ]),
    [],
  )

  const [data, setData] = React.useState<Array<Person>>(() => makeData(5_000))

  const table = useTable(
    {
      features,
      columns,
      data,
      // Column faceting has no table-level options; configure its row-model factories in `features`.
      // initialState: { columnFilters: [{ id: 'firstName', value: 'Jane' }] }, // set filters once
      // enableFilters: false, // disable all column and global filtering; default true
      // manualFiltering: true, // pass data that is already filtered, for example from a server
      debugTable: true,
    },
    (state) => state, // default selector
  )

  // ... render headers; for each header with column.getCanFilter(), render <Filter column={header.column} />
}

function Filter({ column }: { column: Column<typeof features, Person> }) {
  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue()

  const minMaxValues = column.getFacetedMinMaxValues()

  const sortedUniqueValues = React.useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant],
  )

  return filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        // dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : null
}
```

## Notes

- Trimmed from the official example: three of six columns, the table/pagination markup, and the `range` and free-text (`datalist` autocomplete) branches of `Filter` plus the `DebouncedInput` component (which uses `@tanstack/react-pacer`). The `range` branch reads `minMaxValues` (from `getFacetedMinMaxValues()`) for its `min` / `max` attributes.
- Register all three faceted factories (`facetedRowModel`, `facetedMinMaxValues`, `facetedUniqueValues`) in `tableFeatures`; faceting has no table-level options.
- `columnMeta: metaHelper<MyColumnMeta>()` types the custom `meta.filterVariant`.

## Related

- [column-filtering.md](./column-filtering.md)
- [basic-dynamic-columns.md](./basic-dynamic-columns.md)
