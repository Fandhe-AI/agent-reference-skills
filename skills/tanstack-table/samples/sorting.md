---
source: https://tanstack.com/table/latest/docs/framework/react/guide/sorting
---

# Sorting

Toggle single/multi-column client-side sorting by registering `rowSortingFeature` and a sorted row model.

```tsx
import {
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
})

const table = useTable({ features, columns, data })

// header cell
<th onClick={header.column.getToggleSortingHandler()}>
  <table.FlexRender header={header} />
  {{ asc: ' (asc)', desc: ' (desc)' }[header.column.getIsSorted() as string] ?? null}
</th>
```

## Notes

- Sorting state shape is `{ id: string; desc: boolean }[]`, read via `table.state.sorting` in render or `table.atoms.sorting.get()` in event handlers.
- Built-in `sortFn`s: `alphanumeric`, `alphanumericCaseSensitive`, `text`, `textCaseSensitive`, `datetime`, `basic` — register only the ones used, or pick a column-level `sortFn` via `columnHelper.accessor('age', { sortFn: 'basic' })`.
- For server-side sorting, set `manualSorting: true` and skip `sortedRowModel` — the table then trusts `data` is pre-sorted.
- `enableMultiSort` (default `true`) lets Shift-click add secondary sort columns; set `false` to restrict to single-column sort.
