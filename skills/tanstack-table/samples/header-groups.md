---
source: https://tanstack.com/table/latest/docs/framework/react/examples/header-groups
---

# Header Groups

Group columns under shared headers with `columnHelper.group` and render the multi-row header with `colSpan`.

```tsx
import * as React from 'react'
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { Person } from './makeData'

const features = tableFeatures({})

const columnHelper = createColumnHelper<typeof features, Person>()

// A traditional header group setup: every leaf column sits under a top-level
// group, so the tree is even (2 header rows) and no placeholder headers are
// created.
const basicColumns = columnHelper.columns([
  columnHelper.group({
    header: 'Name',
    columns: columnHelper.columns([
      columnHelper.accessor('firstName', {
        header: 'First Name',
        footer: 'First Name',
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        header: 'Last Name',
        footer: 'Last Name',
      }),
    ]),
  }),
  columnHelper.group({
    header: 'Stats',
    columns: columnHelper.columns([
      columnHelper.accessor('age', {
        header: 'Age',
        footer: 'Age',
      }),
      columnHelper.accessor('visits', {
        header: 'Visits',
        footer: 'Visits',
      }),
    ]),
  }),
])

function App() {
  const [data, setData] = React.useState(() => makeData(5))

  const basicTable = useTable(
    {
      debugTable: true,
      features,
      columns: basicColumns,
      data,
    },
    (state) => state, // default selector
  )

  return (
    <table>
      <thead>
        {basicTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                <basicTable.FlexRender header={header} />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {basicTable.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <basicTable.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {basicTable
          .getFooterGroups()
          .filter((footerGroup) =>
            // Only the leaf columns declare footers, so skip the group
            // row instead of rendering a blank one.
            footerGroup.headers.some(
              (header) =>
                !header.isPlaceholder && header.column.columnDef.footer,
            ),
          )
          .map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <basicTable.FlexRender footer={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
      </tfoot>
    </table>
  )
}
```

## Notes

- Trimmed from the official example: only the "Basic Header Groups" panel (two groups instead of three); the nested, placeholder and row-spanning panels are omitted.
- For uneven column trees the official example skips headers with `header.rowSpan === 0` and passes `rowSpan={header.rowSpan}` to `<th>`.
- Wrap nested `columns` arrays in `columnHelper.columns([...])` so TypeScript keeps one `TValue` generic.

## Related

- [basic-table.md](./basic-table.md)
- [column-visibility-ordering.md](./column-visibility-ordering.md)
