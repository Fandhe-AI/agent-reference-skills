# layout

| Name | Description | Path |
|------|-------------|------|
| Alignment lines | `AlignmentLine` defines a custom reference point a layout exposes for positioning, read by a parent after measurement. | [alignment-lines.md](./alignment-lines.md) |
| Arrangement / Alignment | `Arrangement` controls spacing/positioning of children along a layout's main axis. `Alignment` controls positioning along the cross axis. | [arrangement-alignment.md](./arrangement-alignment.md) |
| Box | A layout composable that stacks its children on top of one another (Z-axis). Sizes itself to fit content, subject to incoming constraints. | [box.md](./box.md) |
| BoxWithConstraints | A composable that defines its own content according to the available space, based on incoming constraints or the current `LayoutDirection`. | [boxwithconstraints.md](./boxwithconstraints.md) |
| Column | A layout composable that places its children in a vertical sequence. Items do not scroll by default. | [column.md](./column.md) |
| ConstraintLayout | A layout that lets composables be placed relative to other composables using constraints, similar to the View-system `ConstraintLayout`. | [constraintlayout.md](./constraintlayout.md) |
| FlexBox / Grid (experimental) | `FlexBox` and `Grid` are experimental, non-lazy layout composables inspired by CSS Flexbox and CSS Grid. | [flexbox-grid.md](./flexbox-grid.md) |
| FlowRow / FlowColumn | Layouts that fill items in a row/column and wrap to the next line when space runs out. | [flow-layout.md](./flow-layout.md) |
| Intrinsic measurements (custom layout authoring) | When authoring a custom `Layout` or `LayoutModifier`, override the intrinsic methods to report accurate values. | [intrinsic-measurements.md](./intrinsic-measurements.md) |
| IntrinsicSize | An enum used with `Modifier.width` / `Modifier.height` to size content to its intrinsic minimum or maximum. | [intrinsicsize.md](./intrinsicsize.md) |
| Layout (custom layout) | The primitive composable used to manually measure and place child composables. | [layout.md](./layout.md) |
| LazyListScope (item / items / itemsIndexed / stickyHeader) | The DSL receiver used inside `LazyColumn` / `LazyRow` content blocks to declare items. | [lazy-list-scope.md](./lazy-list-scope.md) |
| LazyColumn | The vertically scrolling list that only composes and lays out currently visible items. | [lazycolumn.md](./lazycolumn.md) |
| LazyHorizontalGrid | A lazy horizontal grid layout that composes and lays out only visible columns. | [lazyhorizontalgrid.md](./lazyhorizontalgrid.md) |
| LazyRow | The horizontally scrolling list that only composes and lays out currently visible items. | [lazyrow.md](./lazyrow.md) |
| LazyVerticalGrid | A lazy vertical grid layout that composes and lays out only visible rows. | [lazyverticalgrid.md](./lazyverticalgrid.md) |
| LazyVerticalStaggeredGrid | A lazy vertical staggered grid that allows items of varying heights within each column. | [lazyverticalstaggeredgrid.md](./lazyverticalstaggeredgrid.md) |
| Modifier (layout) | Layout-related `Modifier` extension functions for sizing, padding, offsetting, and aspect ratio. | [modifier-layout.md](./modifier-layout.md) |
| HorizontalPager / VerticalPager / rememberPagerState | Pagers that lazily lay out uniformly-sized pages and use snap-fling animation to settle on a page. | [pager.md](./pager.md) |
| rememberLazyListState | Creates and remembers a `LazyListState` across compositions, used to read and control the scroll position. | [rememberlazyliststate.md](./rememberlazyliststate.md) |
| Row | A layout composable that places its children in a horizontal sequence. Items do not scroll by default. | [row.md](./row.md) |
| verticalScroll / horizontalScroll / rememberScrollState / nestedScroll | Modifiers that make content scrollable when it exceeds its constraints. | [scroll.md](./scroll.md) |
| Spacer | Component that represents an empty space layout, whose size is defined via size modifiers. | [spacer.md](./spacer.md) |
| SubcomposeLayout | An analogue of `Layout` that allows subcomposing content during the measuring stage. | [subcomposelayout.md](./subcomposelayout.md) |
| Visibility tracking (onVisibilityChanged / onLayoutRectChanged) | `Modifier.onVisibilityChanged` reports when a composable becomes visible or invisible on screen. | [visibility-tracking.md](./visibility-tracking.md) |
