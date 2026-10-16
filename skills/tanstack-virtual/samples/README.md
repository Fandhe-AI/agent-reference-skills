# samples

| Name | Description | Path |
|------|-------------|------|
| End-anchored chat message list | Chat list anchored to its latest message (`anchorTo: 'end'`, `followOnAppend`), with older-message loading and a jump-to-latest button. | [chat-end-anchored.md](./chat-end-anchored.md) |
| Dynamically measured rows with `measureElement` | Virtualize rows of unknown size, correcting estimates after mount with `measureElement`. | [dynamic-measured.md](./dynamic-measured.md) |
| Fixed-size horizontal (column) virtualization | Virtualize a horizontal list of same-width columns using `horizontal: true`. | [fixed-columns.md](./fixed-columns.md) |
| Fixed-size row virtualization | Virtualize a vertical list where every row has the same, hard-coded height. | [fixed-rows.md](./fixed-rows.md) |
| Grid virtualization (row + column virtualizers combined) | Virtualize both axes by nesting a vertical and a horizontal `useVirtualizer` on one scroll element. | [grid.md](./grid.md) |
| Infinite scroll with `useInfiniteQuery` | Combine `useInfiniteQuery` with `useVirtualizer` to call `fetchNextPage` near the end of loaded rows. | [infinite-scroll.md](./infinite-scroll.md) |
| Padding around the list and gaps between items | Reserve space before/after the range with `paddingStart`/`paddingEnd`, and add spacing with `gap`. | [padding-gap.md](./padding-gap.md) |
| Text-height estimates with Pretext | Compute each row's height from its text with `@chenglou/pretext` inside `estimateSize`. | [pretext-text-estimate.md](./pretext-text-estimate.md) |
| Scroll padding below a sticky table header | Set `paddingStart` and `scrollPaddingStart` to the `<thead>` height so `scrollToIndex` clears a sticky header. | [scroll-padding.md](./scroll-padding.md) |
| Custom easing for `scrollToIndex` via `scrollToFn` | Custom easing for `scrollToIndex` / `scrollToOffset` via `scrollToFn`. | [smooth-scroll.md](./smooth-scroll.md) |
| Sticky section headers via a custom `rangeExtractor` | Pin group headers to the viewport top with a custom `rangeExtractor`. | [sticky-headers.md](./sticky-headers.md) |
| Virtualizing a `@tanstack/react-table` body | Virtualize the rows of a `@tanstack/react-table` body, rendering only visible `<tr>`s. | [table-virtualization.md](./table-virtualization.md) |
| Variable-size rows with a known-ahead `estimateSize` | Virtualize rows with per-index sizes known in advance via `estimateSize`, without DOM measurement. | [variable-rows.md](./variable-rows.md) |
| Window-scrolled list with `useWindowVirtualizer` | Virtualize a list scrolling with the browser window using `useWindowVirtualizer` and `scrollMargin`. | [window-scroller.md](./window-scroller.md) |
