---
source: https://tanstack.com/table/latest/docs/reference/index/functions/getInitialTableState
---

# getInitialTableState

Builds the initial table state from registered features and user initial state. Each feature supplies its default state before user-provided values are incorporated.

## Signature / Usage

```ts
function getInitialTableState<TFeatures>(features, initialState?): TableState<TFeatures>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `features` | `TFeatures` | Registered table features |
| `initialState` | `Partial<TableState<TFeatures>>` (optional) | User-provided partial initial state |

## Related

- [TableState](./table-state.md)
- [tableFeatures](./table-features-fn.md)
