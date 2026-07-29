# EdgeButton

High-emphasis button with a special shape that follows the screen's curvature and sits flush with the bottom edge, taking the full width. Represents the single most important action on a screen; typically placed in a `ScreenScaffold`'s `edgeButton` slot.

## Signature / Usage

```kotlin
@Composable
public fun EdgeButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    buttonSize: EdgeButtonSize = EdgeButtonSize.Small,
    enabled: Boolean = true,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    border: BorderStroke? = null,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
ScreenScaffold(
    scrollState = columnState,
    edgeButton = { EdgeButton(onClick = { /* handle click */ }) { Text("More") } },
) { contentPadding -> /* list content */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called on click. |
| `modifier` | `Modifier` | `Modifier` | Applied to the button. |
| `buttonSize` | `EdgeButtonSize` | `EdgeButtonSize.Small` | One of extra small / small / medium / large; controls height and how many lines of text fit (1 line extra small, 2 small/medium, 3 large). |
| `enabled` | `Boolean` | `true` | Disables interaction when `false`. |
| `colors` | `ButtonColors` | `ButtonDefaults.buttonColors()` | High-emphasis colors by default. |
| `border` | `BorderStroke?` | `null` | Optional border. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted interaction source. |
| `content` | `@Composable RowScope.() -> Unit` | — | Button content. |

## Notes

- Use via the `ScreenScaffold(scrollState, edgeButton = { ... })` overload so it grows/shrinks to occupy remaining space after scrollable content, rather than placing it as a regular list item.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [Button](./button.md)
