# LocalHapticFeedback / HapticFeedback

`LocalHapticFeedback` is a `CompositionLocal<HapticFeedback>` providing access to the platform's tactile feedback (vibration) capability from a composable.

## Signature / Usage

```kotlin
interface HapticFeedback {
    fun performHapticFeedback(hapticFeedbackType: HapticFeedbackType)
}

val LocalHapticFeedback: ProvidableCompositionLocal<HapticFeedback>
```

```kotlin
val haptics = LocalHapticFeedback.current

Modifier.combinedClickable(
    onClick = { /* ... */ },
    onLongClick = {
        haptics.performHapticFeedback(HapticFeedbackType.LongPress)
        showContextMenu = true
    },
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `hapticFeedbackType` | `HapticFeedbackType` | Feedback pattern to play, e.g. `HapticFeedbackType.LongPress`, `TextHandleMove`, `Confirm`, `Reject`. |

## Notes

- Access the current instance via `LocalHapticFeedback.current` inside a composable; call `performHapticFeedback` from event callbacks (e.g. `onLongClick`), not during composition.
- `combinedClickable`'s `hapticFeedbackEnabled` parameter (default `true`) already triggers long-click haptics automatically — call this API directly only for custom gestures (e.g. raw `detectDragGestures` drag-to-reorder) that need their own feedback.
- Package: `androidx.compose.ui.hapticfeedback` (`HapticFeedback`), `androidx.compose.ui.platform` (`LocalHapticFeedback`).

## Related

- [combined-clickable](./combined-clickable.md)
