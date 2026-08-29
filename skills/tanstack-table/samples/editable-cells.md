---
source: https://tanstack.com/table/latest/docs/guide/table-and-column-meta
---

# Editable Cells

Render an `<input>` per cell and push edits back through `table.options.meta`, since TanStack Table itself never mutates `data`.

```tsx
import { useState } from 'react'
import { createColumnHelper, tableFeatures, useTable } from '@tanstack/react-table'

interface MyTableMeta {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

const features = tableFeatures({})
const columnHelper = createColumnHelper<typeof features, Person>()

const columns = columnHelper.columns([
  columnHelper.accessor('age', {
    cell: ({ getValue, row, column, table }) => (
      <input
        value={getValue() as number}
        onChange={(e) =>
          (table.options.meta as MyTableMeta)?.updateData(row.index, column.id, Number(e.target.value))
        }
      />
    ),
  }),
])

export function EditableTable({ initialData }: { initialData: Person[] }) {
  const [data, setData] = useState(initialData)

  const table = useTable({
    features,
    columns,
    data,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)),
        )
      },
    } satisfies MyTableMeta,
  })

  // render table.getRowModel() as usual
}
```

## Notes

- `meta` (table option) and `meta` (column-def property) are arbitrary data bags TanStack Table never reads or writes itself — the update flow above is entirely application code layered on `table.options.meta`.
- The snippet commits on every keystroke for simplicity; for large tables, buffer the input in local component state and commit only `onBlur` to avoid re-rendering `data` on each keystroke.
- Use `metaHelper<MyTableMeta>()` on a `tableMeta` slot in `tableFeatures()` (v9) instead of a global `declare module` augmentation when only one table in the project needs this meta shape.
- Combine with an editing-mode column (`meta: { editable: true }` per column, checked in the cell renderer) to make only some columns editable.
