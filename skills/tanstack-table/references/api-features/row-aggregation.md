---
source: https://tanstack.com/table/latest/docs/framework/react/guide/aggregation, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/row-aggregation/rowAggregationFeature.types.ts
---

# Row Aggregation

Aggregation options, column definition, and column/row/cell aggregation APIs for grouped rows, provided by `rowAggregationFeature`.

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

const table = useTable({
  features,
  columns,
  data,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `manualAggregation` | `boolean` | Disables local `column.getAggregationValue()` calculation when a column override does not handle the request; used for server-supplied group values. |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `aggregatedCell` | `ColumnDefTemplate` | Renderer used for a grouped row's aggregated cell. |
| `aggregationFn` | `AggregationFnOption` | One reference for a scalar result, or an array for a keyed result object (inline definitions in an array require an explicit `id`). |
| `maxAggregationDepth` | `number` | Maximum relative sub-row depth used for grouped aggregation (default `0`). |
| `getAggregationValue` | `(context) => { value } \| undefined` | Optionally supplies a precomputed aggregation value; return `undefined` to fall back to local aggregation. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getAggregationFns` | `() => ReadonlyArray<ResolvedAggregationFn>` | Resolves the configured scalar or multiple aggregation definitions. |
| `getAggregationValue` | `<TResult>(options?) => TResult` | Aggregates over the default pre-grouped row model or a caller-provided row array. |
| `getAutoAggregationFn` | `() => AggregationFnDef \| undefined` | Infers `sum` for numeric first rows and `extent` for Date first rows. |

## Row / Cell APIs

| Name | Type | Description |
|------|------|-------------|
| `Row._aggregationValuesCache` | `Record<string, unknown>` (internal) | Cached aggregate results keyed by column id on grouped rows. |
| `Cell.getIsAggregated` | `() => boolean` | Whether this cell displays an aggregate on a synthetic grouped row. |

## Notes

- No `TableState_*` interface exists for this feature — aggregation results are derived, not stored state.
- Depends on `columnGroupingFeature` to produce grouped rows to aggregate over.
- `aggregationFn` / `aggregatedCell` (Column Definition Options above) are configured per column; this feature depends on `columnGroupingFeature` to produce the grouped rows an aggregate is computed over.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/aggregation . Options/APIs source: `packages/table-core/src/features/row-aggregation/rowAggregationFeature.types.ts`. React import path shown; table-core options/APIs are identical across frameworks.

## Related

- [column-grouping.md](./column-grouping.md)
