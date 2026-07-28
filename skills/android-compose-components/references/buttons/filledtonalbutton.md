# FilledTonalButton

Medium-emphasis button with a tonal background, used as a middle ground between `Button` (filled) and `OutlinedButton`. Suits actions like "add to cart" or "Sign in".

## Signature / Usage

```kotlin
@Composable
fun FilledTonalButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.filledTonalShape,
    colors: ButtonColors = ButtonDefaults.filledTonalButtonColors(),
    elevation: ButtonElevation? = ButtonDefaults.filledTonalButtonElevation(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
FilledTonalButton(onClick = { /* action */ }) {
    Text("Tonal")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when this button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `shape` | `Shape` | `ButtonDefaults.filledTonalShape` | Shape of the container. |
| `colors` | `ButtonColors` | `ButtonDefaults.filledTonalButtonColors()` | Uses secondary color mapping. |
| `elevation` | `ButtonElevation?` | `ButtonDefaults.filledTonalButtonElevation()` | Also controls amount of primary color overlay when container color is `ColorScheme.surface`. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable RowScope.() -> Unit` | — | Content of the button. |

## Notes

- Default text style is `Typography.labelLarge`.
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
- [ElevatedButton](./elevatedbutton.md)
- [OutlinedButton](./outlinedbutton.md)
