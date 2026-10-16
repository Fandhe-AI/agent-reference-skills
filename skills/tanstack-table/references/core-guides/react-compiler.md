---
source: https://tanstack.com/table/latest/docs/framework/react/guide/react-compiler
---

# React Compiler

TanStack Table v9 is the first version compatible with the React Compiler. Most code needs no special handling; nested components that receive only stable table objects (`table`, `row`, `cell`, `column`, `header`) may need a `Subscribe` boundary.

## Signature / Usage

A nested component reading changing state through a stable `row` must subscribe to that state:

```tsx
import { Subscribe } from '@tanstack/react-table'

function SelectionCell({ row }: { row: Row<typeof features, Person> }) {
  return (
    <Subscribe
      source={row.table.atoms.rowSelection}
      selector={(rowSelection) => rowSelection[row.id]}
    >
      {(isSelected) => (
        <input
          type="checkbox"
          checked={!!isSelected}
          onChange={row.getToggleSelectedHandler()}
        />
      )}
    </Subscribe>
  )
}
```

For several slices, subscribe to `table.store`:

```tsx
<Subscribe
  source={table.store}
  selector={(state) => ({
    columnFilters: state.columnFilters,
    globalFilter: state.globalFilter,
    pagination: state.pagination,
  })}
>
  {() => (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>...</tr>
      ))}
    </tbody>
  )}
</Subscribe>
```

## Notes

- Compiled components calling `useTable` need no `useMemo` / `useCallback` just to stabilize `columns`, `data`, or callbacks; `React.memo` is not needed only to skip unchanged children. Keep memoization if the code must run without the compiler, another API needs a specific identity, the compiler skips the component, or profiling shows it helps.
- Stable `data` and `columns` references still matter: Table uses their identity to rebuild columns and row models; new references per render can cause recalculation or automatic state resets without the compiler or manual memoization.
- Hand-written dependency arrays are not fixed by the compiler; follow the `exhaustive-deps` lint.
- The docs' React examples run through the compiler yet keep `useMemo` / `useCallback` so the code also works without it.
- Methods whose results change while the object stays the same: `column.getIsPinned()`, `column.getIsSorted()`, `row.getIsSelected()`, `row.getIsExpanded()`, `cell.getIsAggregated()`, `cell.getValue()`, `header.column.getCanSort()`.
- The value returned by `useTable` changes with its options and selected state; the core table at `row.table` / `cell.table` / `column.table` keeps the same reference. Use `table.Subscribe` with the React-facing table; in cell or header render contexts `table` is the core Table, so import the standalone `Subscribe` and pass `table.store` or `table.atoms.*` as `source`.
- Keep the subscription inside the child that reads the state (or pass the selected value as a prop). Wrapping `<SelectionCell row={row} />` in `Subscribe` and ignoring the value does not help; `useSelector` only to force a render is not guaranteed to work.
- The selector must include every slice that can change `table.getRowModel()` (filtering, sorting, grouping, expansion, pagination). Replacing `data` externally changes no slice, so a selector cannot detect it: inside `<table.AppTable>` use `useTableContext()` (it gets a new table value when the `useAppTable` owner renders with new options), otherwise also pass `data` or rows as a prop.
- v8: `useReactTable` returned the same table object with interior mutability, so components needed `'use no memo'`. v9's `useTable` returns a React-facing value that updates with selected state.
- Benchmark in the docs (10,000 rows, 100 rendered, 4x CPU throttling): the largest gain was preventing unrelated parent renders cascading (3.75 → 0.50 ms); sort, paginate, replace-data changed little. Do not enable the compiler only for a data grid.

## Related

- [Table State (React)](./table-state.md)
- [Table Context](./table-context.md)
- [Composable Tables](./composable-tables.md)
