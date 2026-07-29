# Progress Indicators (Circular / Linear / Arc / Level / Page / Segmented)

Family of Wear Material3 progress/status indicators: `CircularProgressIndicator` (full-screen ring), `SegmentedCircularProgressIndicator` (ring divided into equal segments), `LinearProgressIndicator` (bar), `ArcProgressIndicator` (partial arc, often indeterminate), `LevelIndicator` (volume/brightness-style level arc controlled by rotary input), and `PageIndicator` (`HorizontalPageIndicator` / `VerticalPageIndicator`, current page in a `Pager`).

## Signature / Usage

```kotlin
public fun CircularProgressIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    allowProgressOverflow: Boolean = false,
    startAngle: Float = CircularProgressIndicatorDefaults.StartAngle,
    endAngle: Float = startAngle,
    colors: ProgressIndicatorColors = ProgressIndicatorDefaults.colors(),
    strokeWidth: Dp = CircularProgressIndicatorDefaults.largeStrokeWidth,
    gapSize: Dp = CircularProgressIndicatorDefaults.calculateRecommendedGapSize(strokeWidth),
)
```

```kotlin
CircularProgressIndicator(progress = { 0.4f })
```

```kotlin
@Composable
public fun SegmentedCircularProgressIndicator(
    segmentCount: Int,
    progress: () -> Float,
    modifier: Modifier = Modifier,
    allowProgressOverflow: Boolean = false,
    startAngle: Float = CircularProgressIndicatorDefaults.StartAngle,
    endAngle: Float = startAngle,
    colors: ProgressIndicatorColors = ProgressIndicatorDefaults.colors(),
    strokeWidth: Dp = CircularProgressIndicatorDefaults.largeStrokeWidth,
    gapSize: Dp = CircularProgressIndicatorDefaults.calculateRecommendedGapSize(strokeWidth),
    enabled: Boolean = true,
)
```

```kotlin
SegmentedCircularProgressIndicator(segmentCount = 4, progress = { 0.6f })
```

```kotlin
public fun LinearProgressIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    colors: ProgressIndicatorColors = ProgressIndicatorDefaults.colors(),
    strokeWidth: Dp = LinearProgressIndicatorDefaults.StrokeWidthLarge,
    enabled: Boolean = true,
)
```

```kotlin
@Composable
public fun ArcProgressIndicator(
    modifier: Modifier = Modifier,
    startAngle: Float = ArcProgressIndicatorDefaults.IndeterminateStartAngle,
    endAngle: Float = ArcProgressIndicatorDefaults.IndeterminateEndAngle,
    angularDirection: AngularDirection = AngularDirection.CounterClockwise,
    colors: ProgressIndicatorColors = ProgressIndicatorDefaults.colors(),
    strokeWidth: Dp = ArcProgressIndicatorDefaults.IndeterminateStrokeWidth,
    gapSize: Dp = ArcProgressIndicatorDefaults.calculateRecommendedGapSize(strokeWidth),
)
```

```kotlin
@Composable
public fun LevelIndicator(
    value: () -> Float,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: LevelIndicatorColors = LevelIndicatorDefaults.colors(),
    strokeWidth: Dp = LevelIndicatorDefaults.StrokeWidth,
    @FloatRange(from = 0.0, to = 360.0) sweepAngle: Float = LevelIndicatorDefaults.SweepAngle,
    reverseDirection: Boolean = false,
)
```

```kotlin
public fun HorizontalPageIndicator(
    pagerState: PagerState,
    modifier: Modifier = Modifier,
    selectedColor: Color = PageIndicatorDefaults.selectedColor,
    unselectedColor: Color = PageIndicatorDefaults.unselectedColor,
    backgroundColor: Color = PageIndicatorDefaults.backgroundColor,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` (Circular/Segmented/Linear) | `() -> Float` | — | Lambda returning current progress `0f..1f` (or beyond with `allowProgressOverflow`). |
| `segmentCount` (Segmented) | `Int` | — | Number of equally sized segments the ring is divided into; must be `>= 1`. |
| `allowProgressOverflow` (Circular/Segmented) | `Boolean` | `false` | Allows progress values > 1 to wrap visually with a distinct overflow track color. |
| `startAngle` / `endAngle` (Circular/Arc) | `Float` | defaults-provided | Arc sweep bounds in degrees. |
| `angularDirection` (Arc) | `AngularDirection` | `CounterClockwise` | Direction the arc sweeps. |
| `value` (LevelIndicator) | `() -> Float` | — | Current level `0f..1f`, typically driven by rotary input. |
| `sweepAngle` (LevelIndicator) | `Float` (0–360) | `LevelIndicatorDefaults.SweepAngle` | Arc extent shown. |
| `pagerState` (PageIndicator) | `PagerState` | — | Active page / page count source. |
| `strokeWidth` | `Dp` | component-specific default | Indicator stroke thickness. |
| `gapSize` (Circular/Arc) | `Dp` | `calculateRecommendedGapSize(strokeWidth)` | Gap in the ring/arc track. |

## Notes

- `CircularProgressIndicator`, `SegmentedCircularProgressIndicator`, and `LinearProgressIndicator` are determinate (driven by `progress`); `ArcProgressIndicator` shown here is the indeterminate overload (a determinate overload with a `progress` param also exists).
- `SegmentedCircularProgressIndicator` is a distinct composable, not a parameter on `CircularProgressIndicator`; use it when progress should read as discrete steps (e.g. a multi-stage workout) rather than a continuous ring.
- `LevelIndicator` is intended for screens controlling a setting (volume/brightness) via rotary side button or bezel.
- `VerticalPageIndicator` mirrors `HorizontalPageIndicator` for `VerticalPager`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [Rotary input](./rotary-input.md)
