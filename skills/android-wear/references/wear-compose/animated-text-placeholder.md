# AnimatedText / Placeholder

`AnimatedText` animates a piece of text along font-variation axes and size (e.g. weight/size interpolation on a numeric readout). `Modifier.placeholder` / `Modifier.placeholderShimmer` draw a skeleton shape (with an optional shimmer sweep) over a component while its real content is still loading, then animate a reveal once it becomes available — the standard Wear pattern for loading-state UI.

## Signature / Usage

```kotlin
@Composable
@RequiresApi(31)
public fun AnimatedText(
    text: String,
    fontRegistry: AnimatedTextFontRegistry,
    progressFraction: () -> Float,
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.Center,
)
```

```kotlin
@Composable
@RequiresApi(31)
public fun rememberAnimatedTextFontRegistry(
    startFontVariationSettings: FontVariation.Settings,
    endFontVariationSettings: FontVariation.Settings,
    textStyle: TextStyle = LocalTextStyle.current,
    startFontSize: TextUnit = textStyle.fontSize,
    endFontSize: TextUnit = textStyle.fontSize,
): AnimatedTextFontRegistry
```

```kotlin
val fontRegistry = rememberAnimatedTextFontRegistry(
    startFontVariationSettings = FontVariation.Settings(FontVariation.weight(400)),
    endFontVariationSettings = FontVariation.Settings(FontVariation.weight(700)),
    startFontSize = 24.sp,
    endFontSize = 32.sp,
)
val animatable = remember { Animatable(0f) }
AnimatedText(text = "$count", fontRegistry = fontRegistry, progressFraction = { animatable.value })
```

```kotlin
@Composable
public fun Modifier.placeholder(
    placeholderState: PlaceholderState,
    shape: Shape = PlaceholderDefaults.shape,
    color: Color = PlaceholderDefaults.color,
): Modifier
```

```kotlin
val placeholderState = rememberPlaceholderState(isVisible = isLoading)
Text(
    text = title ?: "",
    modifier = Modifier
        .placeholderShimmer(placeholderState)
        .placeholder(placeholderState),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` (AnimatedText) | `String` | — | Text to display; updates trigger re-measurement. |
| `fontRegistry` (AnimatedText) | `AnimatedTextFontRegistry` | — | Created via `rememberAnimatedTextFontRegistry`; caches fonts across the start/end variation settings for performance. |
| `progressFraction` (AnimatedText) | `() -> Float` | — | Current animation progress, `0f` (start) to `1f` (end); may overshoot with spring animations. |
| `placeholderState` (placeholder/placeholderShimmer) | `PlaceholderState` | — | Created with `rememberPlaceholderState(isVisible)`; coordinates the shimmer and one or more placeholder shapes on the same component. |
| `shape` / `color` (placeholder/placeholderShimmer) | `Shape` / `Color` | `PlaceholderDefaults.shape` / `.color` / `.shimmerColor` | Placeholder skeleton shape and fill/shimmer color. |

## Notes

- `AnimatedText` requires API 31+ (`@RequiresApi(31)`).
- `Modifier.placeholderShimmer` must come **before** `Modifier.placeholder` in the modifier chain when both are applied to the same composable.
- Both `Modifier.placeholder` and `Modifier.placeholderShimmer` require an `AppScaffold` ancestor for their reveal/shimmer animations to run, and respect system reduced-motion (animations become instantaneous).
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [Card (Wear)](./card.md)
