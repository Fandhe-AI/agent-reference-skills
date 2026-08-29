---
source: https://tanstack.com/table/latest/docs/framework/react/quick-start
---

# React Quick Start

TanStack Table is a headless table library. It manages your table's state and logic (sorting, filtering, pagination, selection, and more) while you keep full control over markup and styles.

## Signature / Usage

```tsx
import { tableFeatures, useTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

type Person = { firstName: string; lastName: string; age: number }

const data: Array<Person> = [
  { firstName: 'tanner', lastName: 'linsley', age: 24 },
]

// New in v9: declare which features this table uses
const features = tableFeatures({})

const columns: Array<ColumnDef<typeof features, Person>> = [
  { accessorKey: 'firstName', header: 'First Name', cell: (info) => info.getValue() },
  { accessorFn: (row) => row.lastName, id: 'lastName', header: () => <span>Last Name</span> },
  { accessorKey: 'age', header: () => 'Age' },
]

export function PersonTable() {
  const table = useTable({
    key: 'person-table', // needed for devtools; omit if unused
    features,
    columns,
    data,
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}><table.FlexRender cell={cell} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

Add sorting by registering `rowSortingFeature` and its row model in `tableFeatures`:

```tsx
import { createSortedRowModel, rowSortingFeature, sortFns, tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
})
```

Then wire `header.column.getToggleSortingHandler()` on the header click and read `header.column.getIsSorted()`.

## Notes

- `tableFeatures({})` declares which optional features the table uses. Registering only what you need keeps bundles small and gives TypeScript accurate instance types.
- The core row model is always included automatically; feature row models (sorting, filtering, pagination) are registered as slots on the features object.
- `table.FlexRender` renders `header`, `cell`, and `footer` definitions whether they are plain values or components.
- The `key` table option is optional unless using TanStack Table Devtools, which identify tables by `key`.
- For multiple tables sharing features/components, use `createTableHook({ features })` to derive `useAppTable` and `createAppColumnHelper` (see Composable Tables guide, not in this scope).

## Related

- [Installation](./installation.md)
- [Migrating to v9](./migrating-to-v9.md)
- [Devtools](./devtools.md)
