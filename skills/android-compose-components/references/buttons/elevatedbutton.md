# ElevatedButton

High-emphasis button that is essentially a `FilledTonalButton` with a shadow. Used when visual separation from a patterned background is necessary.

## Signature / Usage

```kotlin
@Composable
fun ElevatedButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.elevatedShape,
    colors: ButtonColors = ButtonDefaults.elevatedButtonColors(),
    elevation: ButtonElevation? = ButtonDefaults.elevatedButtonElevation(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
ElevatedButton(onClick = { /* action */ }) {
    Text("Elevated")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when this button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `shape` | `Shape` | `ButtonDefaults.elevatedShape` | Shape of the container. |
| `colors` | `ButtonColors` | `ButtonDefaults.elevatedButtonColors()` | Resolves colors in different states. |
| `elevation` | `ButtonElevation?` | `ButtonDefaults.elevatedButtonElevation()` | Controls shadow size; also controls primary color overlay when container color is `ColorScheme.surface`. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable RowScope.() -> Unit` | — | Content of the button. |

## Notes

- Default text style is `Typography.labelLarge`.
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
- [FilledTonalButton](./filledtonalbutton.md)
