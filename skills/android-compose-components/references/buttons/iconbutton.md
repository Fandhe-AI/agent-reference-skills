# IconButton

Button that displays a single icon representing an action, such as opening a menu or search. Must use an icon with clear meaning for a common, frequently used action.

## Signature / Usage

```kotlin
@Composable
fun IconButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: IconButtonColors = IconButtonDefaults.iconButtonColors(),
    interactionSource: MutableInteractionSource? = null,
    shape: Shape = IconButtonDefaults.standardShape,
    content: @Composable () -> Unit,
)
```

```kotlin
IconButton(onClick = { /* action */ }) {
    Icon(Icons.Filled.Settings, contentDescription = "Settings")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() -> Unit` | — | Called when this icon button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this icon button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `IconButtonColors` | `IconButtonDefaults.iconButtonColors()` | Resolves colors in different states. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `shape` | `Shape` | `IconButtonDefaults.standardShape` | Shape of this icon button. |
| `content` | `@Composable () -> Unit` | — | Content, typically an `Icon`. |

## Notes

- Variants with different visual styles are also available in `androidx.compose.material3`: `FilledIconButton`, `FilledTonalIconButton`, `OutlinedIconButton` — each takes the same `onClick` / `modifier` / `enabled` / `interactionSource` / `content` parameters, with style-specific `shape` and `colors` defaults (e.g. `IconButtonDefaults.filledIconButtonColors()`, `IconButtonDefaults.outlinedIconButtonColors()`); `OutlinedIconButton` additionally exposes a `border: BorderStroke?` parameter.
- For a toggleable icon (e.g. favorite/bookmark), use `IconToggleButton`.
- Package: `androidx.compose.material3`.

## Related

- [IconToggleButton](./icontogglebutton.md)
