---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-visibility
---

# Column Visibility

Dynamically hides/shows columns via a column-id-to-boolean `columnVisibility` state map.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnVisibilityFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnVisibilityFeature })

const table = useTable({
  features,
  columns,
  data,
  initialState: {
    columnVisibility: { columnId2: false }, // hidden by default
  },
})
```

```tsx
{table.getAllColumns().map((column) => (
  <label key={column.id}>
    <input
      checked={column.getIsVisible()}
      disabled={!column.getCanHide()}
      onChange={column.getToggleVisibilityHandler()}
      type="checkbox"
    />
    {column.id}
  </label>
))}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `columnVisibility` | `Record<string, boolean>` | State; column is hidden when its id maps to `false` |
| `initialState.columnVisibility` | `Record<string, boolean>` | Default visibility without controlling state |
| `atoms.columnVisibility` | `Atom<ColumnVisibilityState>` | v9 external atom for controlled visibility |
| `onColumnVisibilityChange` | `(updater) => void` | v8-style controlled state callback |
| `enableHiding` | `false` | Column option; prevents that column from being hidden |

## Notes

- A column id absent from the map, or mapped to `true`, is shown; only explicit `false` hides it.
- Use the "visible" API variants when rendering (`table.getVisibleLeafColumns`, `row.getVisibleCells`) — the non-visible variants (`getAllLeafColumns`, `row.getAllCells`) ignore visibility. Header Group APIs already account for it.
- `column.columnDef.header` is a render template that may lack context for hidden columns; prefer a stable label source (custom map, `columnDef.meta`, or `column.id`) for visibility toggle UI, not `flexRender(column.columnDef.header, ...)`.
- Do not set `columnVisibility` in both `initialState` and `state`/`atoms` — the controlled value wins and `initialState` is ignored.

## Related

- [Column Sizing](./column-sizing.md)
- [Column Ordering](./column-ordering.md)
