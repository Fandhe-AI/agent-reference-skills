# Modifier.onKeyEvent / Modifier.onPreviewKeyEvent

Handle raw hardware/software keyboard events on a focused, `focusable` component. `onKeyEvent` fires during the normal (post-order, child-to-parent) pass; `onPreviewKeyEvent` intercepts events before children see them (pre-order, parent-to-child).

## Signature / Usage

```kotlin
fun Modifier.onKeyEvent(onEvent: (KeyEvent) -> Boolean): Modifier
fun Modifier.onPreviewKeyEvent(onPreviewEvent: (KeyEvent) -> Boolean): Modifier
```

```kotlin
Box(
    modifier = Modifier.focusable().onKeyEvent {
        if (it.type == KeyEventType.KeyUp && it.key == Key.S) {
            doSomething()
            true
        } else {
            false
        }
    },
) {
    Text("Press S key")
}
```

```kotlin
// Intercept Tab in a TextField before default focus-move / character insertion.
val focusManager = LocalFocusManager.current
TextField(
    value, onValueChange = { value = it },
    modifier = Modifier.onPreviewKeyEvent {
        if (it.type == KeyEventType.KeyUp && it.key == Key.Tab) {
            focusManager.moveFocus(FocusDirection.Next)
            true
        } else {
            false
        }
    },
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onEvent` / `onPreviewEvent` | `(KeyEvent) -> Boolean` | Return `true` to consume the event and stop propagation, `false` to let it propagate. |
| `KeyEvent.type` | `KeyEventType` | `KeyDown` or `KeyUp` — each keystroke fires both. |
| `KeyEvent.key` | `Key` | The physical/logical key, e.g. `Key.S`, `Key.Tab`, `Key.Escape`. |
| `KeyEvent.isAltPressed` / `isCtrlPressed` / `isMetaPressed` / `isShiftPressed` | `Boolean` | Modifier key state (`Meta` = Command on macOS, Windows key on Windows, Search key on ChromeOS). |

## Notes

- The modified component (or an ancestor) must be `focusable()` to receive key events at all.
- `onPreviewKeyEvent` on a parent is called before both the child's `onPreviewKeyEvent` and `onKeyEvent`, enabling app-wide/screen-wide shortcuts and interception of default behavior (e.g. custom Tab handling in a text field).
- Spacebar/Enter automatically trigger click on `clickable` components without extra wiring.
- Package: `androidx.compose.ui.input.key`.

## Related

- [focusable](./focusable.md)
