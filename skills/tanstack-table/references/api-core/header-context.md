---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/HeaderContext
---

# HeaderContext

Context object passed to a header's render function (e.g. `header.getContext()` used with `flexRender`).

## Signature / Usage

```ts
interface HeaderContext<TFeatures, TData, TValue> {
  column: Column<TFeatures, TData, TValue>
  header: Header<TFeatures, TData, TValue>
  table: Table<TFeatures, TData>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `column` | `Column<TFeatures, TData, TValue>` | An instance of a column |
| `header` | `Header<TFeatures, TData, TValue>` | An instance of a header |
| `table` | `Table<TFeatures, TData>` | The table instance |

## Related

- [Header](./header.md)
- [CellContext](./cell-context.md)
