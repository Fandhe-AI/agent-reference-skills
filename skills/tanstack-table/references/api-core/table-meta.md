---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/TableMeta
---

# TableMeta

Extensible interface for attaching arbitrary custom metadata to a table instance.

## Signature / Usage

```ts
interface TableMeta<TFeatures, TData> {}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |

## Notes

- Empty by default; augment via TypeScript declaration merging to add custom fields consumed through `table.options.meta`.

## Related

- [Table](./table.md)
- [TableOptions](./table-options.md)
