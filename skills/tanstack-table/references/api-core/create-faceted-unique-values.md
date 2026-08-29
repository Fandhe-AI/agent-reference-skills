---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createFacetedUniqueValues
---

# createFacetedUniqueValues

Creates a memoized faceted unique values helper for faceted filtering. The returned function derives facet data from the table row model and relevant filter state so filter UIs can display available values.

## Signature / Usage

```ts
function createFacetedUniqueValues<TFeatures, TData>(): (table, columnId: string) => () => Map<any, number>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table` | `Table<TFeatures, TData>` | Table instance |
| `columnId` | `string` | Column to compute unique values for |

## Related

- [createFacetedRowModel](./create-faceted-row-model.md)
- [createFacetedMinMaxValues](./create-faceted-min-max-values.md)
