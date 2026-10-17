---
source: https://tanstack.com/table/latest/docs/framework/react/examples/sub-components
---

# Sub Components

Render a custom full-width detail row under an expanded row with `getRowCanExpand` and a `renderSubComponent` prop.

```tsx
import React, { Fragment } from 'react'
import {
  createColumnHelper,
  createExpandedRowModel,
  rowExpandingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type {
  ColumnDef,
  Row,
  RowData,
  TableFeatures,
} from '@tanstack/react-table'
import type { Person } from './makeData'

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
})

const columnHelper = createColumnHelper<typeof features, Person>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: 'pointer' }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      ) : (
        '🔵'
      )
    },
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    footer: (props) => props.column.id,
  }),
])

type TableProps<TFeatures extends TableFeatures, TData extends RowData> = {
  data: Array<TData>
  columns: Array<ColumnDef<TFeatures, TData>>
  renderSubComponent: (props: {
    row: Row<TFeatures, TData>
  }) => React.ReactElement
  getRowCanExpand: (row: Row<TFeatures, TData>) => boolean
}

function Table({
  columns,
  data,
  getRowCanExpand,
  renderSubComponent,
}: TableProps<typeof features, Person>): React.JSX.Element {
  const table = useTable(
    {
      debugTable: true,
      features,
      columns,
      data,
      getRowCanExpand,
    },
    (state) => state, // default selector
  )

  return (
    <table>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Fragment key={row.id}>
              <tr>
                {/* first row is a normal row */}
                {row.getAllCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </td>
                  )
                })}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  {/* 2nd row is a custom 1 cell row */}
                  <td colSpan={row.getAllCells().length}>
                    {renderSubComponent({ row })}
                  </td>
                </tr>
              )}
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

const renderSubComponent = ({ row }: { row: Row<typeof features, Person> }) => {
  return (
    <pre style={{ fontSize: '10px' }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  )
}

function App() {
  const [data, setData] = React.useState(() => makeData(10))

  return (
    <Table
      columns={columns}
      data={data}
      getRowCanExpand={() => true}
      renderSubComponent={renderSubComponent}
    />
  )
}
```

## Notes

- Trimmed from the official example: only two of the seven columns, and the header markup and regenerate buttons are omitted.
- Sub-component content is not table data: it is rendered as an extra `<tr>` with a single `<td colSpan>` when `row.getIsExpanded()`; no `getSubRows` is needed.
- `getRowCanExpand` is what makes `row.getCanExpand()` true for rows without sub rows.

## Related

- [expanding-subrows.md](./expanding-subrows.md)
- [row-pinning.md](./row-pinning.md)
