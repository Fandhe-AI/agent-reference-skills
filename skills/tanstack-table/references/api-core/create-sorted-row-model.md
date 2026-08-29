---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createSortedRowModel
---

# createSortedRowModel

Creates a memoized sorted row model factory. The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.

## Signature / Usage

```ts
function createSortedRowModel<TFeatures, TData>(): (table) => () => RowModel<TFeatures, TData>;
```

```tsx
tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
})
```

## Notes

- Register the sorting functions you use with the `sortFns` slot on the `features` option. Importing individual `sortFn_*` functions keeps unused built-ins out of your bundle; sorting functions passed directly to the `sortFn` column option need no registration at all.

## Related

- [RowModel](./row-model.md)
- [createCoreRowModel](./create-core-row-model.md)
