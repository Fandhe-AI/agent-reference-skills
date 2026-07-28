# theming

> This is the Jetpack Compose (Kotlin, `androidx.compose.material3`) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend theming APIs.

| Name | Description | Path |
|------|-------------|------|
| MaterialTheme | Root composable providing color scheme, typography, shapes, and motion scheme to descendants. | [material-theme.md](./material-theme.md) |
| ColorScheme | Material 3 color roles built via lightColorScheme() / darkColorScheme(). | [color-scheme.md](./color-scheme.md) |
| Dynamic color scheme | Wallpaper-derived ColorScheme via dynamicLightColorScheme() / dynamicDarkColorScheme() (Android 12+). | [dynamic-color-scheme.md](./dynamic-color-scheme.md) |
| Typography | Material 3 type scale (15 TextStyle roles + expressive variants). | [typography.md](./typography.md) |
| Shapes | Material 3 corner-shape scale (extraSmall...extraLarge + expressive variants). | [shapes.md](./shapes.md) |
| LocalContentColor / contentColorFor | Ambient content color and background-to-content color resolution. | [content-color.md](./content-color.md) |
| MotionScheme | Animation specs (standard()/expressive()) driving component motion. | [motion-scheme.md](./motion-scheme.md) |
| Surface tonal elevation | Surface's tonalElevation and shadowElevation parameters. | [surface-tonal-elevation.md](./surface-tonal-elevation.md) |
| Anatomy of a theme | The CompositionLocal-based structural pattern behind MaterialTheme and custom themes. | [theme-anatomy.md](./theme-anatomy.md) |
| Custom design system | Extending, replacing, or fully replacing Material theming with CompositionLocal. | [custom-design-system.md](./custom-design-system.md) |
| Migrating from Material 2 to Material 3 | Colors, typography, shapes, components, elevation, and emphasis mapping M2 → M3. | [material2-material3-migration.md](./material2-material3-migration.md) |
