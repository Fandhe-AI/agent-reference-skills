---
source: https://tanstack.com/table/latest/docs/framework/react/guide/row-selection
---

# Row Selection

Tracks which rows are selected, with checkbox/radio-style toggling, sub-row cascading, and Shift-range selection.

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
  getRowId: (row) => row.uuid, // stable row id for selection state
})

table.state.rowSelection // { [rowId]: true | false }
row.getToggleSelectedHandler()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `rowSelection` | `Record<string, boolean>` | State keyed by row id |
| `atoms.rowSelection` | `Atom<RowSelectionState>` | v9 external atom for controlled selection |
| `onRowSelectionChange` | `(updater) => void` | v8-style controlled state callback |
| `getRowId` | `(row) => string` | Table option; keys selection state by a stable id instead of index |
| `enableRowSelection` | `boolean \| (row) => boolean` | Enables/restricts which rows can be selected |
| `enableMultiRowSelection` | `boolean \| (row) => boolean` | `false` restricts to single selection (radio-style) |
| `enableSubRowSelection` | `boolean \| (row) => boolean` | `false` disables cascading selection to sub-rows |
| `enableRowRangeSelection` | `boolean` | Disables Shift-range selection |
| `isRowRangeSelectionEvent` | `(event) => boolean` | Customizes the Shift-range trigger modifier |

## Notes

- By default row id is `row.index`; set `getRowId` to a stable field for selection state that survives sorting/filtering/pagination.
- With `manualPagination`, `getSelectedRowModel()` only returns rows present in the current page's `data`; the `rowSelection` state itself can still hold ids not in the current page.
- Selecting a parent row selects its selectable descendants by default; deselecting a child does not remove the parent id unless `deselectParents: true` is passed to the toggle handler/API.
- Shift-range selection follows the table's current logical display order (filtering/sorting/grouping/expansion); the anchor persists across those changes but resets on `resetRowSelection`, select-all, or `table.reset()`. Pass `selectChildren: false` to affect only rows explicitly in the display-order interval.
- Key APIs: `row.getIsSelected()`, `getIsSomeSelected()`, `getCanSelect()`, `getToggleSelectedHandler()`; `table.getToggleAllRowsSelectedHandler()`, `getToggleAllPageRowsSelectedHandler()`, `getSelectedRowModel()`, `getFilteredSelectedRowModel()`, `getGroupedSelectedRowModel()`.

## Related

- [Cell Selection](./cell-selection.md)
- [Row Pinning](./row-pinning.md)
- [Expanding](./expanding.md)
