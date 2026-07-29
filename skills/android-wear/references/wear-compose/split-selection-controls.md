# SplitCheckboxButton / SplitSwitchButton / SplitRadioButton

Two-tappable-area variants of `CheckboxButton` / `SwitchButton` / `RadioButton`: the label area and the toggle/selection control are independently clickable, each with its own callback. Used when tapping the row should do something other than (or in addition to) toggling the control, e.g. opening a detail screen from the label while the control itself still toggles a setting.

## Signature / Usage

```kotlin
@Composable
public fun SplitCheckboxButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    toggleContentDescription: String?,
    onContainerClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = CheckboxButtonDefaults.splitCheckboxButtonShape,
    colors: SplitCheckboxButtonColors = CheckboxButtonDefaults.splitCheckboxButtonColors(),
    toggleInteractionSource: MutableInteractionSource? = null,
    containerInteractionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    containerClickLabel: String? = null,
    contentPadding: PaddingValues = CheckboxButtonDefaults.ContentPadding,
    secondaryLabel: @Composable (RowScope.() -> Unit)? = null,
    label: @Composable RowScope.() -> Unit,
)
```

```kotlin
SplitCheckboxButton(
    checked = isChecked,
    onCheckedChange = { isChecked = it },
    toggleContentDescription = "Wi-Fi",
    onContainerClick = { /* open Wi-Fi details */ },
    label = { Text("Wi-Fi") },
)
```

`SplitSwitchButton` and `SplitRadioButton` follow the same two-tappable-area shape, but note the parameter names differ slightly between all three (`onCheckedChange`/`toggleContentDescription`/`toggleInteractionSource` vs. `onSelectionClick`/`selectionContentDescription`/`selectionInteractionSource`):

```kotlin
@Composable
public fun SplitSwitchButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    toggleContentDescription: String?,
    onContainerClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = SwitchButtonDefaults.splitSwitchButtonShape,
    colors: SplitSwitchButtonColors = SwitchButtonDefaults.splitSwitchButtonColors(),
    toggleInteractionSource: MutableInteractionSource? = null,
    containerInteractionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    containerClickLabel: String? = null,
    contentPadding: PaddingValues = SwitchButtonDefaults.ContentPadding,
    secondaryLabel: @Composable (RowScope.() -> Unit)? = null,
    label: @Composable RowScope.() -> Unit,
)

@Composable
public fun SplitRadioButton(
    selected: Boolean,
    onSelectionClick: () -> Unit,
    selectionContentDescription: String?,
    onContainerClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = RadioButtonDefaults.splitRadioButtonShape,
    colors: SplitRadioButtonColors = RadioButtonDefaults.splitRadioButtonColors(),
    selectionInteractionSource: MutableInteractionSource? = null,
    containerInteractionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    containerClickLabel: String? = null,
    contentPadding: PaddingValues = RadioButtonDefaults.ContentPadding,
    secondaryLabel: @Composable (RowScope.() -> Unit)? = null,
    label: @Composable RowScope.() -> Unit,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` / `selected` | `Boolean` | — | Current state of the toggle/selection area. |
| `onCheckedChange` / `onSelectionClick` | `(Boolean) -> Unit` / `() -> Unit` | — | Callback for the toggle/selection tap area only. Note `SplitRadioButton` names this `onSelectionClick`, not `onSelect` like the non-split `RadioButton`. |
| `toggleContentDescription` / `selectionContentDescription` | `String?` | — | Accessibility label for the toggle/selection tap area. |
| `onContainerClick` | `() -> Unit` | — | Callback for the main body (label) tap area — independent from the toggle/selection callback. |
| `containerClickLabel` | `String?` | `null` | Optional accessibility click label for the container tap area. |
| `enabled` | `Boolean` | `true` | Disables both tap areas when `false`. |
| `shape` | `Shape` | `*ButtonDefaults.split*Shape` | Stadium-shaped container. |
| `colors` | `SplitCheckboxButtonColors` / `SplitSwitchButtonColors` / `SplitRadioButtonColors` | `*ButtonDefaults.split*Colors()` | Colors for each tap area, including the visual "divider" drawn between them. |
| `toggleInteractionSource` / `selectionInteractionSource` | `MutableInteractionSource?` | `null` | Hoisted interaction source for the toggle/selection tap area. |
| `containerInteractionSource` | `MutableInteractionSource?` | `null` | Hoisted interaction source for the container (label) tap area. |
| `transformation` | `SurfaceTransformation?` | `null` | Scale/morph transformation inside `TransformingLazyColumn`. |
| `contentPadding` | `PaddingValues` | `*ButtonDefaults.ContentPadding` | Padding around content. |
| `label` / `secondaryLabel` | `@Composable RowScope.() -> Unit` | — / `null` | Primary (required) and optional secondary text rows, up to 3 and 2 lines respectively. |

## Notes

- The visual divider between the label area and the toggle area is drawn automatically as part of `colors`; there is no separate divider parameter.
- Parameter names for the toggle/selection callback and its content description/interaction source are **not** consistent across the three: `SplitCheckboxButton` and `SplitSwitchButton` use `onCheckedChange` / `toggleContentDescription` / `toggleInteractionSource`, while `SplitRadioButton` uses `onSelectionClick` / `selectionContentDescription` / `selectionInteractionSource`.
- Non-split `CheckboxButton` / `SwitchButton` / `RadioButton` have a single tap area covering the whole row instead.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [CheckboxButton / SwitchButton / RadioButton](./selection-controls.md)
