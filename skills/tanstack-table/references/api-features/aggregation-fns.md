---
source: https://tanstack.com/table/latest/docs/reference/index/variables/aggregationFns, https://tanstack.com/table/latest/docs/reference/index/interfaces/AggregationFnDef, https://tanstack.com/table/latest/docs/reference/index/functions/constructAggregationFn
---

# aggregationFns / AggregationFnDef / constructAggregationFn / Aggregation* contexts

Context-based aggregation definitions (`AggregationFnDef`), the builder `constructAggregationFn`, the deprecated built-in registry `aggregationFns`, and the context / option / result types of `rowAggregationFeature`.

## Signature / Usage

```ts
function constructAggregationFn<TFeatures, TData, TValue, TResult>(
  definition,
): AggregationFnDef<TFeatures, TData, TValue, TResult>;

aggregate: (context: AggregationContext<TFeatures, TData, TValue>) => TResult;
merge?: (context: AggregationMergeContext<TFeatures, TData, TValue, TResult>) => TResult;
```

```ts
type AggregationFnOption<TFeatures, TData, TValue> =
  | AggregationFnRef<TFeatures, TData, TValue, any>
  | ReadonlyArray<AggregationFnListItem<TFeatures, TData, TValue>>;

type BuiltInAggregationFn = keyof typeof aggregationFns;
```

## Options / Props

`AggregationFnDef<TFeatures, TData, TValue, TResult>`:

| Name | Type | Description |
|------|------|-------------|
| `aggregate` | `(context: AggregationContext) => TResult` | Computes a result directly from the selected `rows`. |
| `merge?` | `(context: AggregationMergeContext) => TResult` | Combines already-computed immediate sub-row results. When omitted, nested grouping falls back to `aggregate` over the group's selected rows. |

`AggregationContext<TFeatures, TData, TValue>` (values available while one aggregation is evaluated):

| Name | Type | Description |
|------|------|-------------|
| `column` | `Column<TFeatures, TData, TValue>` | The column whose values are being aggregated. |
| `columnId` | `string` | Convenience alias for `column.id`. |
| `getValue` | `(row) => TValue` | Reads this column's value from one of `rows`. |
| `groupingRow?` | `Row<TFeatures, TData>` | The synthetic grouped row receiving this result; omitted for root or caller-supplied-row aggregation. Its `depth` identifies the grouping level. |
| `maxDepth` | `number` | Maximum relative sub-row depth used to select `rows`. |
| `rows` | `readonly Row<TFeatures, TData>[]` | Unique rows selected at `maxDepth`. Branches that end before `maxDepth` contribute their deepest available row. |
| `subRows?` | `readonly Row<TFeatures, TData>[]` | Immediate sub-rows for grouped aggregation; omitted for root or caller-supplied-row aggregation. At a terminal grouping level these are the direct data rows; at a nested level they are sub-row groups. |
| `table` | `Table<TFeatures, TData>` | The table that owns the column and rows. |

`AggregationMergeContext` extends `AggregationContext` with:

| Name | Type | Description |
|------|------|-------------|
| `subRowResults` | `readonly TResult[]` | Results produced for each immediate sub-row group, in sub-row order. |
| `subRows` | `readonly Row<TFeatures, TData>[]` | Immediate sub-row groups corresponding to `subRowResults` (required here). |

`AggregationFnDescriptor<TFeatures, TData, TValue, TResult>` (gives a reference a stable key in a multiple result):

| Name | Type | Description |
|------|------|-------------|
| `aggregationFn` | `AggregationFnRef<TFeatures, TData, TValue, TResult>` | The named, automatic, or inline definition to execute. |
| `id` | `string` | Stable key used in the object returned by a multiple aggregation. |

`AggregationValueContext<TFeatures, TData, TValue>` (passed to a column-level aggregation-value provider): `column`, `maxDepth: number`, `rows?` (caller-provided rows, or `undefined` for the default row model), `table`.

`AggregationValueResult<TResult>`: `value: TResult` — marks an aggregation-value override as handled; `undefined` is still a handled result.

`aggregationFns` keys: `count` (number), `extent` (`[RangeValue | undefined, RangeValue | undefined]`), `first` (unknown), `last` (unknown), `max` (`RangeValue | undefined`), `mean` (`number | undefined`), `median` (`number | undefined`), `min` (`RangeValue | undefined`), `sum` (number), `unique` (`unknown[]`), `uniqueCount` (number). Each is `aggregationFn_<name>`.

## Notes

- `aggregationFns` (the full built-in registry) is deprecated: import individual `aggregationFn_*` definitions instead for a smaller bundle. The registry remains available for compatibility.
- `AggregationFns` is a declaration-merging fallback interface for named aggregation definitions.
- `AggregationFnOption` is a scalar aggregation reference or a list that produces a keyed object. `AggregationResult<TOption, TFeatures>` infers the scalar or keyed result produced by an option.
- Source: tanstack-table docs reference for table-core 9.3.1.

## Related

- [row-aggregation.md](./row-aggregation.md)
- [column-grouping.md](./column-grouping.md)
- [sort-fns.md](./sort-fns.md)
