---
source: https://tanstack.com/table/latest/docs/reference/index/functions/tableFeatures
---

# tableFeatures

Helper function to define the features to be imported and applied to a table instance, with proper type inference. Consolidates feature modules, row model factories (sorting/filtering/etc.), function registries validating string-based configuration values, and type declarations for `tableMeta`/`columnMeta` without requiring global type merging.

## Signature / Usage

```tsx
const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
})
```

## Notes

- Recommended to call statically outside of a component for consistent inference and to avoid re-initialization.
- Returns a fully-typed features object passed to the framework adapter (e.g. `useReactTable`).

## Related

- [TableFeature](./table-feature.md)
- [stockFeatures](./stock-features.md)
- [coreFeatures](./core-features.md)
