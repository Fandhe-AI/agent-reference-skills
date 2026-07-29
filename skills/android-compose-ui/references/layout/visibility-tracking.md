# Visibility tracking (onVisibilityChanged / onLayoutRectChanged)

`Modifier.onVisibilityChanged` reports when a composable becomes visible or invisible on screen (accounting for occlusion, off-screen bounds, and alpha/scale), for use cases like analytics, lazy media playback, or deferring network fetches. It is built on the lower-level `Modifier.onLayoutRectChanged`, which reports raw layout bounds relative to the root, window, and screen.

## Signature / Usage

```kotlin
fun Modifier.onVisibilityChanged(
    minDurationMs: Long = 0,
    minFractionVisible: Float = 1f,
    viewportBounds: LayoutBoundsHolder? = null,
    callback: (visible: Boolean) -> Unit,
): Modifier

fun Modifier.onLayoutRectChanged(
    throttleMillis: Long = 0,
    debounceMillis: Long = 64,
    callback: (RelativeLayoutBounds) -> Unit,
): Modifier
```

```kotlin
LazyColumn(modifier = Modifier.fillMaxSize()) {
    item {
        Box(
            modifier = Modifier
                .onVisibilityChanged(minFractionVisible = 0.2f) { visible ->
                    if (visible) {
                        viewModel.fetchDataFromNetwork()
                    }
                }
                .padding(vertical = 16.dp),
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onVisibilityChanged(...).minDurationMs` | `Long` | `0` | Minimum continuous duration the visibility threshold must hold before the callback fires; the timer resets if visibility is lost earlier. |
| `onVisibilityChanged(...).minFractionVisible` | `Float` | `1f` | Fraction (0.0–1.0) of the composable's area that must be on screen and unoccluded for the callback to fire with `true`. |
| `onVisibilityChanged(...).viewportBounds` | `LayoutBoundsHolder?` | `null` | Bounds to use as the "viewport" for computing visible fraction (e.g. to account for overlays like nav bars) instead of the application window; requires a matching `Modifier.layoutBounds` elsewhere. |
| `onVisibilityChanged(...).callback` | `(Boolean) -> Unit` | — | Invoked with `true`/`false` when the visibility state crosses the threshold. |
| `onLayoutRectChanged(...).throttleMillis` | `Long` | `0` | Minimum interval between successive `onLayoutRectChanged` callback invocations. |
| `onLayoutRectChanged(...).debounceMillis` | `Long` | `64` | Delay after the last layout change before the callback fires, coalescing rapid successive layout changes. |
| `onLayoutRectChanged(...).callback` | `(RelativeLayoutBounds) -> Unit` | — | Invoked with the element's bounds relative to the root, window, and screen (`positionInRoot`/`positionInWindow`/`positionInScreen`, `boundsInRoot`/`boundsInWindow`/`boundsInScreen`, `width`, `height`). |

## Notes

- Modifier order matters: place `onVisibilityChanged`/`onLayoutRectChanged` before size/padding modifiers that would otherwise shrink the measured area being tracked.
- `onLayoutRectChanged` is the lower-level, better-performing alternative to `Modifier.onGloballyPositioned`/`LayoutCoordinates` polling for tracking bounds (`RelativeLayoutBounds`) relative to root, window, and screen; `onVisibilityChanged` is the higher-level API most call sites should prefer.
- `onLayoutRectChanged` callbacks are throttled/debounced (`throttleMillis`, `debounceMillis`) rather than firing synchronously on every layout pass.
- Typical uses: impression analytics in scrollable lists, auto-play/pause of media, and deferring network fetches in `LazyColumn`/`LazyRow` items until visible.
- Package: `androidx.compose.ui.layout`.

## Related

- [LazyColumn](./lazycolumn.md)
- [LazyRow](./lazyrow.md)
- [Layout (custom layout)](./layout.md)
