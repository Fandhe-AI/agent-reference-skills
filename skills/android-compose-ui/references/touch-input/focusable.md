# Modifier.focusable / FocusRequester / Modifier.focusRequester / onFocusChanged

`focusable` makes a component participate in the focus system (tab/d-pad/accessibility). `FocusRequester` + `Modifier.focusRequester` let code programmatically request, capture, or free focus. `onFocusChanged` observes focus state changes.

## Signature / Usage

```kotlin
fun Modifier.focusable(
    enabled: Boolean = true,
    interactionSource: MutableInteractionSource? = null,
): Modifier

class FocusRequester {
    fun requestFocus(focusDirection: FocusDirection = FocusDirection.Enter): Boolean
    fun captureFocus(): Boolean
    fun freeFocus(): Boolean
}

fun Modifier.focusRequester(focusRequester: FocusRequester): Modifier
fun Modifier.onFocusChanged(onFocusChanged: (FocusState) -> Unit): Modifier
```

```kotlin
val focusRequester = remember { FocusRequester() }
var isFocused by remember { mutableStateOf(false) }

TextField(
    value = text,
    onValueChange = { text = it },
    modifier = Modifier
        .focusRequester(focusRequester)
        .onFocusChanged { isFocused = it.isFocused },
)

LaunchedEffect(Unit) { focusRequester.requestFocus() }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `Boolean` | `true` | Whether the element participates in focus; when `false` it is skipped by focus traversal. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Emits `FocusInteraction.Focus` / `.Unfocus`. |
| `focusRequester` | `FocusRequester` | — | Instance bound to the modified component for programmatic control. |
| `onFocusChanged` | `(FocusState) -> Unit` | — | Called whenever the component's focus state changes; `FocusState.isFocused` / `hasFocus` expose the current state. |

## Notes

- Tab navigation follows declaration order (1D); arrow-key navigation moves 2D between siblings at the same level, while d-pad center / Back move between hierarchy levels. Use `Modifier.focusProperties { ... }` / `focusGroup()` (see `change-focus-traversal-order` guide) to customize order.
- `requestFocus()` / `captureFocus()` / `freeFocus()` return `false` if the request is declined (e.g. focus was captured elsewhere).
- `FocusRequester.Default` and `FocusRequester.Cancel` are special sentinel instances used with `focusProperties { next = FocusRequester.Cancel }` to block traversal in a direction.
- Package: `androidx.compose.foundation` (`focusable`), `androidx.compose.ui.focus` (`FocusRequester`, `focusRequester`, `onFocusChanged`).

## Related

- [keyboard-input](./keyboard-input.md)
- [hover](./hover.md)
