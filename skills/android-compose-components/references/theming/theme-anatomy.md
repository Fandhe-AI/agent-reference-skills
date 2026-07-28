# Anatomy of a theme

The structural pattern behind `MaterialTheme` and any custom design system in Compose: immutable theme-system data classes, provided via `CompositionLocal`, exposed through a theme function and a convenience accessor object.

## Signature / Usage

```kotlin
// 1. Theme system classes (data classes, @Immutable/@Stable)
@Immutable
data class ColorSystem(val color: Color, val gradient: List<Color>)

// 2. CompositionLocal with a safe default
val LocalColorSystem = staticCompositionLocalOf {
    ColorSystem(color = Color.Unspecified, gradient = emptyList())
}

// 3. Theme function — entry point, provides values to the composition tree
@Composable
fun Theme(content: @Composable () -> Unit) {
    val colorSystem = ColorSystem(color = Color(0xFF3DDC84), gradient = listOf(Color.White))
    CompositionLocalProvider(LocalColorSystem provides colorSystem, content = content)
}

// 4. Theme object — typed static access
object Theme {
    val colorSystem: ColorSystem
        @Composable get() = LocalColorSystem.current
}

// Usage
Theme.colorSystem.color
```

## Notes

- The same four-part pattern underlies `MaterialTheme` itself: `ColorScheme`/`Typography`/`Shapes`/`MotionScheme` are the theme-system classes, `MaterialTheme.LocalMaterialTheme` (a public accessor over a private `staticCompositionLocalOf`) is the `CompositionLocal`, `MaterialTheme(...)` is the theme function, and `MaterialTheme` (the object itself) is the accessor.
- Theme-system classes should be `@Immutable` or `@Stable` so the Compose compiler can skip unnecessary recomposition.
- `staticCompositionLocalOf` (no recomposition tracking of reads, cheaper writes trigger full subtree recomposition) is typically used for theme values that rarely change; `compositionLocalOf` is preferred when fine-grained recomposition matters.
- Nested `Theme { }` calls scope overrides to their subtree, mirroring `MaterialTheme` nesting behavior.

## Related

- [MaterialTheme](./material-theme.md)
- [Custom design system](./custom-design-system.md)
