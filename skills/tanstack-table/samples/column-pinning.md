---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-pinning
---

# Column Pinning

Pin columns to the `start` or `end` region so they stay visible while the center columns scroll.

```tsx
import { columnPinningFeature, tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({ columnPinningFeature })

const table = useTable({
  features,
  columns,
  data,
  initialState: {
    columnPinning: { start: ['select'], end: ['actions'] },
  },
})

// toggle button per column
<button onClick={() => column.pin(column.getIsPinned() ? false : 'start')}>
  {column.getIsPinned() ? 'Unpin' : 'Pin left'}
</button>
```

## Notes

- `start`/`end` are logical regions: `start` is left / `end` is right in LTR layouts, reversed in RTL.
- Render pinned regions separately for sticky-CSS or split-table layouts via `table.getStartHeaderGroups()` / `getCenterHeaderGroups()` / `getEndHeaderGroups()` and `row.getStartVisibleCells()` / `getCenterVisibleCells()` / `getEndVisibleCells()`.
- Column pinning is resolved before manual `columnOrder` and grouping in the column-flow precedence — see the `column-visibility-ordering` sample for ordering.
- `table.resetColumnPinning(true)` clears both the `start` and `end` arrays.
