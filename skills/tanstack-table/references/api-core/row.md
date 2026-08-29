---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/Row
---

# Row

Combines core row functionality with feature-specific type mappings.

## Signature / Usage

```ts
type Row<TFeatures, TData> = Row_Core<TFeatures, TData> & ExtractFeatureMapTypes<TFeatures, Row_FeatureMap<TFeatures, TData>>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |

## Related

- [RowModel](./row-model.md)
- [constructRow](./construct-row.md)
