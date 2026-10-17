# One-handed gestures (Modifier.oneHandedGesture / OneHandedGestureConfiguration)

On Wear OS 7 (API level 37) and higher, a one-handed gesture framework plus a Compose for Wear OS API lets users interact with an app touch-free. Two gestures are supported: Primary action (double pinch; main action such as answering a call or toggling media playback) and Dismiss action (wrist turn; backward navigation, dismissing a dialog, cancelling a prompt).

## Signature / Usage

```kotlin
var isPlaying by remember { mutableStateOf(false) }
val onClick = { isPlaying = !isPlaying }

val gestureConfig = rememberOneHandedGestureConfiguration(
    action = OneHandedGestureAction.Primary
)
val indicatorState = remember { OneHandedGestureClickIndicatorState() }
val coroutineScope = rememberCoroutineScope()
val interactionSource = remember { MutableInteractionSource() }

Button(
    onClick = onClick,
    interactionSource = interactionSource,
    modifier = Modifier
        .fillMaxWidth()
        .oneHandedGesture(
            gestureConfiguration = gestureConfig,
            interactionSource = interactionSource,
            onGestureLabel = if (isPlaying) "pause" else "play",
            onGestureAvailable = { coroutineScope.launch { indicatorState.showIndicator() } },
            onGesture = onClick
        )
) {
    OneHandedGestureClickIndicator(
        gestureConfiguration = gestureConfig,
        state = indicatorState
    ) {
        Text(if (isPlaying) "Pause" else "Play", modifier = Modifier.fillMaxWidth())
    }
}
```

Scrollable container (primary gesture scrolls the list; indicator goes into `ScreenScaffold`'s `scrollIndicator` slot):

```kotlin
val scrollState = rememberTransformingLazyColumnState()
val gestureConfig = rememberOneHandedGestureConfiguration(
    action = OneHandedGestureAction.Primary,
    priority = OneHandedGesturePriority.Scrollable
)
val indicatorState = remember(gestureConfig) { OneHandedGestureScrollIndicatorState() }
val coroutineScope = rememberCoroutineScope()

ScreenScaffold(
    scrollState = scrollState,
    scrollIndicator = {
        OneHandedGestureScrollIndicator(
            gestureConfiguration = gestureConfig,
            indicatorState = indicatorState,
            scrollState = scrollState,
            modifier = Modifier.align(Alignment.CenterEnd)
        )
    }
) { contentPadding ->
    TransformingLazyColumn(
        state = scrollState,
        contentPadding = contentPadding,
        modifier = Modifier
            .fillMaxSize()
            .oneHandedGesture(
                gestureConfiguration = gestureConfig,
                onGestureLabel = "scroll",
                onGestureAvailable = {
                    coroutineScope.launch { indicatorState.showIndicator() }
                },
                onGesture = { OneHandedGestureDefaults.scrollDown(scrollState) }
            )
    ) {
        items(10) { index ->
            Text("Item $index", modifier = Modifier.padding(8.dp))
        }
    }
}
```

## Options / Props

Gesture priority (`OneHandedGestureConfiguration`, via `OneHandedGesturePriority`):

| Name | Description |
|------|-------------|
| `OneHandedGesturePriority.Clickable` | Highest. For interactive controls such as `Button` or `Card`; captures gestures when visible on screen. |
| `OneHandedGesturePriority.Scrollable` | Medium. For scrollable or pageable containers; yields to clickable children but scrolls when no clickable control is visible. |
| `OneHandedGesturePriority.Unspecified` | Lowest. Default for a gesture with no `priority` set. |

Parameters used in the official examples:

| Name | Description |
|------|-------------|
| `rememberOneHandedGestureConfiguration(action, priority)` | Creates the `OneHandedGestureConfiguration` (recommended); tracks user interaction history across recompositions without exposing application state. `action` is `OneHandedGestureAction.Primary` (or the dismiss action). |
| `Modifier.oneHandedGesture(gestureConfiguration, interactionSource, onGestureLabel, onGestureAvailable, onGesture)` | Enables the gesture on a composable. Pass the same `MutableInteractionSource` to the control and the modifier so gesture events emit press feedback. `onGestureAvailable` is where `showIndicator` is called. |
| `OneHandedGestureClickIndicator(gestureConfiguration, state)` | Wrapper that temporarily replaces its content with a gesture animation. State: `OneHandedGestureClickIndicatorState`. |
| `OneHandedGestureScrollIndicator(gestureConfiguration, indicatorState, scrollState, modifier)` | Scroll indicator that also signals a scroll gesture is available. State: `OneHandedGestureScrollIndicatorState`. |
| `OneHandedGestureDefaults.scrollDown(scrollState)` | Scrolling helper used as the `onGesture` action. |

## Notes

- Requires Wear OS 7 (API level 37) and higher. Initially supported on Pixel Watch 3 and later; the framework is available to all OEMs.
- On hardware/OEMs that do not support the gestures, the library no-ops automatically without affecting standard touch interactions.
- `gestureId` coordinates with system-level user preferences (hint display cadence, frequency muting); the system manages indicator display cadence.
- Priority scenario: with `Clickable` on an inner button and `Scrollable` on its parent list, the primary gesture first scrolls the list until the button is visible, then triggers the button's click.
- The page's Material version toggle is set to Material 3 (`androidx.wear.compose.material3.onehandedgesture`).
- Test with ADB on Wear OS 7 (API 37)+ via `IWearGestureService` (use a disposable/test device):
  - Physical device off wrist or on a charger: `adb shell cmd IWearGestureService override-constraints offbody-state`
  - Double pinch (Primary on Pixel watches): `adb shell cmd IWearGestureService gesture DoublePinch`
  - Wrist turn (Dismiss on Pixel watches): `adb shell cmd IWearGestureService gesture WristTurn`
  - Reset hint tracking on userdebug builds/emulators: `adb shell cmd IWearGestureService hint clear <your_package_name>`; on retail builds `hint clear` is blocked, so use `adb shell pm clear <your_package_name>` (clears app data)
  - Restore defaults: `adb shell cmd IWearGestureService override-constraints reset`
  - Troubleshooting: wake the screen with `adb shell input keyevent KEYCODE_WAKEUP` (gestures are not dispatched when the screen is off or in ambient mode); `adb shell cmd IWearGestureService get-active-gestures -readable` returns `[DoublePinch]` or `[DoublePinch, WristTurn]` when the app is foreground and the screen is awake (empty `[]` means no window focus or off-body constraints block activation); `adb shell dumpsys IWearGestureService` shows service state.
- Source: https://developer.android.com/training/wearables/compose/one-handed-gestures

## Related

- [Scaffold (AppScaffold / ScreenScaffold)](./scaffold.md)
- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
- [Rotary Input](./rotary-input.md)
