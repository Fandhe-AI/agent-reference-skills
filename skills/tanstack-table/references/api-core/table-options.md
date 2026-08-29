---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/TableOptions
---

# TableOptions

Complete table options for a specific feature set, passed to `constructTable`.

## Signature / Usage

```ts
type TableOptions<TFeatures, TData> = TableOptions_Core<TFeatures, TData> & ExtractFeatureMapTypes<TFeatures, TableOptions_FeatureMap<TFeatures, TData>> & DebugOptions<TFeatures>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |

## Notes

- Combines core options, feature-specific options extracted per `TFeatures`, and `DebugOptions`, so only options relevant to enabled features type-check.

## Related

- [Table](./table.md)
- [tableOptions](./table-options-helper.md)
- [constructTable](./construct-table.md)
