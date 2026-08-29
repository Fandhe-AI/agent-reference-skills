---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createFacetedMinMaxValues
---

# createFacetedMinMaxValues

Creates a memoized faceted min/max values helper for faceted filtering, enabling filter UIs to display the numeric range available in a column.

## Signature / Usage

```ts
function createFacetedMinMaxValues<TFeatures, TData>(): (table, columnId: string) => () => [number, number] | undefined;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table` | `Table<TFeatures, TData>` | Table instance |
| `columnId` | `string` | Column to compute min/max for |

## Related

- [createFacetedRowModel](./create-faceted-row-model.md)
- [createFacetedUniqueValues](./create-faceted-unique-values.md)
