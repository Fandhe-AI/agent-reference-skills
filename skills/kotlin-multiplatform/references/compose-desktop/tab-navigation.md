---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-tabbing.html
---

# Tab navigation and keyboard focus

In Compose Multiplatform for desktop, Tab moves to the next component and Shift+Tab to the previous one.

## Signature / Usage

Default tab navigation follows the order of appearance and needs no extra code. Focusable components include anything that uses the `clickable()`, `selectable()`, `toggleable()`, or `focusable()` modifiers (text fields, buttons, sliders, navigation items, selection controls with a non-null callback, `onClick` overloads of `Card()`, `Surface()`, and `ListItem()`).

```kotlin
repeat(5) {
    TextField(
        state = rememberTextFieldState(),
        lineLimits = TextFieldLineLimits.SingleLine
    )
}
```

Custom focusable component: apply `focusable()` with a `MutableInteractionSource`, read focus with `collectIsFocusedAsState()`, handle keys with `onKeyEvent()`:

```kotlin
@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun FocusableBox(
    text: String = "",
    onClick: () -> Unit = {},
    size: DpSize = DpSize(200.dp, 35.dp)
) {
    var isKeyPressed by remember { mutableStateOf(false) }
    val interactionSource = remember { MutableInteractionSource() }
    val isFocused by interactionSource.collectIsFocusedAsState()
    val backgroundColor = when {
        isFocused && isKeyPressed -> lerp(MaterialTheme.colorScheme.secondary, Color(64, 64, 64), 0.3f)
        isFocused -> MaterialTheme.colorScheme.secondary
        else -> MaterialTheme.colorScheme.primary
    }
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(4.dp))
            .background(backgroundColor)
            .size(size)
            .onPointerEvent(PointerEventType.Press) { onClick() }
            .onKeyEvent {
                if (it.key == Key.Enter || it.key == Key.Spacebar) {
                    when (it.type) {
                        KeyEventType.KeyDown -> isKeyPressed = true
                        KeyEventType.KeyUp -> {
                            isKeyPressed = false
                            onClick()
                        }
                    }
                }
                false
            }
            .focusable(interactionSource = interactionSource),
        contentAlignment = Alignment.Center
    ) {
        Text(text = text, color = Color.White)
    }
}
```

Custom tab order with `focusRequester()` and `focusProperties()` (reverses the default order):

```kotlin
val focusRequesters = remember { List(5) { FocusRequester() } }
// ...
focusRequesters.forEachIndexed { index, focusRequester ->
    TextField(
        state = rememberTextFieldState(),
        lineLimits = TextFieldLineLimits.SingleLine,
        modifier = Modifier
            .focusRequester(focusRequester)
            .focusProperties {
                // Reverses the default order:
                next = focusRequesters[(index - 1 + focusRequesters.size) % focusRequesters.size]
                previous = focusRequesters[(index + 1) % focusRequesters.size]
            }
    )
}
```

Moving focus from code:

```kotlin
val buttonFocusRequester = remember { FocusRequester() }
val textFieldFocusRequester = remember { FocusRequester() }
// ...
Button(
    onClick = {
        isTextFieldFocused = !isTextFieldFocused
        if (isTextFieldFocused) {
            textFieldFocusRequester.requestFocus()
        } else {
            buttonFocusRequester.requestFocus()
        }
    },
    modifier = Modifier
        .fillMaxWidth()
        .focusRequester(buttonFocusRequester)
) {
    Text(text = "Focus switcher")
}
```

Focus a component when it appears:

```kotlin
LaunchedEffect(Unit) {
    focusRequester.requestFocus()
}
```

Workaround for multiline text fields (Tab otherwise inserts a tab character):

```kotlin
@Composable
fun Modifier.moveFocusOnTab(): Modifier {
    val focusManager = LocalFocusManager.current
    return onPreviewKeyEvent {
        if (it.type == KeyEventType.KeyDown && it.key == Key.Tab) {
            focusManager.moveFocus(
                if (it.isShiftPressed) FocusDirection.Previous else FocusDirection.Next
            )
            true
        } else {
            false
        }
    }
}
```

## Notes

- To include a non-focusable component in the tab order apply `focusable()`; if combined with `focusRequester()`, apply `focusable()` after `focusRequester()`.
- `focusProperties()` sets the `next` and `previous` elements; they must be components with a `FocusRequester` handle.
- In multiline text fields (the default `lineLimits` is `TextFieldLineLimits.MultiLine()`), pressing Tab inserts a tab character instead of moving focus. Known issue CMP-5822; use the `onPreviewKeyEvent` + `LocalFocusManager` workaround above.
- Distance line: focus modifiers (`focusable`, `FocusRequester`) are common androidx.compose APIs covered by android-compose-ui; this page covers the desktop Tab-key behavior.

## Related

- [Keyboard events](./keyboard.md)
- [Support for desktop accessibility features](./desktop-accessibility.md)
