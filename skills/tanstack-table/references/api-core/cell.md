---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/Cell
---

# Cell

Combines core cell functionality with feature-specific type mappings.

## Signature / Usage

```ts
type Cell<TFeatures, TData, TValue> = Cell_Core<TFeatures, TData, TValue> & ExtractFeatureMapTypes<TFeatures, Cell_FeatureMap>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |
| `TValue` | `extends CellData`, defaults to `CellData` | Cell value type |

## Related

- [CellContext](./cell-context.md)
- [constructCell](./construct-cell.md)
