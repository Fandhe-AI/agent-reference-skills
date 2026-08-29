---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/TableState
---

# TableState

Complete table state for a specific feature set.

## Signature / Usage

```ts
type TableState<TFeatures> = ExtractFeatureMapTypes<TFeatures, TableState_FeatureMap>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |

## Notes

- Dynamically constructs the state object by including only the state slices for the enabled features, plus any custom feature/plugin state.

## Related

- [Table](./table.md)
- [getInitialTableState](./get-initial-table-state.md)
