---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createFacetedRowModel
---

# createFacetedRowModel

Creates a memoized faceted row model factory, used to compute faceted (per-column) row data for filter UIs.

## Signature / Usage

```ts
function createFacetedRowModel<TFeatures, TData>(): (table, columnId: string) => () => RowModel<TFeatures, TData>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table` | `Table<TFeatures, TData>` | Table instance |
| `columnId` | `string` | Column to compute facets for |

## Related

- [RowModel](./row-model.md)
- [createFacetedUniqueValues](./create-faceted-unique-values.md)
- [createFacetedMinMaxValues](./create-faceted-min-max-values.md)
