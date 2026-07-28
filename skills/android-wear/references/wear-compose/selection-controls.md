# CheckboxButton / SwitchButton / RadioButton

Full-width selection-control rows with a slot layout for an icon, label, and optional secondary label, plus a trailing checkbox / switch / radio indicator. Used for settings-style lists.

## Signature / Usage

```kotlin
@Composable
public fun CheckboxButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = CheckboxButtonDefaults.checkboxButtonShape,
    colors: CheckboxButtonColors = CheckboxButtonDefaults.checkboxButtonColors(),
    contentPadding: PaddingValues = CheckboxButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    icon: @Composable (BoxScope.() -> Unit)? = null,
    secondaryLabel: @Composable (RowScope.() -> Unit)? = null,
    label: @Composable RowScope.() -> Unit,
)
```

```kotlin
CheckboxButton(
    checked = isChecked,
    onCheckedChange = { isChecked = it },
    label = { Text("Wi-Fi") },
)
```

`SwitchButton` and `RadioButton` share the same shape (`checked`/`onCheckedChange` for `SwitchButton`; `selected`/`onSelect` for `RadioButton`):

```kotlin
@Composable
public fun SwitchButton(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = SwitchButtonDefaults.switchButtonShape,
    colors: SwitchButtonColors = SwitchButtonDefaults.switchButtonColors(),
    contentPadding: PaddingValues = SwitchButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    icon: @Composable (BoxScope.() -> Unit)? = null,
    secondaryLabel: @Composable (RowScope.() -> Unit)? = null,
    label: @Composable RowScope.() -> Unit,
)

@Composable
public fun RadioButton(
    selected: Boolean,
    onSelect: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    shape: Shape = RadioButtonDefaults.radioButtonShape,
    colors: RadioButtonColors = RadioButtonDefaults.radioButtonColors(),
    contentPadding: PaddingValues = RadioButtonDefaults.ContentPadding,
    interactionSource: MutableInteractionSource? = null,
    transformation: SurfaceTransformation? = null,
    icon: @Composable (BoxScope.() -> Unit)? = null,
    secondaryLabel: @Composable (RowScope.() -> Unit)? = null,
    label: @Composable RowScope.() -> Unit,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` / `selected` | `Boolean` | — | Current state. |
| `onCheckedChange` / `onSelect` | `(Boolean) -> Unit` / `() -> Unit` | — | State-change callback. |
| `enabled` | `Boolean` | `true` | Disables interaction when `false`. |
| `shape` | `Shape` | component-specific default | Container shape. |
| `colors` | `CheckboxButtonColors` / `SwitchButtonColors` / `RadioButtonColors` | component-specific default | Colors per state. |
| `contentPadding` | `PaddingValues` | component-specific default | Padding around content. |
| `transformation` | `SurfaceTransformation?` | `null` | Scale/morph transformation inside `TransformingLazyColumn`. |
| `icon` | `@Composable (BoxScope.() -> Unit)?` | `null` | Optional leading icon. |
| `secondaryLabel` | `@Composable (RowScope.() -> Unit)?` | `null` | Optional secondary text row. |
| `label` | `@Composable RowScope.() -> Unit` | — | Primary label (required). |

## Notes

- All three are full-width row-style buttons intended for settings screens, distinct from the small circular `IconToggleButton`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [IconButton / IconToggleButton](./icon-button.md)
- [ListHeader](./list-header.md)
