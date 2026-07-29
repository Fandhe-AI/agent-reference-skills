# Visibility tracking (onVisibilityChanged / onLayoutRectChanged)

`Modifier.onVisibilityChanged` reports when a composable becomes visible or invisible on screen (accounting for occlusion, off-screen bounds, and alpha/scale), for use cases like analytics, lazy media playback, or deferring network fetches. It is built on the lower-level `Modifier.onLayoutRectChanged`, which reports raw layout bounds relative to the root, window, and screen.

## Signature / Usage

```kotlin
fun Modifier.onVisibilityChanged(
    minFractionVisible: Float = 1.0f,
    minDurationMs: Long = 0L,
    onVisibilityChanged: (visible: Boolean) -> Unit,
): Modifier

fun Modifier.onLayoutRectChanged(
    owner: Long,
    window: Long,
    onLayoutRectChanged: (LayoutRect) -> Unit,
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
| `minFractionVisible` | `Float` | `1.0f` | Fraction (0.0–1.0) of the composable's area that must be on screen and unoccluded for `onVisibilityChanged(true)` to fire. |
| `minDurationMs` | `Long` | `0L` | Minimum continuous duration the visibility threshold must hold before the callback fires; the timer resets if visibility is lost earlier. |
| `onVisibilityChanged` | `(Boolean) -> Unit` | — | Callback invoked with `true`/`false` when the visibility state crosses the threshold. |

## Notes

- Modifier order matters: place `onVisibilityChanged`/`onLayoutRectChanged` before size/padding modifiers that would otherwise shrink the measured area being tracked.
- `onLayoutRectChanged` is the lower-level, better-performing alternative to `Modifier.onGloballyPositioned`/`LayoutCoordinates` polling for tracking bounds relative to root, window, and screen; `onVisibilityChanged` is the higher-level API most call sites should prefer.
- Typical uses: impression analytics in scrollable lists, auto-play/pause of media, and deferring network fetches in `LazyColumn`/`LazyRow` items until visible.
- Package: `androidx.compose.ui.layout`.

## Related

- [LazyColumn](./lazycolumn.md)
- [LazyRow](./lazyrow.md)
- [Layout (custom layout)](./layout.md)
