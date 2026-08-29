---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createPaginatedRowModel
---

# createPaginatedRowModel

Creates a memoized paginated row model factory. The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.

## Signature / Usage

```ts
function createPaginatedRowModel<TFeatures, TData>(): (table) => () => RowModel<TFeatures, TData>;
```

## Related

- [RowModel](./row-model.md)
- [createCoreRowModel](./create-core-row-model.md)
