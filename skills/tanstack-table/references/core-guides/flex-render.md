---
source: https://tanstack.com/table/latest/docs/framework/react/guide/flex-render
---

# FlexRender Guide

Column definitions can hold plain React nodes or renderer components for `header`, `cell`, `footer`, and `aggregatedCell`. `FlexRender` / `flexRender` interpret each value and pass the typed table context.

## Signature / Usage

```tsx
{table.getHeaderGroups().map((headerGroup) => (
  <tr key={headerGroup.id}>
    {headerGroup.headers.map((header) => (
      <th key={header.id}>
        {header.isPlaceholder ? null : <table.FlexRender header={header} />}
      </th>
    ))}
  </tr>
))}

{table.getRowModel().rows.map((row) => (
  <tr key={row.id}>
    {row.getVisibleCells().map((cell) => (
      <td key={cell.id}>
        <table.FlexRender cell={cell} />
      </td>
    ))}
  </tr>
))}
```

Direct import and the lower-level function:

```tsx
import { FlexRender, flexRender } from '@tanstack/react-table'

const footerContent = <FlexRender footer={header} />

flexRender(cell.column.columnDef.cell, cell.getContext())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cell` | Cell | Render the column's `cell` (or `aggregatedCell` when aggregated) |
| `header` | Header | Render the column's `header` |
| `footer` | Header | Render the column's `footer` |

## Notes

- Give `FlexRender` exactly one of `cell`, `header`, or `footer`. The adapter attaches it as `table.FlexRender`.
- For cells, `FlexRender` renders `aggregatedCell` when aggregated, falls back to `cell` when no aggregated renderer exists, and renders nothing for grouping placeholder cells.
- `flexRender` is lower-level: it distinguishes React components (class, `memo`, `forwardRef`) from created nodes, but does not choose `cell` vs `aggregatedCell` or suppress grouping placeholders.
- Renderer functions in column defs are treated as React components and receive the context as props, e.g. `header: ({ column }) => <button>{column.id}</button>`.
- Use `cell.getValue()` or `cell.renderValue()` when only the accessor value is needed.
- Placeholder headers are not suppressed automatically; check `header.isPlaceholder` unless the placeholder intentionally supplies content for a spanning header. Footer groups contain `Header` objects, so pass each through the `footer` prop.

## Related

- [Cells](./cells.md)
- [Headers](./headers.md)
- [Column Defs](./column-defs.md)
