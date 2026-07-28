# Button (Wear)

Base level Wear Material3 button offering a single content slot. Circular/stadium shaped, sized for the wrist. High-emphasis filled variant; see Notes for `FilledTonalButton` / `OutlinedButton` / `ChildButton` / `CompactButton` variants.

## Signature / Usage

```kotlin
@Composable
public fun Button(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    onLongClick: (() -> Unit)? = null,
    onLongClickLabel: String? = null,
    enabled: Boolean = true,
    shape: Shape = ButtonDefaults.shape,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
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
| `onClick` | `() -> Unit` | — | Called on click. |
| `modifier` | `Modifier` | `Modifier` | Applied to the button. |
| `onLongClick` | `(() -> Unit)?` | `null` | Optional long-click handler. |
| `onLongClickLabel` | `String?` | `null` | Accessibility label for long-click. |
| `enabled` | `Boolean` | `true` | Disables interaction and dims appearance when `false`. |
| `shape` | `Shape` | `ButtonDefaults.shape` | Container/border/shadow shape. |
| `colors` | `ButtonColors` | `ButtonDefaults.buttonColors()` | Colors per state; use `filledTonalButtonColors()` / `outlinedButtonColors()` / `childButtonColors()` for variants. |
| `border` | `BorderStroke?` | `null` | Border stroke; `OutlinedButton` defaults to `ButtonDefaults.outlinedButtonBorder(enabled)`. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.ContentPadding` | Spacing between container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted interaction source. |
| `transformation` | `SurfaceTransformation?` | `null` | Scale/morph transformation when placed in a `TransformingLazyColumn`. |
| `content` | `@Composable RowScope.() -> Unit` | — | Button content (text/icon). |

## Notes

- Variants share the same parameter shape as `Button` but differ in default `colors` and (for `OutlinedButton`) `border`: `FilledTonalButton` (medium emphasis, `ButtonDefaults.filledTonalButtonColors()`), `OutlinedButton` (bordered, transparent background), `ChildButton` (low emphasis, `ButtonDefaults.childButtonColors()`).
- `CompactButton` is a smaller two-slot variant with an additional `icon: (@Composable BoxScope.() -> Unit)?` and `label: (@Composable RowScope.() -> Unit)?` parameter (instead of a single `content` slot) and its own `CompactButtonDefaults.shape` / `ContentPadding`.
- All variants accept `onLongClick` and `transformation` (for use inside `TransformingLazyColumn`), unlike the mobile `androidx.compose.material3.Button`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [EdgeButton](./edge-button.md)
- [IconButton / IconToggleButton](./icon-button.md)
- [ButtonGroup — see Card notes for layout family](./card.md)
