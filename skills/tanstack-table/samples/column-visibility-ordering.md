---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-visibility
---

# Column Visibility & Ordering

Toggle columns hidden/shown and let users reorder them via a `columnOrder` array.

```tsx
import { columnOrderingFeature, columnVisibilityFeature, tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({ columnVisibilityFeature, columnOrderingFeature })

const table = useTable({
  features,
  columns,
  data,
  initialState: { columnVisibility: { age: false } },
})

// visibility checkboxes
{table.getAllColumns().map((column) => (
  <label key={column.id}>
    <input
      type="checkbox"
      checked={column.getIsVisible()}
      disabled={!column.getCanHide()}
      onChange={column.getToggleVisibilityHandler()}
    />
    {column.id}
  </label>
))}

// manual reorder (e.g. from a DnD Kit drop handler)
table.setColumnOrder(['lastName', 'firstName', 'age'])
```

## Notes

- Only an explicit `false` in `columnVisibility` hides a column — a column id absent from the map, or mapped to `true`, is shown.
- Use the "visible" accessors when rendering (`table.getVisibleLeafColumns()`, `row.getVisibleCells()`); the "all" variants (`getAllLeafColumns()`, `row.getAllCells()`) ignore visibility.
- Column order precedence is: pinning (start/center/end split) → manual `columnOrder` → grouping (`groupedColumnMode`). `columnOrder` only reorders unpinned ("center") columns.
- No drag-and-drop is built in; wire a DnD library's drop handler (e.g. DnD Kit's `arrayMove`) to `table.setColumnOrder`.
