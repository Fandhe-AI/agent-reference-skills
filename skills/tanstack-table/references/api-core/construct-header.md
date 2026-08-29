---
source: https://tanstack.com/table/latest/docs/reference/index/functions/constructHeader
---

# constructHeader

Assembles a header instance by wiring core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.

## Signature / Usage

```ts
function constructHeader<TFeatures, TData, TValue>(
  table,
  column,
  options
): Header<TFeatures, TData, TValue>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table` | `Table_Internal<TFeatures, TData>` | Internal table instance |
| `column` | `Column<TFeatures, TData, TValue>` | Column definition |
| `options` | object | `{ depth, index, id?, isPlaceholder?, placeholderId? }` |

## Related

- [Header](./header.md)
- [buildHeaderGroups](./build-header-groups.md)
