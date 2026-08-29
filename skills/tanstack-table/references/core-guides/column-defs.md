---
source: https://tanstack.com/table/latest/docs/guide/column-defs
---

# Column Definitions Guide

Column defs build the underlying data model (used for sorting/filtering/grouping), format displayed values, and create header groups/headers/footers. This guide is about defining column defs, not the runtime `column` object — see [Columns](./columns.md) for that.

## Signature / Usage

```tsx
type Person = {
  firstName: string
  lastName: string
  age: number
}

const features = tableFeatures({})
const columnHelper = createColumnHelper<typeof features, Person>()

const defaultColumns = columnHelper.columns([
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions row={props.row} />,
  }),
  columnHelper.group({
    header: 'Name',
    columns: [
      columnHelper.accessor('firstName', { cell: (info) => info.getValue() }),
      columnHelper.accessor((row) => row.lastName, { id: 'lastName' }),
    ],
  }),
])
```

Accessor variants:

```tsx
columnHelper.accessor('firstName')                        // object key
columnHelper.accessor('name.first', { id: 'firstName' })  // deep key
columnHelper.accessor((row) => row[1], { id: 'amount' })  // array index / accessor fn
```

Dynamic column definitions (unknown data shape):

```tsx
type DynamicRow = Record<string, unknown>

const columns: Array<ColumnDef<typeof features, DynamicRow>> = data.length
  ? Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: formatHeader(key),
      cell: (info) => String(info.getValue() ?? ''),
    }))
  : []
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `accessorKey` | `string` | Object key or array index used to extract a value; periods form a deep key path |
| `accessorFn` | `(row) => value` | Function that computes a value from the row |
| `id` | `string` | Unique column id; required when using an accessor function without a string header |
| `cell` | `(props) => renderable` | Cell renderer |
| `aggregatedCell` | `(props) => renderable` | Cell renderer used when rows are grouped |
| `header` / `footer` | `string \| (props) => renderable` | Header/footer renderer |
| `sortFn` / `filterFn` / `aggregationFn` | `string \| function` | Names resolved against the `sortFns`/`filterFns`/`aggregationFns` registries in `tableFeatures()`, or a function passed directly |
| `meta` | `object` | Arbitrary strongly-typed per-column metadata (see [Table and Column Meta](./table-and-column-meta.md)) |

## Notes

- Three column def categories: accessor columns (have a data model — sortable/filterable), display columns (no data model, e.g. row actions/checkboxes), grouping columns (no data model, group other columns under a shared header).
- `createColumnHelper<TFeatures, TData>()` in v9 requires **both** the features type (`typeof features`) and the row type; `createTableHook`'s `createAppColumnHelper` is pre-bound to the features type so it only needs `TData`.
- Unique column IDs: accessor object key/array index becomes the id (periods replaced with underscores); for accessor functions, either the `id` property or a plain string `header` is used.
- Dynamic column defs generate columns from `data` at runtime when the shape is unknown ahead of time; give the generated array a stable reference (e.g. `useMemo` keyed on `data`) and detect per-key value types for sort/filter function selection.
- The `sortFn`/`filterFn`/`aggregationFn` string values are type-checked against the registries declared in `tableFeatures()` — an unregistered name is a type error.

## Related

- [Columns](./columns.md)
- [Table and Column Meta](./table-and-column-meta.md)
- [Type Helpers](./helpers.md)
- [Data](./data.md)
