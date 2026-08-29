---
source: https://tanstack.com/table/latest/docs/framework/react/guide/use-legacy-table
---

# useLegacyTable Guide

`useLegacyTable` is a **deprecated** compatibility layer that accepts the v8-style API while running on v9 internals, for teams that need to migrate incrementally or have large codebases where a full migration isn't immediately practical.

## Signature / Usage

```tsx
import { useState } from 'react'
import { flexRender } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  legacyCreateColumnHelper,
  useLegacyTable,
} from '@tanstack/react-table/legacy'
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import type { LegacyColumnDef } from '@tanstack/react-table/legacy'

interface Person {
  name: string
  email: string
  age: number
}

const columnHelper = legacyCreateColumnHelper<Person>()

const columns: LegacyColumnDef<Person>[] = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('age', { header: 'Age' }),
]

function MyTable({ data }: { data: Person[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  // useLegacyTable accepts the v8-style API
  const table = useLegacyTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  })

  return (
    <table>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

## Options / Props

| Type / Helper | Description |
| --- | --- |
| `LegacyColumnDef<TData>` | Column definition type (equivalent to v8's `ColumnDef<TData>`) |
| `LegacyColumn<TData>` | Column instance type |
| `LegacyRow<TData>` | Row instance type |
| `LegacyCell<TData>` | Cell instance type |
| `LegacyTable<TData>` | Table instance type |
| `legacyCreateColumnHelper<TData>()` | Column helper with `StockFeatures` pre-bound; only requires `TData` (use instead of `createColumnHelper`) |

Row model functions (`getCoreRowModel`, `getFilteredRowModel`, `getSortedRowModel`, `getPaginationRowModel`, `getExpandedRowModel`, `getGroupedRowModel`, `getFacetedRowModel`, `getFacetedMinMaxValues`, `getFacetedUniqueValues`) are imported from `@tanstack/react-table/legacy`, not the main package.

## Notes

- **Deprecated**: intended only as a temporary migration aid; will be removed in a future major version. It includes all features by default, so the bundle is much larger than the tree-shakeable v9 API.
- **Full-state subscription only**: the component creating the table re-renders on every state change, like v8; v9's fine-grained `useTable` selector optimizations are not available.
- **No `createTableHook` integration**: cannot be combined with `createTableHook`; migrate to the full v9 API for reusable table configurations.
- **Sorting function rename**: custom `sortingFn` (v8) becomes `sortFn` (v9); the legacy adapter handles this internally only for built-in sorting.
- Migration path to full v9: replace `useLegacyTable` with `useTable`, define `features` via `tableFeatures()`, convert `get*RowModel()` options to row model factories on the features object, and update `Legacy*` types to the standard v9 types.

## Related

- [Migrating to v9](./migrating-to-v9.md)
- [React Quick Start](./quick-start.md)
