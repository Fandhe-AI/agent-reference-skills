---
source: https://tanstack.com/table/latest/docs/framework/react/guide/aggregation
---

# Aggregation

Computes summary values (sum, mean, count, etc.) over a set of rows, independent of grouping.

## Signature / Usage

```tsx
import {
  rowAggregationFeature,
  aggregationFn_count,
  aggregationFn_extent,
  aggregationFn_mean,
  aggregationFn_sum,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowAggregationFeature,
  aggregationFns: {
    count: aggregationFn_count,
    extent: aggregationFn_extent,
    mean: aggregationFn_mean,
    sum: aggregationFn_sum,
  },
})

const table = useTable({ features, columns, data })

columnHelper.accessor('amount', { aggregationFn: 'sum' })

// grand total, filtered but not grouped/sorted/paginated
column.getAggregationValue<number>()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `aggregationFn` | `string \| definition \| array` | Column option; single scalar result or an array for multiple named results |
| `aggregationFns` | `Record<string, AggregationFn>` | Registers named aggregation functions on `tableFeatures` |
| `maxAggregationDepth` | `number` | Column option; row-tree depth selected for the cached default `getAggregationValue()` call (default `0`) |
| `manualAggregation` | `boolean` | Disables the local fallback for `getAggregationValue()` |
| `getAggregationValue` | `(ctx) => { value } \| undefined` | Column option; supplies a server/external value, bypassing local calculation |
| `aggregatedCell` | `(ctx) => ReactNode` | Column option; renders the aggregate on a synthetic grouped row |

## Notes

- Aggregation does not require a grouped row model — grand totals and row-subset totals work on ordinary tables. Register `columnGroupingFeature` + `groupedRowModel` separately only for grouped aggregation.
- Built-in `aggregationFn`s: `sum`, `count`, `min`, `max`, `extent` (`[min, max]`), `mean`, `median`, `unique`, `uniqueCount`, `first`, `last`. `'auto'` infers `sum` for numbers, `extent` for Dates.
- `column.getAggregationValue({ rows, maxDepth })` runs over any explicit row model/subset; the no-argument default call is cached by row model, depth, registry, and column option.
- Custom aggregations use `constructAggregationFn({ aggregate, merge? })`; the `aggregate` context includes `rows` (depth-selected), `getValue`, `column`, `columnId`, `maxDepth`, `table`, and (in grouped aggregation) `groupingRow`/`subRows`.
- `cell.getIsAggregated()` belongs to `rowAggregationFeature`, not to grouping alone — a grouping-only table without aggregation does not expose it.

## Related

- [Grouping](./grouping.md)
