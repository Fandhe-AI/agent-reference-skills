---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/ColumnHelper
---

# ColumnHelper

Interface of helper methods for creating `ColumnDef` values, returned by `createColumnHelper`.

## Signature / Usage

```ts
interface ColumnHelper<TFeatures, TData> {
  accessor(accessorKeyOrFn, columnDef): AccessorColumnDef<TFeatures, TData, TValue>
  display(columnDef): DisplayColumnDef<TFeatures, TData, unknown>
  group(columnDef): GroupColumnDef<TFeatures, TData, unknown>
  columns(columnDefs): ColumnDef<TFeatures, TData, unknown>[]
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `accessor` | Creates a data column definition with an accessor key or function to extract the cell value |
| `display` | Creates a display column definition for non-data columns (e.g. actions, row selection) |
| `group` | Creates a group column definition containing nested child columns |
| `columns` | Wraps an array of column definitions to preserve each column's individual `TValue` type |

## Related

- [createColumnHelper](./create-column-helper.md)
- [ColumnDef](./column-def.md)
