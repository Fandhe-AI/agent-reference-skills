# IconButton / IconToggleButton

Circular, icon-only buttons. `IconButton` is a stateless action button (transparent by default); `IconToggleButton` switches between primary and tonal colors based on a `checked` boolean.

## Signature / Usage

```kotlin
@Composable
public fun IconButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    onLongClick: (() -> Unit)? = null,
    onLongClickLabel: String? = null,
    enabled: Boolean = true,
    shapes: IconButtonShapes = IconButtonDefaults.shapes(),
    colors: IconButtonColors = IconButtonDefaults.iconButtonColors(),
    border: BorderStroke? = null,
    interactionSource: MutableInteractionSource? = null,
    content: @Composable BoxScope.() -> Unit,
)
```

```kotlin
IconButton(onClick = { /* action */ }) {
    Icon(Icons.Filled.Add, contentDescription = "Add")
}
```

`IconToggleButton`:

```kotlin
@Composable
public fun IconToggleButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: IconToggleButtonColors = IconToggleButtonDefaults.colors(),
    interactionSource: MutableInteractionSource? = null,
    shapes: IconToggleButtonShapes = IconToggleButtonDefaults.shapes(),
    border: BorderStroke? = null,
    content: @Composable BoxScope.() -> Unit,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` (IconButton) | `() -> Unit` | — | Called on click. |
| `checked` / `onCheckedChange` (IconToggleButton) | `Boolean` / `(Boolean) -> Unit` | — | Toggle state and callback. |
| `enabled` | `Boolean` | `true` | Disables interaction when `false`. |
| `shapes` | `IconButtonShapes` / `IconToggleButtonShapes` | `IconButtonDefaults.shapes()` / `IconToggleButtonDefaults.shapes()` | Shape per state (supports morphing between checked/unchecked shapes). |
| `colors` | `IconButtonColors` / `IconToggleButtonColors` | `IconButtonDefaults.iconButtonColors()` / `IconToggleButtonDefaults.colors()` | Colors per state. |
| `border` | `BorderStroke?` | `null` | Optional border. |
| `content` | `@Composable BoxScope.() -> Unit` | — | Icon content. |

## Notes

- `IconButton` variants with pre-set colors also exist in the same file: `FilledIconButton`, `FilledTonalIconButton`, `OutlinedIconButton`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [Button](./button.md)
- [CheckboxButton / SwitchButton / RadioButton](./selection-controls.md)
