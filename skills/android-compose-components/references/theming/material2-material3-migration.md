# Migrating from Material 2 to Material 3

Guide-level mapping between `androidx.compose.material` (M2) and `androidx.compose.material3` (M3) theming APIs.

## Signature / Usage

```kotlin
// M2
import androidx.compose.material.MaterialTheme
MaterialTheme(colors = AppColors, typography = AppTypography, shapes = AppShapes) { /* ... */ }

// M3
import androidx.compose.material3.MaterialTheme
MaterialTheme(colorScheme = AppColorScheme, typography = AppTypography, shapes = AppShapes) { /* ... */ }
```

```kotlin
// M2
import androidx.compose.material.lightColors
val AppLightColors = lightColors(/* M2 parameters */)

// M3
import androidx.compose.material3.lightColorScheme
val AppLightColorScheme = lightColorScheme(/* M3 parameters */)
```

## Notes

- **Dependency**: `androidx.compose.material:material` → `androidx.compose.material3:material3`.
- **Colors**: `Colors`/`lightColors()`/`darkColors()` → `ColorScheme`/`lightColorScheme()`/`darkColorScheme()`. Suggested role mapping: M2 `primary` → M3 Primary, M2 `primaryVariant` → M3 Secondary, M2 `secondary` → M3 Tertiary, M2 `surface`/`background` → M3 Neutral. M3 `ColorScheme` has no `isLight` parameter; branch on `darkTheme` yourself via `CompositionLocal` if needed. Use the [Material Theme Builder](https://m3.material.io/theme-builder) to generate schemes.
- **Typography**: M2 `h1`→M3 `displayLarge`, `h4`→`headlineMedium`, `h6`→`titleLarge`, `subtitle1`→`titleMedium`, `body1`→`bodyLarge`, `caption`→`bodySmall`, `button`→`labelLarge`, `overline`→`labelSmall` (full table in the official guide). M3 `Typography` has no `defaultFontFamily`; set `fontFamily` per `TextStyle`.
- **Shapes**: M2 `small`/`medium`/`large` map directly to the same-named M3 roles; M3 adds `extraSmall` and `extraLarge`. Use `RectangleShape` for M2 "none" and `CircleShape` for M2 "full".
- **Components**: `BottomNavigation`→`NavigationBar`, `BottomNavigationItem`→`NavigationBarItem`, `Chip`→`AssistChip`/`SuggestionChip`, `ModalBottomSheetLayout`→`ModalBottomSheet`, `ModalDrawer`→`ModalNavigationDrawer`.
- **Elevation**: M2 `Surface(elevation = ...)` → M3 `Surface(shadowElevation = ..., tonalElevation = ...)` — see [Surface tonal elevation](./surface-tonal-elevation.md).
- **Emphasis**: M2 `LocalContentAlpha`/`ContentAlpha` is replaced by M3 color roles / `LocalContentColor` overrides — see [LocalContentColor / contentColorFor](./content-color.md). `ContentAlpha.high`→`onSurface`, `.medium`→`onSurfaceVariant`, `.disabled`→`onSurface.copy(alpha = 0.38f)`.
- **Naming**: M2 `background*` component parameters become M3 `container*` (e.g. `Badge(backgroundColor = ...)` → `Badge(containerColor = ...)`).
- Don't run M2 and M3 long-term in the same app; migrate the design system (colors/typography/shapes) before migrating individual screens, then remove the M2 dependency last.

## Related

- [ColorScheme](./color-scheme.md)
- [Typography](./typography.md)
- [Shapes](./shapes.md)
- [Surface tonal elevation](./surface-tonal-elevation.md)
- [LocalContentColor / contentColorFor](./content-color.md)
