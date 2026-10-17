---
source: https://tanstack.com/table/latest/docs/framework/react/guide/composable-tables
---

# Composable Tables (createTableHook)

`createTableHook` creates an app-specific table factory: define shared features, row models, and default options once, then create each React table with its own columns and data. It can optionally register reusable table, cell, and header components.

## Signature / Usage

```tsx
import {
  createSortedRowModel,
  createTableHook,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
})

const { useAppTable, createAppColumnHelper } = createTableHook({
  features,
  debugTable: true,
  enableSortingRemoval: false,
})

const columnHelper = createAppColumnHelper<Person>()
const columns = columnHelper.columns([
  columnHelper.accessor('firstName', { cell: (info) => info.getValue() }),
  columnHelper.accessor('age', { header: 'Age' }),
])

function UsersTable({ data }: { data: Person[] }) {
  const table = useAppTable(
    { key: 'users-table', columns, data },
    (state) => ({ sorting: state.sorting }),
  )
  // render with table.getHeaderGroups(), table.FlexRender, ...
}
```

Component registry (optional):

```tsx
export const {
  createAppColumnHelper,
  useAppTable,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHook({
  features,
  getRowId: (row) => row.id,
  tableComponents: { PaginationControls, RowCount, TableToolbar },
  cellComponents: { TextCell, NumberCell, StatusCell },
  headerComponents: { SortIndicator, ColumnFilter },
})
```

Columns reference registered components, and rendering uses the `App*` wrappers:

```tsx
personColumnHelper.accessor('firstName', {
  header: 'First Name',
  cell: ({ cell }) => <cell.TextCell />,
})

<table.AppTable selector={(state) => ({ sorting: state.sorting })}>
  {({ sorting }) => (
    <table.AppHeader header={h}>
      {(header) => <th><header.FlexRender /><header.SortIndicator /></th>}
    </table.AppHeader>
  )}
</table.AppTable>
```

## Options / Props

Returned helpers:

| Name | Description |
|------|-------------|
| `useAppTable` | Creates a table with shared features (including row model factories), defaults, and registered components |
| `createAppColumnHelper` | Creates column helpers with `TFeatures` and registered component types bound |
| `useTableContext` | Reads the current table inside registered table components |
| `useCellContext` | Reads the current cell inside registered cell components |
| `useHeaderContext` | Reads the current header/footer inside registered header components |

## Notes

- Options passed to `createTableHook` become defaults for every table from `useAppTable`; options passed to `useAppTable` override them per table.
- `features` is also bound to the column helper, so column definitions know which feature APIs exist.
- `useAppTable` returns `AppTable`, `AppHeader`, `AppCell`, and `AppFooter` wrappers; the simple path (plain `table.FlexRender` rendering) does not need them or registered components.
- Import `useTableContext`, `useCellContext`, `useHeaderContext` from the module where `createTableHook` was called so `table.PaginationControls`, `cell.TextCell`, `header.SortIndicator` are typed.
- To isolate nested table setups, create contexts with `createTableHookContexts` and pass them to `createTableHook` (see Table Context).
- Use `createTableHook` when several tables share features, row models, defaults, or conventions; use standalone `useTable` for a one-off table.

## Related

- [Table Context](./table-context.md)
- [FlexRender Guide](./flex-render.md)
- [Table State (React)](./table-state.md)
