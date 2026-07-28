# TooltipBox

Wraps a composable with a tooltip that provides a descriptive message for an anchor, shown on hover, long-press, or programmatically.

## Signature / Usage

```kotlin
@Composable
@ExperimentalMaterial3Api
fun TooltipBox(
    positionProvider: PopupPositionProvider,
    tooltip: @Composable TooltipScope.() -> Unit,
    state: TooltipState,
    modifier: Modifier = Modifier,
    onDismissRequest: (() -> Unit)? = null,
    focusable: Boolean = false,
    enableUserInput: Boolean = true,
    hasAction: Boolean = false,
    content: @Composable () -> Unit,
)
```

```kotlin
TooltipBox(
    positionProvider = TooltipDefaults.rememberTooltipPositionProvider(),
    tooltip = { PlainTooltip { Text("Add to favorites") } },
    state = rememberTooltipState()
) {
    IconButton(onClick = { }) {
        Icon(Icons.Filled.Favorite, contentDescription = "Add to favorites")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `positionProvider` | `PopupPositionProvider` | — | Places the tooltip relative to the anchor; use `TooltipDefaults.rememberTooltipPositionProvider()`. |
| `tooltip` | `@Composable TooltipScope.() -> Unit` | — | Tooltip content, typically `PlainTooltip` or `RichTooltip`. |
| `state` | `TooltipState` | — | Manages visibility; create with `rememberTooltipState()`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the wrapper. |
| `onDismissRequest` | `(() -> Unit)?` | `null` | Called when the tooltip is dismissed. |
| `focusable` | `Boolean` | `false` | Whether the tooltip popup can take focus. |
| `enableUserInput` | `Boolean` | `true` | Whether hover/long-press gestures show the tooltip. |
| `hasAction` | `Boolean` | `false` | Set `true` when the tooltip content includes an actionable element. |
| `content` | `@Composable () -> Unit` | — | The anchor content the tooltip attaches to. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- `PlainTooltip(modifier, caretShape, maxWidth = TooltipDefaults.plainTooltipMaxWidth, shape, contentColor, containerColor, tonalElevation, shadowElevation, content)` renders a single-line message; used inside `TooltipBox`'s `tooltip` slot.
- `RichTooltip(modifier, title, action, caretShape, maxWidth = TooltipDefaults.richTooltipMaxWidth, shape, colors, tonalElevation, shadowElevation, text)` renders a multi-line tooltip with optional title and action button.
- `rememberTooltipState(initialIsVisible = false, isPersistent = false, mutatorMutex = ...): TooltipState` creates the state; when `isPersistent` is `true` the tooltip dismisses only on outside click or explicit `dismiss()`, otherwise it auto-dismisses after a short duration. Exposes suspend `show()` / `dismiss()`.
- `TooltipDefaults.rememberPlainTooltipPositionProvider()` / `rememberRichTooltipPositionProvider()` are deprecated in favor of the unified `rememberTooltipPositionProvider()`.
- Package: `androidx.compose.material3`.

## Related

- [ListItem](./listitem.md)
