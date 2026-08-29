---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/Column
---

# Column

Combines a core column definition with feature-specific type mappings.

## Signature / Usage

```ts
type Column<TFeatures, TData, TValue> = Column_Core<TFeatures, TData, TValue> & ExtractFeatureMapTypes<TFeatures, Column_FeatureMap<TFeatures, TData>>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |
| `TValue` | defaults to `unknown` | Cell value type for the column |

## Related

- [ColumnDef](./column-def.md)
- [constructColumn](./construct-column.md)
