# Rotary Input (Modifier.rotaryScrollable / RotaryScrollableDefaults)

Handles physical crown/rotating-bezel input, connecting rotary events to scrollable containers. `ScalingLazyColumn`, `TransformingLazyColumn`, `Picker`, and `AppScaffold`/`ScreenScaffold` scroll indicators support it out of the box via their `rotaryScrollableBehavior` parameter; `Modifier.rotaryScrollable` / `Modifier.onRotaryScrollEvent` are for custom scrollables.

## Signature / Usage

```kotlin
public fun Modifier.rotaryScrollable(
    behavior: RotaryScrollableBehavior,
    focusRequester: FocusRequester,
    reverseDirection: Boolean = false,
    overscrollEffect: OverscrollEffect? = null,
): Modifier
```

```kotlin
@Composable
public fun RotaryScrollableDefaults.behavior(
    scrollableState: ScrollableState,
    flingBehavior: FlingBehavior? = ScrollableDefaults.flingBehavior(),
    hapticFeedbackEnabled: Boolean = true,
): RotaryScrollableBehavior
```

```kotlin
@Composable
public fun RotaryScrollableDefaults.snapBehavior(
    scrollableState: TransformingLazyColumnState,
    snapOffset: Dp = 0.dp,
    hapticFeedbackEnabled: Boolean = true,
    @FloatRange(from = 0.0, to = 1.0) snapSensitivity: Float = LowSnapSensitivity,
): RotaryScrollableBehavior
```

```kotlin
// custom rotary handling for a non-scrollable component (e.g. volume control)
TransformingLazyColumn(
    modifier = Modifier
        .fillMaxSize()
        .onRotaryScrollEvent {
            volumeViewModel.onVolumeChangeByScroll(it.verticalScrollPixels)
            true
        }
        .focusRequester(focusRequester)
        .focusable(),
) { /* ... */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `behavior` (rotaryScrollable) | `RotaryScrollableBehavior` | — | Obtained from `RotaryScrollableDefaults.behavior(...)` or `.snapBehavior(...)`. |
| `focusRequester` (rotaryScrollable) | `FocusRequester` | — | Must be paired with `Modifier.focusRequester(...).focusable()` so the component can receive rotary events. |
| `reverseDirection` | `Boolean` | `false` | Reverses scroll direction. |
| `scrollableState` (behavior/snapBehavior) | `ScrollableState` / `ScalingLazyListState` / `TransformingLazyColumnState` / `PagerState` | — | Target being scrolled; overloads exist per state type. |
| `snapOffset` (snapBehavior) | `Dp` | `0.dp` | Offset applied when snapping. |
| `snapSensitivity` (snapBehavior) | `Float` (0–1) | `LowSnapSensitivity` (0.4f) | How much rotary input is needed to trigger a snap; `HighSnapSensitivity` (0.8f) for lighter-gesture contexts, used as the `PagerState` overload default. |
| `hapticFeedbackEnabled` | `Boolean` | `true` | Plays haptic feedback on scroll/snap. |

## Notes

- `ScalingLazyColumn` / `TransformingLazyColumn` / `Picker` already wire up rotary support via their own `rotaryScrollableBehavior` parameter — only reach for `Modifier.rotaryScrollable` directly for custom scrollables, and `Modifier.onRotaryScrollEvent` for non-scrollable custom rotary handling (e.g. adjusting a value).
- Scroll direction of `Modifier.rotaryScrollable` is aligned with `Modifier.verticalScroll` / `Modifier.horizontalScroll`.
- Package: `androidx.wear.compose.foundation.rotary` (artifact `androidx.wear.compose:compose-foundation`).

## Related

- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
- [Picker / PickerGroup / DatePicker / TimePicker](./picker.md)
- [Progress indicators (LevelIndicator)](./progress-indicators.md)
