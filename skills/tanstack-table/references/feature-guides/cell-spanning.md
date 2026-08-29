---
source: https://tanstack.com/table/latest/docs/framework/react/guide/cell-spanning
---

# Cell Spanning

Stateless merging of adjacent body cells (`rowspan`/`colspan`-style), recomputed from rendered rows.

## Signature / Usage

```tsx
import {
  useTable,
  tableFeatures,
  cellSpanningFeature,
} from '@tanstack/react-table'

const features = tableFeatures({ cellSpanningFeature })
const table = useTable({ features, columns, data })
```

```tsx
columnHelper.accessor('createdAt', {
  spanRows: ({ anchorValue, value }) =>
    sameMonth(anchorValue as Date, value as Date),
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `spanRows` | `boolean \| (ctx) => boolean` | Column option; enables value-based vertical merging of adjacent rows |
| `spanColumns` | `number \| Infinity \| (ctx) => number` | Column option; horizontal span, resolved per row; `Infinity` spans to end of region |
| `enableCellSpanning` | `boolean` | Table or column option; disables spanning |

## Notes

- Spans are recomputed from rendered rows, so sorting, filtering, pagination, and pinning automatically keep spans correct.
- A covered cell reports a span of `0`; check `cell.getIsCovered()` or the span value to decide whether to render it.
- Column spans never cross pinned region boundaries.

## Related

- [Cell Selection](./cell-selection.md)
- [Grouping](./grouping.md)
