# Custom design system

Three approaches to diverge from stock Material theming, all built on the `CompositionLocal` pattern described in [Anatomy of a theme](./theme-anatomy.md): extend `MaterialTheme`, replace individual Material subsystems, or build a fully custom system.

## Signature / Usage

```kotlin
// Approach 1: extend MaterialTheme with additional values
@Immutable
data class ExtendedColors(val caution: Color, val onCaution: Color)

val LocalExtendedColors = staticCompositionLocalOf {
    ExtendedColors(caution = Color.Unspecified, onCaution = Color.Unspecified)
}

@Composable
fun ExtendedTheme(content: @Composable () -> Unit) {
    val extendedColors = ExtendedColors(caution = Color(0xFFFFCC02), onCaution = Color(0xFF2C2D30))
    CompositionLocalProvider(LocalExtendedColors provides extendedColors) {
        MaterialTheme(content = content)
    }
}

object ExtendedTheme {
    val colors: ExtendedColors
        @Composable get() = LocalExtendedColors.current
}

// Wrap a Material component to apply the extended value
@Composable
fun ExtendedButton(onClick: () -> Unit, modifier: Modifier = Modifier, content: @Composable RowScope.() -> Unit) {
    Button(
        colors = ButtonDefaults.buttonColors(
            containerColor = ExtendedTheme.colors.caution,
            contentColor = ExtendedTheme.colors.onCaution
        ),
        onClick = onClick,
        modifier = modifier,
        content = content
    )
}
```

## Notes

- **Extend Material theming** — add extension properties (`val ColorScheme.snackbarAction`) or a wrapper theme (`ExtendedTheme`) that layers new `CompositionLocal` values on top of `MaterialTheme`, keeping all Material values intact.
- **Replace Material subsystems** — swap out `Typography`/`Shapes`/`Colors` individually with custom data classes provided via their own `CompositionLocal`, while still calling `MaterialTheme(...)` underneath for the parts not replaced. Not all Material component parameters are exposed directly; wrap content in helpers like `ProvideTextStyle` where needed.
- **Fully custom design system** — define independent theme-system classes (colors, typography, elevation, ...) with no dependency on `MaterialTheme`, following the same `CompositionLocal` provider/accessor pattern, and wrap Material components to consume the custom values.
- All three approaches reuse Material's built-in components (`Button`, `Card`, etc.) by wrapping them with custom default parameter values — Compose does not require reimplementing components to reskin them.

## Related

- [Anatomy of a theme](./theme-anatomy.md)
- [MaterialTheme](./material-theme.md)
