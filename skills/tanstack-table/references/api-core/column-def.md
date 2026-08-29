---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/ColumnDef
---

# ColumnDef

Union type representing one of three column definition structures: display, group, or accessor-based.

## Signature / Usage

```ts
type ColumnDef<TFeatures, TData, TValue> =
  | DisplayColumnDef<TFeatures, TData, TValue>
  | GroupColumnDef<TFeatures, TData, TValue>
  | AccessorColumnDef<TFeatures, TData, TValue>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |
| `TValue` | `extends CellData`, defaults to `CellData` | Cell value type |

## Notes

- Prefer building `ColumnDef` values via `createColumnHelper` rather than authoring the union manually, for stronger inference.

## Related

- [ColumnHelper](./column-helper.md)
- [createColumnHelper](./create-column-helper.md)
- [ColumnMeta](./column-meta.md)
