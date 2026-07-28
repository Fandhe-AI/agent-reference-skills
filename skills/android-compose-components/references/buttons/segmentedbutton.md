# SegmentedButton

Individual button within a `SingleChoiceSegmentedButtonRow` or `MultiChoiceSegmentedButtonRow`, used to build a set of side-by-side options.

## Signature / Usage

```kotlin
// Single-choice row
@Composable
fun SingleChoiceSegmentedButtonRow(
    modifier: Modifier = Modifier,
    space: Dp = SegmentedButtonDefaults.BorderWidth,
    content: @Composable SingleChoiceSegmentedButtonRowScope.() -> Unit,
)

// Multi-choice row
@Composable
fun MultiChoiceSegmentedButtonRow(
    modifier: Modifier = Modifier,
    space: Dp = SegmentedButtonDefaults.BorderWidth,
    content: @Composable MultiChoiceSegmentedButtonRowScope.() -> Unit,
)

// Single-choice item
@Composable
fun SingleChoiceSegmentedButtonRowScope.SegmentedButton(
    selected: Boolean,
    onClick: () -> Unit,
    shape: Shape,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: SegmentedButtonColors = SegmentedButtonDefaults.colors(),
    border: BorderStroke = SegmentedButtonDefaults.borderStroke(colors.borderColor(enabled, selected)),
    contentPadding: PaddingValues = SegmentedButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    icon: @Composable () -> Unit = { SegmentedButtonDefaults.Icon(selected) },
    label: @Composable () -> Unit,
)
```

```kotlin
var selectedIndex by remember { mutableIntStateOf(0) }
val options = listOf("Day", "Month", "Week")

SingleChoiceSegmentedButtonRow {
    options.forEachIndexed { index, label ->
        SegmentedButton(
            shape = SegmentedButtonDefaults.itemShape(index = index, count = options.size),
            onClick = { selectedIndex = index },
            selected = index == selectedIndex,
            label = { Text(label) }
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `space` (rows) | `Dp` | `SegmentedButtonDefaults.BorderWidth` | Overlap between adjacent buttons; should equal the stroke width. |
| `selected` / `checked` | `Boolean` | — | Selection state. `selected` in the single-choice row scope, `checked` in the multi-choice row scope. |
| `onClick` / `onCheckedChange` | `() -> Unit` / `(Boolean) -> Unit` | — | Callback invoked on interaction. |
| `shape` | `Shape` | — | Button shape, typically from `SegmentedButtonDefaults.itemShape(index, count)`. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `colors` | `SegmentedButtonColors` | `SegmentedButtonDefaults.colors()` | Resolves colors in different states. |
| `border` | `BorderStroke` | `SegmentedButtonDefaults.borderStroke(colors.borderColor(enabled, selected/checked))` | Border styling of the button. |
| `contentPadding` | `PaddingValues` | `SegmentedButtonDefaults.ContentPadding` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `icon` | `@Composable () -> Unit` | `SegmentedButtonDefaults.Icon(selected/checked)` | Icon slot; pass a no-op lambda to hide, or different lambdas per state for a crossfade. |
| `label` | `@Composable () -> Unit` | — | Content rendered inside the button. |

## Notes

- Use `SingleChoiceSegmentedButtonRow` when only one option can be selected at a time (mutually exclusive).
- Use `MultiChoiceSegmentedButtonRow` to let users select 2-5 items independently; use chips instead for more items.
- The multi-choice variant of `SegmentedButton` is an extension on `MultiChoiceSegmentedButtonRowScope` and uses `checked` / `onCheckedChange` instead of `selected` / `onClick`.
- Package: `androidx.compose.material3`.

## Related

- [Button](./button.md)
