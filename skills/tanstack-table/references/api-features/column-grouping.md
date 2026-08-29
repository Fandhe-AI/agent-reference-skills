---
source: https://tanstack.com/table/latest/docs/framework/react/guide/grouping, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-grouping/columnGroupingFeature.types.ts
---

# Column Grouping

Grouping state, options, column definition, and row/column/table grouping APIs, provided by `columnGroupingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnGroupingFeature,
  createGroupedRowModel,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnGroupingFeature,
  groupedRowModel: createGroupedRowModel(), // if using client-side grouping
  // manualGrouping: true, // if using manual server-side grouping
})

const table = useTable({
  features,
  columns,
  data,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableGrouping` | `boolean` | Allows columns to be grouped. |
| `groupedColumnMode` | `false \| 'reorder' \| 'remove'` | How grouping columns are repositioned; defaults to auto-reordering to the start. |
| `manualGrouping` | `boolean` | Enables manual/server-side grouping and aggregation. |
| `onGroupingChange` | `OnChangeFn<GroupingState>` | Called with an updater when `state.grouping` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `grouping` | `GroupingState` | The ordered array of column ids currently grouped by. |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `enableGrouping` | `boolean` | Allows this column to be added to grouping state (default `true`). |
| `getGroupingValue` | `(originalRow, index, row) => any` | Overrides the value used to group rows for this column. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanGroup` | `() => boolean` | Whether this column can currently be grouped. |
| `getGroupedIndex` | `() => number` | Position in the ordered grouping state. |
| `getIsGrouped` | `() => boolean` | Whether this column id is present in grouping state. |
| `getToggleGroupingHandler` | `() => () => void` | Handler that toggles the column's grouping state. |
| `toggleGrouping` | `() => void` | Toggles the column's grouping state. |

## Row APIs

| Name | Type | Description |
|------|------|-------------|
| `getGroupingValue` | `(columnId: string) => unknown` | Reads the value used to group this row for a column id. |
| `getIsGrouped` | `() => boolean` | Whether this row is a grouped (synthetic) row. |
| `groupingColumnId` | `string \| undefined` | Column id this row is grouped by, if grouped. |
| `groupingValue` | `unknown` | Shared value for `groupingColumnId` across the group's rows. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `resetGrouping` | `(defaultState?: boolean) => void` | Resets `grouping` to `initialState.grouping` (or `[]` when `true`). |
| `setGrouping` | `(updater: Updater<GroupingState>) => void` | Updates grouping state. |

## Notes

- Pair with `row-aggregation` to compute aggregate values (`aggregationFn`, `getAggregationValue`) on grouped rows.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/grouping . Options/State/APIs source: `packages/table-core/src/features/column-grouping/columnGroupingFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [row-aggregation.md](./row-aggregation.md)
- [row-sorting.md](./row-sorting.md)
