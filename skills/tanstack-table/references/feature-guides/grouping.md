---
source: https://tanstack.com/table/latest/docs/framework/react/guide/grouping
---

# Grouping

Categorizes rows into synthetic parent rows by one or more column values.

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
  groupedRowModel: createGroupedRowModel(), // client-side
  // manualGrouping: true, // server-side
})

const table = useTable({ features, columns, data })

table.setGrouping(['column1', 'column2'])
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `grouping` | `string[]` | State; column ids to group by, in order |
| `atoms.grouping` | `Atom<GroupingState>` | v9 external atom for controlled grouping |
| `onGroupingChange` | `(updater) => void` | v8-style controlled state callback |
| `groupedColumnMode` | `'reorder' \| 'remove' \| false` | Whether grouped columns move to the start or are removed |
| `manualGrouping` | `boolean` | Skips `groupedRowModel`; expects pre-grouped `data` |

## Notes

- `columnGroupingFeature` and `rowAggregationFeature` are separate features; register `rowAggregationFeature` too (plus aggregation functions) for grouped rows to compute aggregate values — see Aggregation.
- Grouping is one of three column-reordering features, applied after pinning and manual ordering: with `groupedColumnMode: 'reorder' | 'remove'`, grouped columns move to the start of the column flow.
- Pair with `rowExpandingFeature` + `expandedRowModel` to let users expand/collapse grouped rows.
- Key APIs: `column.toggleGrouping()`, `getCanGroup()`, `getIsGrouped()`, `getGroupedIndex()`; `row.getIsGrouped()`, `getGroupingValue(columnId)`; `cell.getIsGrouped()`, `getIsPlaceholder()`; `table.getGroupedRowModel()`, `getPreGroupedRowModel()`.
- No first-class server-side grouping path exists; `manualGrouping: true` expects heavy custom cell rendering to fake it.

## Related

- [Aggregation](./aggregation.md)
- [Expanding](./expanding.md)
- [Column Ordering](./column-ordering.md)
