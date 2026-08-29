---
source: https://tanstack.com/table/latest/docs/framework/react/guide/row-selection, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/row-selection/rowSelectionFeature.types.ts
---

# Row Selection

Row selection state, options, and row/table selection APIs, provided by `rowSelectionFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowSelectionFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ rowSelectionFeature })

const table = useTable({
  features,
  columns,
  data,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableRowRangeSelection` | `boolean` | Enables inclusive row range selection via `row.getToggleSelectedHandler()` (default `true`). |
| `enableMultiRowSelection` | `boolean \| ((row) => boolean)` | Allows rows to be selected alongside other rows (default `true`). |
| `enableRowSelection` | `boolean \| ((row) => boolean)` | Allows rows to be selected (default `true`). |
| `enableSubRowSelection` | `boolean \| ((row) => boolean)` | Controls whether selecting a parent also selects its subRows (default `true`). |
| `isRowRangeSelectionEvent` | `(event: unknown) => boolean` | Determines whether an event should select/deselect an inclusive range; defaults to detecting `shiftKey`. |
| `onRowSelectionChange` | `OnChangeFn<RowSelectionState>` | Called with an updater when `state.rowSelection` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `rowSelection` | `RowSelectionState` | Map of selected row ids. |

## Row APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanMultiSelect` | `() => boolean` | Whether this row can be selected alongside other rows. |
| `getCanSelect` | `() => boolean` | Whether this row can currently be selected. |
| `getCanSelectSubRows` | `() => boolean` | Whether selecting this row also selects its subRows. |
| `getIsAllSubRowsSelected` | `() => boolean` | Whether all selectable descendants are selected. |
| `getIsSelected` | `() => boolean` | Whether this row id is selected. |
| `getIsSomeSelected` | `() => boolean` | Whether some selectable descendants are selected. |
| `getToggleSelectedHandler` | `(opts?) => (event) => void` | Checkbox-style handler that toggles this row's selected state. |
| `toggleSelected` | `(value?: boolean, opts?) => void` | Selects/deselects the row. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getFilteredSelectedRowModel` | `() => RowModel` | Selected-row model built from filtered rows. |
| `getGroupedSelectedRowModel` | `() => RowModel` | Selected-row model built from grouped rows. |
| `getSelectedRowIds` | `() => Array<string>` | Ids of all selected rows. |
| `getIsAllPageRowsSelected` | `() => boolean` | Whether every selectable row on the current page is selected. |
| `getIsAllRowsSelected` | `() => boolean` | Whether every selectable filtered row is selected. |
| `getIsSomePageRowsSelected` | `() => boolean` | Whether at least one row on the current page is selected. |
| `getIsSomeRowsSelected` | `() => boolean` | Whether at least one row id is selected. |
| `getPreSelectedRowModel` | `() => RowModel` | Core row model before row selection is applied. |
| `getSelectedRowModel` | `() => RowModel` | Selected-row model built from the core row model. |
| `getToggleAllPageRowsSelectedHandler` | `() => (event) => void` | Handler that toggles all current-page rows. |
| `getToggleAllRowsSelectedHandler` | `() => (event) => void` | Handler that toggles all selectable rows. |
| `resetRowSelection` | `(defaultState?: boolean) => void` | Resets `rowSelection` to `initialState.rowSelection` (or `{}` when `true`). |
| `setRowSelection` | `(updater: Updater<RowSelectionState>) => void` | Updates row selection state. |
| `toggleAllPageRowsSelected` | `(value?: boolean, opts?: { deselectAll?: boolean }) => void` | Selects/deselects all rows on the current page. |
| `toggleAllRowsSelected` | `(value?: boolean, opts?: { deselectAll?: boolean }) => void` | Selects/deselects all rows in the table. |

## Notes

- Not the same feature as `cell-selection` (spreadsheet-style cell range selection); they are separate features and can be used together.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/row-selection . Options/State/APIs source: `packages/table-core/src/features/row-selection/rowSelectionFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [row-pinning.md](./row-pinning.md)
- [cell-selection.md](./cell-selection.md)
