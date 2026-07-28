# detectTapGestures

Low-level tap/press/double-tap/long-press gesture detector used inside a [pointerInput](./pointer-input.md) block. Gives access to the tap `Offset`, unlike `clickable`.

## Signature / Usage

```kotlin
suspend fun PointerInputScope.detectTapGestures(
    onDoubleTap: ((Offset) -> Unit)? = null,
    onLongPress: ((Offset) -> Unit)? = null,
    onPress: suspend PressGestureScope.(Offset) -> Unit = NoPressGesture,
    onTap: ((Offset) -> Unit)? = null,
)
```

```kotlin
Image(
    painter = rememberAsyncImagePainter(model = photo.highResUrl),
    contentDescription = null,
    modifier = modifier
        .pointerInput(Unit) {
            detectTapGestures(
                onDoubleTap = { tapOffset ->
                    zoomOffset = if (zoomed) Offset.Zero else calculateOffset(tapOffset, size)
                    zoomed = !zoomed
                }
            )
        }
        .graphicsLayer { scaleX = if (zoomed) 2f else 1f; scaleY = scaleX }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDoubleTap` | `((Offset) -> Unit)?` | `null` | Called with the tap position on a double-tap. |
| `onLongPress` | `((Offset) -> Unit)?` | `null` | Called with the press position on a long press. |
| `onPress` | `suspend PressGestureScope.(Offset) -> Unit` | no-op | Called immediately on press-down; suspends until release/cancel, giving access to `tryAwaitRelease()`. |
| `onTap` | `((Offset) -> Unit)?` | `null` | Called with the tap position on a completed tap. |

## Notes

- Lower-level than `clickable`/`combinedClickable`: no automatic ripple, focus, keyboard, or accessibility semantics — add `.semantics { onClick { ... } }` and `.onKeyEvent { ... }` manually when needed.
- Pass a stable key (e.g. a captured lambda) to the enclosing `pointerInput(key)` so the detector coroutine restarts correctly on recomposition.
- Best used when the built-in click modifiers don't fit, e.g. dismiss-on-tap scrims or position-aware double-tap-to-zoom.
- Package: `androidx.compose.foundation.gestures`.

## Related

- [pointer-input](./pointer-input.md)
- [clickable](./clickable.md)
- [combined-clickable](./combined-clickable.md)
