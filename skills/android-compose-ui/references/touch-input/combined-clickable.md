# Modifier.combinedClickable

Configures a component to receive click, double-click, and long-click gestures via touch, mouse, or accessibility events. A superset of [clickable](./clickable.md).

## Signature / Usage

```kotlin
fun Modifier.combinedClickable(
    enabled: Boolean = true,
    onClickLabel: String? = null,
    role: Role? = null,
    onLongClickLabel: String? = null,
    onLongClick: (() -> Unit)? = null,
    onDoubleClick: (() -> Unit)? = null,
    hapticFeedbackEnabled: Boolean = true,
    interactionSource: MutableInteractionSource? = null,
    onClick: () -> Unit,
): Modifier
```

```kotlin
val haptics = LocalHapticFeedback.current

LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 128.dp)) {
    items(photos, { it.id }) { photo ->
        ImageItem(
            photo,
            Modifier.combinedClickable(
                onClick = { activePhotoId = photo.id },
                onLongClick = {
                    haptics.performHapticFeedback(HapticFeedbackType.LongPress)
                    contextMenuPhotoId = photo.id
                },
                onLongClickLabel = stringResource(R.string.open_context_menu),
            ),
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `Boolean` | `true` | Controls whether the element responds to input. |
| `onClickLabel` | `String?` | `null` | Accessibility label for the click action. |
| `role` | `Role?` | `null` | Accessibility role of the element. |
| `onLongClickLabel` | `String?` | `null` | Accessibility label for the long-click action. |
| `onLongClick` | `(() -> Unit)?` | `null` | Called on long press. |
| `onDoubleClick` | `(() -> Unit)?` | `null` | Called on double tap. |
| `hapticFeedbackEnabled` | `Boolean` | `true` | Whether long-click automatically performs haptic feedback. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing interactions. |
| `onClick` | `() -> Unit` | — | Called on click. |

## Notes

- An overload accepting explicit `interactionSource: MutableInteractionSource?, indication: Indication?` as the first two parameters is also available for custom indication.
- Best practice: pair `onLongClick` with `LocalHapticFeedback` for tactile confirmation, e.g. for context menus.
- Package: `androidx.compose.foundation`.

## Related

- [clickable](./clickable.md)
- [haptic-feedback](./haptic-feedback.md)
- [detect-tap-gestures](./detect-tap-gestures.md)
