---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/ColumnMeta
---

# ColumnMeta

Extensible interface for attaching arbitrary custom metadata to a column definition.

## Signature / Usage

```ts
interface ColumnMeta<TFeatures, TData, TValue> {}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |
| `TValue` | `extends CellData`, defaults to `CellData` | Cell value type |

## Notes

- Empty by default; augment via TypeScript declaration merging to add custom fields consumed through `column.columnDef.meta`.

## Related

- [ColumnDef](./column-def.md)
- [TableMeta](./table-meta.md)
