# OutlinedButton

Medium-emphasis button with a border, used for secondary or alternative actions that are important but not primary, such as "Cancel".

## Signature / Usage

```kotlin
@Composable
fun OutlinedButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.outlinedShape,
    colors: ButtonColors = ButtonDefaults.outlinedButtonColors(),
    elevation: ButtonElevation? = null,
    border: BorderStroke? = ButtonDefaults.outlinedButtonBorder(enabled),
    contentPadding: PaddingValues = ButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
OutlinedButton(onClick = { /* action */ }) {
    Text("Outlined")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when this button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `shape` | `Shape` | `ButtonDefaults.outlinedShape` | Shape of the container and border. |
| `colors` | `ButtonColors` | `ButtonDefaults.outlinedButtonColors()` | Resolves colors in different states. |
| `elevation` | `ButtonElevation?` | `null` | No elevation by default. |
| `border` | `BorderStroke?` | `ButtonDefaults.outlinedButtonBorder(enabled)` | Border drawn around the container. Pass `null` for no border. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable RowScope.() -> Unit` | — | Content of the button. |

## Notes

- Default text style is `Typography.labelLarge`.
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
- [TextButton](./textbutton.md)
