---
source: https://tanstack.com/table/latest/docs/framework/react/quick-start
---

# Basic Table

Render a minimal headless table with `useTable`, a declared `tableFeatures` set, and `table.FlexRender`.

```tsx
import { tableFeatures, useTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

type Person = { firstName: string; lastName: string; age: number }

const data: Array<Person> = [
  { firstName: 'tanner', lastName: 'linsley', age: 24 },
  { firstName: 'tandy', lastName: 'miller', age: 40 },
]

const features = tableFeatures({})

const columns: Array<ColumnDef<typeof features, Person>> = [
  { accessorKey: 'firstName', header: 'First Name', cell: (info) => info.getValue() },
  { accessorFn: (row) => row.lastName, id: 'lastName', header: () => <span>Last Name</span> },
  { accessorKey: 'age', header: () => 'Age' },
]

export function PersonTable() {
  const table = useTable({ key: 'person-table', features, columns, data })

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

## Notes

- `tableFeatures({})` with no entries is valid — the core row model (`table.getRowModel()`, `getHeaderGroups()`) is always included even without registering any optional feature.
- `key: 'person-table'` is only required for TanStack Table Devtools; omit it otherwise.
- `table.FlexRender` renders header/cell/footer templates whether they are plain strings or component functions — do not call `header.column.columnDef.header` directly.
- This is a headless table: no CSS or DOM structure is provided. `ark-ui` / `chakra-ui` ship pre-styled `Table` components and are a different concern from this library.
