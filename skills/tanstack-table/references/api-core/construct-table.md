---
source: https://tanstack.com/table/latest/docs/reference/index/functions/constructTable
---

# constructTable

Constructs a table instance from normalized table internals. Wires core properties, feature prototype APIs, and instance data used by table rendering and row-model operations.

## Signature / Usage

```ts
function constructTable<TFeatures, TData>(tableOptions: TableOptions<TFeatures, TData>): Table<TFeatures, TData>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tableOptions` | `TableOptions<TFeatures, TData>` | Fully-resolved table options |

## Notes

- Low-level constructor; framework adapters (e.g. `useReactTable`) call this internally.

## Related

- [Table](./table.md)
- [TableOptions](./table-options.md)
