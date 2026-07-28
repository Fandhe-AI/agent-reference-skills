# TransformingLazyColumn / ScalingLazyColumn

Wear-specific vertically scrolling lazy lists that only compose visible items. `TransformingLazyColumn` (Material3-era) supports per-item scale/morph transformations near screen edges; `ScalingLazyColumn` (foundation lazy list used since Material2.5) applies built-in scaling/fisheye and transparency effects and auto-centers content.

## Signature / Usage

```kotlin
@Composable
public fun TransformingLazyColumn(
    modifier: Modifier = Modifier,
    state: TransformingLazyColumnState = rememberTransformingLazyColumnState(),
    contentPadding: PaddingValues = PaddingValues(),
    reverseLayout: Boolean = false,
    verticalArrangement: Arrangement.Vertical =
        Arrangement.spacedBy(space = 4.dp, alignment = if (!reverseLayout) Alignment.Top else Alignment.Bottom),
    horizontalAlignment: Alignment.Horizontal = Alignment.CenterHorizontally,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    rotaryScrollableBehavior: RotaryScrollableBehavior? = RotaryScrollableDefaults.behavior(state),
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    firstLayoutItemProvider: TransformingLazyColumnFirstLayoutItemProvider? = null,
    content: TransformingLazyColumnScope.() -> Unit,
)
```

```kotlin
val columnState = rememberTransformingLazyColumnState()
val transformationSpec = rememberTransformationSpec()

ScreenScaffold(scrollState = columnState) { contentPadding ->
    TransformingLazyColumn(state = columnState, contentPadding = contentPadding) {
        item {
            ListHeader(
                modifier = Modifier
                    .fillMaxWidth()
                    .transformedHeight(this, transformationSpec),
                transformation = SurfaceTransformation(transformationSpec),
            ) { Text("Header") }
        }
    }
}
```

`ScalingLazyColumn` signature:

```kotlin
@Composable
public fun ScalingLazyColumn(
    modifier: Modifier = Modifier,
    state: ScalingLazyListState = rememberScalingLazyListState(),
    contentPadding: PaddingValues = PaddingValues(horizontal = 10.dp),
    reverseLayout: Boolean = false,
    verticalArrangement: Arrangement.Vertical =
        Arrangement.spacedBy(space = 4.dp, alignment = if (!reverseLayout) Alignment.Top else Alignment.Bottom),
    horizontalAlignment: Alignment.Horizontal = Alignment.CenterHorizontally,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    scalingParams: ScalingParams = ScalingLazyColumnDefaults.scalingParams(),
    anchorType: ScalingLazyListAnchorType = ScalingLazyListAnchorType.ItemCenter,
    autoCentering: AutoCenteringParams? = AutoCenteringParams(),
    rotaryScrollableBehavior: RotaryScrollableBehavior? = RotaryScrollableDefaults.behavior(state),
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: ScalingLazyListScope.() -> Unit,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TransformingLazyColumnState` / `ScalingLazyListState` | `remember...State()` | Scroll state; share with the enclosing `ScreenScaffold` so `TimeText`/`ScrollIndicator` react to scroll. |
| `contentPadding` | `PaddingValues` | `PaddingValues()` / `PaddingValues(horizontal = 10.dp)` | Padding around content. |
| `reverseLayout` | `Boolean` | `false` | Anchors list to the bottom edge (index 0 last) — useful for messaging/log UIs. |
| `flingBehavior` | `FlingBehavior` | `ScrollableDefaults.flingBehavior()` | Fling/snap behavior; use `TransformingLazyColumnDefaults.snapFlingBehavior(state)` for snap-to-item. |
| `rotaryScrollableBehavior` | `RotaryScrollableBehavior?` | `RotaryScrollableDefaults.behavior(state)` | Crown/bezel rotary input handling; pass `RotaryScrollableDefaults.snapBehavior(state)` for snap. |
| `scalingParams` (ScalingLazyColumn) | `ScalingParams` | `ScalingLazyColumnDefaults.scalingParams()` | Controls scale/alpha falloff toward screen edges. |
| `anchorType` (ScalingLazyColumn) | `ScalingLazyListAnchorType` | `ItemCenter` | Which part of an item aligns to the scroll anchor. |
| `autoCentering` (ScalingLazyColumn) | `AutoCenteringParams?` | `AutoCenteringParams()` | Adds spacer padding so first/last items can be centered. |
| `content` | scope lambda | — | `item { }` / `items(...)` DSL. |

## Notes

- Use `Modifier.transformedHeight(this, transformationSpec)` + `SurfaceTransformation(transformationSpec)` on `TransformingLazyColumn` items (e.g. `ListHeader`, `Card`) to get scale/morph/fade effects near screen edges.
- `TransformingLazyColumnDefaults.snapFlingBehavior(state)` combined with `RotaryScrollableDefaults.snapBehavior(state)` settles the list with an item centered after a scroll gesture.
- `EdgeButton` is placed via a `ScreenScaffold` slot, not as a list item.
- Package: `androidx.wear.compose.foundation.lazy` (artifact `androidx.wear.compose:compose-foundation`). Distinct from mobile `androidx.compose.foundation.lazy.LazyColumn`.

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [ListHeader](./list-header.md)
- [Rotary input](./rotary-input.md)
- [SwipeToReveal / BasicSwipeToDismissBox](./swipe-to-reveal.md)
