---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/CellContext
---

# CellContext

Context object passed to a cell's render function (e.g. `cell.getContext()` used with `flexRender`).

## Signature / Usage

```ts
interface CellContext<TFeatures, TData, TValue> {
  cell: Cell<TFeatures, TData, TValue>
  column: Column<TFeatures, TData, TValue>
  getValue: Getter<TValue>
  renderValue: Getter<TValue | null>
  row: Row<TFeatures, TData>
  table: Table<TFeatures, TData>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cell` | `Cell<TFeatures, TData, TValue>` | The cell instance |
| `column` | `Column<TFeatures, TData, TValue>` | The cell's column |
| `getValue` | `Getter<TValue>` | Getter for the cell's resolved value |
| `renderValue` | `Getter<TValue \| null>` | Getter for the value to render (falls back to `renderFallbackValue`) |
| `row` | `Row<TFeatures, TData>` | The cell's row |
| `table` | `Table<TFeatures, TData>` | The table instance |

## Related

- [Cell](./cell.md)
- [HeaderContext](./header-context.md)
