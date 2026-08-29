---
source: https://tanstack.com/table/latest/docs/framework/react/guide/expanding, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/row-expanding/rowExpandingFeature.types.ts
---

# Row Expanding

Expanded state, options, and row/table expanding APIs for hierarchical (sub-)rows, provided by `rowExpandingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowExpandingFeature,
  createExpandedRowModel,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(), // if using client-side expanding
  // manualExpanding: true, // if using manual server-side expanding
})

const table = useTable({
  features,
  columns,
  data,
  getSubRows: (row) => row.subRows,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `autoResetExpanded` | `boolean` | Enables automatic expanded-state resets when page-altering state changes. |
| `enableExpanding` | `boolean` | Allows rows with subRows to be expanded. |
| `getIsRowExpanded` | `(row) => boolean` | Overrides how a row's expanded state is determined. |
| `getRowCanExpand` | `(row) => boolean` | Overrides whether a row can be expanded. |
| `manualExpanding` | `boolean` | Enables manual/server-side row expansion. |
| `onExpandedChange` | `OnChangeFn<ExpandedState>` | Called with an updater when `state.expanded` changes. |
| `paginateExpandedRows` | `boolean` | If `true`, expanded rows are paginated with the rest of the table; if `false`, they always render on their parent's page. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `expanded` | `ExpandedState` | `true` or a row-id map describing which rows are expanded. |

## Row APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanExpand` | `() => boolean` | Whether this row can be expanded. |
| `getIsAllParentsExpanded` | `() => boolean` | Whether every ancestor of this row is expanded. |
| `getIsExpanded` | `() => boolean` | Whether this row is currently expanded. |
| `getToggleExpandedHandler` | `() => () => void` | Handler that toggles this row's expanded state. |
| `toggleExpanded` | `(expanded?: boolean) => void` | Toggles (or sets) the row's expanded state. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanSomeRowsExpand` | `() => boolean` | Whether at least one row can be expanded. |
| `getExpandedDepth` | `() => number` | The deepest expanded row id depth. |
| `getIsAllRowsExpanded` | `() => boolean` | Whether all rows in the current row model are expanded. |
| `getIsSomeRowsExpanded` | `() => boolean` | Whether any row is currently expanded. |
| `getToggleAllRowsExpandedHandler` | `() => (event) => void` | Handler that toggles all rows expanded. |
| `resetExpanded` | `(defaultState?: boolean) => void` | Resets `expanded` to `initialState.expanded` (or `{}` when `true`). |
| `setExpanded` | `(updater: Updater<ExpandedState>) => void` | Updates expanded state. |
| `toggleAllRowsExpanded` | `(expanded?: boolean) => void` | Toggles the expanded state for all rows. |
| `getExpandedRowModel` | `() => RowModel` | Row model after expanded rows have been flattened into view. |
| `getPreExpandedRowModel` | `() => RowModel` | Row model immediately before expansion. |

## Notes

- `paginateExpandedRows` interacts directly with `row-pagination`.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/expanding . Options/State/APIs source: `packages/table-core/src/features/row-expanding/rowExpandingFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [row-pagination.md](./row-pagination.md)
- [column-grouping.md](./column-grouping.md)
