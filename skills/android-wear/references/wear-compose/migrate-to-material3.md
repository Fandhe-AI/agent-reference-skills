# Migrate from Material 2.5 to Material 3

Guide for migrating a Wear Compose app from Material 2.5 (`androidx.wear.compose.material`) to Material 3 Expressive (`androidx.wear.compose.material3`): don't mix both long term, drop Horologist Compose Layout/Material, and adopt the M3 component/theme set.

## Signature / Usage

```kotlin
// M2.5
implementation("androidx.wear.compose:compose-material:1.4.0")

// M3
implementation("androidx.wear.compose:compose-material3:1.7.0-alpha07")
implementation("androidx.wear.compose:compose-foundation:1.7.0-alpha07")
implementation("androidx.wear.compose:compose-navigation:1.7.0-alpha07")
```

```kotlin
// M2.5
import androidx.wear.compose.material.MaterialTheme
MaterialTheme(colors = AppColors, typography = AppTypography, shapes = AppShapes, content = content)

// M3
import androidx.wear.compose.material3.MaterialTheme
MaterialTheme(
    colorScheme = ColorScheme(),
    typography = Typography(),
    shapes = Shapes(),
    motionScheme = MotionScheme.standard(),
    content = { /* content here */ },
)
```

## Options / Props

| M2.5 | M3 |
|------|-----|
| `Button` | `IconButton` or `TextButton` |
| `Chip` | `Button`, `OutlinedButton`, `FilledTonalButton`, or `ChildButton` |
| `CompactChip` | `CompactButton` |
| `Checkbox` | `CheckboxButton` or `SplitCheckboxButton` |
| `Switch` | `SwitchButton` or `SplitSwitchButton` |
| `RadioButton` | `RadioButton` or `SplitRadioButton` |
| `ToggleChip` | `CheckboxButton`, `RadioButton`, or `SwitchButton` |
| `SplitToggleChip` | `SplitCheckboxButton`, `SplitRadioButton`, or `SplitSwitchButton` |
| `InlineSlider` | `Slider` |
| `Scaffold` | `AppScaffold` and `ScreenScaffold` |
| `PositionIndicator` | `ScrollIndicator` |
| `SwipeToRevealCard` / `SwipeToRevealChip` | `SwipeToReveal` |
| `Colors` (`MaterialTheme.colors`) | `ColorScheme` (`MaterialTheme.colorScheme`), 13 → 28 color roles, dynamic theming |
| `LocalContentAlpha()` | Removed, not used by `Text`/`Icon` in M3 |
| `Vignette` | Removed, not part of M3 Expressive design |

## Notes

- Don't run M2.5 (`androidx.wear.compose.material`) and M3 (`androidx.wear.compose.material3`) in one app long term; migrate in a phased approach and also drop Horologist Compose Layout/Material composables in favor of M3 equivalents.
- `ColorScheme` (M3) has 28 named color roles vs `Colors`' 13 and adds dynamic theming: `dynamicColorScheme(LocalContext.current) ?: myBrandColors`, matching the current watch face.
- `MaterialTheme` in M3 gains a required `motionScheme: MotionScheme` parameter (`MotionScheme.standard()` / `.expressive()`) not present in M2.5.
- M3 typography adds nine new text styles built on flex fonts (`numeral*`, `arc*` scales, plus `bodyExtraSmall`) and `AnimatedText`.
- M3 introduces shape morphing on button components in response to interaction, via `IconButtonDefaults.animatedShape()`, `TextButtonDefaults.animatedShape()`, and the toggle-button `animatedShapes()` / `variantAnimatedShapes()` variants.
- New M3-only components have no M2.5 equivalent: `AlertDialog`, `ConfirmationDialog`, `OpenOnPhoneDialog`, `EdgeButton`, `ButtonGroup`, `DatePicker`/`Picker`/`PickerGroup`, `LevelIndicator`, `SegmentedCircularProgressIndicator`, `HorizontalPagerScaffold`/`VerticalPagerScaffold`, `ListHeader`/`ListSubHeader`.

## Related

- [MaterialTheme (Wear)](./theme.md)
- [dynamicColorScheme](./dynamic-color-scheme.md)
- [Developing for different screen sizes](./screen-sizes.md)
