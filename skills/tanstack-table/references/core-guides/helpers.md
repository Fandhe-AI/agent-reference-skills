---
source: https://tanstack.com/table/latest/docs/guide/helpers
---

# Type Helpers Guide

Small helper functions that improve TypeScript inference without adding runtime behavior: `tableFeatures`, `tableOptions`, and `createColumnHelper`. Exported from every framework adapter and `@tanstack/table-core`.

## Signature / Usage

`tableFeatures` — declares the static feature set:

```ts
import { tableFeatures } from '@tanstack/react-table'

const features = tableFeatures({}) // core-only

const features2 = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric },
})
```

`tableOptions` — composes reusable option objects while preserving generics:

```ts
const sharedOptions = tableOptions({
  features,
  defaultColumn: { minSize: 80, maxSize: 400 },
  debugTable: true,
})

const table = useTable({ ...sharedOptions, columns, data })
```

`createColumnHelper` — typed column-def authoring:

```ts
const columnHelper = createColumnHelper<typeof features, Person>()

const columns = columnHelper.columns([
  columnHelper.accessor('firstName', { header: 'First Name' }),
  columnHelper.accessor((row) => row.lastName, { id: 'lastName' }),
  columnHelper.display({ id: 'actions', cell: (info) => `Actions for ${info.row.id}` }),
])
```

## Options / Props

| Name | Slots accepted | Description |
|------|------|-------------|
| `tableFeatures(config)` | feature objects, row-model factories, `filterFns`/`sortFns`/`aggregationFns` registries, `tableMeta`/`columnMeta` (via `metaHelper`) | Static, stable feature configuration for a table |
| `tableOptions(options)` | any table option | Preserves `TFeatures`/`TData` generics when options are composed/supplied across steps |
| `createColumnHelper<TFeatures, TData>()` | — | Returns `.accessor`, `.display`, `.group`, `.columns` builders |

## Notes

- Define `features` once, outside the component (or in shared setup code), and keep it stable — `typeof features` is used throughout the table's types, so a stable reference also lets column helpers/definitions/options be shared.
- Function registry keys (`sortFns`, `filterFns`, `aggregationFns`) become valid, type-checked string values for `sortFn`/`filterFn`/`aggregationFn`/`globalFilterFn` in column defs and table options — only pay for registered functions.
- `tableOptions()` returns the same object at runtime; its only value is TypeScript overload resolution. Skip it for one-off setups passed directly to `useTable`/`createTable`/`injectTable`/`constructTable`.
- `createColumnHelper` only returns plain column-def objects at runtime; its value is stronger inference (accessor values, feature-specific options, nested column groups) versus plain `ColumnDef` literals.

## Related

- [Row Models](./row-models.md)
- [Column Definitions](./column-defs.md)
- [Table and Column Meta](./table-and-column-meta.md)
