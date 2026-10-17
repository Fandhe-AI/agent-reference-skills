---
source: https://tanstack.com/table/latest/docs/framework/react/examples/basic-use-app-table
---

# Basic useAppTable (createTableHook)

Create a reusable table hook factory with `createTableHook` and build a table with `useAppTable` instead of the standalone `useTable`.

```tsx
import * as React from 'react'
import { createTableHook } from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Array<Person> = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
]

// 3. New in V9! Tell the table which features and row models we want to use. In this case, this will be a basic table with no additional features
const { useAppTable, createAppColumnHelper } = createTableHook({
  features: {},
  debugTable: true,
})

// 4. Create a helper object to help define our columns
const columnHelper = createAppColumnHelper<Person>()

// 5. Define the columns for your table with a stable reference (in this case, defined statically outside of a react component)
const columns = columnHelper.columns([
  // accessorKey method (most common for simple use-cases)
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  // accessorFn used (alternative) along with a custom id
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
])

function App() {
  // 6. Store data with a stable reference
  const [data, _setData] = React.useState(() => [...defaultData])

  // 7. Create the table instance with the required columns and data.
  // Features and row models are already defined in the createTableHook call above
  const table = useAppTable(
    {
      key: 'basic-use-app-table', // needed for devtools
      debugTable: true,
      columns,
      data,
      // add additional table options here or in the createTableHook call above
    },
    (state) => state, // default selector
  )

  // 8. Render your table markup from the table instance APIs
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

## Notes

- Trimmed from the official example: only two of the six columns, no footer markup, no devtools wiring (`@tanstack/react-devtools`, `useTanStackTableDevtools`).
- `createTableHook` fixes `features` once; `createAppColumnHelper<Person>()` then needs no feature generic, unlike `createColumnHelper<typeof features, Person>()`.
- Keep `data` and `columns` at stable references (module scope or `useState`/`useMemo`).

## Related

- [basic-table.md](./basic-table.md)
- [composable-tables.md](./composable-tables.md)
