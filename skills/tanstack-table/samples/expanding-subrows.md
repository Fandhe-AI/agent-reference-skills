---
source: https://tanstack.com/table/latest/docs/framework/react/guide/expanding
---

# Expanding Sub-Rows

Expand/collapse hierarchical child rows (`row.subRows`) with a per-row toggle button.

```tsx
import {
  createExpandedRowModel,
  rowExpandingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
})

const table = useTable({
  features,
  columns,
  data, // rows may carry a `children` array
  getSubRows: (row) => row.children,
})

// cell for the expander column
<button onClick={row.getToggleExpandedHandler()} disabled={!row.getCanExpand()}>
  {row.getIsExpanded() ? '- collapse' : '+ expand'}
</button>
```

## Notes

- `row.getCanExpand()` defaults to `false` unless `subRows` are present; pass `getRowCanExpand: (row) => true` instead of `getSubRows` for custom detail-panel UI (no hierarchical children).
- There is no built-in expander UI or indentation — style nested rows yourself, e.g. via `row.depth`.
- `paginateExpandedRows` defaults to `true` (expanded children count toward the current page); set `false` to keep them anchored to their parent's page.
- Pair with Grouping (`columnGroupingFeature` + `groupedRowModel`) to let users expand/collapse synthetic group rows — see the `grouping-aggregation` sample.
