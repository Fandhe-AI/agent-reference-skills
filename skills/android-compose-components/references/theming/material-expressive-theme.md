# MaterialExpressiveTheme

Root composable, sibling to `MaterialTheme`, that opts a subtree into Material 3 Expressive defaults (expressive color scheme, expressive motion scheme). Components such as `ToggleButton`, `ButtonGroup`, `WideNavigationRail` and the wavy progress indicators are designed against these defaults.

## Signature / Usage

```kotlin
@Composable
fun MaterialExpressiveTheme(
    colorScheme: ColorScheme? = null,
    motionScheme: MotionScheme? = null,
    shapes: Shapes? = null,
    typography: Typography? = null,
    content: @Composable () -> Unit,
)

fun expressiveLightColorScheme(): ColorScheme
```

```kotlin
MaterialExpressiveTheme {
    // subtree receives expressiveLightColorScheme(), MotionScheme.expressive(),
    // Shapes() and Typography() by default
    ToggleButton(checked = checked, onCheckedChange = { checked = it }) {
        Text("Expressive")
    }
}

// Overriding only the color scheme, keeping expressive motion/shapes/typography
MaterialExpressiveTheme(
    colorScheme = if (darkTheme) darkColorScheme() else expressiveLightColorScheme()
) {
    // app content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `colorScheme` | `ColorScheme?` | `null` → `expressiveLightColorScheme()` | Color roles for descendants. |
| `motionScheme` | `MotionScheme?` | `null` → `MotionScheme.expressive()` | Animation specs for descendants. |
| `shapes` | `Shapes?` | `null` → `Shapes()` | Corner-shape scale for descendants. |
| `typography` | `Typography?` | `null` → `Typography()` | Text style scale for descendants. |
| `content` | `@Composable () -> Unit` | — | Content that reads these theme values. |

## Notes

- Unlike `MaterialTheme`, unset (`null`) parameters do **not** inherit from an enclosing theme — they fall back straight to the expressive defaults listed above. To inherit a value, read it explicitly (e.g. `MaterialTheme.colorScheme`) and pass it through.
- Nesting `MaterialExpressiveTheme` inside another `MaterialExpressiveTheme` behaves like `MaterialTheme` instead: unset parameters inherit from the enclosing theme rather than resetting to defaults.
- Internally still renders a `MaterialTheme`, so `MaterialTheme.colorScheme` / `.typography` / `.shapes` / `.motionScheme` read the resolved expressive values inside `content`.
- `expressiveLightColorScheme()` is the expressive counterpart of `lightColorScheme()`: it calls `lightColorScheme()` with a handful of roles (`onPrimaryContainer`, `onSecondaryContainer`, `onTertiaryContainer`, `onErrorContainer`) adjusted for expressive contrast. There is no separate `expressiveDarkColorScheme()` — use the regular `darkColorScheme()` for dark mode.
- Stable (non-experimental) as of the promotion recorded at Compose Material3 1.5.0-alpha18; no `@ExperimentalMaterial3ExpressiveApi` opt-in is required to call it.
- Package: `androidx.compose.material3`.

## Related

- [MaterialTheme](./material-theme.md)
- [ColorScheme](./color-scheme.md)
- [MotionScheme](./motion-scheme.md)
- [Shapes](./shapes.md)
