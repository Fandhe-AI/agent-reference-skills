---
source: https://tanstack.com/table/latest/docs/framework/react/examples/basic-subscribe
---

# Fine-grained Subscribe

Use `Subscribe` / `table.Subscribe` to re-render only the parts of the tree that depend on specific table state or atoms.

```tsx
import React from 'react'
import { useCreateAtom } from '@tanstack/react-store'
import {
  Subscribe,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_inNumberRange,
  filterFn_includesString,
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { Person } from './makeData'
import type { RowSelectionState } from '@tanstack/react-table'

const features = tableFeatures({
  rowPaginationFeature,
  rowSelectionFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
  },
})

const columnHelper = createColumnHelper<typeof features, Person>()

/**
 * This is an example showing how to use advanced re-rendering optimizations with more fine-grained control over what is subscribed to.
 * Subscribe/table.Subscribe is a higher-order component that allows you to subscribe to the table state or individual atoms/stores.
 * This is useful for making sure that re-renders only happen at certain parts of the react tree exactly where they need to be.
 * We recommend only using these patterns when you run into specific performance issues.
 */
function App() {
  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: 'select',
          header: ({ table }) => {
            return (
              // just import Subscribe component if "react" table is not available in scope and pass in the table store as source
              <Subscribe
                source={table.store}
                // It can be difficult to know what to subscribe to, unless you understand everything that can be a state dependency for internal APIs
                // Be careful to test and validate that it re-renders when you expect it to
                selector={(state) => ({
                  columnFilters: state.columnFilters,
                  globalFilter: state.globalFilter,
                  rowSelection: state.rowSelection,
                })}
              >
                {() => (
                  <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                )}
              </Subscribe>
            )
          },
          cell: ({ row }) => (
            <Subscribe
              source={table.atoms.rowSelection} // optimize to subscribe only to the row selection atom
              selector={(rowSelection) => rowSelection[row.id]} // optimize to only re-render when the row selection changes for this row
            >
              {(isRowSelected) => (
                <input
                  type="checkbox"
                  checked={!!isRowSelected}
                  disabled={!row.getCanSelect()}
                  onChange={row.getToggleSelectedHandler()}
                />
              )}
            </Subscribe>
          ),
        }),
        columnHelper.accessor('firstName', {
          header: 'First Name',
          cell: (info) => info.getValue(),
        }),
      ]),
    [],
  )

  const [data, setData] = React.useState(() => makeData(1_000))

  // optionally, raise the selection state to your own atom
  const rowSelectionAtom = useCreateAtom<RowSelectionState>({})

  const table = useTable(
    {
      key: 'basic-subscribe', // needed for devtools
      features,
      atoms: {
        rowSelection: rowSelectionAtom,
      },
      columns,
      data,
      getRowId: (row) => row.id,
      enableRowSelection: true, // enable row selection for all rows
      debugTable: true,
    },
    () => null, // subscribe to no table state by default; use table.Subscribe below for targeted updates
  )

  return (
    <>
      <table.Subscribe source={table.atoms.globalFilter}>
        {(globalFilter) => (
          <input
            value={globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
          />
        )}
      </table.Subscribe>
      {/* Subscribe the row model to filtering and pagination only. Row selection is handled per row. */}
      <table.Subscribe
        selector={(state) => ({
          columnFilters: state.columnFilters,
          globalFilter: state.globalFilter,
          pagination: state.pagination,
        })}
      >
        {() => (
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
        )}
      </table.Subscribe>
    </>
  )
}
```

## Notes

- Trimmed from the official example: the checkbox markup is simplified from the example's `IndeterminateCheckbox` / `DebouncedInput` components, and the header, filter, pagination and devtools markup is omitted.
- The second argument of `useTable` is the selector; `() => null` subscribes to no state so only `Subscribe` boundaries re-render.
- The official guidance is to use this pattern only when you hit specific performance issues.

## Related

- [row-selection.md](./row-selection.md)
- [basic-external-atoms.md](./basic-external-atoms.md)
