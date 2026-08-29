---
source: https://tanstack.com/table/latest/docs/framework/react/guide/sorting
---

# Sorting

Client-side and manual server-side row sorting, with single or multi-column sort state.

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
  sortedRowModel: createSortedRowModel(), // client-side sorting
  // manualSorting: true, // server-side sorting
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

table.state.sorting // reactive read in render
table.atoms.sorting.get() // snapshot read in event handlers
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `enableSorting` | `boolean` | Column or table option; disables sorting |
| `sortDescFirst` | `boolean` | Column or table option; first toggle direction is descending |
| `invertSorting` | `boolean` | Column option; inverts sort order (e.g. rank scales) |
| `sortUndefined` | `'first' \| 'last' \| 1 \| -1 \| false` | Column or table option; placement of undefined values |
| `enableSortingRemoval` | `boolean` | Table option; allows cycling back to unsorted state |
| `enableMultiSort` | `boolean` | Column or table option; disables multi-column sorting |
| `isMultiSortEvent` | `(e) => boolean` | Table option; customizes the multi-sort trigger event |
| `maxMultiSortColCount` | `number` | Table option; limits number of columns sorted at once |
| `enableMultiRemove` | `boolean` | Table option; disables removing multi-sorts |
| `manualSorting` | `boolean` | Table option; disables client-side sorted row model |
| `autoResetSorting` | `boolean` | Table option; resets sorting when `data` reference changes |
| `sortFn` | `SortFn \| string` | Column option; custom sort function or registry key |

## Notes

- Sorting state shape: `{ id: string; desc: boolean }[]`.
- v9 recommends an external atom via the `atoms` table option for controlled sorting; the v8-style `state.sorting` + `onSortingChange` pattern still works.
- Built-in `sortFn`s: `alphanumeric`, `alphanumericCaseSensitive`, `text`, `textCaseSensitive`, `datetime`, `basic`.
- `constructSortFn` builds a sort function from a `sort` comparator plus an optional `resolveDataValue` normalizer.
- Sorting should run over the same dataset as filtering/pagination; if the server paginates or filters, client-side sorting only affects the loaded subset.

## Related

- [Pagination](./pagination.md)
- [Column Filtering](./column-filtering.md)
- [Grouping](./grouping.md)
