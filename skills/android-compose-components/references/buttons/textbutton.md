# TextButton

Low-emphasis button, typically used for less-pronounced or lowest-priority actions, such as "Learn More" or "View details", especially when presenting multiple options.

## Signature / Usage

```kotlin
@Composable
fun TextButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.textShape,
    colors: ButtonColors = ButtonDefaults.textButtonColors(),
    elevation: ButtonElevation? = null,
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.TextButtonContentPadding,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
TextButton(onClick = { /* action */ }) {
    Text("Text Button")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when this button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `shape` | `Shape` | `ButtonDefaults.textShape` | Shape of the container. |
| `colors` | `ButtonColors` | `ButtonDefaults.textButtonColors()` | Resolves colors in different states. |
| `elevation` | `ButtonElevation?` | `null` | A `TextButton` typically has no elevation. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.TextButtonContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable RowScope.() -> Unit` | — | Content of the button, expected to be text. |

## Notes

- Default text style is `Typography.labelLarge`.
- Use `ElevatedButton` instead for a button with elevation.
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
- [OutlinedButton](./outlinedbutton.md)
