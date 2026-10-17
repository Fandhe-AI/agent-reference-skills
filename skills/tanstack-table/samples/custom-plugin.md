---
source: https://tanstack.com/table/latest/docs/framework/react/examples/custom-plugin
---

# Custom Plugin (Feature)

Define a custom table feature (state, options, APIs) with full type-safety and register it in `tableFeatures` like any stock feature.

```tsx
import React from 'react'
import {
  assignTableAPIs,
  functionalUpdate,
  makeStateUpdater,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import type {
  OnChangeFn,
  RowData,
  TableFeature,
  TableFeatures,
  Updater,
} from '@tanstack/react-table'

// TypeScript setup for our new feature with all of the same type-safety as stock TanStack Table features

// define types for our new feature's custom state
export type DensityState = 'sm' | 'md' | 'lg'
export interface TableState_Density {
  density: DensityState
}

// define types for our new feature's table options
export interface TableOptions_Density {
  enableDensity?: boolean
  onDensityChange?: OnChangeFn<DensityState>
}

// Define types for our new feature's table APIs
export interface Table_Density {
  setDensity: (updater: Updater<DensityState>) => void
  toggleDensity: (value?: DensityState) => void
}

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

// Here is all of the actual javascript code for our new feature
export const densityPlugin: TableFeature = {
  // define the new feature's initial state
  getInitialState: (initialState) => {
    return {
      density: 'md',
      ...initialState, // must come last
    }
  },

  // define the new feature's default options
  getDefaultTableOptions: (table) => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater('density', table),
    }
  },
  // if you need to add a default column definition...
  // getDefaultColumnDef: () => {},

  // define the new feature's table instance methods
  constructTableAPIs: (table) => {
    assignTableAPIs('densityPlugin', table, {
      table_setDensity: {
        fn: (updater: Updater<DensityState>) => {
          const safeUpdater: Updater<DensityState> = (old) => {
            const newState = functionalUpdate(updater, old)
            return newState
          }
          return (table.options as TableOptions_Density).onDensityChange?.(
            safeUpdater,
          )
        },
      },
      table_toggleDensity: {
        fn: (value?: DensityState) => {
          const safeUpdater: Updater<DensityState> = (old) => {
            if (value) return value
            return old === 'lg' ? 'md' : old === 'md' ? 'sm' : 'lg' // cycle through the 3 options
          }
          return (table.options as TableOptions_Density).onDensityChange?.(
            safeUpdater,
          )
        },
      },
    })
  },
}
// end of custom feature code

// app code
const features = tableFeatures({
  densityPlugin, // pass in our plugin just like any other stock feature
})

function App() {
  const [density, setDensity] = React.useState<DensityState>('md')

  const table = useTable(
    {
      features,
      columns: [],
      data: [],
      debugTable: true,
      state: {
        density, // passing the density state to the table, TS is still happy :)
      },
      onDensityChange: setDensity, // using the new onDensityChange option, TS is still happy :)
    },
    (state) => state, // default selector
  )

  return <button onClick={() => table.toggleDensity()}>Toggle Density</button>
}
```

## Notes

- Trimmed from the official example: the app code registers only `densityPlugin` with empty `columns` / `data` for brevity (the example also registers filtering, sorting and pagination features and renders a full table with density-based padding).
- `getInitialState` must spread `...initialState` last so user-provided initial state wins.
- Module augmentation (`Plugins`, `TableState_FeatureMap`, `TableOptions_FeatureMap`, `Table_FeatureMap`) is what gives the new state, options and APIs their types.

## Related

- [basic-use-app-table.md](./basic-use-app-table.md)
- [composable-tables.md](./composable-tables.md)
