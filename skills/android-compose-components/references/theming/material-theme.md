# MaterialTheme

Root composable that provides Material 3 theming (color scheme, typography, shapes, motion scheme) to its `content` via `CompositionLocal`. Components such as `Button` and `Checkbox` pull their default styling from the nearest `MaterialTheme`.

## Signature / Usage

```kotlin
@Composable
fun MaterialTheme(
    colorScheme: ColorScheme = MaterialTheme.colorScheme,
    motionScheme: MotionScheme = MaterialTheme.motionScheme,
    shapes: Shapes = MaterialTheme.shapes,
    typography: Typography = MaterialTheme.typography,
    content: @Composable () -> Unit,
)
```

```kotlin
MaterialTheme(
    colorScheme = colorScheme,
    typography = typography,
    shapes = shapes
) {
    // app content
}

// Access current theme values anywhere inside content
Text(
    text = "Hello theming",
    color = MaterialTheme.colorScheme.primary,
    style = MaterialTheme.typography.titleLarge
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `colorScheme` | `ColorScheme` | `MaterialTheme.colorScheme` | Color roles used throughout descendants. |
| `motionScheme` | `MotionScheme` | `MaterialTheme.motionScheme` | Animation specs (`standard()` / `expressive()`) used by components. |
| `shapes` | `Shapes` | `MaterialTheme.shapes` | Corner-shape scale used throughout descendants. |
| `typography` | `Typography` | `MaterialTheme.typography` | Text style scale used throughout descendants. |
| `content` | `@Composable () -> Unit` | — | Content that reads these theme values. |

## Notes

- `MaterialTheme` is also an `object` exposing read-only accessors: `MaterialTheme.colorScheme`, `MaterialTheme.typography`, `MaterialTheme.shapes`, `MaterialTheme.motionScheme`. Unset parameters fall back to the value from the nearest enclosing `MaterialTheme` (or defaults `lightColorScheme()` / `Typography()` / `Shapes()` / `standard()` at the root).
- Nesting `MaterialTheme` overrides only the parameters explicitly passed; everything else is inherited from the parent theme.
- Package: `androidx.compose.material3`.

## Related

- [ColorScheme](./color-scheme.md)
- [Typography](./typography.md)
- [Shapes](./shapes.md)
- [MotionScheme](./motion-scheme.md)
- [Anatomy of a theme](./theme-anatomy.md)
