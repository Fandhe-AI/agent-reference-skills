---
source: https://tanstack.com/table/latest/docs/framework/react/guide/aggregation
---

# Grouping with Aggregation

Group rows by a column's value and compute per-group aggregate values (e.g. sum) on other columns.

```tsx
import {
  columnGroupingFeature,
  createColumnHelper,
  createExpandedRowModel,
  createGroupedRowModel,
  rowAggregationFeature,
  rowExpandingFeature,
  aggregationFn_sum,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnGroupingFeature,
  groupedRowModel: createGroupedRowModel(),
  rowAggregationFeature,
  aggregationFns: { sum: aggregationFn_sum },
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
})

const columnHelper = createColumnHelper<typeof features, Order>()

const columns = columnHelper.columns([
  columnHelper.accessor('customer', {}),
  columnHelper.accessor('amount', {
    aggregationFn: 'sum',
    aggregatedCell: ({ getValue }) => `Total: ${getValue()}`,
  }),
])

const table = useTable({ features, columns, data })

table.setGrouping(['customer'])

// cell rendering
<td><table.FlexRender cell={cell} /></td>
```

## Notes

- `columnGroupingFeature` (grouping) and `rowAggregationFeature` (computing summary values) are separate features — register both plus `aggregationFns` for grouped-row totals.
- `aggregatedCell` is a column-def option that renders the aggregate on a synthetic grouped row; `table.FlexRender` reads whichever renderer the column def resolves for that cell.
- Aggregation does not require grouping: `column.getAggregationValue()` also computes grand totals over an ungrouped table.
- Built-in `aggregationFn`s: `sum`, `count`, `min`, `max`, `extent`, `mean`, `median`, `unique`, `uniqueCount`, `first`, `last`; `'auto'` infers `sum` for numbers and `extent` for `Date`. Pair with `rowExpandingFeature` + `expandedRowModel` so users can expand/collapse the synthetic group rows.
