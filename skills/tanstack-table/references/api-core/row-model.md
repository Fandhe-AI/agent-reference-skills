---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/RowModel
---

# RowModel

The output shape of a row-model factory (core, filtered, sorted, grouped, expanded, paginated, or faceted).

## Signature / Usage

```ts
interface RowModel<TFeatures, TData> {
  flatRows: Row<TFeatures, TData>[]
  rows: Row<TFeatures, TData>[]
  rowsById: Record<string, Row<TFeatures, TData>>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `rows` | `Row<TFeatures, TData>[]` | Top-level rows for this model |
| `flatRows` | `Row<TFeatures, TData>[]` | All rows including nested sub-rows, flattened |
| `rowsById` | `Record<string, Row<TFeatures, TData>>` | Row lookup by id |

## Related

- [Row](./row.md)
- [createCoreRowModel](./create-core-row-model.md)
