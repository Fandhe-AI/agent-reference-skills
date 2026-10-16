# Layout

| Name | Description | Path |
|------|-------------|------|
| Alignment lines | `AlignmentLine` defines a custom reference point a layout exposes for positioning, read by a parent after measurement via `Placeable[alignmentLine]`. | [alignment-lines.md](./alignment-lines.md) |
| Arrangement / Alignment | `Arrangement` controls spacing/positioning of children along a layout's main axis (`Row`/`Column`/lazy layouts). | [arrangement-alignment.md](./arrangement-alignment.md) |
| Box | A layout composable that stacks its children on top of one another (Z-axis). | [box.md](./box.md) |
| BoxWithConstraints | A composable that defines its own content according to the available space, based on incoming constraints or the current `LayoutDirection`. | [boxwithconstraints.md](./boxwithconstraints.md) |
| Column | A layout composable that places its children in a vertical sequence. | [column.md](./column.md) |
| ConstraintLayout | A layout that lets composables be placed relative to other composables using constraints, similar to the View-system `ConstraintLayout`. | [constraintlayout.md](./constraintlayout.md) |
| FlexBox / Grid (experimental) | `FlexBox` and `Grid` are experimental, non-lazy layout composables in `androidx.compose.foundation.layout` inspired by CSS Flexbox and CSS Grid. | [flexbox-grid.md](./flexbox-grid.md) |
| FlowRow / FlowColumn | Layouts that fill items in a row/column and wrap to the next line when space runs out. | [flow-layout.md](./flow-layout.md) |
| Intrinsic measurements (custom layout authoring) | When authoring a custom `Layout` or `LayoutModifier`, intrinsic width/height are approximated by default; override the intrinsic methods to report accurate values. | [intrinsic-measurements.md](./intrinsic-measurements.md) |
| IntrinsicSize | An enum used with `Modifier.width` / `Modifier.height` to size content to its intrinsic minimum or maximum, letting siblings in a `Row`/`Column` match each other's size without a fixed value. | [intrinsicsize.md](./intrinsicsize.md) |
| Layout (custom layout) | The primitive composable used to manually measure and place child composables; all higher-level layouts (`Column`, `Row`, `Box`) are built on top of it. | [layout.md](./layout.md) |
| LazyLayoutCacheWindow | Represents an out-of-viewport area of a Lazy Layout where items are cached. | [lazy-layout-cache-window.md](./lazy-layout-cache-window.md) |
| LazyListScope (item / items / itemsIndexed / stickyHeader) | The DSL receiver used inside `LazyColumn` / `LazyRow` content blocks to declare items. | [lazy-list-scope.md](./lazy-list-scope.md) |
| LazyColumn | The vertically scrolling list that only composes and lays out currently visible items, following the same efficiency principles as `RecyclerView`. | [lazycolumn.md](./lazycolumn.md) |
| LazyHorizontalGrid | A lazy horizontal grid layout that composes and lays out only visible columns. | [lazyhorizontalgrid.md](./lazyhorizontalgrid.md) |
| LazyRow | The horizontally scrolling list that only composes and lays out currently visible items. | [lazyrow.md](./lazyrow.md) |
| LazyVerticalGrid | A lazy vertical grid layout that composes and lays out only visible rows. | [lazyverticalgrid.md](./lazyverticalgrid.md) |
| LazyVerticalStaggeredGrid | A lazy vertical staggered grid that allows items of varying heights within each column, composing and laying out only visible items. | [lazyverticalstaggeredgrid.md](./lazyverticalstaggeredgrid.md) |
| mediaQuery / derivedMediaQuery / UiMediaScope | Experimental, declarative API for adapting UI to its environment (window size, foldable posture, keyboard, pointer precision, camera/microphone availability, viewing distance). | [media-query.md](./media-query.md) |
| Modifier (layout) | Layout-related `Modifier` extension functions for sizing, padding, offsetting, and aspect ratio, from `androidx.compose.foundation.layout`. | [modifier-layout.md](./modifier-layout.md) |
| HorizontalPager / VerticalPager / rememberPagerState | Pagers that lazily lay out uniformly-sized pages and use snap-fling animation to settle on a page, similar to `ViewPager2`. | [pager.md](./pager.md) |
| rememberLazyListState | Creates and remembers a `LazyListState` across compositions, used to read and control the scroll position of `LazyColumn` / `LazyRow`. | [rememberlazyliststate.md](./rememberlazyliststate.md) |
| Row | A layout composable that places its children in a horizontal sequence. | [row.md](./row.md) |
| verticalScroll / horizontalScroll / rememberScrollState / nestedScroll | Modifiers that make content scrollable when it exceeds its constraints, for the common case of a small, non-lazy amount of content. | [scroll.md](./scroll.md) |
| Spacer | Component that represents an empty space layout, whose size is defined via size modifiers. | [spacer.md](./spacer.md) |
| Styles API (Style / StyleScope / StyleState / Modifier.styleable) | Experimental, CSS-like paradigm for styling composables: a single `Style` value replaces multiple styling parameters and supports state-based conditional styling. | [styles.md](./styles.md) |
| SubcomposeLayout | An analogue of `Layout` that allows subcomposing content during the measuring stage, e.g. to use values calculated during measurement as parameters for composing further children. | [subcomposelayout.md](./subcomposelayout.md) |
| Visibility tracking (onVisibilityChanged / onLayoutRectChanged) | `Modifier.onVisibilityChanged` reports when a composable becomes visible or invisible on screen (accounting for occlusion, off-screen bounds, and alpha/scale). | [visibility-tracking.md](./visibility-tracking.md) |
