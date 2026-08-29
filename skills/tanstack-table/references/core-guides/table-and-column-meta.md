---
source: https://tanstack.com/table/latest/docs/guide/table-and-column-meta
---

# Table and Column Meta Guide

`meta` lets you attach your own arbitrary data/functions to a table or column so they are available anywhere the `table`/`column` instance is available. TanStack Table never reads or writes `meta` itself.

## Signature / Usage

Table meta (React):

```ts
const table = useTable({
  features,
  columns,
  data,
  meta: {
    updateData: (rowIndex, columnId, value) => { /* ... */ },
  },
})

table.options.meta?.updateData(rowIndex, columnId, newValue)
```

Column meta (identical across adapters):

```ts
const columns = columnHelper.columns([
  columnHelper.accessor('age', {
    header: 'Age',
    meta: { filterVariant: 'range' },
  }),
])

const variant = column.columnDef.meta?.filterVariant
```

Per-table typing (v9, recommended) with `metaHelper`:

```ts
interface MyTableMeta {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}
interface MyColumnMeta {
  filterVariant?: 'text' | 'range' | 'select'
}

const features = tableFeatures({
  rowSortingFeature,
  tableMeta: metaHelper<MyTableMeta>(),
  columnMeta: metaHelper<MyColumnMeta>(),
})

const columnHelper = createColumnHelper<typeof features, Person>()
columnHelper.accessor('age', { meta: { filterVariant: 'range' } }) // type-checked
table.options.meta?.updateData // typed
```

Global typing via declaration merging (v8-compatible; `TFeatures` is now the first generic):

```ts
declare module '@tanstack/react-table' {
  interface TableMeta<TFeatures extends TableFeatures, TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
  interface ColumnMeta<TFeatures extends TableFeatures, TData extends RowData, TValue extends CellData = CellData> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `meta` (table option) | `object` | Arbitrary table-level context, read via `table.options.meta` |
| `meta` (column def property) | `object` | Arbitrary column-level context, read via `column.columnDef.meta` |
| `tableMeta` / `columnMeta` slots | `metaHelper<T>()` | Type-only, per-`tableFeatures()` meta typing (v9) |
| `filterMeta` slot | `metaHelper<T>()` | Type-only meta a custom filter function attaches per row (e.g. a fuzzy-match rank), read via `row.columnFiltersMeta[columnId]` |

## Notes

- `tableMeta`/`columnMeta`/`filterMeta` slots are phantom (type-only) entries — at runtime they resolve to `{}` and are stripped from the registered features; the actual values still flow through the ordinary `meta` table option and column-def `meta` property.
- Per-table slots (v9) are scoped to tables built from that specific `features` object; declaration merging (v8 style) is global — every table in the project shares the same meta types. If a `features` object declares a slot, it replaces (not merges with) the global declaration for tables using those features.
- `metaHelper<T>()` is preferred over `{} as T` because it avoids `@typescript-eslint/no-unnecessary-type-assertion` false positives when a meta type has only optional properties.
- If you need real options/state/instance methods (not just a typed data bag), write a [custom feature](../framework/react/guide/custom-features) instead of meta.

## Related

- [Column Definitions](./column-defs.md)
- [Type Helpers](./helpers.md)
