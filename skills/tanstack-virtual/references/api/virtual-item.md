---
source: https://tanstack.com/virtual/latest/docs/api/virtual-item
---

# VirtualItem

`VirtualItem` represents a single rendered item produced by a virtualizer, carrying rendering coordinates and metadata.

## Signature / Usage

```tsx
export interface VirtualItem {
  key: string | number | bigint
  index: number
  start: number
  end: number
  size: number
  lane: number
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string \| number \| bigint` | A unique identifier for the item, defaulting to the item's index but customizable via the `getItemKey` Virtualizer option. |
| `index` | `number` | The numerical position of the item in the sequence. |
| `start` | `number` | The starting pixel measurement for the item, typically applied via CSS `top`/`left` or a transform such as `translateX`/`translateY`. |
| `end` | `number` | The ending pixel measurement for the item; not essential for standard layouts, but available for extra flexibility. |
| `size` | `number` | The item's dimension, usually mapped to CSS `width`/`height`. Initially the estimate from `estimateSize`; after measurement via `measureElement`, reflects the actual measured value (`getBoundingClientRect()` by default). |
| `lane` | `number` | The lane position for the item. Items are distributed to the shortest lane, cached by `estimateSize` estimates by default (or by actual measurements when `laneAssignmentMode: 'measured'`). Always `0` in standard lists; significant in masonry layouts. |

## Related

- [Virtualizer](./virtualizer.md)
