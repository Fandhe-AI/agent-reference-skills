---
source: https://tanstack.com/table/latest/docs/guide/columns
---

# Columns Guide

The runtime `column` objects generated within the table instance — distinct from setting up [column definitions](./column-defs.md).

## Signature / Usage

```js
const column = cell.column      // from a cell
const column = header.column    // from a header

const column = table.getColumn('firstName')  // by id
const allColumns = table.getAllColumns()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `column.id` | `string` | Unique id, derived from `accessorKey`/`header` in the column def, or set explicitly |
| `column.columnDef` | `ColumnDef` | Reference to the original column definition object |
| `column.columns` | `Array<Column>` | Child columns, if this is a group column |
| `column.depth` | `number` | Header group "row index" the column group belongs to |
| `column.parent` | `Column \| undefined` | Parent column; `undefined` for top-level columns |

## Notes

- Column objects are not associated 1:1 with `<th>`/`<td>` elements — prefer [Header](./headers.md) and [Cell](./cells.md) objects for rendering; reach for column APIs when you need column metadata (e.g. a column-visibility menu).
- Feature-specific column APIs (visibility, pinning, sizing, sorting, filtering, ...) number in the dozens; consult the relevant feature guide.

## Related

- [Column Definitions](./column-defs.md)
- [Headers](./headers.md)
- [Cells](./cells.md)
