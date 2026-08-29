---
source: https://tanstack.com/table/latest/docs/reference/index/functions/constructRow
---

# constructRow

Constructs a row instance from normalized table internals, wiring core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.

## Signature / Usage

```ts
function constructRow<TFeatures, TData>(
  table,
  id,
  original,
  rowIndex,
  depth,
  subRows?,
  parentId?
): Row<TFeatures, TData>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table` | `Table_Internal<TFeatures, TData>` | Internal table instance |
| `id` | `string` | Row identifier |
| `original` | `TData` | Original data object |
| `rowIndex` | `number` | Position within the table |
| `depth` | `number` | Nesting level |
| `subRows` | optional | Child row instances |
| `parentId` | optional | Parent row identifier |

## Related

- [Row](./row.md)
- [createCoreRowModel](./create-core-row-model.md)
