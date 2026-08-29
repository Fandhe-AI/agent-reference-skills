---
source: https://tanstack.com/table/latest/docs/reference/index/functions/buildHeaderGroups
---

# buildHeaderGroups

Constructs a nested header group structure for a table. The result accounts for visible leaf columns, pinned column groups, and placeholder headers needed to render multi-level headers.

## Signature / Usage

```ts
function buildHeaderGroups<TFeatures, TData, TValue>(
  allColumns,
  columnsToGroup,
  table,
  headerFamily?: "start" | "end" | "center"
): HeaderGroup<TFeatures, TData>[];
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `allColumns` | `Column[]` | All leaf columns |
| `columnsToGroup` | `Column[]` | Columns to build header groups from |
| `table` | `Table_Internal<TFeatures, TData>` | Internal table instance |
| `headerFamily` | `"start" \| "end" \| "center"` (optional) | Pinning position |

## Related

- [HeaderGroup](./header-group.md)
- [constructHeader](./construct-header.md)
