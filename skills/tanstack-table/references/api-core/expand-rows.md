---
source: https://tanstack.com/table/latest/docs/reference/index/functions/expandRows
---

# expandRows

Expands a row model according to the current expanded row state.

## Signature / Usage

```ts
function expandRows<TFeatures, TData>(rowModel: RowModel<TFeatures, TData>): RowModel<TFeatures, TData>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `TableFeatures` | Type parameter |
| `TData` | `RowData` (default `any`) | Type parameter |
| `rowModel` | `RowModel<TFeatures, TData>` | The row model to expand |

## Notes

- Expanded sub-rows are inserted into the flattened row order while preserving the original row hierarchy.
- Defined in `features/row-expanding/createExpandedRowModel.ts`.

## Related

- [createExpandedRowModel](./create-expanded-row-model.md)
- [RowModel](./row-model.md)
