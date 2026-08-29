---
source: https://tanstack.com/table/latest/docs/framework/react/guide/sorting, https://raw.githubusercontent.com/TanStack/table/main/packages/table-core/src/features/row-sorting/rowSortingFeature.types.ts
---

# Row Sorting

Per-column sort direction/order state, options, and column/table sorting APIs, provided by `rowSortingFeature`.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowSortingFeature,
  createSortedRowModel,
  sortFn_alphanumeric,
  sortFn_text,
  sortFn_datetime,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(), // if using client-side sorting
  // manualSorting: true, // if using manual server-side sorting
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
  },
})

const table = useTable({
  features,
  columns,
  data,
})
```

## Table Options

| Name | Type | Description |
|------|------|-------------|
| `autoResetSorting` | `boolean` | Resets sorting to initial state when `data` changes (disabled by default; `autoResetAll` overrides). |
| `enableMultiRemove` | `boolean` | Allows multi-sort toggles to remove a column from sorting state. |
| `enableMultiSort` | `boolean` | Enables/disables multi-sorting. |
| `enableSorting` | `boolean` | Enables/disables sorting for the table. |
| `enableSortingRemoval` | `boolean` | If `true`, sort cycle is `none -> desc -> asc -> none`; if `false`, `none -> desc -> asc -> desc -> asc`. |
| `isMultiSortEvent` | `(e: unknown) => boolean` | Determines whether an event should trigger a multi-sort toggle. |
| `manualSorting` | `boolean` | Enables manual/server-side sorting. |
| `maxMultiSortColCount` | `number` | Maximum number of columns that can be multi-sorted. |
| `onSortingChange` | `OnChangeFn<SortingState>` | Called with an updater when `state.sorting` changes. |
| `sortDescFirst` | `boolean` | If `true`, all sorts default to descending as their first toggle state. |

## Table State

| Name | Type | Description |
|------|------|-------------|
| `sorting` | `SortingState` | The ordered array of active column sorts. |

## Column APIs

| Name | Type | Description |
|------|------|-------------|
| `clearSorting` | `() => void` | Removes this column from sorting state. |
| `getAutoSortDir` | `() => SortDirection` | Sort direction automatically inferred from the column's values. |
| `getAutoSortFn` | `() => SortFn` | Sorting function automatically inferred from the column's values. |
| `getCanMultiSort` | `() => boolean` | Whether this column can be multi-sorted. |
| `getCanSort` | `() => boolean` | Whether this column can be sorted. |
| `getFirstSortDir` | `() => SortDirection` | The first direction used when sorting this column. |
| `getIsSorted` | `() => false \| SortDirection` | Current sort direction, or `false` if unsorted. |
| `getNextSortingOrder` | `(multi?: boolean) => SortDirection \| false` | Next sort order in the toggle cycle. |
| `getSortIndex` | `() => number` | Position in the ordered sorting state. |
| `getSortFn` | `() => SortFn` | Resolved sorting function for this column. |
| `getToggleSortingHandler` | `() => ((event) => void) \| undefined` | Handler that toggles this column's sorting state. |
| `toggleSorting` | `(desc?: boolean, isMulti?: boolean) => void` | Toggles (or forces) this column's sort state, optionally additive multi-sort. |

## Table APIs

| Name | Type | Description |
|------|------|-------------|
| `resetSorting` | `(defaultState?: boolean) => void` | Resets `sorting` to `initialState.sorting` (or `[]` when `true`). |
| `setSorting` | `(updater: Updater<SortingState>) => void` | Updates sorting state. |
| `getPreSortedRowModel` | `() => RowModel` | Row model immediately before sorting. |
| `getSortedRowModel` | `() => RowModel` | Row model after sorting has been applied. |

## Notes

- Built-in sort functions include `sortFn_alphanumeric`, `sortFn_text`, `sortFn_datetime` (registered under `sortFns`), imported alongside `rowSortingFeature`.
- Guide: https://tanstack.com/table/latest/docs/framework/react/guide/sorting . Options/State/APIs source: `packages/table-core/src/features/row-sorting/rowSortingFeature.types.ts`. React import path shown; other frameworks use the same table-core options/state/APIs.

## Related

- [row-pagination.md](./row-pagination.md)
- [column-grouping.md](./column-grouping.md)
