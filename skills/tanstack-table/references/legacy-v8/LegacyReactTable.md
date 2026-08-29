---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/LegacyReactTable
---

# LegacyReactTable

Legacy table instance type returned by `useLegacyTable`, including the v8-style `getState()`/`setState()` methods.

## Signature / Usage

```ts
type LegacyReactTable<TData extends RowData> =
  ReactTable<LegacyFeatures, TData, TableState<LegacyFeatures>> & {
    getState: () => TableState<LegacyFeatures>
    setState: (state: TableState<LegacyFeatures>) => void
  }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| getState | `() => TableState<LegacyFeatures>` | Returns the current table state. In v9, access state directly via `table.state` |
| setState | `(state: TableState<LegacyFeatures>) => void` | Sets the current table state. In v9, access state directly via `table.baseAtoms` |

## Notes

- **v9 status: present as a deprecated type alias.** Use `useTable` with explicit state selection instead (`table.state` / `table.Subscribe`).

## Related

- [useLegacyTable](./useLegacyTable.md)
- [LegacyTable](./LegacyTable.md)
