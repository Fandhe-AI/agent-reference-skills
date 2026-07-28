# CheckBox / Switch / RadioButton

Compound-button composables representing a binary checked state (Android 12+). Package: `androidx.glance.appwidget`.

## Signature / Usage

```kotlin
@Composable
public fun CheckBox(
    checked: Boolean,
    onCheckedChange: Action?,
    modifier: GlanceModifier = GlanceModifier,
    text: String = "",
    style: TextStyle? = null,
    colors: CheckBoxColors = CheckboxDefaults.colors(),
    maxLines: Int = Int.MAX_VALUE,
)

@Composable
public fun Switch(
    checked: Boolean,
    onCheckedChange: Action?,
    modifier: GlanceModifier = GlanceModifier,
    text: String = "",
    style: TextStyle? = null,
    colors: SwitchColors = SwitchDefaults.colors(),
    maxLines: Int = Int.MAX_VALUE,
)

@Composable
public fun RadioButton(
    checked: Boolean,
    onClick: Action?,
    modifier: GlanceModifier = GlanceModifier,
    enabled: Boolean = true,
    text: String = "",
    style: TextStyle? = null,
    colors: RadioButtonColors = RadioButtonDefaults.colors(),
    maxLines: Int = Int.MAX_VALUE,
)
```

```kotlin
var isApplesChecked by remember { mutableStateOf(false) }

CheckBox(
    checked = isApplesChecked,
    onCheckedChange = { isApplesChecked = !isApplesChecked },
    text = "Apples",
    colors = CheckboxDefaults.colors(
        checkedColor = ColorProvider(day = Color.Blue, night = Color.Cyan),
        uncheckedColor = ColorProvider(day = Color.DarkGray, night = Color.LightGray),
    ),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `Boolean` | — | Current checked state (hoisted, all three composables). |
| `onCheckedChange` (CheckBox, Switch) / `onClick` (RadioButton) | `Action?` \| `() -> Unit` | — | Invoked on toggle/select. |
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the control. |
| `enabled` (RadioButton only) | `Boolean` | `true` | Disables interaction when `false`. |
| `text` | `String` | `""` | Optional label shown next to the control. |
| `style` | `TextStyle?` | `null` | Label text styling. |
| `colors` | `CheckBoxColors` / `SwitchColors` / `RadioButtonColors` | `*Defaults.colors()` | Checked/unchecked color set, via `ColorProvider(day = ..., night = ...)`. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Maximum lines of the label. |

## Notes

- Available on Android 12 (S)+ only.
- `RadioButton` inside a `Row`/`Column` group should have `GlanceModifier.selectableGroup()` applied to the container so selecting one unselects the previously selected button.
- Package: `androidx.glance.appwidget`, artifact `androidx.glance:glance-appwidget`.

## Related

- [button.md](./button.md)
