---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-pinning
---

# Column Pinning

Pins columns to logical `start` or `end` regions, either via sticky CSS in one table or split tables.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnPinningFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnPinningFeature })

const table = useTable({
  features,
  columns,
  data,
  initialState: {
    columnPinning: {
      start: ['expand-column'],
      end: ['actions-column'],
    },
  },
})

table.setColumnPinning({ start: ['firstName'], end: ['actions'] })
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `columnPinning` | `{ start: string[]; end: string[] }` | State; pinned column ids per region |
| `initialState.columnPinning` | `{ start: string[]; end: string[] }` | Default pinned columns |
| `atoms.columnPinning` | `Atom<ColumnPinningState>` | v9 external atom for controlled pinning |
| `onColumnPinningChange` | `(updater) => void` | v8-style controlled state callback |

## Notes

- `start`/`end` are logical regions: `start` is left / `end` is right in LTR, reversed in RTL.
- Column pinning is applied first among the three reordering features (pinning → manual ordering → grouping); only `columnPinning.start`/`.end` can reorder pinned columns themselves.
- Useful APIs: `column.getCanPin`, `column.pin`, `column.getIsPinned`, `column.getPinnedIndex`, `column.getStart`, `column.getAfter`, `column.getIsFirstColumn`/`getIsLastColumn` (within pinned group).
- Region-scoped table accessors exist for split-table rendering: `table.getStartHeaderGroups`/`getCenterHeaderGroups`/`getEndHeaderGroups`, `row.getStartVisibleCells`/`getCenterVisibleCells`/`getEndVisibleCells`, plus `table.getPinnedLeafColumns(position)`.
- `table.resetColumnPinning(true)` clears both pinned arrays entirely.

## Related

- [Column Ordering](./column-ordering.md)
- [Column Sizing](./column-sizing.md)
