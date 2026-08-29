---
source: https://tanstack.com/table/latest/docs/guide/rows
---

# Rows Guide

Ways to retrieve and interact with `row` objects.

## Signature / Usage

```js
const row = table.getRow(rowId)          // get a specific row by id
table.getRowModel().rows                 // rows to render
table.getSelectedRowModel().rows         // selected rows

const firstName = row.getValue('firstName')     // cached accessor read
const rendered = row.renderValue('lastName')    // falls back to renderFallbackValue
const original = row.original.firstName         // untransformed original data
```

Overriding row id:

```js
const table = useTable({
  features,
  columns,
  data,
  getRowId: (originalRow) => originalRow.uuid,
})
```

Row-number column using display index:

```js
const rowNumberColumn = columnHelper.display({
  id: 'rowNumber',
  header: '#',
  cell: ({ row }) => {
    const displayIndex = row.getDisplayIndex()
    return displayIndex === -1 ? '' : displayIndex + 1
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `row.id` | `string` | Unique row identifier; equals `row.index` by default, or `getRowId` result; grouping/expanding append a suffix |
| `row.index` | `number` | Position within parent array at creation time — does **not** reflect current display order |
| `row.getDisplayIndex()` | `() => number` | Zero-based index in current display order (post filter/sort/group/expand, pre-pagination); `-1` if not displayed |
| `row.getValue(columnId)` | `(id) => value \| undefined` | Cached accessor value |
| `row.renderValue(columnId)` | `(id) => value` | Cached accessor value, falling back to `renderFallbackValue` |
| `row.original` | `TData` | Original row data, unmodified by accessors |
| `row.subRows` | `Array<Row>` | Sub-rows (grouping/expanding) |
| `row.depth` | `number` | Nesting depth; 0 for root rows |
| `row.parentId` | `string` | Id of the parent row |
| `row.getParentRow()` | `() => Row \| undefined` | Parent row |
| `table.getMaxSubRowDepth()` | `() => number` | Deepest structural depth in the core row model (memoized) |

## Notes

- Use `row.getDisplayIndex()`, not `row.index`, for row-number columns — `row.index` never changes to reflect filtering/sorting/grouping/expansion.
- Never read `row._displayIndexCache` directly; it can be stale — always call `row.getDisplayIndex()`.
- `cell.getValue`/`cell.renderValue` are shortcuts for `row.getValue`/`row.renderValue`.

## Related

- [Row Models](./row-models.md)
- [Cells](./cells.md)
