# Modifier.pointerInput

Entry point for low-level, custom gesture handling. Installs a suspending coroutine (`PointerInputScope`) that receives raw pointer events, typically consumed via `awaitPointerEventScope` / `awaitEachGesture` or one of the `detect*Gestures` helpers.

## Signature / Usage

```kotlin
fun Modifier.pointerInput(
    key1: Any?,
    block: suspend PointerInputScope.() -> Unit,
): Modifier
```

```kotlin
Box(
    Modifier
        .size(100.dp)
        .pointerInput(onClick) {
            awaitEachGesture {
                awaitFirstDown().also { it.consume() }
                val up = waitForUpOrCancellation()
                if (up != null) {
                    up.consume()
                    onClick()
                }
            }
        }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key1` (and `key2` / `keys` overloads) | `Any?` | — | Restarts the pointer input coroutine when the key(s) change; pass captured lambdas/state used inside the block. |
| `block` | `suspend PointerInputScope.() -> Unit` | — | Coroutine body with access to raw and helper pointer APIs. |

## Notes

- `awaitEachGesture { ... }` restarts its block whenever all pointers are lifted; preferred over manual `while (true)` loops for custom gesture detection.
- `awaitPointerEventScope { ... }` gives access to `awaitPointerEvent()` for the raw event stream, including `PointerEventPass.Initial` (top→bottom), `Main` (bottom→top, default), and `Final` (top→bottom, observe descendant consumption).
- Only one top-level `detectXGestures` call is allowed per `pointerInput` block; to combine multiple gesture types add separate `pointerInput` modifiers instead of nesting detectors.
- Helper functions available inside `AwaitPointerEventScope`: `awaitFirstDown`, `waitForUpOrCancellation`, `awaitTouchSlopOrCancellation` / `awaitHorizontalTouchSlopOrCancellation` / `awaitVerticalTouchSlopOrCancellation`, `awaitDragOrCancellation` / `awaitHorizontalDragOrCancellation` / `awaitVerticalDragOrCancellation`, `awaitLongPressOrCancellation`, and `drag` / `horizontalDrag` / `verticalDrag`.
- Events must be explicitly consumed via `change.consume()` to prevent ancestor/descendant gesture handlers from also reacting; check `event.changes.any { it.isConsumed }` to detect conflicts.
- Prefer higher-level component APIs, then gesture modifiers (`clickable`, `draggable`, ...), and only fall back to `pointerInput` + detectors for fully custom gestures — the higher levels give better accessibility support for free.
- Package: `androidx.compose.ui.input.pointer`.

## Related

- [detect-tap-gestures](./detect-tap-gestures.md)
- [detect-drag-gestures](./detect-drag-gestures.md)
- [detect-transform-gestures](./detect-transform-gestures.md)
