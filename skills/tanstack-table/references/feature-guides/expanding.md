---
source: https://tanstack.com/table/latest/docs/framework/react/guide/expanding
---

# Expanding

Shows/hides sub-rows (hierarchical data) or custom detail-panel UI per row.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  rowExpandingFeature,
  createExpandedRowModel,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(), // client-side
  // manualExpanding: true, // server-side
})

const table = useTable({
  features,
  columns,
  data,
  getSubRows: (row) => row.children, // table-row sub-rows
  // or: getRowCanExpand: (row) => true, // custom detail-panel UI
})

row.getToggleExpandedHandler()
row.getIsExpanded()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `getSubRows` | `(row) => Row[] \| undefined` | Table option; points to child rows for hierarchical expansion |
| `getRowCanExpand` | `(row) => boolean` | Table option; enables custom (non-`subRows`) expandable UI |
| `expanded` | `true \| Record<string, boolean>` | State; `true` expands all rows, otherwise a per-row-id map |
| `atoms.expanded` | `Atom<ExpandedState>` | v9 external atom for controlled expansion |
| `onExpandedChange` | `(updater) => void` | v8-style controlled state callback |
| `paginateExpandedRows` | `boolean` | Default `true`; `false` keeps expanded rows on their parent's page |
| `filterFromLeafRows` / `maxLeafRowFilterDepth` | `boolean` / `number` | Filtering direction/depth through expanded rows |
| `manualExpanding` | `boolean` | Skips `expandedRowModel`; expects manual expansion |
| `autoResetExpanded` | `boolean` | Resets expanded state when the grouped row model recomputes |

## Notes

- `row.getCanExpand()` defaults to `false` unless `subRows` are present; override with `getRowCanExpand` for detail-panel-style expansion.
- No built-in toggle UI; wire a button to `row.getToggleExpandedHandler()`.
- `ExpandedState` is `true` (all expanded) or `Record<rowId, boolean>`.
- `autoResetExpanded` only auto-triggers via the grouping feature's recompute; set `autoResetExpanded: false` (with `autoResetPageIndex: false` if paginating) to preserve expansion during inline data edits.
- Row pinning applies to expanded rows the same as regular rows.

## Related

- [Grouping](./grouping.md)
- [Row Pinning](./row-pinning.md)
- [Pagination](./pagination.md)
