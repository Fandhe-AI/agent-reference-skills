---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/Table
---

# Table

The table object that includes both the core table functionality and the features that are enabled via the `features` table option.

## Signature / Usage

```ts
type Table<TFeatures, TData> = Table_Core<TFeatures, TData> & ExtractFeatureMapTypes<TFeatures, Table_FeatureMap<TFeatures, TData>>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Which features (`stockFeatures` / `coreFeatures` / custom) are enabled |
| `TData` | `extends RowData` | Row data type |

## Notes

- v9 composes `Table` from `Table_Core` plus per-feature type map extraction, so the available methods/properties depend on the `features` passed to `tableFeatures()`, unlike v8's single fixed interface.

## Related

- [TableOptions](./table-options.md)
- [TableState](./table-state.md)
- [constructTable](./construct-table.md)
