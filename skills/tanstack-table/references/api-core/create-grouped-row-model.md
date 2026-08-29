---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createGroupedRowModel
---

# createGroupedRowModel

Creates a memoized grouped row model factory. The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.

## Signature / Usage

```ts
function createGroupedRowModel<TFeatures, TData>(): (table) => () => RowModel<TFeatures, TData>;
```

## Notes

- When `rowAggregationFeature` is also registered, grouped rows use its shared executor for non-group values. Grouping remains useful without aggregation.

## Related

- [RowModel](./row-model.md)
- [createCoreRowModel](./create-core-row-model.md)
