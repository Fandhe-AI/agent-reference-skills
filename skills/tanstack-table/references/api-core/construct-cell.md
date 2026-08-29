---
source: https://tanstack.com/table/latest/docs/reference/index/functions/constructCell
---

# constructCell

Constructs a cell instance from normalized table internals, wiring core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.

## Signature / Usage

```ts
function constructCell<TFeatures, TData, TValue>(
  column,
  row,
  table
): Cell<TFeatures, TData, TValue>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `column` | `Column<TFeatures, TData, TValue>` | The cell's column |
| `row` | `Row<TFeatures, TData>` | The cell's row |
| `table` | `Table_Internal<TFeatures, TData>` | Internal table instance |

## Related

- [Cell](./cell.md)
- [constructRow](./construct-row.md)
