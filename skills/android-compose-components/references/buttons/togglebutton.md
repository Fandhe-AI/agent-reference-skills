# ToggleButton

Filled, standalone checkable button that switches between primary and tonal colors depending on `checked`, for a binary toggle action with a text/icon `RowScope` content (e.g. a "Bold" toggle in a formatting toolbar). Distinct from `IconToggleButton`, which is restricted to a single `Icon` as content.

## Signature / Usage

```kotlin
@OptIn(ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun ToggleButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shapes: ToggleButtonShapes = ToggleButtonDefaults.shapesFor(ButtonDefaults.MinHeight),
    colors: ToggleButtonColors = ToggleButtonDefaults.toggleButtonColors(),
    elevation: ButtonElevation? = ButtonDefaults.buttonElevation(),
    border: BorderStroke? = null,
    contentPadding: PaddingValues = ButtonDefaults.contentPaddingFor(ButtonDefaults.MinHeight),
    interactionSource: MutableInteractionSource? = null,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
var checked by rememberSaveable { mutableStateOf(false) }

ToggleButton(checked = checked, onCheckedChange = { checked = it }) {
    Icon(Icons.Filled.FormatBold, contentDescription = "Bold")
    Spacer(Modifier.size(ToggleButtonDefaults.IconSpacing))
    Text("Bold")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `Boolean` | — | Whether this toggle button is toggled on or off. |
| `onCheckedChange` | `(Boolean) -> Unit` | — | Called when this toggle button is clicked. |
| `modifier` | `Modifier` | `Modifier` | Applied to this button. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `shapes` | `ToggleButtonShapes` | `ToggleButtonDefaults.shapesFor(ButtonDefaults.MinHeight)` | `shape` / `pressedShape` / `checkedShape`; the button morphs between them on interaction when they are `CornerBasedShape`s. |
| `colors` | `ToggleButtonColors` | `ToggleButtonDefaults.toggleButtonColors()` | Container/content colors, separately for the unchecked and `checked` states. |
| `elevation` | `ButtonElevation?` | `ButtonDefaults.buttonElevation()` | Elevation in different states. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `contentPadding` | `PaddingValues` | `ButtonDefaults.contentPaddingFor(ButtonDefaults.MinHeight)` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `content` | `@Composable RowScope.() -> Unit` | — | Content, e.g. `Icon` and/or `Text`. |

## Notes

- Style variants share the same `checked` / `onCheckedChange` signature, differing in default `colors` / `elevation` / `border`: `ElevatedToggleButton` (high emphasis, `ToggleButtonDefaults.elevatedToggleButtonColors()` — use only when visual separation from a patterned container is required), `FilledTonalToggleButton` (medium emphasis, secondary color mapping via `ToggleButtonDefaults.filledTonalToggleButtonColors()`), `OutlinedToggleButton` (medium emphasis, no `elevation`, default `border` from `ToggleButtonDefaults.outlinedToggleButtonBorder(enabled, checked)` — pairs well with `ToggleButton` to indicate a secondary alternative action).
- `TonalToggleButton` is deprecated in favor of `FilledTonalToggleButton` (same parameters).
- Requires `@OptIn(ExperimentalMaterial3ExpressiveApi::class)`.
- For a single-icon toggle with no text label, use `IconToggleButton` instead.
- `ToggleButtonGroup`/multi-select layouts aside, this family is standalone — for mutually-exclusive grouped choices use `SegmentedButton`.
- Package: `androidx.compose.material3`.

## Related

- [IconToggleButton](./icontogglebutton.md)
- [SegmentedButton](./segmentedbutton.md)
- [Button](./button.md)
