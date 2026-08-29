---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createFilteredRowModel
---

# createFilteredRowModel

Creates a memoized filtered row model factory. The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.

## Signature / Usage

```ts
function createFilteredRowModel<TFeatures, TData>(): (table) => () => RowModel<TFeatures, TData>;
```

```tsx
tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
})
```

## Notes

- Register the filter functions you use with the `filterFns` slot on the `features` option. Importing individual `filterFn_*` functions keeps unused built-ins out of your bundle; filter functions passed directly to the `filterFn` column option need no registration at all.

## Related

- [RowModel](./row-model.md)
- [createCoreRowModel](./create-core-row-model.md)
