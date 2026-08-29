# samples

| Name | Description | Path |
| --- | --- | --- |
| Fixed-size row virtualization | Virtualize a vertical list where every row has the same, hard-coded height | [fixed-rows.md](./fixed-rows.md) |
| Fixed-size horizontal (column) virtualization | Virtualize a horizontal list of same-width columns using `horizontal: true` | [fixed-columns.md](./fixed-columns.md) |
| Variable-size rows with a known-ahead `estimateSize` | Virtualize rows whose sizes differ per index but are known in advance (no DOM measurement needed) | [variable-rows.md](./variable-rows.md) |
| Dynamically measured rows with `measureElement` | Virtualize rows whose exact size is unknown until rendered, correcting the estimate after mount | [dynamic-measured.md](./dynamic-measured.md) |
| Grid virtualization (row + column virtualizers combined) | Virtualize both axes at once by combining a vertical and a horizontal `useVirtualizer` | [grid.md](./grid.md) |
| Sticky section headers via a custom `rangeExtractor` | Keep a group header pinned to the top of the viewport while its group scrolls past | [sticky-headers.md](./sticky-headers.md) |
| Infinite scroll with `useInfiniteQuery` | Trigger `fetchNextPage` when scrolling near the end of the loaded rows | [infinite-scroll.md](./infinite-scroll.md) |
| Virtualizing a `@tanstack/react-table` body | Render only visible `<tr>`s of a `@tanstack/react-table` instance | [table-virtualization.md](./table-virtualization.md) |
| Window-scrolled list with `useWindowVirtualizer` | Virtualize a list that scrolls with the browser window, using `scrollMargin` | [window-scroller.md](./window-scroller.md) |
| Custom easing for `scrollToIndex` via `scrollToFn` | Override the default scroll behavior with a custom easing animation | [smooth-scroll.md](./smooth-scroll.md) |
| Padding around the list and gaps between items | Reserve space before/after the range with `paddingStart`/`paddingEnd`, and space items with `gap` | [padding-gap.md](./padding-gap.md) |
