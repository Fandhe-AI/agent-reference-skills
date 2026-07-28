# Button

Filled button for high-emphasis primary actions, such as "submit" or "save". Displays with a solid background.

## Signature / Usage

```kotlin
@Composable
fun Button(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.shape,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    elevation: ButtonElevation? = ButtonDefaults.buttonElevation(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
Button(onClick = { /* action */ }) {
    Text("Filled")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when this button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. When `false`, does not respond to input and appears visually disabled. |
| `shape` | `Shape` | `ButtonDefaults.shape` | Shape of the container, border, and shadow. |
| `colors` | `ButtonColors` | `ButtonDefaults.buttonColors()` | Resolves colors in different states. |
| `elevation` | `ButtonElevation?` | `ButtonDefaults.buttonElevation()` | Controls the shadow size below the button. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable RowScope.() -> Unit` | — | Content of the button, typically text, icon, or image. |

## Notes

- Default text style is `Typography.labelLarge`.
- Minimum touch target enforced via `ButtonDefaults.MinWidth` / `ButtonDefaults.MinHeight`.
- Package: `androidx.compose.material3`.

## Related

- [FilledTonalButton](./filledtonalbutton.md)
- [ElevatedButton](./elevatedbutton.md)
- [OutlinedButton](./outlinedbutton.md)
- [TextButton](./textbutton.md)
