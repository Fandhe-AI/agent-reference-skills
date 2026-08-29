---
source: https://tanstack.com/table/latest/docs/framework/react/guide/row-selection
---

# Row Selection

Checkbox-based row selection with a "select all" header checkbox, keyed by a stable row id.

```tsx
import { useEffect, useRef } from 'react'
import type { ComponentProps } from 'react'
import { rowSelectionFeature, tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({ rowSelectionFeature })

const table = useTable({
  features,
  columns,
  data,
  getRowId: (row) => row.uuid,
})

// indeterminate must be set imperatively; React has no `indeterminate` DOM prop
function IndeterminateCheckbox({ indeterminate, ...rest }: { indeterminate?: boolean } & Omit<ComponentProps<'input'>, 'ref'>) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])
  return <input ref={ref} type="checkbox" {...rest} />
}

// header checkbox
const selectedCount = table.getSelectedRowModel().rows.length
const totalCount = table.getRowModel().rows.length

<IndeterminateCheckbox
  checked={totalCount > 0 && selectedCount === totalCount}
  indeterminate={selectedCount > 0 && selectedCount < totalCount}
  onChange={table.getToggleAllRowsSelectedHandler()}
/>

// row checkbox
<input
  type="checkbox"
  checked={row.getIsSelected()}
  disabled={!row.getCanSelect()}
  onChange={row.getToggleSelectedHandler()}
/>
```

## Notes

- Set `getRowId` to a stable field (not the default `row.index`) so selection state survives sorting/filtering/pagination.
- React has no native `indeterminate` DOM attribute — it must be assigned imperatively via a ref, not passed as a JSX prop.
- `table.getRowModel()` is the core row model (always present); `table.getSelectedRowModel()` requires only `rowSelectionFeature`, so both are safe to call with the minimal feature set above without registering filtering/sorting/pagination row models.
- Selecting a parent row cascades to selectable descendants by default; pass `enableSubRowSelection: false` to disable cascading. `enableMultiRowSelection: false` restricts selection to a single row (radio-style behavior).
