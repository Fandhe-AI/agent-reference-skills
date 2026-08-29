---
source: https://tanstack.com/table/latest/docs/reference/index/functions/constructColumn
---

# constructColumn

Creates a column instance by wiring core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.

## Signature / Usage

```ts
function constructColumn<TFeatures, TData, TValue>(
  table,
  columnDef,
  depth,
  parent?
): Column<TFeatures, TData, TValue>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table` | `Table_Internal<TFeatures, TData>` | Internal table instance |
| `columnDef` | `ColumnDef<TFeatures, TData, TValue>` | Column definition |
| `depth` | `number` | Nesting depth level |
| `parent` | optional | Parent column reference |

## Notes

- Low-level constructor; not typically called directly by application code.

## Related

- [Column](./column.md)
- [constructTable](./construct-table.md)
