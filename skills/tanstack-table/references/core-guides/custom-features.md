---
source: https://tanstack.com/table/latest/docs/framework/react/guide/custom-features
---

# Custom Plugins (Custom Features)

Extend the table with custom features that add state, options, and instance APIs the same way built-in features do. In v9, features are opt-in and declared via `tableFeatures({ ... })`.

## Signature / Usage

```ts
// 1. types
export type DensityState = 'sm' | 'md' | 'lg'
export interface TableState_Density {
  density: DensityState
}
export interface TableOptions_Density {
  enableDensity?: boolean
  onDensityChange?: OnChangeFn<DensityState>
}
export interface Table_Density {
  setDensity: (updater: Updater<DensityState>) => void
  toggleDensity: (value?: DensityState) => void
}

// 2. feature maps (declaration merging)
declare module '@tanstack/react-table' {
  interface Plugins {
    densityPlugin: TableFeature
  }
  interface TableState_FeatureMap {
    densityPlugin: TableState_Density
  }
  interface TableOptions_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    densityPlugin: TableOptions_Density
  }
  interface Table_FeatureMap<
    TFeatures extends TableFeatures,
    TData extends RowData,
  > {
    densityPlugin: Table_Density
  }
}

// 3. feature object
export const densityPlugin: TableFeature = {
  getInitialState: (initialState) => {
    return {
      density: 'md',
      ...initialState, // must come last
    }
  },
  getDefaultTableOptions: (table) => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater('density', table),
    }
  },
  constructTableAPIs: (table) => {
    assignTableAPIs('densityPlugin', table, {
      table_setDensity: {
        fn: (updater: Updater<DensityState>) => {
          const safeUpdater: Updater<DensityState> = (old) =>
            functionalUpdate(updater, old)
          return table.options.onDensityChange?.(safeUpdater)
        },
      },
    })
  },
}

// 4. use it
const features = tableFeatures({ densityPlugin })
const table = useTable({
  features,
  columns,
  data,
  state: { density },
  onDensityChange: setDensity,
})
```

## Options / Props

`TableFeature` members (all optional):

| Name | Description |
|------|-------------|
| `getDefaultTableOptions(table)` | Default table options for the feature (e.g. column resizing sets `columnResizeMode` to `"onEnd"`) |
| `getDefaultColumnDef()` | Default column options (e.g. sorting sets `sortUndefined` to `1`) |
| `getInitialState(initialState)` | Default state (e.g. pagination `pageSize` 10, `pageIndex` 0) |
| `initTableInstanceData(table)` | Mutable, non-reactive per-table data; runs once after options, atoms, and store exist |
| `resetTableInstanceData(table)` | Clears that transient data when `table.reset()` runs |
| `constructTableAPIs(table)` | Adds methods to the `table` instance |
| `assignHeaderPrototype(prototype, table)` / `initHeaderInstanceData(header)` | Shared header methods / per-header data |
| `initHeaderGroupInstanceData(headerGroup)` | Per-header-group data (no shared prototype exists) |
| `assignColumnPrototype(prototype, table)` / `initColumnInstanceData(column)` | Shared column methods / per-column data |
| `assignRowPrototype(prototype, table)` / `initRowInstanceData(row)` | Shared row methods / per-row data |
| `assignCellPrototype(prototype, table)` / `initCellInstanceData(cell)` | Shared cell methods / per-cell data |

## Notes

- Registration is by key in `tableFeatures()`; to type the custom key, merge it into `Plugins`, `TableState_FeatureMap`, `TableOptions_FeatureMap`, and `Table_FeatureMap`. Types apply only to tables whose `features` include that key.
- Features are processed in one pass in registration order; each feature's init hook runs just before its `constructTableAPIs`, so hooks may rely on earlier features.
- Reset hooks run after internally owned state atoms are restored to `table.initialState`; they do not reset state slices or externally controlled state, and `table.reset()` does not rerun `initTableInstanceData`.
- Keep API assignment in `constructTableAPIs`; init/reset hooks are for data owned by the feature.
- Header and header-group init hooks rerun on every header-group rebuild; cell init runs once per lazily constructed, cached cell.
- Building the logic alongside the table (for example plain `React.useState`) instead of as a feature remains valid.
- The docs' step-by-step example is the `custom-plugin` example.

## Related

- [Features](./features.md)
- [Table State (React)](./table-state.md)
- [Tables](./tables.md)
