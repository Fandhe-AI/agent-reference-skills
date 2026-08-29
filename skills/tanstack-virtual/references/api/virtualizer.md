---
source: https://tanstack.com/virtual/latest/docs/api/virtualizer
---

# Virtualizer

The `Virtualizer` class is the core engine of TanStack Virtual. Framework adapters (React, Vue, Solid, Svelte, Angular, Marko) create and manage a `Virtualizer` instance for you, but you interact with the returned instance directly to read virtual items and imperatively control scrolling.

## Signature / Usage

```tsx
export class Virtualizer<TScrollElement = unknown, TItemElement = unknown> {
  constructor(options: VirtualizerOptions<TScrollElement, TItemElement>)
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | — | The total number of items to virtualize. |
| `getScrollElement` | `() => TScrollElement` | — | A function that returns the scrollable element for the virtualizer. It may return null if the element is not available yet. |
| `estimateSize` | `(index: number) => number` | — | Passed the index of each item, should return the actual size (or estimated size if dynamically measuring with `virtualItem.measureElement`) for each item. |
| `enabled` | `boolean` | `true` | Set to `false` to disable scrollElement observers and reset the virtualizer's state. |
| `debug` | `boolean` | `false` | Set to `true` to enable debug logs. |
| `initialRect` | `Rect` | `{ width: 0, height: 0 }` | The initial `Rect` of the scrollElement. Useful for SSR; otherwise calculated on mount by the `observeElementRect` implementation. |
| `onChange` | `(instance: Virtualizer<TScrollElement, TItemElement>, sync: boolean) => void` | `() => {}` | Callback fired when the virtualizer's internal state changes. Passed the instance and the `sync` parameter. |
| `overscan` | `number` | `1` | The number of items to render above and below the visible area. |
| `horizontal` | `boolean` | `false` | Set to `true` if the virtualizer is oriented horizontally. |
| `paddingStart` | `number` | `0` | Padding to apply to the start of the virtualizer in pixels. |
| `paddingEnd` | `number` | `0` | Padding to apply to the end of the virtualizer in pixels. |
| `scrollPaddingStart` | `number` | `0` | Padding to apply to the start of the virtualizer in pixels when scrolling to an element. |
| `scrollPaddingEnd` | `number` | `0` | Padding to apply to the end of the virtualizer in pixels when scrolling to an element. |
| `initialOffset` | `number \| (() => number)` | `0` | The position where the list is scrolled to on render. Useful for SSR or conditionally rendering the virtualizer. |
| `getItemKey` | `(index: number) => Key` | `defaultKeyExtractor` (returns `index`) | Passed the index of each item, should return a unique key for that item. |
| `rangeExtractor` | `(range: Range) => number[]` | `defaultRangeExtractor` | Receives visible range indexes and should return the array of indexes to render (e.g. to implement sticky headers/footers). |
| `scrollToFn` | `(offset: number, options: { adjustments?: number; behavior?: 'auto' \| 'smooth' }, instance: Virtualizer<TScrollElement, TItemElement>) => void` | — | Implements the scrolling behavior for the scrollElement. |
| `observeElementRect` | `(instance: Virtualizer<TScrollElement, TItemElement>, cb: (rect: Rect) => void) => void \| (() => void)` | — | Called when the scrollElement changes; should implement initial measurement and continuous monitoring of the scrollElement's `Rect`. |
| `observeElementOffset` | `(instance: Virtualizer<TScrollElement, TItemElement>, cb: (offset: number) => void) => void \| (() => void)` | — | Called when the scrollElement changes; should implement initial measurement and continuous monitoring of the scrollElement's scroll offset. |
| `measureElement` | `(element: TItemElement, entry: ResizeObserverEntry \| undefined, instance: Virtualizer<TScrollElement, TItemElement>) => number` | `getBoundingClientRect()`-based | Called when the virtualizer needs to dynamically measure the size (width or height) of an item. |
| `scrollMargin` | `number` | `0` | Specifies where the scroll offset should originate from. |
| `gap` | `number` | `0` | Sets the spacing between items in the virtualized list. |
| `lanes` | `number` | `1` | The number of lanes the list is divided into (columns for vertical lists, rows for horizontal lists) — used for masonry layouts. |
| `isScrollingResetDelay` | `number` | `150` | Duration to wait (ms) after the last scroll event before resetting the `isScrolling` instance property. |
| `useScrollendEvent` | `boolean` | `false` | Determines whether to use the native `scrollend` event to detect when scrolling has stopped. |
| `useAnimationFrameWithResizeObserver` | `boolean` | `false` | When enabled, defers `ResizeObserver` measurement processing to the next animation frame via `requestAnimationFrame`. |
| `indexAttribute` | `string` | `'data-index'` | The DOM attribute name used to identify an item's index when measuring elements. |
| `initialMeasurementsCache` | `Array<VirtualItem>` | `[]` | A previously-captured snapshot of measured item sizes (from `takeSnapshot()`) to seed the virtualizer with on mount. |
| `shouldAdjustScrollPositionOnItemSizeChange` | `undefined \| ((item: VirtualItem, delta: number, instance: Virtualizer<TScrollElement, TItemElement>) => boolean)` | `undefined` | Fine-grained control over the scroll-position adjustment fired when an above-viewport item's measured size differs from its estimated size. Assigned directly on the instance rather than as an initialization option. |
| `anchorTo` | `anchorTo?: 'start' \| 'end'` | `'start'` | Controls which side of the scrollable content is treated as the stable anchor when list data changes. |
| `followOnAppend` | `followOnAppend?: boolean \| 'auto' \| 'smooth' \| 'instant'` | `false` | When used with `anchorTo: 'end'`, controls whether the virtualizer scrolls to the end after new items are appended. |
| `laneAssignmentMode` | `laneAssignmentMode?: 'estimate' \| 'measured'` | `'estimate'` | Controls when lane assignments are cached in a masonry layout. |
| `useCachedMeasurements` | `useCachedMeasurements?: boolean` | `false` | When enabled, the default `measureElement` implementation skips DOM measurement and returns the previously cached size for each item. |
| `isRtl` | `isRtl: boolean` | `false` | Whether to invert horizontal scrolling to support right-to-left language locales. |
| `scrollEndThreshold` | `scrollEndThreshold?: number` | `1` | The pixel threshold used by `isAtEnd()` and `followOnAppend` to decide whether the viewport is close enough to the end to count as pinned. |

## Instance Methods & Properties

| Name | Type | Description |
| --- | --- | --- |
| `options` | `readonly Required<VirtualizerOptions<TScrollElement, TItemElement>>` | The current options for the virtualizer. Updated via your framework adapter; read-only. |
| `scrollElement` | `readonly TScrollElement \| null` | The current scrollElement for the virtualizer. Updated via your framework adapter; read-only. |
| `getVirtualItems` | `() => VirtualItem[]` | Returns the virtual items for the current state of the virtualizer. |
| `getVirtualIndexes` | `() => number[]` | Returns the virtual row indexes for the current state of the virtualizer. |
| `scrollToOffset` | `(toOffset: number, options?: { align?: 'start' \| 'center' \| 'end' \| 'auto', behavior?: 'auto' \| 'smooth' }) => void` | Scrolls the virtualizer to the pixel offset provided, optionally anchored to a part of the scrollElement. |
| `scrollToIndex` | `(index: number, options?: { align?: 'start' \| 'center' \| 'end' \| 'auto', behavior?: 'auto' \| 'smooth' }) => void` | Scrolls the virtualizer to the item at the given index, optionally anchored to a part of the scrollElement. |
| `scrollBy` | `(delta: number, options?: { behavior?: 'auto' \| 'smooth' }) => void` | Scrolls the virtualizer by the specified number of pixels relative to the current scroll position. |
| `scrollToEnd` | `(options?: { behavior?: 'auto' \| 'smooth' \| 'instant' }) => void` | Scrolls the virtualizer to the end of the content (bottom for vertical lists, right edge for horizontal lists). |
| `getDistanceFromEnd` | `() => number` | Returns the current pixel distance from the end of the virtualized content. |
| `isAtEnd` | `(threshold?: number) => boolean` | Returns whether the viewport is within `threshold` pixels of the end. Uses `scrollEndThreshold` if no threshold is provided. |
| `getTotalSize` | `() => number` | Returns the total size in pixels for the virtualized items. Changes incrementally as items are dynamically measured. |
| `measure` | `() => void` | Resets any previous item measurements. |
| `takeSnapshot` | `() => Array<VirtualItem>` | Returns a snapshot of currently-measured items as plain `VirtualItem` objects, suitable for round-tripping through state storage and feeding back as `initialMeasurementsCache` on remount. |
| `measureElement` | `(el: TItemElement \| null) => void` | Measures the element using the configured `measureElement` option. Must be called in your markup (e.g. a ref callback) with `data-index` also set. |
| `resizeItem` | `(index: number, size: number) => void` | Manually changes a virtualized item's size for the given index. |
| `scrollRect` | `Rect` | Current `Rect` of the scroll element. |
| `shouldAdjustScrollPositionOnItemSizeChange` | `undefined \| ((item: VirtualItem, delta: number, instance: Virtualizer<TScrollElement, TItemElement>) => boolean)` | Fine-grained control over scroll-position adjustments when an above-viewport item's size changes. Assigned directly on the instance. |
| `isScrolling` | `boolean` | Boolean flag indicating if the list is currently being scrolled. |
| `scrollDirection` | `'forward' \| 'backward' \| null` | Direction of scrolling (`'forward'` = downwards, `'backward'` = upwards). `null` when not actively scrolling. |
| `scrollOffset` | `number` | The current scroll position along the scrolling axis, in pixels from the start of the scrollable area. |

## Notes

- `scrollToFn`, `observeElementRect`, and `observeElementOffset` have no default in the core options object — framework adapters (React, Vue, etc.) supply `elementScroll`/`windowScroll` and `observeElementRect`/`observeElementOffset` (or their window equivalents) automatically. See [Utilities](./utilities.md).
- Estimate items at the largest possible size (width/height, within reason) to improve positioning accuracy during dynamic measurement.
- Masonry layouts use `lanes` together with `laneAssignmentMode: 'estimate' | 'measured'` to control when lane assignments are cached.
- End-anchored scrolling (chat/log interfaces) uses `anchorTo: 'end'` with `followOnAppend` to auto-scroll to newly appended content.
- `initialMeasurementsCache` (paired with `takeSnapshot()`) restores measurements after navigation without a re-measurement pass.
- Use "block translation" for smooth scrolling rather than independently positioning every item, to keep layout correct during partial measurement skipping.

## Related

- [VirtualItem](./virtual-item.md)
- [Utilities](./utilities.md)
