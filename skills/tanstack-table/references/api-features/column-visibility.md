---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-visibility, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/column-visibility/columnVisibilityFeature.types.ts
---

# Column Visibility

Show/hide state, options, column definition, and column/row/table visibility APIs, provided by `columnVisibilityFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnVisibilityFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnVisibilityFeature })

const table = useTable({
  features,
  columns,
  data,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `enableHiding` | `boolean` | Whether to enable column hiding (default `true`). |
| `onColumnVisibilityChange` | `OnChangeFn<ColumnVisibilityState>` | Called with an updater when `state.columnVisibility` changes. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `columnVisibility` | `ColumnVisibilityState` | Map of column id to visibility boolean. |

## Column Definition Options

| Name | Type | Description |
|------|------|-------------|
| `enableHiding` | `boolean` | Per-column opt-out of hiding. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `getCanHide` | `() => boolean` | Whether this column can be hidden. |
| `getIsVisible` | `() => boolean` | Whether this column is currently visible. |
| `getToggleVisibilityHandler` | `() => (event: unknown) => void` | Handler that toggles this column's visibility. |
| `toggleVisibility` | `(value?: boolean) => void` | Sets/toggles this column's visibility. |

## Row APIs

| Name | Type | Description |
|------|------|-------------|
| `getVisibleCells` | `() => Array<Cell>` | Cells for currently visible columns. |
| `getVisibleCellsByColumnId` | `() => Record<string, Cell>` | Visible cells keyed by column id. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `getIsAllColumnsVisible` | `() => boolean` | Whether all columns are visible. |
| `getIsSomeColumnsVisible` | `() => boolean` | Whether at least one column is visible. |
| `getToggleAllColumnsVisibilityHandler` | `() => (event: unknown) => void` | Handler that toggles all columns' visibility. |
| `getVisibleFlatColumns` | `() => Array<Column>` | Flat list of visible columns (including parents). |
| `getVisibleLeafColumns` | `() => Array<Column>` | Visible leaf columns. |
| `resetColumnVisibility` | `(defaultState?: boolean) => void` | Resets `columnVisibility` to `initialState.columnVisibility`. |
| `setColumnVisibility` | `(updater: Updater<ColumnVisibilityState>) => void` | Updates column visibility state. |
| `toggleAllColumnsVisible` | `(value?: boolean) => void` | Sets/toggles visibility for all columns. |

## Notes

- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/column-visibility . Options/State/APIs source: `packages/table-core/src/features/column-visibility/columnVisibilityFeature.types.ts`. React import path shown; table-core options/state/APIs are identical across frameworks.

## Related

- [column-ordering.md](./column-ordering.md)
- [column-pinning.md](./column-pinning.md)
