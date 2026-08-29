---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/Header
---

# Header

Combines core header functionality with feature-specific type mappings.

## Signature / Usage

```ts
type Header<TFeatures, TData, TValue> = Header_Core<TFeatures, TData, TValue> & ExtractFeatureMapTypes<TFeatures, Header_FeatureMap>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |
| `TValue` | `extends CellData`, defaults to `CellData` | Cell value type |

## Related

- [HeaderGroup](./header-group.md)
- [HeaderContext](./header-context.md)
- [constructHeader](./construct-header.md)
