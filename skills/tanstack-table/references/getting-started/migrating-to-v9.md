---
source: https://tanstack.com/table/latest/docs/framework/react/guide/migrating
---

# Migrating to v9

TanStack Table v9 requires tables to explicitly declare which features they use via `tableFeatures()`, renames the primary React hook, and moves state onto a TanStack Store-backed model.

## Signature / Usage

```tsx
// Table V8
import { useReactTable } from '@tanstack/react-table'
const table = useReactTable(options)

// Table V9
import { useTable } from '@tanstack/react-table'
const table = useTable(options)
```

```tsx
// Table V8
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  sortingFns,
} from '@tanstack/react-table'

const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  sortingFns,
})

// Table V9
import {
  useTable,
  tableFeatures,
  rowSortingFeature,
  createSortedRowModel,
  sortFns,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowSortingFeature, // new - import and pass the feature you want to use
  sortedRowModel: createSortedRowModel(), // now row models are defined on the features object
  sortFns, // now Fns are defined on the features object
})

const table = useTable({
  features, // new required option
  columns,
  data,
})
```

Fastest gradual path — include every feature at once with `stockFeatures` (v8-like behavior, larger bundle):

```tsx
import { useTable, stockFeatures } from '@tanstack/react-table'

const table = useTable({
  features: stockFeatures, // All features included - just like Table V8 (though larger bundle now)
  columns,
  data,
})
```

## Options / Props

| v8 | v9 | Notes |
| --- | --- | --- |
| `useReactTable` | `useTable` | Primary hook rename |
| `getCoreRowModel()`, `getSortedRowModel()`, etc. passed as table options | Row model factories registered on `tableFeatures({...})` | e.g. `sortedRowModel: createSortedRowModel()` |
| `sortingFn` (column def) | `sortFn` | Column definition key rename |
| `sortingFns` | `sortFns` | Registered inside `tableFeatures`, not passed as a table option |
| Column pinning `left`/`right` | `start`/`end` | Logical direction terminology |
| `columnSizingInfo` state | `columnResizing` | State key rename |
| `table.getState()` | `table.state` (selected) or `table.store.state` (full) | See state access example below |
| `const { getValue } = row` (destructured) | `row.getValue('name')` (called on instance) | Row/cell/column/header methods now live on prototypes |
| `flexRender(cell.column.columnDef.cell, cell.getContext())` | Still works, or use `<table.FlexRender cell={cell} />` / `<FlexRender cell={cell} />` | Both APIs are valid in v9 |

## Notes

- **Instance methods**: destructuring no longer works because methods live on prototypes — call them on the instance (`row.getValue('name')`, not `const { getValue } = row`).
- **State access** (recommended v9 pattern): `const { sorting, pagination } = table.state` when using a selector, or `table.store.state` for the full state; `table.atoms.sorting.get()` for a single slice atom; `table.store.subscribe((state) => {...})` for manual subscriptions; `<table.Subscribe selector={...}>{(slice) => ...}</table.Subscribe>` for fine-grained re-renders without touching the parent.
- **External atoms**: pass `atoms: { sorting: sortingAtom, pagination: paginationAtom }` (created with `useCreateAtom`) to let an app own specific state slices while the table writes directly to them.
- **Aggregation function shape changed**: v8's `(columnId, leafRows, childRows) => ...` positional signature is replaced by `constructAggregationFn({ aggregate: ({ rows, getValue }) => ... })`; `column.getAggregationValue(rows, maxDepth)` becomes `column.getAggregationValue({ rows, maxDepth })`.
- **Composability**: `tableOptions({...})` builds a reusable, spreadable options object (features + shared options); `createTableHook(sharedOptions)` derives `useAppTable`, `createAppColumnHelper`, `useTableContext`, `useCellContext`, `useHeaderContext` for apps with many tables sharing the same features/components (pre-bound components via `cell.TextCell`, `header.SortIndicator`, etc.).
- **Types now require `TFeatures`**: e.g. `ColumnDef<typeof features, Person>`, `Column<typeof features, Person, unknown>`. Use `StockFeatures` as the type when a table was configured with `stockFeatures`.
- **Column meta module augmentation**: `interface ColumnMeta<TData, TValue>` becomes `interface ColumnMeta<TFeatures, TData, TValue>` (TFeatures is now the first generic parameter); can also be typed via `columnMeta: metaHelper<{...}>()` inside `tableFeatures`.
- **Custom filter/sort/aggregation fn registration**: v8 used `declare module` augmentation (`interface FilterFns`, `interface FilterMeta`); v9 registers them directly as values inside `tableFeatures({ filterFns: { fuzzy: fuzzyFilter }, filterMeta: metaHelper<FuzzyFilterMeta>() })`, and the key then typechecks in column defs (`filterFn: 'fuzzy'`).
- **Column helper now takes features**: `createColumnHelper<Person>()` (v8) becomes `createColumnHelper<typeof features, Person>()` (v9); wrap columns in `columnHelper.columns([...])` for better inference.
- **Gradual migration**: `useLegacyTable` plus `getCoreRowModel`, `getFilteredRowModel`, `getSortedRowModel`, `getPaginationRowModel`, `legacyCreateColumnHelper`, and `flexRender` are available from `@tanstack/react-table/legacy` for v8-style syntax on v9 infrastructure (includes all features, larger bundle) — see `Legacy API Overview` in the React API reference for the full surface.
- **Tree-shaking a features registry**: instead of registering the full `filterFns` / `sortFns` bundles, import and register only the specific functions used, e.g. `filterFns: { includesString: filterFn_includesString }`, `sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text }`.

## Related

- [React Quick Start](./quick-start.md)
- [useLegacyTable Guide](./use-legacy-table.md)
- [Overview](./overview.md)
