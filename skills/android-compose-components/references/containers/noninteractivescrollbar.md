# Modifier.nonInteractiveScrollbar

A visual-only scrollbar `Modifier` that draws the current scroll position of a scrolling component. It cannot be dragged to scroll; it is drawn at the end edge (respecting layout direction) for a vertically scrollable component, or the bottom edge for a horizontally scrollable one, and is only shown while content size exceeds the viewport.

## Signature / Usage

```kotlin
@Composable
fun Modifier.nonInteractiveScrollbar(
    state: ScrollIndicatorState,
    orientation: Orientation,
    thumbColor: Color = NonInteractiveScrollbarDefaults.thumbColor,
    trackColor: Color = Color.Transparent,
    thickness: Dp = NonInteractiveScrollbarDefaults.Thickness,
    thumbMinLength: Dp = NonInteractiveScrollbarDefaults.ThumbMinLength,
    thumbMaxLengthFraction: Float = NonInteractiveScrollbarDefaults.ThumbMaxLengthFraction,
    isFadeEnabled: Boolean = true,
    fadeDurationMillis: Int = NonInteractiveScrollbarDefaults.ThumbFadeDurationMillis,
    fadeDelayMillis: Int = NonInteractiveScrollbarDefaults.ThumbFadeDelayMillis,
    mainAxisTrackInset: Dp = NonInteractiveScrollbarDefaults.MainAxisTrackInset,
    crossAxisTrackInset: Dp = NonInteractiveScrollbarDefaults.CrossAxisTrackInset,
): Modifier
```

```kotlin
val state = rememberLazyListState()
val scrollIndicatorState = state.scrollIndicatorState
val scrollbarModifier =
    if (scrollIndicatorState != null) {
        Modifier.nonInteractiveScrollbar(scrollIndicatorState, orientation = Orientation.Vertical)
    } else {
        Modifier
    }

LazyColumn(state = state, modifier = Modifier.fillMaxSize().then(scrollbarModifier)) {
    items(items) { item -> Text(item) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `ScrollIndicatorState` | — | The scroll indicator state to track; obtained from the nullable `scrollIndicatorState` extension property on `LazyListState`/`ScrollState`, not passed as the state object itself. |
| `orientation` | `Orientation` | — | Whether the scrollbar tracks a vertically or horizontally scrollable component. |
| `thumbColor` | `Color` | `NonInteractiveScrollbarDefaults.thumbColor` | Color of the scrollbar thumb. |
| `trackColor` | `Color` | `Color.Transparent` | Color of the scrollbar track. |
| `thickness` | `Dp` | `NonInteractiveScrollbarDefaults.Thickness` | Thickness of the scrollbar. |
| `thumbMinLength` | `Dp` | `NonInteractiveScrollbarDefaults.ThumbMinLength` | Minimum thumb length; the scrollbar is not shown if the available track is shorter than this. |
| `thumbMaxLengthFraction` | `Float` | `NonInteractiveScrollbarDefaults.ThumbMaxLengthFraction` | Maximum thumb length as a fraction (0f–1f) of the viewport length. |
| `isFadeEnabled` | `Boolean` | `true` | If `true`, the scrollbar fades in while scrolling and fades out after a delay when idle; if `false`, it stays always visible. |
| `fadeDurationMillis` | `Int` | `NonInteractiveScrollbarDefaults.ThumbFadeDurationMillis` | Duration of the fade animation. |
| `fadeDelayMillis` | `Int` | `NonInteractiveScrollbarDefaults.ThumbFadeDelayMillis` | Delay before the scrollbar starts fading out once idle. |
| `mainAxisTrackInset` | `Dp` | `NonInteractiveScrollbarDefaults.MainAxisTrackInset` | Inset applied to the track along the main (scroll) axis. |
| `crossAxisTrackInset` | `Dp` | `NonInteractiveScrollbarDefaults.CrossAxisTrackInset` | Inset applied to the track along the cross axis. |

## Notes

- Visual only: dragging the thumb does not scroll the content. Combine with the underlying scrollable's own gesture handling (`LazyColumn`/`Modifier.verticalScroll` etc.) for actual scrolling.
- Present only in the `androidx-main` development branch source at the time of writing (absent from the released 1.4.0 API surface); signature and defaults may still change before stable release.
- Package: `androidx.compose.material3`.
