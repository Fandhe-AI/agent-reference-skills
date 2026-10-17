---
source: https://tanstack.com/table/latest/docs/framework/react/examples/basic-dynamic-columns
---

# Dynamic Columns

Derive columns, sort fns and filter fns at runtime from the keys and value types of unknown-shaped data.

```tsx
import * as React from 'react'
import {
  columnFacetingFeature,
  columnFilteringFeature,
  createFacetedMinMaxValues,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_inNumberRange,
  filterFn_includesString,
  metaHelper,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type {
  ColumnDef,
  FilterFn,
  FilterFnOption,
  SortFnOption,
} from '@tanstack/react-table'

// 1. Treat each row as an object of unknown shape
type DynamicRow = Record<string, unknown>

// The runtime-detected data type for a column, stored in its meta.
type DataType = 'string' | 'number' | 'boolean' | 'date'

// allows us to attach the detected data type to each column
interface DynamicColumnMeta {
  dataType: DataType
}

// 2. New in V9! Tell the table which features, row models, and fn registries we use.
const features = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  columnFacetingFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(), // powers the enum select options
  facetedMinMaxValues: createFacetedMinMaxValues(), // powers the numeric range hints
  // register only the built-in sort fns we reference by name
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
  },
  // register only the built-in filter fns we reference by name
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
  },
  columnMeta: metaHelper<DynamicColumnMeta>(),
})

// Turn a data key like "firstName" into a readable header like "First Name"
function formatHeader(key: string) {
  const withSpaces = key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase
    .replace(/[_-]+/g, ' ') // split snake_case / kebab-case
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

// Inspect a sample value for a key and decide its data type.
function detectDataType(data: Array<DynamicRow>, key: string): DataType {
  const sample = data.find((row) => row[key] != null)?.[key]
  if (sample instanceof Date) return 'date'
  if (typeof sample === 'boolean') return 'boolean'
  if (typeof sample === 'number') return 'number'
  return 'string'
}

// Pick a built-in sort fn (by name) based on the data type.
function getSortFn(dataType: DataType): SortFnOption<typeof features, any> {
  switch (dataType) {
    case 'number':
    case 'boolean':
      return 'basic'
    case 'date':
      return 'datetime'
    case 'string':
    default:
      return 'alphanumeric'
  }
}

function App() {
  const [data, setData] = React.useState<Array<DynamicRow>>(() =>
    makeData(1_000),
  )

  // 3. Derive the columns from the keys of the data instead of hard-coding them.
  const columns = React.useMemo<
    Array<ColumnDef<typeof features, DynamicRow>>
  >(() => {
    if (data.length === 0) return []
    return Object.keys(data[0]).map(
      (key): ColumnDef<typeof features, DynamicRow> => {
        const dataType = detectDataType(data, key)
        return {
          accessorKey: key,
          header: formatHeader(key),
          meta: { dataType },
          sortFn: getSortFn(dataType),
          // ... filterFn: getFilterFn(dataType), cell: renderValue(...) ...
        }
      },
    )
  }, [data])

  // 4. Create the table instance with the derived columns and data
  const table = useTable(
    {
      key: 'basic-dynamic-columns', // needed for devtools, omit if you don't want to use the devtools
      debugTable: true,
      features,
      columns,
      data,
    },
    (state) => state, // default selector
  )
}
```

## Notes

- Trimmed from the official example: `getFilterFn`, `renderValue`, the custom `booleanFilterFn` / `dateRangeFilterFn`, the per-type `Filter` component and table markup are omitted (the `// ...` line marks the cut in the column definition).
- Faceting (`facetedUniqueValues`, `facetedMinMaxValues`) supplies the select options and numeric range hints; no hand-rolled scan of the data is needed.
- `columnMeta: metaHelper<DynamicColumnMeta>()` types `column.columnDef.meta`.

## Related

- [column-filtering.md](./column-filtering.md)
- [sorting.md](./sorting.md)
