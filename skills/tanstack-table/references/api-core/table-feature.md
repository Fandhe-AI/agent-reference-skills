---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/TableFeature
---

# TableFeature

Lifecycle hooks and defaults contributed by a table feature. Feature objects are registered in the table's `features` option; they can contribute default state/options, default column definitions, table APIs, shared prototype APIs for rows/columns/headers/cells, and per-instance data.

## Signature / Usage

```ts
interface TableFeature {
  assignCellPrototype?: <TFeatures, TData>(prototype, table) => void
  assignColumnPrototype?: <TFeatures, TData>(prototype, table) => void
  assignHeaderPrototype?: <TFeatures, TData>(prototype, table) => void
  assignRowPrototype?: <TFeatures, TData>(prototype, table) => void
  constructTableAPIs?: <TFeatures, TData>(table) => void
  getDefaultColumnDef?: <TFeatures, TData, TValue>() => ColumnDefBase_All<TFeatures, TData, TValue>
  getDefaultTableOptions?: <TFeatures, TData>(table) => Partial<TableOptions_All<TFeatures, TData>>
  getInitialState?: (initialState) => TableState_All
  initCellInstanceData?: <TFeatures, TData, TValue>(cell) => void
  initColumnInstanceData?: <TFeatures, TData, TValue>(column) => void
  initHeaderGroupInstanceData?: <TFeatures, TData>(headerGroup) => void
  initHeaderInstanceData?: <TFeatures, TData, TValue>(header) => void
  initRowInstanceData?: <TFeatures, TData>(row) => void
  initTableInstanceData?: <TFeatures, TData>(table) => void
  resetTableInstanceData?: <TFeatures, TData>(table) => void
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `assignCellPrototype` | Adds feature methods to the shared cell prototype (runs lazily on first cell construction, shared by every cell instance) |
| `assignColumnPrototype` | Adds feature methods to the shared column prototype |
| `assignHeaderPrototype` | Adds feature methods to the shared header prototype |
| `assignRowPrototype` | Adds feature methods to the shared row prototype |
| `constructTableAPIs` | Adds feature APIs directly to the table instance (table is a singleton, unlike rows/columns/headers/cells) |
| `getDefaultColumnDef` | Returns default column definition options contributed by this feature, merged before `options.defaultColumn` and user column defs |
| `getDefaultTableOptions` | Returns default table options contributed by this feature (e.g. enablement flags, default updater callbacks) |
| `getInitialState` | Returns this feature's initial table state, preserving incoming `initialState` |
| `initCellInstanceData` / `initColumnInstanceData` / `initHeaderInstanceData` / `initHeaderGroupInstanceData` / `initRowInstanceData` | Initialize per-instance mutable data on a newly constructed cell/column/header/header-group/row |
| `initTableInstanceData` | Initializes mutable, non-reactive data owned by this feature on the table instance (runs once at construction) |
| `resetTableInstanceData` | Resets mutable, non-reactive table-instance data after `table.reset()` restores state atoms |

## Notes

- `assign*Prototype` hooks are for shared/memoized methods (run once per table), while `init*InstanceData` hooks are for per-instance mutable data (run per constructed row/column/header/cell).
- `constructTableAPIs` is the only place to assign table methods; it runs after every feature's `initTableInstanceData`.

## Related

- [tableFeatures](./table-features-fn.md)
- [stockFeatures](./stock-features.md)
- [coreFeatures](./core-features.md)
