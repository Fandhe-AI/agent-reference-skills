---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-keyboard.html
---

# Keyboard events

In Compose Multiplatform for desktop, keyboard events are handled in two scopes: event handlers based on the focused element, and event handlers in the window scope.

## Signature / Usage

Focused component: use `onKeyEvent` or `onPreviewKeyEvent` modifiers. `onKeyEvent` handles an individual keystroke; `onPreviewKeyEvent` is preferable for shortcuts.

```kotlin
TextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier.onPreviewKeyEvent {
        when {
            (it.isCtrlPressed && it.key == Key.Minus && it.type == KeyEventType.KeyUp) -> {
                consumedText -= text.length
                text = ""
                true
            }
            (it.isCtrlPressed && it.key == Key.Equals && it.type == KeyEventType.KeyUp) -> {
                consumedText += text.length
                text = ""
                true
            }
            else -> false
        }
    }
)
```

Window scope: use the `onPreviewKeyEvent` and `onKeyEvent` parameters of `Window`, `singleWindowApplication`, and `Dialog` functions:

```kotlin
fun main() = singleWindowApplication(
    title = "Keyboard events",
    onKeyEvent = {
        if (
            it.isCtrlPressed &&
            it.isShiftPressed &&
            it.key == Key.C &&
            it.type == KeyEventType.KeyDown
        ) {
            cleared = true
            true
        } else {
            false
        }
    }
) {
    // content
}

DialogWindow(onCloseRequest = { isDialogOpen = false },
    title = "Dialog",
    onPreviewKeyEvent = {
        if (it.key == Key.Escape && it.type == KeyEventType.KeyDown) {
            isDialogOpen = false
            true
        } else {
            false
        }
    }) {
    Text("Hello!")
}
```

## Notes

- If an event is not consumed, `onPreviewKeyEvent` dispatches it to its first child and `onKeyEvent` dispatches it to the composable's parent. `onPreviewKeyEvent` is typically preferred for intercepting events, as it allows screen-wide keyboard shortcuts.
- Handlers return `true` when the event is consumed and `false` otherwise.
- Distance line: key input modifiers (`onKeyEvent`, `Key`) are common androidx.compose APIs covered by android-compose-ui; this page covers the desktop window-scope handlers.

## Related

- [Mouse event listeners](./mouse-events.md)
- [Tab navigation and keyboard focus](./tab-navigation.md)
- [Menu bar](./menu-bar.md)
