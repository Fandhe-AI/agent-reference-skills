---
source: https://tanstack.com/table/latest/docs/framework/react/examples/composable-tables
---

# Composable Tables

Share features, row models and pre-bound table / cell / header components across tables with `createTableHook`.

```tsx
// hooks/table.ts
import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  createTableHook,
  filterFn_inNumberRange,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table'

// Import table-level components
import {
  PaginationControls,
  RowCount,
  TableToolbar,
} from '../components/table-components'

// Import cell-level components
import {
  CategoryCell,
  NumberCell,
  PriceCell,
  ProgressCell,
  RowActionsCell,
  SelectCell,
  StatusCell,
  TextCell,
} from '../components/cell-components'

// Import header/footer-level components (both use useHeaderContext)
import {
  ColumnFilter,
  FooterColumnId,
  FooterSum,
  SortIndicator,
} from '../components/header-components'

/**
 * Create the custom table hook with all pre-bound components.
 * This exports:
 * - createAppColumnHelper: Create column definitions with TFeatures already bound
 * - useAppTable: Hook for creating tables with TFeatures baked in
 * - useTableContext: Access table instance in tableComponents
 * - useCellContext: Access cell instance in cellComponents
 * - useHeaderContext: Access header instance in headerComponents
 */
export const {
  createAppColumnHelper,
  useAppTable,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHook({
  // Features are set once here and shared across all tables
  features: tableFeatures({
    columnFilteringFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    filteredRowModel: createFilteredRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    filterFns: {
      includesString: filterFn_includesString,
      inNumberRange: filterFn_inNumberRange,
    },
    sortFns: {
      alphanumeric: sortFn_alphanumeric,
      text: sortFn_text,
    },
  }),

  // set any default table options here too
  getRowId: (row) => row.id,

  // Register table-level components (accessible via table.ComponentName)
  tableComponents: {
    PaginationControls,
    RowCount,
    TableToolbar,
  },

  // Register cell-level components (accessible via cell.ComponentName in AppCell)
  cellComponents: {
    SelectCell,
    TextCell,
    NumberCell,
    StatusCell,
    ProgressCell,
    RowActionsCell,
    PriceCell,
    CategoryCell,
  },

  // Register header/footer-level components (accessible via header.ComponentName in AppHeader/AppFooter)
  headerComponents: {
    SortIndicator,
    ColumnFilter,
    FooterColumnId,
    FooterSum,
  },
})

// main.tsx (excerpt)
// Create column helpers with TFeatures already bound - only need TData!
const personColumnHelper = createAppColumnHelper<Person>()

function UsersTable() {
  const [data, setData] = useState(() => makeData(1000))

  const columns = useMemo(
    () =>
      // NOTE: You must use `createAppColumnHelper` instead of `createColumnHelper` when using pre-bound components like <cell.TextCell />
      personColumnHelper.columns([
        personColumnHelper.accessor('firstName', {
          header: 'First Name',
          footer: (props) => props.column.id,
          cell: ({ cell }) => <cell.TextCell />,
        }),
        personColumnHelper.accessor('age', {
          header: 'Age',
          footer: (props) => props.column.id,
          cell: ({ cell }) => <cell.NumberCell />,
        }),
      ]),
    [],
  )

  // Create the table - features and rowModels are already configured!
  const table = useAppTable(
    {
      key: 'users-table', // needed for devtools
      columns,
      data,
      debugTable: true,
      enableRowSelection: true,
      // more table options
    },
    (state) => state, // default selector
  )

  return (
    <table.AppTable>
      <table.TableToolbar title="Users Table" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((h) => (
                <table.AppHeader header={h} key={h.id}>
                  {(header) => (
                    <th colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <header.FlexRender />
                          <header.SortIndicator />
                          <header.ColumnFilter />
                        </>
                      )}
                    </th>
                  )}
                </table.AppHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((c) => (
                <table.AppCell cell={c} key={c.id}>
                  {(cell) => (
                    <td>
                      {/* Cell components are pre-bound via AppCell */}
                      <cell.FlexRender />
                    </td>
                  )}
                </table.AppCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination using pre-bound component */}
      <table.PaginationControls />

      {/* Row count using pre-bound component */}
      <table.RowCount />
    </table.AppTable>
  )
}
```

## Notes

- Trimmed from the official example: the `components/*.tsx` implementations (which read `useTableContext` / `useCellContext` / `useHeaderContext`), the select/status/progress/actions columns, footers, toolbar callbacks, devtools and the second `ProductsTable` are omitted. The snippet joins `hooks/table.ts` and an excerpt of `main.tsx` in one block.
- `createAppColumnHelper` must be used instead of `createColumnHelper` for columns that render pre-bound components such as `<cell.TextCell />`.
- Wrap the table JSX in `<table.AppTable>`; use `table.AppHeader` / `table.AppCell` / `table.AppFooter` render-props to get components bound to that header or cell.

## Related

- [basic-use-app-table.md](./basic-use-app-table.md)
- [row-selection.md](./row-selection.md)
