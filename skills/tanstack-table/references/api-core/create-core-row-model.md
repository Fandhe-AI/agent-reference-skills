---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createCoreRowModel
---

# createCoreRowModel

Creates a memoized core row model factory. The factory reads the relevant table state atoms and options, then returns a row model function used by the table row-model pipeline.

## Signature / Usage

```ts
function createCoreRowModel<TFeatures, TData>(): (table) => () => RowModel<TFeatures, TData>;
```

```tsx
const features = tableFeatures({ coreRowModel: createCoreRowModel() })
```

## Notes

- Required baseline row model; other row models (filtered/sorted/grouped/expanded/paginated/faceted) are layered on top of it.

## Related

- [RowModel](./row-model.md)
- [tableFeatures](./table-features-fn.md)
