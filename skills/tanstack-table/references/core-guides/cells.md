---
source: https://tanstack.com/table/latest/docs/guide/cells
---

# Cells Guide

Ways to retrieve, read, and render `cell` objects. Cells come from [Rows](./rows.md).

## Signature / Usage

```js
row.getAllCells()       // all cells for a row
row.getVisibleCells()   // visible cells (respects column visibility)

const value = cell.getValue()          // read this cell's own column value
const rendered = cell.renderValue()    // falls back to renderFallbackValue
const firstName = cell.row.original.firstName  // other row data via parent row
```

Rendering with `flexRender`:

```jsx
import { flexRender } from '@tanstack/react-table'

<tr>
  {row.getVisibleCells().map((cell) => (
    <td key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  ))}
</tr>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cell.id` | `string` | `` `${row.id}_${column.id}` ``; grouping/aggregation append a suffix |
| `cell.getValue()` | `() => value \| undefined` | Cached value for the cell's own column (no arguments; bound to its column) |
| `cell.renderValue()` | `() => value` | Same as above, falling back to `renderFallbackValue` |
| `cell.row` | `Row` | Parent row reference |
| `cell.column` | `Column` | Parent column reference |

## Notes

- `cell.getValue`/`cell.renderValue` take no arguments and are shortcuts for `row.getValue`/`row.renderValue` bound to the cell's column; to read a different column from within a cell use `cell.row.getValue('otherColumnId')`.
- Use the `flexRender` utility (not raw `cell.getValue()`) when a column's `cell` option is JSX/a function, since `flexRender` handles all column-def cell scenarios.
- When the optional `cellSpanningFeature` is registered, a cell reporting a span of `0` is covered by another cell's span and must be skipped when rendering — see the Cell Spanning guide (framework-specific).

## Related

- [Rows](./rows.md)
- [Columns](./columns.md)
- [Headers](./headers.md)
