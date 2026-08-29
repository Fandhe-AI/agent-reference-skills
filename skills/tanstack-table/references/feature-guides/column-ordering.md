---
source: https://tanstack.com/table/latest/docs/framework/react/guide/column-ordering
---

# Column Ordering

Manual reordering of columns via the `columnOrder` state, layered under pinning and grouping.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  columnOrderingFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ columnOrderingFeature })

const table = useTable({
  features,
  columns,
  data,
  initialState: {
    columnOrder: ['columnId1', 'columnId2', 'columnId3'],
  },
})

table.setColumnOrder(['lastName', 'firstName', 'age'])
table.resetColumnOrder()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `columnOrder` | `string[]` | State; array of column ids in display order |
| `initialState.columnOrder` | `string[]` | Sets default order without controlling the state |
| `atoms.columnOrder` | `Atom<ColumnOrderState>` | v9 external atom for controlled ordering |
| `onColumnOrderChange` | `(updater) => void` | v8-style controlled state callback |

## Notes

- Column order is resolved in this precedence: column pinning (start/center/end split) → manual `columnOrder` → grouping (`groupedColumnMode: 'reorder' | 'remove'`).
- `columnOrder` only affects unpinned ("center") columns when pinning is also used.
- v9 recommends an external atom via `atoms.columnOrder`; the v8-style `state.columnOrder` + `onColumnOrderChange` pattern still works.
- `column.getIndex()`, `getIsFirstColumn()`, `getIsLastColumn()` read the resolved position after pinning/ordering/grouping.
- Drag-and-drop reordering is not built in; hook a DnD library's drop handler to `table.setColumnOrder` (e.g. DnD Kit's `arrayMove`, as in the official Column DnD example).

## Related

- [Column Pinning](./column-pinning.md)
- [Grouping](./grouping.md)
