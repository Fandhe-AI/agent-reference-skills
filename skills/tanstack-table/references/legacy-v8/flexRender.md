---
source: https://tanstack.com/table/v8/docs/guide/cells
---

# flexRender

Adapter-provided utility for rendering header/cell/footer templates that use JSX (i.e. column definitions using `cell: () => JSX`). Use it instead of `cell.getValue()` or `cell.renderValue()` when the column definition returns markup, since those two only return raw accessor values.

## Signature / Usage

```jsx
import { flexRender } from '@tanstack/react-table'

const columns = [
  {
    accessorKey: 'fullName',
    cell: ({ cell, row }) => {
      return <div><strong>{row.original.firstName}</strong> {row.original.lastName}</div>
    },
    //...
  },
]

//...
<tr>
  {row.getVisibleCells().map(cell => (
    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
  ))}
</tr>
```

## Notes

- **v9 status: unchanged.** `flexRender` still exists in v9 (`framework/react/reference/index/functions/flexRender`) with the same signature and calling convention (`flexRender(Comp, props)`), unaffected by the `useLegacyTable`/`useTable` split.

## Related

- [useReactTable](./useReactTable.md)
- [useLegacyTable](./useLegacyTable.md)
